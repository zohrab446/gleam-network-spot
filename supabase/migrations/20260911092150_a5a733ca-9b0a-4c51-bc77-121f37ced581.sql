ALTER TABLE public.profiles
  ADD COLUMN hint_credits integer NOT NULL DEFAULT 3 CHECK (hint_credits >= 0),
  ADD COLUMN total_hints_used integer NOT NULL DEFAULT 0 CHECK (total_hints_used >= 0);

CREATE TABLE public.hint_unlocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id text NOT NULL,
  hint_index integer NOT NULL CHECK (hint_index BETWEEN 0 AND 2),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, lesson_id, hint_index)
);
GRANT SELECT ON public.hint_unlocks TO authenticated;
GRANT ALL ON public.hint_unlocks TO service_role;
ALTER TABLE public.hint_unlocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own unlocked hints"
  ON public.hint_unlocks FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE public.payment_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_oid text NOT NULL UNIQUE CHECK (merchant_oid ~ '^[A-Za-z0-9]+$'),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id text NOT NULL,
  product_type text NOT NULL CHECK (product_type IN ('energy', 'hints')),
  quantity integer NOT NULL CHECK (quantity > 0),
  amount_kurus integer NOT NULL CHECK (amount_kurus > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  provider text NOT NULL DEFAULT 'paytr' CHECK (provider = 'paytr'),
  provider_total_amount integer,
  failure_code text,
  failure_message text,
  fulfilled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.payment_orders TO authenticated;
GRANT ALL ON public.payment_orders TO service_role;
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own payment orders"
  ON public.payment_orders FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own pending payment orders"
  ON public.payment_orders FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND status = 'pending');
CREATE TRIGGER set_payment_orders_updated_at
  BEFORE UPDATE ON public.payment_orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.unlock_lesson_hint(p_lesson_id text, p_hint_index integer)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid := auth.uid();
  v_profile public.profiles%ROWTYPE;
  v_already boolean;
  v_pro boolean;
BEGIN
  IF v_user IS NULL THEN RAISE EXCEPTION 'AUTH_REQUIRED'; END IF;
  IF length(trim(p_lesson_id)) < 1 OR length(p_lesson_id) > 100 OR p_hint_index NOT BETWEEN 0 AND 2 THEN
    RAISE EXCEPTION 'INVALID_HINT';
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.hint_unlocks
    WHERE user_id = v_user AND lesson_id = p_lesson_id AND hint_index = p_hint_index
  ) INTO v_already;

  SELECT * INTO v_profile FROM public.profiles WHERE id = v_user FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'PROFILE_NOT_FOUND'; END IF;
  v_pro := v_profile.is_pro AND (v_profile.pro_expires_at IS NULL OR v_profile.pro_expires_at > now());

  IF v_already THEN
    RETURN jsonb_build_object('unlocked', true, 'consumed', false, 'remaining', v_profile.hint_credits, 'is_pro', v_pro);
  END IF;

  IF NOT v_pro THEN
    IF v_profile.hint_credits < 1 THEN RAISE EXCEPTION 'NO_HINT_CREDITS'; END IF;
    UPDATE public.profiles
      SET hint_credits = hint_credits - 1,
          total_hints_used = total_hints_used + 1,
          updated_at = now()
      WHERE id = v_user
      RETURNING * INTO v_profile;
  END IF;

  INSERT INTO public.hint_unlocks (user_id, lesson_id, hint_index)
  VALUES (v_user, p_lesson_id, p_hint_index)
  ON CONFLICT (user_id, lesson_id, hint_index) DO NOTHING;

  RETURN jsonb_build_object('unlocked', true, 'consumed', NOT v_pro, 'remaining', v_profile.hint_credits, 'is_pro', v_pro);
END;
$$;
REVOKE ALL ON FUNCTION public.unlock_lesson_hint(text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.unlock_lesson_hint(text, integer) TO authenticated;

CREATE OR REPLACE FUNCTION public.fulfill_paytr_order(
  p_merchant_oid text,
  p_status text,
  p_total_amount integer,
  p_failure_code text DEFAULT NULL,
  p_failure_message text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order public.payment_orders%ROWTYPE;
  v_before integer;
  v_after integer;
BEGIN
  SELECT * INTO v_order FROM public.payment_orders
  WHERE merchant_oid = p_merchant_oid FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'ORDER_NOT_FOUND'; END IF;

  IF v_order.status <> 'pending' THEN
    RETURN jsonb_build_object('processed', false, 'status', v_order.status);
  END IF;

  IF p_status <> 'success' THEN
    UPDATE public.payment_orders
      SET status = 'failed', provider_total_amount = p_total_amount,
          failure_code = left(p_failure_code, 100), failure_message = left(p_failure_message, 500), updated_at = now()
      WHERE id = v_order.id;
    RETURN jsonb_build_object('processed', true, 'status', 'failed');
  END IF;

  IF p_total_amount < v_order.amount_kurus THEN RAISE EXCEPTION 'AMOUNT_MISMATCH'; END IF;

  IF v_order.product_type = 'energy' THEN
    SELECT energy INTO v_before FROM public.profiles WHERE id = v_order.user_id FOR UPDATE;
    UPDATE public.profiles
      SET energy = energy + v_order.quantity,
          total_energy_gained = total_energy_gained + v_order.quantity,
          updated_at = now()
      WHERE id = v_order.user_id RETURNING energy INTO v_after;
    PERFORM public.energy_log(v_order.user_id, 'purchase', v_order.quantity, v_before, v_after,
      jsonb_build_object('merchant_oid', v_order.merchant_oid, 'product_id', v_order.product_id));
  ELSE
    UPDATE public.profiles
      SET hint_credits = hint_credits + v_order.quantity,
          updated_at = now()
      WHERE id = v_order.user_id;
  END IF;

  UPDATE public.payment_orders
    SET status = 'paid', provider_total_amount = p_total_amount, fulfilled_at = now(), updated_at = now()
    WHERE id = v_order.id;

  RETURN jsonb_build_object('processed', true, 'status', 'paid', 'product_type', v_order.product_type, 'quantity', v_order.quantity);
END;
$$;
REVOKE ALL ON FUNCTION public.fulfill_paytr_order(text, text, integer, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.fulfill_paytr_order(text, text, integer, text, text) TO service_role;