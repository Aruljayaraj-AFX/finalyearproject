/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sulphur: ["'Sulphur Point'", "serif"],
        italiana: ["Italiana", "serif"],
        metal: ["'Metal Mania'", "cursive"], // <-- added here
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"), // example plugin (replace with actual if needed)
  ],
};
