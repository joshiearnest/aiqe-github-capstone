import { test, expect } from '@playwright/test';
import { GitHubHomePage } from '../../src/pages/GitHubHomePage';
import { RepositoryPage } from '../../src/pages/RepositoryPage';

test('Navigate repository tabs', async ({ page }) => {

    const homePage = new GitHubHomePage(page);
    const repositoryPage = new RepositoryPage(page);

    await homePage.navigateTo('https://github.com');

    await homePage.searchRepository('microsoft/playwright');

    const repositoryLink = page.locator('a[href="/microsoft/playwright"]').first();
    await expect(repositoryLink).toBeVisible();
    await repositoryLink.click();

    await repositoryPage.openIssues();

    await expect(page).toHaveURL(/\/microsoft\/playwright\/issues(?:\/)?$/);

    await page.goBack();

    await repositoryPage.openPullRequests();

    await expect(page).toHaveURL(/\/microsoft\/playwright\/pulls(?:\/)?$/);
});