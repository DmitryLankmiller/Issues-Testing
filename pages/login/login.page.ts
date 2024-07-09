import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { MainPage } from '../main/main.page';

export class LoginPage extends BasePage {
	private readonly loginField: Locator;
	private readonly passwordField: Locator;
	private readonly signInBtn: Locator;

	constructor(page: Page) {
		super(page);
		this.loginField = page.locator("xpath=.//*[@id='login_field']");
		this.passwordField = page.locator("xpath=.//*[@id='password']");
		this.signInBtn = page.locator("xpath=.//input[@name='commit']");
	}

	public async setLogin(login: string) {
		await this.loginField.fill(login);
		return this;
	}

	public async setPassword(password: string) {
		await this.passwordField.fill(password);
		return this;
	}

	public async clickLogInBtn() {
		await this.signInBtn.click();
		return new MainPage(this.page);
	}

	checkPage(): void {
		expect(this.loginField.isEnabled).toBeTruthy();
		expect(this.passwordField.isEnabled).toBeTruthy();
		expect(this.signInBtn.isEnabled).toBeTruthy();
	}
}
