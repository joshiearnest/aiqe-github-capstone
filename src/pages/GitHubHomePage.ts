import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GitHubHomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navigateTo('/');
  }
}