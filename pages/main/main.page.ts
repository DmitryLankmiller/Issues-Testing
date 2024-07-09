import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { RepoPage } from './repo.page';

export class MainPage extends BasePage {
	private readonly leftDashboard: Locator;

	constructor(page: Page) {
		super(page);
		this.leftDashboard = page.locator(
			"xpath=.//*[@id='dashboard-repos-filter-left']"
		);
	}

	public async goToRepoByLink(owner: string, repoName: string) {
		await this.page.goto(`/${owner}/${repoName}`);
		return new RepoPage(this.page);
	}

	async checkPage() {
		expect(this.leftDashboard.isEnabled).toBeTruthy();
	}
}
