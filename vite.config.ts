import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  paths: {
    base: process.env.NODE_ENV === 'production' ? '/npm-dashboard' : '',
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
