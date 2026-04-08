/** @type {import('prettier').Options} */
export default {
  singleQuote: true,
  semi: false,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
  tailwindStylesheet: './src/styles/tailwind.css',
}
