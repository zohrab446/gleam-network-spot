export type TurnstileResult = { success?: boolean; action?: string; hostname?: string };

export function acceptsTurnstile(result: TurnstileResult, action: string, hostname: string): boolean {
  return result.success === true && result.action === action && result.hostname === hostname;
}