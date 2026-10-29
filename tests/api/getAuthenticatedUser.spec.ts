import { test, expect, request as apiRequestFactory } from '@playwright/test';
import { GitHubService } from '../../src/services/GitHubService';

test('Get authenticated GitHub user', async () => {
    const apiRequest = await apiRequestFactory.newContext({
        baseURL: 'https://api.github.com',
        ignoreHTTPSErrors: true,
        extraHTTPHeaders: {
            Accept: 'application/vnd.github+json',
            ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
    });

    const service = new GitHubService(apiRequest);

    try {
        const response = await service.getAuthenticatedUser();

        expect(response.status()).toBe(200);

        const user = await response.json();
        expect(user.login).toBeTruthy();
        expect(user.id).toBeTruthy();
    } finally {
        await apiRequest.dispose();
    }
});
