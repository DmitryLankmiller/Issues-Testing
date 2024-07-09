import test, { expect } from '@playwright/test';
import { goToRepo, logIn, openRepoIssues } from './utils';
import { IssuesMainPage } from '../pages/issues/issues.main.page';

test.describe('Testing Issues', () => {
	const OWNER = 'DmitryLankmiller';
	const REPO_NAME = 'VK_Education_Automated_Testing_PlayWright_Project';
	const LABEL_NAME = 'bug';
	const ISSUE_TITLE = 'Issue 1';
	const ISSUE_BODY = 'Я нашёл баг';
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
				issuesCreatePage.checkPage();
				return issuesCreatePage;
			});
		let issuePage = await test.step('enter issue data', async () => {
			await issuesCreatePage.setFirstAssignee();
			await issuesCreatePage.setLabelByName(LABEL_NAME);
			await issuesCreatePage.setIssueTitle(ISSUE_TITLE);
			await issuesCreatePage.setIssueBody(ISSUE_BODY);
			let issuePage = await issuesCreatePage.clickSubmitIssueBtn();
			issuePage.checkPage();
			return issuePage;
		});
        await test.step("checking created issue", async () => {
            await expect(await issuePage.getIssueTitle()).toHaveText(ISSUE_TITLE);
            await expect(await issuePage.getIssueBody()).toHaveText(ISSUE_BODY);
        })
	});

    test('Edit issue', async () => {
		let issuePage =
			await test.step('going to first issue page', async () => {
				let issuePage = await issuesMainPage.clickFirstIssue();
				issuePage.checkPage();
				return issuePage;
			});

	});

});
