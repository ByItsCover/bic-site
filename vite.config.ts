import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),]
// });

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      __API_URL__: JSON.stringify(env.VITE_ENVIRONMENT_2)
    },
    plugins: [react(),]
  }
});
