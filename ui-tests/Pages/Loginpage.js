import { LoginLocators } from "../Locators/LoginLocators.js";
import { getExcelData } from "../utils/excelUtils.js";

export class Login {
    constructor(page) {
        this.page = page;
        this.LoginData = getExcelData('./data/Login.xlsx', 'LoginDetails')[0];
    }
    async navigate() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/');
    }




    async loginValid() {
        const {
            UsernameDetails,
            PasswordDetails,
        } = this.LoginData;

        await this.page.locator(LoginLocators.Username).fill(UsernameDetails.toString());
        await this.page.locator(LoginLocators.Password).fill(PasswordDetails.toString());
        await this.page.locator(LoginLocators.LoginButton).click();


        this.errorMessage = this.page.locator('.oxd-alert-content-text');
        this.dashboardHeader = this.page.locator('h6');



    }
    async Logout() {
        await this.page.locator(LoginLocators.LogoutDropdown).click();
        await this.page.locator(LoginLocators.Logout).click();



    }

    async loginInvalid() {
        const {
            UsernameDetails,
            WrongpasswordDetails,

        } = this.LoginData;

        await this.page.locator(LoginLocators.Username).fill(UsernameDetails.toString());
        await this.page.locator(LoginLocators.Password).fill(WrongpasswordDetails.toString());
        await this.page.locator(LoginLocators.LoginButton).click();

        this.errorMessage = this.page.locator('.oxd-alert-content-text');
        this.dashboardHeader = this.page.locator('h6');



    }

    async loginEmpty() {
        const {
            UsernameDetailsEmpty,
            PasswordDetails,
        } = this.LoginData;

        await this.page.locator(LoginLocators.Username).fill('');
        await this.page.locator(LoginLocators.Password).fill(PasswordDetails.toString());
        await this.page.locator(LoginLocators.LoginButton).click();





    }

}
