import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  server: {
    port: process.env.PORT || 4173,  // Порт по умолчанию для preview, если не указано в окружении
    host: '0.0.0.0',  // Делаем сервер доступным для внешних подключений
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@config': path.resolve(__dirname, './src/config'),
    },
  },
});
