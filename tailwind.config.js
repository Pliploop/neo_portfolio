/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

      
    
    extend: {fontFamily :{
      poppins:["poppins"],
      
      mowera: ["mowera"],
      saint: ["saint"],
      grande: ["grande"],
      gothic: ["gothic"],
      poker: ["poker"],
      swomun: ["swomun"],
      zighead: ["zighead"],
      sans: ['helvetica']
    }},
  },
  plugins: [require('tailwind-scrollbar')],
}