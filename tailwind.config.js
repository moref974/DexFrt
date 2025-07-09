/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        floatWave: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        float:{
          '0%, 100%':{transform: 'translateY(0px)'},
          '50%':{transform: 'translateY(-10px)'}
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }, 
      },
      animation:{
        float:'float 6s ease-in-out infinite',
        slowSpin: 'rotate 30s linear infinite',
        wave: "floatWave 4s ease-in-out infinite",
      }
    },
  },
  plugins: [],
}
