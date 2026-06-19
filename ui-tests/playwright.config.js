// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',

  // Global test timeout
  timeout: 40 * 1000,

  // Expect assertion timeout
  expect: {
    timeout: 40 * 1000,
  },

   reporter: [['html', { port: 9400 }]],

   

  use: {

    acceptDownloads: true,
    downloadsPath: "downloads",
     
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [



      {
      name: '1099/W2',
      use: {
        browserName: 'chromium',
        launchOptions: {
          headless: false,
          args: ['--disable-features=DownloadBubble']

        }
      }
    }

     

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  //  webServer: {
  // command: 'npm run start',
  //  url: 'http://localhost:3000',
  // reuseExistingServer: !process.env.CI,
  // },
});

