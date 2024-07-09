import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';
import { IssuePage } from './issues.issue.page';
import { IssuesWithSidebarPage } from './issues.withSidebar.page';

export class IssuesCreatePage extends IssuesWithSidebarPage {
	private readonly issueTitleField: Locator;
	private readonly issueBodyField: Locator;
	private readonly submitIssueBtn: Locator;

	constructor(page: Page) {
		super(page);
        super.checkPage();
		this.issueTitleField = page.locator("xpath=.//*[@id='issue_title']");
		this.issueBodyField = page.locator("xpath=.//*[@id='issue_body']");
		this.submitIssueBtn = page.locator(
			"xpath=(.//button[contains(text(), 'Submit new issue')])[1]"
		);
	}

	public async setIssueTitle(title: string) {
		this.issueTitleField.fill(title);
	}

	public async setIssueBody(body: string) {
		this.issueBodyField.fill(body);
	}

	public async clickAssigneesMenu() {
		this.assigneesSelectMenu.click();
	}

	public async setFirstAssignee() {
		await this.clickAssigneesMenu();
		await this.assigneesSelectMenuItems.first().click();
	}

	public async setAssigneeByName(userName: string) {
		await this.clickAssigneesMenu();
		await this.assigneesSelectMenuItems.getByText(userName).first().click();
	}

	public async clickAssigneeYourselfBtn() {
		await this.assigneeYourselfBtn.click();
	}

	public async clickLabelsSelectMenu() {
		await this.labelsSelectMenu.click();
	}

	public async setLabelByName(labelName: string) {
		await this.clickLabelsSelectMenu();
		await this.labelsMenuItems.getByText(labelName).click();
	}

	public async clickSubmitIssueBtn() {
		await this.submitIssueBtn.click();
		return new IssuePage(this.page);
	}

	checkPage(): void {
		expect(this.issueTitleField.isEnabled()).toBeTruthy();
		expect(this.issueBodyField.isEnabled()).toBeTruthy();
		expect(this.submitIssueBtn.isVisible()).toBeTruthy();
	}
}
