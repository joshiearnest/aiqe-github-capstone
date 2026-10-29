import { test, expect } from '@playwright/test';
import { OrganizationPage } from '../../src/pages/OrganizationPage';

test('Filter repositories', async ({ page }) => {

    const orgPage = new OrganizationPage(page);

    await page.goto('https://github.com/microsoft');

    await orgPage.openRepositories();

    const repoName = 'winget-pkgs';
    await orgPage.searchRepository(repoName);

    await expect(
        page.locator(`a[href="/microsoft/${repoName}"]`)
    ).toBeVisible();
});