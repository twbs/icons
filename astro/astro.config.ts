import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import type { AstroIntegration } from "astro";

const astroRoot = fileURLToPath(new URL(".", import.meta.url));
const pagefindOutput = path.resolve(astroRoot, "../_site-astro/pagefind");
const pagefindPublic = path.resolve(astroRoot, "../docs/static/pagefind");

// Match the Bootstrap docs and blog development setup: serve the index from
// the latest production build without making Astro index thousands of pages
// on every dev-server start.
function pagefindDev(): AstroIntegration {
  return {
    name: "pagefind-dev",
    hooks: {
      "astro:config:setup": ({ command }) => {
        if (command !== "dev") return;

        fs.rmSync(pagefindPublic, { force: true, recursive: true });
        if (fs.existsSync(pagefindOutput)) {
          fs.cpSync(pagefindOutput, pagefindPublic, { recursive: true });
        }
      },
    },
  };
}

export default defineConfig({
  output: "static",
  site: "https://icons.getbootstrap.com",
  outDir: "../_site-astro",
  publicDir: "../docs/static",
  integrations: [pagefindDev()],
  build: {
    format: "directory",
  },
  vite: {
    optimizeDeps: {
      exclude: ["@twbs/docs-ui"],
    },
    resolve: {
      dedupe: ["bootstrap"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ["node_modules"],
        },
      },
    },
  },
});
