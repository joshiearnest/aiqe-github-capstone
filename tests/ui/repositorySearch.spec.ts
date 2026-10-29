import { test, expect } from '@playwright/test';
import { GitHubHomePage } from '../../src/pages/GitHubHomePage';
import { RepositoryPage } from '../../src/pages/RepositoryPage';

test('Search and validate microsoft/playwright repository', async ({ page }) => {

    const homePage = new GitHubHomePage(page);
    const repositoryPage = new RepositoryPage(page);

    await homePage.navigateTo('https://github.com');

    await homePage.searchRepository('microsoft/playwright');

    const repositoryLink = page.locator('a[href="/microsoft/playwright"]').first();
    await expect(repositoryLink).toBeVisible();
    await repositoryLink.click();

    await expect(page).toHaveURL(/\/microsoft\/playwright$/);

    const repositoryName = await repositoryPage.getRepositoryName();
    const ownerName = await repositoryPage.getRepositoryOwner();

    expect(repositoryName?.trim()).toBe('playwright');
    expect(ownerName?.trim()).toBe('microsoft');
});