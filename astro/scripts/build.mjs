import { spawn } from 'node:child_process'

const budgetMs = Number(process.env.ASTRO_BUILD_BUDGET_MS ?? 60000)
const startedAt = performance.now()
const child = spawn('astro', ['build'], { stdio: 'inherit' })

child.on('error', (error) => {
  console.error(error)
  process.exit(1)
})

child.on('exit', (code, signal) => {
  const elapsedMs = Math.round(performance.now() - startedAt)
  console.log(`Astro build elapsed: ${(elapsedMs / 1000).toFixed(2)}s`)

  if (signal) {
    console.error(`Astro build terminated by ${signal}.`)
    process.exit(1)
  }

  if (code !== 0) process.exit(code ?? 1)

  if (elapsedMs > budgetMs) {
    console.error(
      `Astro build exceeded ${Math.round(budgetMs / 1000)}s budget by ${(
        (elapsedMs - budgetMs) /
        1000
      ).toFixed(2)}s.`
    )
    process.exit(1)
  }
})
