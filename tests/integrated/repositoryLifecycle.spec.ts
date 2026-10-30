import { expect, test } from '@playwright/test';

import { RepositoryPage } from '../../src/pages/RepositoryPage';
import { GitHubService } from '../../src/services/GitHubService';
import { repoData } from '../../testdata/repoData';

test.describe('Integrated UI API Scenario', () => {
  test('Validate repository details using API and UI', async ({ page, request }) => {
    const gitHubService = new GitHubService(request);

    const apiResponse = await gitHubService.getRepository(
      repoData.repositoryOwner,
      repoData.repositoryName
    );

    expect(apiResponse.status()).toBe(200);

    const apiBody = await apiResponse.json();
    const repositoryPage = new RepositoryPage(page);

    await repositoryPage.openRepository(apiBody.owner.login, apiBody.name);

    await expect(page.locator('h1')).toContainText(apiBody.name);
  });
});
