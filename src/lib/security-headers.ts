// Katı CORS beyaz listesi + oturum çerezi bayrakları.
// Origin yansıtma (dynamic origin reflection) kesinlikle yapılmaz:
// yalnızca aşağıdaki listede birebir eşleşen origin'lere izin verilir.

const ALLOWED_ORIGINS = new Set([
  "https://code-quest.io",
  "https://www.code-quest.io",
]);

// Geliştirme/önizleme ortamı: sadece localhost.
const LOCALHOST_ORIGIN = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const IS_DEV = process.env["NODE_ENV"] !== "production";

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  return IS_DEV && LOCALHOST_ORIGIN.test(origin);
}

const CORS_METHODS = "GET, POST, PUT, PATCH, DELETE, OPTIONS";
const CORS_HEADERS = "Content-Type, Authorization, X-Requested-With, Accept, Origin";

/**
 * Cross-origin isteklerde CORS başlıklarını normalize eder.
 * - İzinli origin: tam olarak o origin döner (wildcard yok), credentials açık.
 * - İzinsiz/bilinmeyen origin: tüm Access-Control-* başlıkları silinir,
 *   böylece tarayıcı isteği CORS hatasıyla reddeder.
 */
export function applyCorsPolicy(request: Request, response: Response): Response {
  const origin = request.headers.get("origin");
  if (!origin) return response;

  const headers = new Headers(response.headers);
  // Aşağı katmanların eklemiş olabileceği her şeyi temizle (yansıtma yasağı).
  headers.delete("access-control-allow-origin");
  headers.delete("access-control-allow-credentials");
  headers.delete("access-control-allow-methods");
  headers.delete("access-control-allow-headers");
  headers.delete("access-control-max-age");
  headers.append("vary", "Origin");

  if (isAllowedOrigin(origin)) {
    headers.set("access-control-allow-origin", origin);
    headers.set("access-control-allow-credentials", "true");
    headers.set("access-control-allow-methods", CORS_METHODS);
    headers.set("access-control-allow-headers", CORS_HEADERS);
    headers.set("access-control-max-age", "86400");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/** Preflight: izinsiz origin'ler için başlıksız 403, izinli olanlar için 204. */
export function handlePreflight(request: Request): Response | undefined {
  if (request.method !== "OPTIONS") return undefined;
  const origin = request.headers.get("origin");
  if (!origin) return undefined;
  if (!isAllowedOrigin(origin)) {
    return new Response(null, { status: 403, headers: { vary: "Origin" } });
  }
  return applyCorsPolicy(request, new Response(null, { status: 204 }));
}

/** Tüm sunucu çerezlerine HttpOnly, Secure, SameSite=Lax, Path=/ zorunlu kıl. */
export function hardenCookies(response: Response): Response {
  const cookies = response.headers.getSetCookie?.() ?? [];
  if (cookies.length === 0) return response;

  const headers = new Headers(response.headers);
  headers.delete("set-cookie");
  for (const cookie of cookies) {
    headers.append("set-cookie", hardenCookie(cookie));
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function hardenCookie(cookie: string): string {
  const parts = cookie.split(";").map((part) => part.trim()).filter(Boolean);
  const [pair, ...attrs] = parts;
  const kept = attrs.filter((attr) => {
    const name = attr.split("=")[0]!.toLowerCase();
    return name !== "httponly" && name !== "secure" && name !== "samesite" && name !== "path";
  });
  return [pair, ...kept, "Path=/", "HttpOnly", "Secure", "SameSite=Lax"].join("; ");
}
