import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { IssuesWithSidebarPage } from './issues.withSidebar.page';
import { IssuesMainPage } from './issues.main.page';

export class IssuePage extends IssuesWithSidebarPage {
	private readonly discussionHeader: Locator;
	private readonly issueTitle: Locator;
	// private readonly discussionBucket: Locator;
	private readonly issueBody: Locator;
	private readonly issueBodyText: Locator;
	private readonly issueBodySummaryBtn: Locator;
	private readonly issueBodyDetailsMenu: Locator;
	private readonly issueBodyEditBtn: Locator;
	private readonly issueBodyEditTextArea: Locator;
	private readonly issueBodyUpdateCommentBtn: Locator;
	private readonly deleteIssueBtn: Locator;
	private readonly deleteConfirmBtn: Locator;

	constructor(page: Page) {
		super(page);
		super.checkPage();

		this.discussionHeader = page.locator(
			"xpath=.//*[@id='partial-discussion-header']"
		);
		this.issueTitle = this.discussionHeader.locator('xpath=.//bdi');
		// this.discussionBucket = page.locator("xpath=.//*[@id='discussion_bucket']");
		this.issueBody = page.locator(
			"xpath=(.//*[@id='discussion_bucket']//task-lists)[1]/../.."
		);
		this.issueBodyText = this.issueBody.locator("xpath=.//p[@dir='auto']");
		this.issueBodySummaryBtn = this.issueBody.locator(
			"xpath=.//summary[@role='button']"
		);
		this.issueBodyDetailsMenu = this.issueBody.locator('xpath=.//details-menu');
		this.issueBodyEditBtn = this.issueBodyDetailsMenu.locator(
			"xpath=.//button[contains(text(), 'Edit')]"
		);
		this.issueBodyEditTextArea = this.issueBody.locator('xpath=.//textarea');
		this.issueBodyUpdateCommentBtn = this.issueBody.locator(
			"xpath=.//*[contains(text(), 'Update comment')]"
		);
		this.deleteIssueBtn = page.locator(
			"xpath=.//*[contains(text(), 'Delete issue')]"
		);
		this.deleteConfirmBtn = page.locator(
			"xpath=.//*[contains(text(), 'Delete this issue')]"
		);
	}

	public async getIssueTitle() {
		return this.issueTitle;
	}

	public async getIssueBody() {
		return this.issueBodyText;
	}

	public async clickIssueBodySummary() {
		await this.issueBodySummaryBtn.click();
	}

	public async editIssueBody(newBody: string) {
		await this.clickIssueBodySummary();
		await this.issueBodyEditBtn.click();
		await this.issueBodyEditTextArea.clear();
		await this.issueBodyEditTextArea.fill(newBody);
		await this.issueBodyUpdateCommentBtn.click();
	}

	public async deleteIssue() {
		await this.deleteIssueBtn.click();
		await this.deleteConfirmBtn.click();
		let issuesMainPage = new IssuesMainPage(this.page);
		await issuesMainPage.checkPage();
		return issuesMainPage;
	}

	async checkPage() {
		expect(this.discussionHeader.isVisible()).toBeTruthy();
		expect(this.issueBody.isVisible()).toBeTruthy();
	}
}
