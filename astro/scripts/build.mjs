import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const budgetMs = Number(process.env.ASTRO_BUILD_BUDGET_MS ?? 60000);
const startedAt = performance.now();
const astroRoot = fileURLToPath(new URL("..", import.meta.url));
const output = path.resolve(astroRoot, "../_site-astro");
const devIndex = path.resolve(astroRoot, "../docs/static/pagefind");

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });

    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`${command} terminated by ${signal}.`));
        return;
      }
      code === 0
        ? resolve()
        : reject(new Error(`${command} exited with code ${code ?? 1}.`));
    });
  });

try {
  await run("astro", ["build"]);
  await run("pagefind", ["--site", output]);

  fs.rmSync(devIndex, { force: true, recursive: true });
  fs.cpSync(path.join(output, "pagefind"), devIndex, { recursive: true });

  const elapsedMs = Math.round(performance.now() - startedAt);
  console.log(
    `Astro + Pagefind build elapsed: ${(elapsedMs / 1000).toFixed(2)}s`,
  );
  if (elapsedMs > budgetMs) {
    throw new Error(
      `Astro + Pagefind build exceeded ${Math.round(budgetMs / 1000)}s budget by ${(
        (elapsedMs - budgetMs) /
        1000
      ).toFixed(2)}s.`,
    );
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
