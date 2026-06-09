import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { readFileSync } from 'node:fs'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

const packageJson = JSON.parse(readFileSync(resolve(__dirname, 'package.json'), 'utf-8')) as { version: string }

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
      cleanVueFileName: true,
      rollupTypes: true
    })
  ],
  define: {
    __KRDS_VERSION__: JSON.stringify(packageJson.version),
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development')
  },
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
      formats: ['es'],
      fileName: format => `krds-vue.${format}.js`
    },
    copyPublicDir: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
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
}))
