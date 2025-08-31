/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            primary: "#FF9472",
            success: "#00B894",
            secondary: "#4ECDC4",
            warning: "#FDCB6E",
            error: "#FF6B6B",
          },
          textc: {
            primary: "#4A5C6A",
            secondary: "#2B2B2B",
          },
          bgc: {
            primary: "#FAFAF5",
            secondary: "#F8F9FA",
          },
          borderc: "#E5E5E5",
        },
      },
    },
    plugins: [],
  }
  