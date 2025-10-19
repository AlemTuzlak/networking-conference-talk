import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  } as any,
  server: { open: true }
})
