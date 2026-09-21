import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}', './src/app/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#181817', paper: '#f7f6f2', bone: '#e8e6df', moss: '#66715c' }, fontFamily: { display: ['Georgia', 'serif'], sans: ['Arial', 'sans-serif'] } } }, plugins: [] };
export default config;
