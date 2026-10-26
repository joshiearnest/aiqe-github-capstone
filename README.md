# AIQE GitHub Capstone

Playwright and TypeScript test framework for UI, API, and integrated tests.

## Setup

```bash
npm install
npx playwright install
```

Set `BASE_URL` to the application URL before running tests. It defaults to
`https://github.com`.

## Run tests

```bash
npm test                 # Run all tests in Chromium, Firefox, and WebKit
npm run test:ui           # Run UI tests
npm run test:api          # Run API tests
npm run test:integrated   # Run integrated tests
npm run test:headed       # Run with visible browsers
npm run test:debug        # Open Playwright Inspector
npm run report            # Open the HTML report
npm run typecheck         # Type-check the TypeScript project
```

Place test files in `tests/ui`, `tests/api`, or `tests/integrated`; name them
`*.spec.ts`. Shared page objects belong in `src/pages`.