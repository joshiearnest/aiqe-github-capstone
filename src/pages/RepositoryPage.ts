import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RepositoryPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    async getRepositoryName() {
        return this.page.locator('a[href="/microsoft/playwright"]').first().textContent();
    }

    async getRepositoryOwner() {
        return this.page.locator('a[href="/microsoft"]').first().textContent();
    }
    async openIssues() {
        const issuesLink = this.page.locator('a[href="/microsoft/playwright/issues"]').first();
        await issuesLink.waitFor({ state: 'visible', timeout: 10_000 });
        await issuesLink.click();
    }

    async openPullRequests() {
        const pullRequestsLink = this.page.locator('a[href="/microsoft/playwright/pulls"]').first();
        await pullRequestsLink.waitFor({ state: 'visible', timeout: 10_000 });
        await pullRequestsLink.click();
    }
}