import { Locator, Page } from '@playwright/test';
import { BasePage, githubConfig } from './BasePage';

export class OrganizationPage extends BasePage {
  private readonly repositoriesLink: Locator;
  private readonly searchBox: Locator;
  private readonly repositoryLink: Locator;

  constructor(page: Page) {
    super(page);
    this.repositoriesLink = page.locator(`a[href="/orgs/${githubConfig.owner}/repositories"]`).first();
    this.searchBox = page.getByPlaceholder('Search repositories');
    this.repositoryLink = page.getByRole('link');
  }

  async openRepositories(): Promise<void> {
    await this.repositoriesLink.waitFor({ state: 'visible', timeout: 10_000 });
    await this.repositoriesLink.click();
  }

  async searchRepository(repoName: string): Promise<void> {
    await this.searchBox.waitFor({ state: 'visible', timeout: 10_000 });
    await this.searchBox.fill(repoName);
  }

  async isRepositoryVisible(repositoryName: string): Promise<Locator> {
    return this.repositoryLink.filter({ hasText: repositoryName });
  }
}