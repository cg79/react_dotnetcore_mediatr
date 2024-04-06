import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    // Configure browsers
    // Example: browserName: 'firefox' | 'chromium' | 'webkit',
    browserName: "chromium",

    // Configure headless mode
    // Example: headless: false,
    headless: true,

    // Additional browser options
    // Example: viewport: { width: 1920, height: 1080 },
  },
};

export default config;
