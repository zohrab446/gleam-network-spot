DROP POLICY IF EXISTS "Users can create their own pending payment orders" ON public.payment_orders;
REVOKE INSERT ON public.payment_orders FROM authenticated;

CREATE OR REPLACE FUNCTION public.fulfill_paytr_order(p_merchant_oid text, p_status text, p_total_amount integer, p_failure_code text DEFAULT NULL, p_failure_message text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_order public.payment_orders%ROWTYPE;
  v_before integer;
  v_after integer;
  v_base timestamptz;
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
  ELSIF v_order.product_type = 'hints' THEN
    UPDATE public.profiles
      SET hint_credits = hint_credits + v_order.quantity, updated_at = now()
      WHERE id = v_order.user_id;
  ELSIF v_order.product_type = 'pro' AND v_order.quantity IN (30, 90, 365) THEN
    SELECT greatest(now(), coalesce(pro_expires_at, now())) INTO v_base
      FROM public.profiles WHERE id = v_order.user_id FOR UPDATE;
    UPDATE public.profiles
      SET is_pro = true,
          pro_plan = CASE v_order.quantity WHEN 30 THEN 'monthly' WHEN 90 THEN 'quarterly' ELSE 'yearly' END,
          pro_started_at = coalesce(pro_started_at, now()),
          pro_expires_at = v_base + make_interval(days => v_order.quantity),
          updated_at = now()
      WHERE id = v_order.user_id;
  ELSE
    RAISE EXCEPTION 'INVALID_PRODUCT_TYPE';
  END IF;

  UPDATE public.payment_orders
    SET status = 'paid', provider_total_amount = p_total_amount, fulfilled_at = now(), updated_at = now()
    WHERE id = v_order.id;

  RETURN jsonb_build_object('processed', true, 'status', 'paid', 'product_type', v_order.product_type, 'quantity', v_order.quantity);
END;
$$;
REVOKE ALL ON FUNCTION public.fulfill_paytr_order(text, text, integer, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.fulfill_paytr_order(text, text, integer, text, text) TO service_role;