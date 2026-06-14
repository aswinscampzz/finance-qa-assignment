import { test, expect, chromium } from '@playwright/test';
import { Login } from '../Pages/Loginpage.js';

let browser, context, page, loginPage;

test.describe('OrangeHRM Login Tests', () => {

    test.setTimeout(150000);

    test.beforeAll(async () => {

        browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            args: [
                '--start-maximized',
                '--disable-features=DownloadBubble',
                '--disable-popup-blocking',
                '--no-default-browser-check',
                '--disable-search-engine-choice-screen',
            ],
        });

        context = await browser.newContext({
            viewport: null,
            acceptDownloads: true,
        });

        page = await context.newPage();

        
        loginPage = new Login(page);

    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('TC001 - Valid Login', async () => {

        await loginPage.navigate();

        await loginPage.loginValid();

        
        await expect(page).toHaveURL(/dashboard/);

        await expect(loginPage.dashboardHeader)
            .toContainText('Dashboard');

        await loginPage.Logout();

    });

    test('TC003 - Invalid Login', async () => {

        await loginPage.navigate();

        await loginPage.loginInvalid();

        
        await expect(loginPage.errorMessage)
            .toContainText('Invalid credentials');

        

    });

    test('TC004 - Empty Username', async () => {

        await loginPage.navigate();

        await loginPage.loginEmpty();

        await expect(
            page.locator('.oxd-input-field-error-message')
        ).toBeVisible();

        await expect(
            page.locator('.oxd-input-field-error-message')
        ).toHaveText('Required');


    });

});