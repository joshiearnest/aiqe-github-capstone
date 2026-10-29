import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GitHubHomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async searchRepository(repository: string) {
    await this.page.getByRole('button', { name: /Search or jump to/i }).click();
    const searchBox = this.page.getByRole('combobox', { name: /Search or jump to/i });
    await searchBox.waitFor({ state: 'visible', timeout: 10_000 });
    await searchBox.fill(repository);
    await this.page.keyboard.press('Enter');
  }
}