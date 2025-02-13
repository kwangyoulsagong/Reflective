import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/features/Post/__test__/e2e",
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone 12"] },
    },
  ],
});
