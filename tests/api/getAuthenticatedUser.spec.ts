import { expect, request, test } from '@playwright/test';

import { env } from '../../src/config/env';
import { GitHubService } from '../../src/services/GitHubService';

test('Get authenticated GitHub user', async () => {
  const apiRequest = await request.newContext({
    baseURL: env.apiBaseUrl,
  });

  const gitHubService = new GitHubService(apiRequest);

  try {
    const response = await gitHubService.getAuthenticatedUser();

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.login).toBeTruthy();
    expect(user.id).toBeTruthy();
  } finally {
    await apiRequest.dispose();
  }
});
