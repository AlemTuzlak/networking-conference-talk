import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from '@/jsx/global'`
  } as any,
  server: { open: true }
})
