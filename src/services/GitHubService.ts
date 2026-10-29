import { APIRequestContext } from '@playwright/test';

export class GitHubService {
    constructor(private request: APIRequestContext) {}

    private getHeaders() {
        const headers: Record<string, string> = {
            Accept: 'application/vnd.github+json',
        };

        if (process.env.GITHUB_TOKEN) {
            headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
        }

        return headers;
    }

    async getAuthenticatedUser() {
        return await this.request.get('/user', {
            headers: this.getHeaders(),
        });
    }

    async createRepository(repositoryName: string) {
        return await this.request.post('/user/repos', {
            headers: this.getHeaders(),
            data: {
                name: repositoryName,
                private: false,
            },
        });
    }

    async deleteRepository(owner: string, repositoryName: string) {
        return await this.request.delete(`/repos/${owner}/${repositoryName}`, {
            headers: this.getHeaders(),
        });
    }
}
