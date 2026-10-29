import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrganizationPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async openRepositories() {
        const reposLink = this.page.locator('a[href="/orgs/microsoft/repositories"]').first();
        await reposLink.waitFor({ state: 'visible', timeout: 10_000 });
        await reposLink.click();
    }

    async searchRepository(repoName: string) {
        const searchBox = this.page.getByPlaceholder('Search repositories');
        await searchBox.waitFor({ state: 'visible', timeout: 10_000 });
        await searchBox.fill(repoName);
    }
    async isRepositoryVisible(repositoryName: string) {
        return this.page.getByRole('link', {
            name: repositoryName
        });
    }
}