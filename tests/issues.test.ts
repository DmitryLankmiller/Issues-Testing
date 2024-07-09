import test, { expect } from '@playwright/test';
import { goToRepo, logIn, openRepoIssues } from './utils';
import { IssuesMainPage } from '../pages/issues/issues.main.page';
import { IssuePage } from '../pages/issues/issues.issue.page';

test.describe('Testing Issues', () => {
	const OWNER = 'DmitryLankmiller';
	const REPO_NAME = 'VK_Education_Automated_Testing_PlayWright_Project';
	const LABEL_NAME = 'bug';
	const ISSUE_TITLE = 'Issue 1';
	const ISSUE_BODY = 'Я нашёл баг';
	const NEW_ISSUE_BODY = 'Я нашёл новый баг!';
	let issuesMainPage: IssuesMainPage;

	test.beforeEach(async ({ page }) => {
		let mainPage = await logIn(page);
		let repoPage = await goToRepo(OWNER, REPO_NAME, mainPage);
		issuesMainPage = await openRepoIssues(repoPage);
	});

	test('Create issue', async () => {
		let issuesCreatePage =
			await test.step('going to issue creating page', async () => {
				let issuesCreatePage = await issuesMainPage.clickNewIssueBtn();
				await issuesCreatePage.checkPage();
				return issuesCreatePage;
			});
		let issuePage = await test.step('enter issue data', async () => {
			await issuesCreatePage.setFirstAssignee();
			await issuesCreatePage.setLabelByName(LABEL_NAME);
			await issuesCreatePage.setIssueTitle(ISSUE_TITLE);
			await issuesCreatePage.setIssueBody(ISSUE_BODY);
			let issuePage = await issuesCreatePage.clickSubmitIssueBtn();
			await issuePage.checkPage();
			return issuePage;
		});
		await test.step('checking created issue', async () => {
			await expect(await issuePage.getIssueTitle()).toHaveText(ISSUE_TITLE);
			await expect(await issuePage.getIssueBody()).toHaveText(ISSUE_BODY);
		});
		await test.step('deleting issue', async () => {
			issuesMainPage = await deleteIssue(issuePage);
		});
	});

	test('Edit issue', async ({ page }) => {
		await test.step('creating issue', async () => {
			await createIssue(issuesMainPage);
			await page.goto('./..');
		});
		let issuePage = await test.step('going to first issue page', async () => {
			let issuePage = await issuesMainPage.clickFirstIssue();
			await issuePage.checkPage();
			return issuePage;
		});
		await test.step('editing issue body', async () => {
			await issuePage.editIssueBody(NEW_ISSUE_BODY);
		});
		await test.step('checking issue changes', async () => {
			await expect(await issuePage.getIssueTitle()).toHaveText(ISSUE_TITLE);
			await expect(await issuePage.getIssueBody()).toHaveText(NEW_ISSUE_BODY);
		});
		await test.step('deleting issue', async () => {
			issuesMainPage = await deleteIssue(issuePage);
		});
	});

	async function createIssue(issuesMainPage: IssuesMainPage) {
		let issuesCreatePage = await issuesMainPage.clickNewIssueBtn();
		await issuesCreatePage.checkPage();
		await issuesCreatePage.setFirstAssignee();
		await issuesCreatePage.setLabelByName(LABEL_NAME);
		await issuesCreatePage.setIssueTitle(ISSUE_TITLE);
		await issuesCreatePage.setIssueBody(ISSUE_BODY);
		let issuePage = await issuesCreatePage.clickSubmitIssueBtn();
		await issuePage.checkPage();
		return issuePage;
	}

	async function deleteIssue(issuePage: IssuePage) {
		return await issuePage.deleteIssue();
	}
});
