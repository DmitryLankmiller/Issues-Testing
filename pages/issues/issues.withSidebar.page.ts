import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../base.page';

export class IssuesWithSidebarPage extends BasePage {
	protected readonly assigneesSelectMenu: Locator;
	protected readonly assigneesDetailsMenu: Locator;
	protected readonly assigneesSelectMenuItems: Locator;
	protected readonly assignedUsers: Locator;
	protected readonly assigneeYourselfBtn: Locator;
	protected readonly labelsSelectMenu: Locator;
	protected readonly labelsDetailsMenu: Locator;
	protected readonly labelsMenuItems: Locator;
	protected readonly selectedLabels: Locator;

	constructor(page: Page) {
		super(page);
		this.assigneesSelectMenu = page.locator(
			"xpath=.//*[@id='assignees-select-menu']"
		);
		this.assigneesDetailsMenu = this.assigneesSelectMenu.locator(
			'xpath=.//details-menu'
		);
		this.assigneesSelectMenuItems =
			this.assigneesDetailsMenu.locator('xpath=.//label');

		this.assignedUsers = this.assigneesSelectMenu.locator(
			'xpath=./following-sibling::*//p'
		);
		this.assigneeYourselfBtn = page.locator(
			"xpath=.//button[contains(text(), 'assign yourself')]"
		);
		this.labelsSelectMenu = page.locator(
			"xpath=.//*[@id='labels-select-menu']"
		);
		this.labelsDetailsMenu = this.labelsSelectMenu.locator(
			'xpath=.//details-menu'
		);
		this.labelsMenuItems = this.labelsDetailsMenu.locator('xpath=.//label');
		this.selectedLabels = this.labelsSelectMenu.locator(
			'xpath=./following-sibling::*//a'
		);
	}

	checkPage(): void {
        expect(this.assigneesSelectMenu.isEnabled()).toBeTruthy();
		expect(this.labelsSelectMenu.isEnabled()).toBeTruthy();
    }
}
