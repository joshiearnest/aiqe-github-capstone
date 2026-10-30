import { Page } from '@playwright/test';

import { env } from '../config/env';

export const githubConfig = { 
  baseUrl: env.baseUrl,
  owner: env.owner,
  repo: env.repo,
  filterRepo: env.filterRepo,
};

export class BasePage { 
  constructor(protected page: Page) {}

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}