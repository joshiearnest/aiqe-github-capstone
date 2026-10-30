import { expect, test } from '@playwright/test';

import { githubConfig } from '../../src/pages/BasePage';
import { OrganizationPage } from '../../src/pages/OrganizationPage';

test('Filter repositories', async ({ page }) => {
  const orgPage = new OrganizationPage(page);
  const repoName = githubConfig.filterRepo;

  await page.goto(`${githubConfig.baseUrl}/${githubConfig.owner}`, { waitUntil: 'domcontentloaded' });
  await orgPage.openRepositories();
  await orgPage.searchRepository(repoName);

  const repositoryLink = await orgPage.isRepositoryVisible(repoName);

  await expect(repositoryLink).toBeVisible({ timeout: 15_000 });
});
