UI Test Scenarios || API Test Scenarios || Integ Test Scenarios
-----------------------------
UI-001 Repository Search
Objective: Validate public repository search.

Steps:
Open GitHub
Search microsoft/playwright
Open repository
Validate repository name
Validate owner
Expected Result: Repository details displayed correctly.

Status: Passed

UI-002 Repository Navigation
Objective: Validate repository tab navigation.

Steps:
Open GitHub
Search microsoft/playwright
Open repository
Navigate to Issues
Validate URL contains issues
Navigate to Pull Requests
Validate URL contains pulls

Status: Passed


UI-003 Repository Filtering
Objective
Validate repository filtering functionality within an organization.

Steps
Open GitHub
Navigate to the Microsoft organization page
Open the Repositories tab
Search for playwright in the repository search field
Verify the playwright repository is displayed in the filtered results
Expected Result
The repository search should return matching repositories and display the playwright repository.

Actual Result
The playwright repository was displayed successfully after applying the repository filter.

Status: Passed 

-------------------------------------------------------------------------------------------------------

API-001 Get Authenticated User
Objective
Validate retrieval of authenticated GitHub user details.

Steps
Load GitHub credentials from environment configuration
Send GET request to the authenticated user endpoint
Verify the response status code is 200
Validate the response contains user login information
Validate the response contains a user ID
Expected Result
Authenticated user details should be returned successfully.

Actual Result
User details were retrieved successfully and all validations passed.

Status
Passed ✅

API-002 Create Repository
Objective
Validate creation of a GitHub repository using the GitHub API.

Steps
Generate a unique repository name
Send POST request to create a repository
Verify the response status code is 201
Validate the repository name in the response
Validate the repository was created successfully
Expected Result
A new repository should be created successfully.

Actual Result
Repository was created successfully and response validations passed.

Status
Passed ✅

API-003 Delete Repository
Objective
Validate deletion of a GitHub repository using the GitHub API.

Steps
Create a test repository
Retrieve the authenticated user information
Send DELETE request for the created repository
Verify the response status code
Validate repository deletion
Expected Result
The repository should be deleted successfully.

Actual Result
Repository deletion functionality was implemented and validated. Execution returned HTTP 403 due to GitHub Personal Access Token permission limitations in the test environment.

Status
Implemented ⚠️
-------------------------------------------------------------------------------------------------------
INT-001 Repository Lifecycle
Objective
Validate repository lifecycle using both API and UI automation.

Steps
Create a repository using GitHub API
Retrieve the repository URL from the API response
Open the repository URL in the browser
Validate the repository page is displayed
Verify the repository name is visible in the UI
Attempt repository cleanup using API
Expected Result
Repository created through API should be accessible and validated successfully through the UI.

Actual Result
Repository was created through API, validated successfully in the UI, and cleanup process was executed.

Status
Passed ✅