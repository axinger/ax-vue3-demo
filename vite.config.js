import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import AutoImport from 'unplugin-auto-import/vite' // 自动导入 ref等



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
    }),
  ],
  resolve: {
    // Vite路径别名配置
    alias: {
      '@': path.resolve('./src')
    }
  }
})
