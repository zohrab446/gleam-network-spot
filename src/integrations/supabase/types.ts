export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      energy_transactions: {
        Row: {
          after_energy: number
          amount: number
          before_energy: number
          created_at: string
          id: string
          meta: Json
          type: string
          user_id: string
        }
        Insert: {
          after_energy: number
          amount: number
          before_energy: number
          created_at?: string
          id?: string
          meta?: Json
          type: string
          user_id: string
        }
        Update: {
          after_energy?: number
          amount?: number
          before_energy?: number
          created_at?: string
          id?: string
          meta?: Json
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      hint_unlocks: {
        Row: {
          created_at: string
          hint_index: number
          id: string
          lesson_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hint_index: number
          id?: string
          lesson_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          hint_index?: number
          id?: string
          lesson_id?: string
          user_id?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          code: string | null
          coins_earned: number
          completed_at: string
          duration_seconds: number | null
          id: string
          language: string
          lesson_id: string
          level: number
          user_id: string
          xp_earned: number
        }
        Insert: {
          code?: string | null
          coins_earned?: number
          completed_at?: string
          duration_seconds?: number | null
          id?: string
          language: string
          lesson_id: string
          level: number
          user_id: string
          xp_earned?: number
        }
        Update: {
          code?: string | null
          coins_earned?: number
          completed_at?: string
          duration_seconds?: number | null
          id?: string
          language?: string
          lesson_id?: string
          level?: number
          user_id?: string
          xp_earned?: number
        }
        Relationships: []
      }
      payment_orders: {
        Row: {
          amount_kurus: number
          created_at: string
          failure_code: string | null
          failure_message: string | null
          fulfilled_at: string | null
          id: string
          merchant_oid: string
          product_id: string
          product_type: string
          provider: string
          provider_total_amount: number | null
          quantity: number
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_kurus: number
          created_at?: string
          failure_code?: string | null
          failure_message?: string | null
          fulfilled_at?: string | null
          id?: string
          merchant_oid: string
          product_id: string
          product_type: string
          provider?: string
          provider_total_amount?: number | null
          quantity: number
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_kurus?: number
          created_at?: string
          failure_code?: string | null
          failure_message?: string | null
          fulfilled_at?: string | null
          id?: string
          merchant_oid?: string
          product_id?: string
          product_type?: string
          provider?: string
          provider_total_amount?: number | null
          quantity?: number
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ads_day: string | null
          ads_watched_today: number
          avatar_color: string
          avatar_shape: string
          coins: number
          completed_referrals: number
          created_at: string
          daily_login_streak: number
          email: string | null
          energy: number
          energy_badges_claimed: string[]
          energy_day: string
          energy_updated_at: string
          favorite_language: string | null
          hint_credits: number
          id: string
          is_pro: boolean
          language: string
          last_active_date: string | null
          last_ad_at: string | null
          last_login_at: string
          last_login_reward_date: string | null
          last_spin_at: string | null
          level: number
          longest_streak: number
          max_energy: number
          milestones_claimed: string[]
          onboarded: boolean
          pro_expires_at: string | null
          pro_plan: string | null
          pro_started_at: string | null
          pro_trial_used: boolean
          referral_code: string | null
          referral_energy_earned: number
          referral_rewarded: boolean
          referred_by: string | null
          sound_enabled: boolean
          streak: number
          theme: string
          total_energy_gained: number
          total_energy_spent: number
          total_hints_used: number
          updated_at: string
          username: string | null
          week_start: string
          weekly_xp: number
          xp: number
        }
        Insert: {
          ads_day?: string | null
          ads_watched_today?: number
          avatar_color?: string
          avatar_shape?: string
          coins?: number
          completed_referrals?: number
          created_at?: string
          daily_login_streak?: number
          email?: string | null
          energy?: number
          energy_badges_claimed?: string[]
          energy_day?: string
          energy_updated_at?: string
          favorite_language?: string | null
          hint_credits?: number
          id: string
          is_pro?: boolean
          language?: string
          last_active_date?: string | null
          last_ad_at?: string | null
          last_login_at?: string
          last_login_reward_date?: string | null
          last_spin_at?: string | null
          level?: number
          longest_streak?: number
          max_energy?: number
          milestones_claimed?: string[]
          onboarded?: boolean
          pro_expires_at?: string | null
          pro_plan?: string | null
          pro_started_at?: string | null
          pro_trial_used?: boolean
          referral_code?: string | null
          referral_energy_earned?: number
          referral_rewarded?: boolean
          referred_by?: string | null
          sound_enabled?: boolean
          streak?: number
          theme?: string
          total_energy_gained?: number
          total_energy_spent?: number
          total_hints_used?: number
          updated_at?: string
          username?: string | null
          week_start?: string
          weekly_xp?: number
          xp?: number
        }
        Update: {
          ads_day?: string | null
          ads_watched_today?: number
          avatar_color?: string
          avatar_shape?: string
          coins?: number
          completed_referrals?: number
          created_at?: string
          daily_login_streak?: number
          email?: string | null
          energy?: number
          energy_badges_claimed?: string[]
          energy_day?: string
          energy_updated_at?: string
          favorite_language?: string | null
          hint_credits?: number
          id?: string
          is_pro?: boolean
          language?: string
          last_active_date?: string | null
          last_ad_at?: string | null
          last_login_at?: string
          last_login_reward_date?: string | null
          last_spin_at?: string | null
          level?: number
          longest_streak?: number
          max_energy?: number
          milestones_claimed?: string[]
          onboarded?: boolean
          pro_expires_at?: string | null
          pro_plan?: string | null
          pro_started_at?: string | null
          pro_trial_used?: boolean
          referral_code?: string | null
          referral_energy_earned?: number
          referral_rewarded?: boolean
          referred_by?: string | null
          sound_enabled?: boolean
          streak?: number
          theme?: string
          total_energy_gained?: number
          total_energy_spent?: number
          total_hints_used?: number
          updated_at?: string
          username?: string | null
          week_start?: string
          weekly_xp?: number
          xp?: number
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      energy_claim_badge:
        | { Args: { p_badge_id: string }; Returns: Json }
        | { Args: { p_badge_id: string; p_user: string }; Returns: Json }
      energy_claim_daily_login:
        | { Args: never; Returns: Json }
        | { Args: { p_user: string }; Returns: Json }
      energy_claim_milestone:
        | { Args: { p_id: string }; Returns: Json }
        | { Args: { p_id: string; p_user: string }; Returns: Json }
      energy_grant: {
        Args: {
          p_amount: number
          p_meta?: Json
          p_type: string
          p_user: string
        }
        Returns: number
      }
      energy_log: {
        Args: {
          p_after: number
          p_amount: number
          p_before: number
          p_meta: Json
          p_type: string
          p_user: string
        }
        Returns: undefined
      }
      energy_spend:
        | {
            Args: { p_amount: number; p_meta?: Json; p_reason: string }
            Returns: {
              ads_day: string | null
              ads_watched_today: number
              avatar_color: string
              avatar_shape: string
              coins: number
              completed_referrals: number
              created_at: string
              daily_login_streak: number
              email: string | null
              energy: number
              energy_badges_claimed: string[]
              energy_day: string
              energy_updated_at: string
              favorite_language: string | null
              hint_credits: number
              id: string
              is_pro: boolean
              language: string
              last_active_date: string | null
              last_ad_at: string | null
              last_login_at: string
              last_login_reward_date: string | null
              last_spin_at: string | null
              level: number
              longest_streak: number
              max_energy: number
              milestones_claimed: string[]
              onboarded: boolean
              pro_expires_at: string | null
              pro_plan: string | null
              pro_started_at: string | null
              pro_trial_used: boolean
              referral_code: string | null
              referral_energy_earned: number
              referral_rewarded: boolean
              referred_by: string | null
              sound_enabled: boolean
              streak: number
              theme: string
              total_energy_gained: number
              total_energy_spent: number
              total_hints_used: number
              updated_at: string
              username: string | null
              week_start: string
              weekly_xp: number
              xp: number
            }
            SetofOptions: {
              from: "*"
              to: "profiles"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: {
              p_amount: number
              p_meta?: Json
              p_reason: string
              p_user: string
            }
            Returns: {
              ads_day: string | null
              ads_watched_today: number
              avatar_color: string
              avatar_shape: string
              coins: number
              completed_referrals: number
              created_at: string
              daily_login_streak: number
              email: string | null
              energy: number
              energy_badges_claimed: string[]
              energy_day: string
              energy_updated_at: string
              favorite_language: string | null
              hint_credits: number
              id: string
              is_pro: boolean
              language: string
              last_active_date: string | null
              last_ad_at: string | null
              last_login_at: string
              last_login_reward_date: string | null
              last_spin_at: string | null
              level: number
              longest_streak: number
              max_energy: number
              milestones_claimed: string[]
              onboarded: boolean
              pro_expires_at: string | null
              pro_plan: string | null
              pro_started_at: string | null
              pro_trial_used: boolean
              referral_code: string | null
              referral_energy_earned: number
              referral_rewarded: boolean
              referred_by: string | null
              sound_enabled: boolean
              streak: number
              theme: string
              total_energy_gained: number
              total_energy_spent: number
              total_hints_used: number
              updated_at: string
              username: string | null
              week_start: string
              weekly_xp: number
              xp: number
            }
            SetofOptions: {
              from: "*"
              to: "profiles"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      energy_spin:
        | { Args: never; Returns: Json }
        | { Args: { p_user: string }; Returns: Json }
      energy_sync:
        | {
            Args: never
            Returns: {
              ads_day: string | null
              ads_watched_today: number
              avatar_color: string
              avatar_shape: string
              coins: number
              completed_referrals: number
              created_at: string
              daily_login_streak: number
              email: string | null
              energy: number
              energy_badges_claimed: string[]
              energy_day: string
              energy_updated_at: string
              favorite_language: string | null
              hint_credits: number
              id: string
              is_pro: boolean
              language: string
              last_active_date: string | null
              last_ad_at: string | null
              last_login_at: string
              last_login_reward_date: string | null
              last_spin_at: string | null
              level: number
              longest_streak: number
              max_energy: number
              milestones_claimed: string[]
              onboarded: boolean
              pro_expires_at: string | null
              pro_plan: string | null
              pro_started_at: string | null
              pro_trial_used: boolean
              referral_code: string | null
              referral_energy_earned: number
              referral_rewarded: boolean
              referred_by: string | null
              sound_enabled: boolean
              streak: number
              theme: string
              total_energy_gained: number
              total_energy_spent: number
              total_hints_used: number
              updated_at: string
              username: string | null
              week_start: string
              weekly_xp: number
              xp: number
            }
            SetofOptions: {
              from: "*"
              to: "profiles"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { p_user: string }
            Returns: {
              ads_day: string | null
              ads_watched_today: number
              avatar_color: string
              avatar_shape: string
              coins: number
              completed_referrals: number
              created_at: string
              daily_login_streak: number
              email: string | null
              energy: number
              energy_badges_claimed: string[]
              energy_day: string
              energy_updated_at: string
              favorite_language: string | null
              hint_credits: number
              id: string
              is_pro: boolean
              language: string
              last_active_date: string | null
              last_ad_at: string | null
              last_login_at: string
              last_login_reward_date: string | null
              last_spin_at: string | null
              level: number
              longest_streak: number
              max_energy: number
              milestones_claimed: string[]
              onboarded: boolean
              pro_expires_at: string | null
              pro_plan: string | null
              pro_started_at: string | null
              pro_trial_used: boolean
              referral_code: string | null
              referral_energy_earned: number
              referral_rewarded: boolean
              referred_by: string | null
              sound_enabled: boolean
              streak: number
              theme: string
              total_energy_gained: number
              total_energy_spent: number
              total_hints_used: number
              updated_at: string
              username: string | null
              week_start: string
              weekly_xp: number
              xp: number
            }
            SetofOptions: {
              from: "*"
              to: "profiles"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      energy_watch_ad:
        | { Args: never; Returns: Json }
        | { Args: { p_user: string }; Returns: Json }
      fulfill_paytr_order: {
        Args: {
          p_failure_code?: string
          p_failure_message?: string
          p_merchant_oid: string
          p_status: string
          p_total_amount: number
        }
        Returns: Json
      }
      gen_referral_code: { Args: never; Returns: string }
      get_leaderboard: {
        Args: { p_limit?: number; p_scope?: string }
        Returns: {
          avatar_color: string
          avatar_shape: string
          coins: number
          is_pro: boolean
          level: number
          longest_streak: number
          rank_position: number
          streak: number
          user_id: string
          username: string
          weekly_xp: number
          xp: number
        }[]
      }
      pro_start_trial:
        | {
            Args: never
            Returns: {
              ads_day: string | null
              ads_watched_today: number
              avatar_color: string
              avatar_shape: string
              coins: number
              completed_referrals: number
              created_at: string
              daily_login_streak: number
              email: string | null
              energy: number
              energy_badges_claimed: string[]
              energy_day: string
              energy_updated_at: string
              favorite_language: string | null
              hint_credits: number
              id: string
              is_pro: boolean
              language: string
              last_active_date: string | null
              last_ad_at: string | null
              last_login_at: string
              last_login_reward_date: string | null
              last_spin_at: string | null
              level: number
              longest_streak: number
              max_energy: number
              milestones_claimed: string[]
              onboarded: boolean
              pro_expires_at: string | null
              pro_plan: string | null
              pro_started_at: string | null
              pro_trial_used: boolean
              referral_code: string | null
              referral_energy_earned: number
              referral_rewarded: boolean
              referred_by: string | null
              sound_enabled: boolean
              streak: number
              theme: string
              total_energy_gained: number
              total_energy_spent: number
              total_hints_used: number
              updated_at: string
              username: string | null
              week_start: string
              weekly_xp: number
              xp: number
            }
            SetofOptions: {
              from: "*"
              to: "profiles"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { p_user: string }
            Returns: {
              ads_day: string | null
              ads_watched_today: number
              avatar_color: string
              avatar_shape: string
              coins: number
              completed_referrals: number
              created_at: string
              daily_login_streak: number
              email: string | null
              energy: number
              energy_badges_claimed: string[]
              energy_day: string
              energy_updated_at: string
              favorite_language: string | null
              hint_credits: number
              id: string
              is_pro: boolean
              language: string
              last_active_date: string | null
              last_ad_at: string | null
              last_login_at: string
              last_login_reward_date: string | null
              last_spin_at: string | null
              level: number
              longest_streak: number
              max_energy: number
              milestones_claimed: string[]
              onboarded: boolean
              pro_expires_at: string | null
              pro_plan: string | null
              pro_started_at: string | null
              pro_trial_used: boolean
              referral_code: string | null
              referral_energy_earned: number
              referral_rewarded: boolean
              referred_by: string | null
              sound_enabled: boolean
              streak: number
              theme: string
              total_energy_gained: number
              total_energy_spent: number
              total_hints_used: number
              updated_at: string
              username: string | null
              week_start: string
              weekly_xp: number
              xp: number
            }
            SetofOptions: {
              from: "*"
              to: "profiles"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      referral_apply:
        | { Args: { p_code: string }; Returns: Json }
        | { Args: { p_code: string; p_user: string }; Returns: Json }
      referral_check:
        | { Args: never; Returns: Json }
        | { Args: { p_user: string }; Returns: Json }
      unlock_lesson_hint:
        | { Args: { p_hint_index: number; p_lesson_id: string }; Returns: Json }
        | {
            Args: { p_hint_index: number; p_lesson_id: string; p_user: string }
            Returns: Json
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
