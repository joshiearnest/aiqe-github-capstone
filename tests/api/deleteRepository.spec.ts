import { expect, request, test } from '@playwright/test';

import { env } from '../../src/config/env';
import { GitHubService } from '../../src/services/GitHubService';

test('Delete GitHub repository', async () => {
  const apiRequest = await request.newContext({
    baseURL: env.apiBaseUrl,
  });

  const gitHubService = new GitHubService(apiRequest);

  try {
    const userResponse = await gitHubService.getAuthenticatedUser();
    expect(userResponse.status()).toBe(200);

    const owner = (await userResponse.json()).login;
    const repoName = `aiqe-capstone-delete-${Date.now()}`;

    const createResponse = await gitHubService.createRepository(repoName);
    expect(createResponse.status()).toBe(201);

    const deleteResponse = await gitHubService.deleteRepository(owner, repoName);
    expect(deleteResponse.status()).toBe(204);
  } finally {
    await apiRequest.dispose();
  }
});
