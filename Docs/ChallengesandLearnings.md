Challenges and Learnings

Challenge 1
Issue: Playwright reported "No tests found".
Root Cause: Unsaved test file and incorrect execution path.
Resolution: Saved all files and validated test discovery.
Learning: Always verify test discovery before debugging locators.

Challenge: GitHub locators changed.
Resolution: Used Playwright Codegen and Trace Viewer.
Learning: Prefer resilient role-based locators.

Challenge 2 GitHub repository deletion returned 403.
Resolution Identified PAT permission configuration limitation.
Learning Differentiate framework issues from environment issues.

Challenge 3 Dynamic GitHub UI locators.
Resolution Used Playwright role-based selectors.
Learning Prefer resilient locators over brittle CSS selectors.
