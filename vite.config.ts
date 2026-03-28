import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env.REACT_APP_WEATHER_API_URL': JSON.stringify(
        env.VITE_WEATHER_API_URL || env.REACT_APP_WEATHER_API_URL || ''
      ),
      'process.env.REACT_APP_EXPOSE_PORT': JSON.stringify(
        env.VITE_EXPOSE_PORT || env.REACT_APP_EXPOSE_PORT || '4040'
      ),
    },
    server: {
      port: Number(env.VITE_DEV_PORT || 3000),
    },
  };
});
