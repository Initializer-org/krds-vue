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
    copyPublicDir: true, // public 디렉토리를 dist로 복사
    rollupOptions: {
      // 외부화할 dependencies
      external: ['vue'],
      output: {
        exports: 'named',
        // 외부화된 dependencies를 위한 global 변수
        globals: {
          vue: 'Vue'
        },
        // CSS를 별도 파일로 추출
        assetFileNames: assetInfo => {
          if (assetInfo.names && assetInfo.names[0] === 'style.css') return 'style.css'
          return (assetInfo.names && assetInfo.names[0]) || 'assets/[name]-[hash][extname]'
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: 'esbuild'
  }
})
