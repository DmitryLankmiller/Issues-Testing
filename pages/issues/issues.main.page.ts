import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { IssuesCreatePage } from './issues.create.page';
import { IssuePage } from './issues.issue.page';

export class IssuesMainPage extends BasePage {
	private readonly issuesList: Locator;
	private readonly issuesItems: Locator;
	private readonly newIssueBtn: Locator;

	constructor(page: Page) {
		super(page);
		this.issuesList = page.locator("xpath=.//div[@aria-label='Issues']");
		this.issuesItems = this.issuesList.locator(
			"xpath=.//a[contains(@id, 'issue')]"
		);
		this.newIssueBtn = page.locator(
			"xpath=.//*[contains(text(), 'New issue')]"
		);
	}

	public async clickNewIssueBtn() {
		await this.newIssueBtn.click();
		return new IssuesCreatePage(this.page);
	}

	public async findIssueById(id: number) {
		return this.issuesList.locator(`xpath=.//*[@id='issue_${id}_link']`);
	}

	public async clickIssueById(id: number) {
		await (await this.findIssueById(id)).click();
		return new IssuePage(this.page);
	}

	public async clickFirstIssue() {
		await this.issuesItems.first().click();
		return new IssuePage(this.page);
	}

	async checkPage() {
		expect(this.newIssueBtn.isEnabled()).toBeTruthy();
	}
}
