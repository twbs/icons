import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'static',
  site: 'https://icons.getbootstrap.com',
  outDir: '../_site-astro',
  publicDir: '../docs/static',
  build: {
    format: 'directory'
  },
  vite: {
    optimizeDeps: {
      exclude: ['@twbs/docs-ui']
    },
    resolve: {
      dedupe: ['bootstrap']
    },
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ['node_modules']
        }
      }
    }
  }
})
