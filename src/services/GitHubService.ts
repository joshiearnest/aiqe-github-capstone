import { APIRequestContext } from '@playwright/test';

import { env } from '../config/env';

export class GitHubService {
    constructor(private request: APIRequestContext) {}

    private getHeaders() {
        const headers: Record<string, string> = {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        };

        if (env.token) {
            headers.Authorization = `token ${env.token}`;
        }

        return headers;
    }

    async getAuthenticatedUser() {
        return await this.request.get(`${env.apiBaseUrl}/user`, {
            headers: this.getHeaders(),
        });
    }

    async getRepository(owner: string, repositoryName: string) {
        return await this.request.get(`${env.apiBaseUrl}/repos/${owner}/${repositoryName}`, {
            headers: this.getHeaders(),
        });
    }

    async createRepository(repositoryName: string) {
        return await this.request.post(`${env.apiBaseUrl}/user/repos`, {
            headers: this.getHeaders(),
            data: {
                name: repositoryName,
                description: 'AIQE Capstone Test Repository',
                private: false,
                auto_init: true,
            },
        });
    }

    async deleteRepository(owner: string, repositoryName: string) {
        return await this.request.delete(`${env.apiBaseUrl}/repos/${owner}/${repositoryName}`, {
            headers: this.getHeaders(),
        });
    }
}
