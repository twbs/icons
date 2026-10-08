import type { APIRoute } from "astro";
import { getCatalogIndex } from "../../lib/icons";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(getCatalogIndex()), {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/json; charset=utf-8",
    },
  });
