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
    css: {
      preprocessorOptions: {
        scss: {
          loadPaths: ['node_modules']
        }
      }
    }
  }
})
