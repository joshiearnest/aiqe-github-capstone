import { expect, test } from '@playwright/test';

import { githubConfig } from '../../src/pages/BasePage';
import { GitHubHomePage } from '../../src/pages/GitHubHomePage';
import { RepositoryPage } from '../../src/pages/RepositoryPage';

test('Search and validate GitHub repository', async ({ page }) => {
  const homePage = new GitHubHomePage(page);
  const repositoryPage = new RepositoryPage(page);
  const repositoryPath = `/${githubConfig.owner}/${githubConfig.repo}`;

  await homePage.navigateTo(githubConfig.baseUrl);
  await homePage.searchRepository(`${githubConfig.owner}/${githubConfig.repo}`);

  const repositoryLink = page.locator(`a[href="${repositoryPath}"]`).first();
  await expect(repositoryLink).toBeVisible();
  await repositoryLink.click();

  await expect(page).toHaveURL(new RegExp(`${repositoryPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`));

  const repositoryName = await repositoryPage.getRepositoryName();
  const ownerName = await repositoryPage.getRepositoryOwner();

  expect(repositoryName?.trim()).toBe(githubConfig.repo);
  expect(ownerName?.trim()).toBe(githubConfig.owner);
});