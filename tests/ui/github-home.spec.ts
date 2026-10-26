import { expect, test } from '@playwright/test';
import { GitHubHomePage } from '../../src/pages/GitHubHomePage';

test('GitHub homepage loads', async ({ page }) => {
  const githubHomePage = new GitHubHomePage(page);

  await githubHomePage.open();

  await expect(page).toHaveTitle(/GitHub/);
});
