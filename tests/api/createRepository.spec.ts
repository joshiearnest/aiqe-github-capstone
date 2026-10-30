import { expect, request, test } from '@playwright/test';

import { env } from '../../src/config/env';
import { GitHubService } from '../../src/services/GitHubService';

test('Create GitHub repository', async () => {
  const apiRequest = await request.newContext({
    baseURL: env.apiBaseUrl,
  });

  const gitHubService = new GitHubService(apiRequest);
  const repoName = `aiqe-capstone-${Date.now()}`;

  try {
    const response = await gitHubService.createRepository(repoName);

    expect(response.status()).toBe(201);

    const repository = await response.json();
    expect(repository.name).toBe(repoName);
  } finally {
    await apiRequest.dispose();
  }
});
