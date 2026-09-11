import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/test-endpoint")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(
          JSON.stringify({
            status: "ok",
            service: "CodeQuest",
            timestamp: new Date().toISOString(),
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      },
    },
  },
});
