import { Locator, Page } from '@playwright/test'; 
import { env } from '../config/env'; 
import { BasePage } from './BasePage'; 

export class GitHubHomePage extends BasePage { 
  private readonly searchButton: Locator; 
  private readonly searchInput: Locator; 

  constructor(page: Page) {
    super(page);
    this.searchButton = page.getByRole('button', { name: /Search or jump to/i }); 
    this.searchInput = page.getByPlaceholder('Search or jump to...'); 
  }

  async open() {
    await this.navigateTo(env.baseUrl); 
  }

  async searchRepository(repositoryName: string): Promise<void> { 
    await this.searchButton.waitFor({ state: 'visible', timeout: 15_000 }); 
    await this.searchButton.click();

    await this.searchInput.waitFor({ state: 'visible', timeout: 15_000 }); 
    await this.searchInput.fill(repositoryName)
    await this.searchInput.press('Enter');
  }
}