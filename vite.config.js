import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for the WhatsApp AI Chatbot dashboard
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
});
