import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        includeAssets: ["logo.svg", "meta-tags.png"],
        injectRegister: "auto",
        registerType: "autoUpdate",
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ["**/*.{svg,html,css,js,gif,png,txt}"],
        },
        manifest: {
          short_name: "SDS Chat",
          name: "SDS Chat",
          lang: "fr-FR",
          icons: [
            {
              src: "logo192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "logo192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "logo512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "logo512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "logo512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "monochrome",
            },
          ],
          categories: ["network", "Chat"],
          id: "/",
          start_url: "/",
          display: "standalone",
          theme_color: "#ffffff",
          description: "SDS Chat : Réseaux Chat de SDS ",
          background_color: "#ffffff",
          scope: "/",
          display_override: ["window-controls-overlay"],
          shortcuts: [
            {
              name: "SDS Chat",
              url: "/",
              short_name: "SDS Chat",
              description: "SDS Chat : Réseaux Chat de SDS ",
              icons: [
                {
                  src: "logo192.png",
                  sizes: "192x192",
                },
              ],
            },
          ],
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: process.env.VITE_SERVER_URL,
          changeOrigin: true,
        },
        "/socket.io": {
          target: process.env.VITE_SOCKET_URL,
          ws: true,
          // changeOrigin: true,
        },
      },
    },
  });
};
