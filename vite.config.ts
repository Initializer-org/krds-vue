import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      cleanVueFileName: true,
      rollupTypes: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['import']
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KrdsVue',
      fileName: format => `krds-vue.${format}.js`
    },
    copyPublicDir: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        },
        assetFileNames: assetInfo => {
          if (assetInfo.names && assetInfo.names[0]?.endsWith('.css')) return 'style.css'
          return 'assets/[name]-[hash][extname]'
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: 'esbuild'
  }
})
