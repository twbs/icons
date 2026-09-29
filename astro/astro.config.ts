import { defineConfig } from 'astro/config'

export default defineConfig({
  output: 'static',
  site: 'https://icons.getbootstrap.com',
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
