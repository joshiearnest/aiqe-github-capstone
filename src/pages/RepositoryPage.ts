import { Locator, Page } from '@playwright/test';

import { BasePage, githubConfig } from './BasePage';

export class RepositoryPage extends BasePage {
  private readonly repositoryNameLink: Locator;
  private readonly repositoryOwnerLink: Locator;
  private readonly issuesLink: Locator;
  private readonly pullRequestsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.repositoryNameLink = page.locator(`a[href="/${githubConfig.owner}/${githubConfig.repo}"]`).first();
    this.repositoryOwnerLink = page.locator(`a[href="/${githubConfig.owner}"]`).first();
    this.issuesLink = page.locator(`a[href="/${githubConfig.owner}/${githubConfig.repo}/issues"]`).first();
    this.pullRequestsLink = page.locator(`a[href="/${githubConfig.owner}/${githubConfig.repo}/pulls"]`).first();
  }

  async openRepository(owner: string, repositoryName: string) {
    await this.page.goto(`${githubConfig.baseUrl}/${owner}/${repositoryName}`);
  }

  async getRepositoryName(): Promise<string | null> {
    return this.repositoryNameLink.textContent();
  }

  async getRepositoryOwner(): Promise<string | null> {
    return this.repositoryOwnerLink.textContent();
  }

  async openIssues(): Promise<void> {
    await this.issuesLink.waitFor({ state: 'visible', timeout: 10_000 });
    await this.issuesLink.click();
  }

  async openPullRequests(): Promise<void> {
    await this.pullRequestsLink.waitFor({ state: 'visible', timeout: 10_000 });
    await this.pullRequestsLink.click();
  }
}