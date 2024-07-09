import { Page } from "@playwright/test";
import { LoginPage } from "../pages/login/login.page";
import { WelcomePage } from "../pages/login/welcome.page";
import { MainPage } from "../pages/main/main.page";
import { RepoPage } from "../pages/main/repo.page";

const LOGIN = 'DmitryLankmiller';
const PASSWORD = '45lbhtrnjh';

export async function logIn(page: Page) {
	await page.goto('/');
    let welcomePage = new WelcomePage(page);
	welcomePage.checkPage();
    let loginPage = await welcomePage.clickLogInBtn()
	loginPage.checkPage();
	await loginPage.setLogin(LOGIN);
	await loginPage.setPassword(PASSWORD);
	let mainPage =  await loginPage.clickLogInBtn();
	mainPage.checkPage();
	return mainPage;
}

export async function goToRepo(owner:string, repoName: string, mainPage: MainPage) {
	let repoPage = await mainPage.goToRepoByLink(owner, repoName)
	repoPage.checkPage();
	return repoPage;
}

export async function openRepoIssues(repoPage: RepoPage) {
	let issuesMainPage = await repoPage.clickIssuesTab();
	issuesMainPage.checkPage();
	return issuesMainPage;
}