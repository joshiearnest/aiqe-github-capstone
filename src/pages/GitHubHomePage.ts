import { Locator, Page } from '@playwright/test'; 
import { env } from '../config/env'; // Importing environment variables from the config file
import { BasePage } from './BasePage'; // Importing the BasePage class to extend its functionality

export class GitHubHomePage extends BasePage { // The GitHubHomePage class extends the BasePage class, inheriting its properties and methods
  private readonly searchButton: Locator; // private property to locate the search button on the GitHub home page
  private readonly searchInput: Locator; // locator for the search input field on the GitHub home page

  constructor(page: Page) {
    super(page);
    this.searchButton = page.getByRole('button', { name: /Search or jump to/i }); // locator for the search button using its role and name
    this.searchInput = page.getByPlaceholder('Search or jump to...'); // locator for the search input field using its placeholder text
  }

  async open() {
    await this.navigateTo(env.baseUrl); // Navigate to the GitHub home page using the base URL from the environment variables
  }

  async searchRepository(repositoryName: string): Promise<void> { //promise<void> indicates that this method returns a promise that resolves to void, meaning it does not return any value
    await this.searchButton.waitFor({ state: 'visible', timeout: 15_000 }); // Wait for the search button to be visible before interacting with it
    await this.searchButton.click();

    await this.searchInput.waitFor({ state: 'visible', timeout: 15_000 }); 
    await this.searchInput.fill(repositoryName)
    await this.searchInput.press('Enter');
  }
}