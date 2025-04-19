import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Генерация самоподписанного сертификата (если нет существующего)
const certPath = path.resolve(__dirname, 'cert.pem')
const keyPath = path.resolve(__dirname, 'key.pem')

let httpsConfig = {}

if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  httpsConfig = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath)
  }
} else {
  console.warn('Самоподписанные сертификаты не найдены, будет использован автоматически сгенерированный HTTPS')
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Доступ в локальной сети
    port: 5173,      // Фиксированный порт
    strictPort: true, // Не менять порт при занятости
    //https: httpsConfig, // HTTPS конфигурация
    open: true,      // Автоматически открывать браузер
    proxy: {         // Пример прокси для API
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  preview: {
    port: 4173,
    //https: httpsConfig // HTTPS для preview режима
  }
})