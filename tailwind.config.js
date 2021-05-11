module.exports = {
  purge: [
    './client/**/*.html',
    './client/**/*.vue',
    './client/**/*.jsx',
    './imports/**/*.vue',
    './node_modules/vue-tailwind-modal/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
