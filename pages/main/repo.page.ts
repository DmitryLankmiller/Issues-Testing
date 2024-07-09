import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { IssuesMainPage } from "../issues/issues.main.page";

export class RepoPage extends BasePage {
	private readonly repoName: Locator;
	private readonly issuesTab: Locator;

	constructor(page: Page) {
		super(page);
		this.repoName = page.locator("xpath=.//*[@itemprop='name']");
		this.issuesTab = page.locator("xpath=.//*[@id='issues-tab']");
	}

	public async clickIssuesTab() {
		await this.issuesTab.click();
		return new IssuesMainPage(this.page);
	}

	checkPage(): void {
		expect(this.repoName.isVisible()).toBeTruthy();
		expect(this.issuesTab.isEnabled()).toBeTruthy();
	}
}
