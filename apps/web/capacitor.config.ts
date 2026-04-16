import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "edu.lotusvalley.school",
  appName: "Lotus Valley School",
  webDir: "public",
  server: {
    url: "http://10.0.2.2:3000",
    cleartext: true,
    androidScheme: "http"
  }
};

export default config;
