# AIQE GitHub Capstone - Technical Architecture Walkthrough

## 1. Project Overview

This project is a Playwright-based UI test automation framework built with TypeScript. It is designed to validate GitHub user journeys such as:

- opening the GitHub homepage
- searching for repositories
- navigating repository tabs
- filtering repositories in an organization page
- validating repository metadata

The project follows the Page Object Model (POM) pattern to make tests easier to maintain and extend.

---

## 2. Business Goal

The goal of the project is to automate browser-based verification of real user interactions on GitHub. Instead of testing raw API responses, this framework tests what a real user can see and do in the browser.

This helps detect:

- broken selectors
- navigation issues
- UI regressions
- page layout changes
- missing or incorrect data on the page

---

## 3. Technology Stack

- TypeScript
- Playwright Test
- GitHub as the application under test
- Page Object Model design pattern

These technologies work together to provide a simple but powerful browser automation framework.

---

## 4. Project Structure

```text
aiqe-github-capstone/
├── README.md
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── src/
│   └── pages/
│       ├── BasePage.ts
│       ├── GitHubHomePage.ts
│       ├── OrganizationPage.ts
│       └── RepositoryPage.ts
├── tests/
│   └── ui/
│       ├── github-home.spec.ts
│       ├── repositorySearch.spec.ts
│       ├── repositoryNavigation.spec.ts
│       └── repositoryFilter.spec.ts
├── test-results/
└── playwright-report/
```

### Key directories

#### src/pages
This folder contains page objects. These classes abstract browser interactions for each page type.

#### tests/ui
This folder contains the actual test specifications. Each test describes a user journey or validation scenario.

---

## 5. Architecture Pattern: Page Object Model

The project follows the POM pattern, which separates test logic from page logic.

### Why POM is used

- keeps tests readable
- improves reusability
- centralizes selectors
- reduces duplication
- makes UI changes easier to handle in one place

In this structure:

- test files define the business flow
- page classes define the interaction with the page
- assertions validate expected behavior

---

## 6. Core Page Objects

### BasePage
Location: `src/pages/BasePage.ts`

This is the shared base for all page objects. It contains common functionality such as:

- `navigateTo(url)`
- `getCurrentUrl()`

This reduces duplicate logic across all pages.

### GitHubHomePage
Location: `src/pages/GitHubHomePage.ts`

Responsibilities:

- open the homepage
- trigger the search box
- search for a repository

Example actions:

- `searchRepository(repository: string)`

### OrganizationPage
Location: `src/pages/OrganizationPage.ts`

Responsibilities:

- open the repositories view for an organization
- filter repository results

Example actions:

- `openRepositories()`
- `searchRepository(repoName: string)`

### RepositoryPage
Location: `src/pages/RepositoryPage.ts`

Responsibilities:

- read repository details
- navigate to repository tabs like Issues and Pull requests

Example actions:

- `getRepositoryName()`
- `getRepositoryOwner()`
- `openIssues()`
- `openPullRequests()`

---

## 7. Test Workflow

A typical test flow is:

1. create a page object instance
2. navigate to the target page
3. perform an interaction like search, click, or fill
4. validate URL, visibility, or text using Playwright `expect()`

### Example flow

```ts
const homePage = new GitHubHomePage(page);

await homePage.navigateTo('https://github.com');
await homePage.searchRepository('microsoft/playwright');

const repositoryLink = page.locator('a[href="/microsoft/playwright"]').first();
await expect(repositoryLink).toBeVisible();
await repositoryLink.click();
```

This pattern keeps test code short and focused on the actual user journey.

---

## 8. Test Files and Their Purpose

### github-home.spec.ts
Purpose: validate that the GitHub homepage loads correctly.

### repositorySearch.spec.ts
Purpose: search for a repository and validate repository metadata.

### repositoryNavigation.spec.ts
Purpose: test navigation across repository tabs such as Issues and Pull requests.

### repositoryFilter.spec.ts
Purpose: validate filtering within an organization repository list.

These tests represent common end-user workflows on GitHub.

---

## 9. Playwright Configuration

File: `playwright.config.ts`

This file defines the test runner configuration, including:

- test discovery pattern
- browsers to run against
- test base URL
- reporters
- output folders
- timeouts

### Browser configuration
The project runs tests on:

- Chromium
- Firefox
- WebKit

This gives multi-browser validation and ensures the app works across environments.

### Important settings

- `testDir: './tests'`
- `testMatch: '**/*.spec.ts'`
- `baseURL: process.env.BASE_URL ?? 'https://github.com'`
- `reporter: [['list'], ['html', { open: 'never' }]]`
- `outputDir: './test-results'`

---

## 10. Execution Strategy

The project is executed through npm scripts defined in `package.json`.

### Common commands

```bash
npm install
npx playwright install
npm test
npm run test:ui
npm run test:api
npm run test:integrated
npm run test:headed
npm run test:debug
npm run report
npm run typecheck
```

### What each script does

- `npm test` runs the entire suite across browsers
- `npm run test:ui` runs UI tests only
- `npm run test:headed` launches browsers in headed mode
- `npm run report` opens the HTML Playwright report
- `npm run typecheck` validates TypeScript correctness

---

## 11. Why This Architecture Works Well

This project is simple but effective because it separates responsibilities clearly:

- tests define behavior
- page objects define user interactions
- configuration defines execution behavior
- Playwright handles browser automation and assertions

This structure is easy to maintain and scales well when new test scenarios are added.

---

## 12. Typical Working Example

A full workflow might be:

1. open GitHub homepage
2. search for `microsoft/playwright`
3. click the repository result
4. confirm repository name and owner
5. click Issues tab
6. assert the URL contains `/issues`
7. go back
8. click Pull requests
9. assert the URL contains `/pulls`

This is exactly the kind of end-to-end validation this framework is built to automate.

---

## 13. Strengths of the Current Design

- easy to understand
- reusable page classes
- low duplication
- cross-browser coverage
- focused on real user behavior
- clean test structure

---

## 14. Improvement Opportunities

As the project grows, the team can enhance it by adding:

- shared utilities for waiting and retries
- custom assertion helpers
- more robust selectors for UI stability
- API test coverage
- CI/CD pipeline integration
- reporting enhancements and screenshots on failure

---

## 15. Final Summary

This repository is a Playwright + TypeScript automation framework for GitHub UI testing. It uses the Page Object Model to keep tests clean, reusable, and maintainable. The architecture is intentionally simple: browser automation in Playwright, UI actions grouped by page object classes, and test files focused on end-user flows.

This makes it a strong foundation for UI regression testing and browser automation workflows.
