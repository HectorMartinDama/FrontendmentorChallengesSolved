import { defineConfig } from 'vitest/dist/config';


export default defineConfig({ 
    test: {
        includeSource: ['src/**/*.{js,ts}'],
        globals: true,
        environment: 'jsdom',
    }
});