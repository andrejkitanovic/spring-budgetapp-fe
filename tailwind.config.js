/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}", "./public/index.html"],
  theme: {},
  variants: {
    extend: {},
  },
  // plugins: [require('@tailwindcss/forms')],
};
