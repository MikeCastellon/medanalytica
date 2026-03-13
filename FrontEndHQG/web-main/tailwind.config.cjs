/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "var(--charcoal)",
        "primary-grey": "var(--primary-grey)",
        "font-grey": "var(--font-grey)",
        "desaturated-grey": "var(--desaturated-grey)",
        "light-grey": "var(--light-grey)",

        "primary-red": "var(--primary-red)",
        "secondary-red": "var(--secondary-red)",
        "desaturated-red": "var(--desaturated-red)",

        "primary-green": "var(--primary-green)",
        "secondary-green": "var(--secondary-green)",
        "desaturated-green": "var(--desaturated-green)",

        "primary-yellow": "var(--primary-yellow)",
        "desaturated-yellow": "var(--desaturated-yellow)",

        "primary-blue": "var(--primary-blue)",
        "secondary-blue": "var(--secondary-blue)",
        "desaturated-blue": "var(--desaturated-blue)",

        "primary-purple": "var(--primary-purple)",
      },
      fontSize: {
      // sm: ['14px', '20px'],
      base: ['18px', '28px'],
      // lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      '2xl': ['28px', '36px'],
    }
    },
    fontFamily: {
      sans: ['lato']
    },
    
  },
  plugins: [],
}
