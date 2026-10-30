import { expect, test } from '@playwright/test';

import { githubConfig } from '../../src/pages/BasePage';
import { GitHubHomePage } from '../../src/pages/GitHubHomePage';
import { RepositoryPage } from '../../src/pages/RepositoryPage';

test('Navigate repository tabs', async ({ page }) => {
  const homePage = new GitHubHomePage(page);
  const repositoryPage = new RepositoryPage(page);
  const repositoryPath = `/${githubConfig.owner}/${githubConfig.repo}`;

  await homePage.navigateTo(githubConfig.baseUrl);
  await homePage.searchRepository(`${githubConfig.owner}/${githubConfig.repo}`);

  const repositoryLink = page.locator(`a[href="${repositoryPath}"]`).first();
  await expect(repositoryLink).toBeVisible();
  await repositoryLink.click();

  await repositoryPage.openIssues();
  await expect(page).toHaveURL(new RegExp(`${repositoryPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/issues(?:/)?$`));

  await page.goBack();

  await repositoryPage.openPullRequests();
  await expect(page).toHaveURL(new RegExp(`${repositoryPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/pulls(?:/)?$`));
});