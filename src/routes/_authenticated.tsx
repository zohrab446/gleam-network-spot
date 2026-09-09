import { useEffect } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/auth", replace: true });
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary-soft border-t-primary" />
          <p className="text-sm font-semibold text-muted-foreground">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
