/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // toggled via ThemeContext
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // WhatsApp-inspired brand palette
        brand: {
          green: "#25D366", // primary accent / CTA
          dark: "#128C7E", // deep teal-green, headers/sidebars
          blue: "#34B7F1", // links, info accents
          bg: "#0B141A", // dark mode base background (WA dark chat bg)
          panel: "#111B21", // dark mode panel background
        },
        surface: {
          light: "#F7F9FA",
          dark: "#0B141A",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(17, 140, 126, 0.08)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.12)",
        glow: "0 0 0 1px rgba(37, 211, 102, 0.15), 0 8px 24px rgba(37, 211, 102, 0.15)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #25D366 0%, #128C7E 60%, #34B7F1 130%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(37,211,102,0.15) 0%, rgba(52,183,241,0.12) 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(6px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        "fade-in": "fade-in 0.35s ease-out",
        "pulse-soft": "pulse-soft 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
