import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { LoginPage } from "./login.page";

export class WelcomePage extends BasePage {
	private readonly signInBtn: Locator;

	constructor(page: Page) {
		super(page);
		this.signInBtn = this.page.locator(
			"xpath=.//a[contains(@class,'HeaderMenu-link')][@href='/login']"
		);
	}

	public async clickLogInBtn() {
		await this.signInBtn.click();
		return new LoginPage(this.page);
	}

	checkPage() {
		expect(this.signInBtn.isEnabled()).toBeTruthy();
	}
}
