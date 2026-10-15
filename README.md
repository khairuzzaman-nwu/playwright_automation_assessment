# playwright_automation_assessment

#  UI Automation & API Automation

## Project Overview

This project automates UI testing of the [SauceDemo](https://www.saucedemo.com/) web application using Playwright with JavaScript and the Page Object Model (POM) design pattern. It also automates API testing of the Reqres API](https://reqres.in/api) using Postman and Newman.

The project covers positive and negative test scenarios, assertions, response status validation, checkout verification, and HTML test reporting.

## Technologies Used

- Programming Language: JavaScript
- UI Automation: Playwright Test
- Design Pattern:Page Object Model (POM)
- API Testing: Postman
- Command-Line API Execution: Newman
- Reporting: Playwright HTML Report and Newman HTML Extra Report
- Version Control: Git and GitHub


## UI Automation Testing

Application URL: https://www.saucedemo.com/

### Q1: Locked-Out User Login

Test Objective: Verify that a locked-out user cannot log in.

Test steps:
1. Navigate to the SauceDemo login page.
2. Enter username locked_out_user.
3. Enter password secret_sauce.
4. Click the Login button.
5. Verify that the expected locked-out error message is displayed.

Expected Result: Login is unsuccessful, and the application displays the appropriate error message.

### Q2: Standard User Checkout

Test Objective: Verify the complete purchase journey for a standard user.

Test steps:
1. Log in using standard_user.
2. Reset the application state from the hamburger menu.
3. Add any three products to the cart.
4. Open the cart and verify the product names.
5. Proceed to checkout.
6. Enter checkout information.
7. Verify all selected product names and the subtotal.
8. Validate the final total against the subtotal and tax.
9. Finish the purchase.
10. Verify the successful order confirmation message.
11. Reset the application state and log out.

Expected Result: The three selected products are checked out successfully, prices are verified, and the order confirmation is displayed.

### Q3: Performance-Glitch User Checkout

Test Objective: Verify product sorting and checkout functionality for a performance-glitch user.

Test steps:
1. Log in using performance_glitch_user.
2. Reset the application state.
3. Sort products by Name, Z to A.
4. Add the first product in the sorted list to the cart.
5. Open the cart and verify the selected product name.
6. Proceed to checkout and enter the required information.
7. Verify the product name, subtotal, and final total.
8. Finish the purchase and verify the successful order message.
9. Reset the application state and log out.

Expected Result: The first product after descending alphabetical sorting is selected and purchased successfully, with the product name and checkout amounts verified.

## API Automation Testing

Base URL: https://reqres.in/api

API Documentation: https://app.reqres.in/documentation

API tests are maintained in the Postman collection and can be executed locally using Newman.

### Q3: Login and Capture Authentication Token

- Send a POST request to /login.
- Provide registered credentials.
- Verify the HTTP response status.
- Validate that the response contains a non-empty token.
- Store the token in the Postman environment as authToken.

### Q4: Get User by User ID

- Send a GET request to /users/{{userId}}.
- Verify the HTTP response status.
- Validate the returned user's name and email against the expected environment values.

### Q5: Update Profile Using PUT

- Send a PUT request to /users/{{userId}}.
- Submit updated profile information.
- Verify the response status.
- Validate the returned name and job.
- Verify that updatedAt exists and represents a valid timestamp.

### Q6: Update a Single Field Using PATCH

- Send a PATCH request to /users/{{userId}}.
- Update only the job field.
- Verify the response status.
- Validate the updated job value.
- Verify that the response contains the updated timestamp and does not contain an unrelated name field.

### Q8: Negative API Testing

Execute the following negative test cases:

1. Login with a missing password.
2. Login with an unknown user.
3. Request an invalid user ID.
4. Update an invalid user ID.

Expected Result: Each negative test asserts that the response status falls within the 4xx client-error range.

 Note: Reqres is a demo API. Its current authentication requirements, response behavior, and data persistence may vary. Update the API  key and expected test data in the Postman environment if required.

## Prerequisites

Install the following software before running the project:

- [Node.js](https://nodejs.org/) — version 18 or later recommended
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/) — optional for editing or manually running the collection
- Playwright-supported Chromium browser, installed through the setup commands below

## Installation and Setup

### Step 1: Clone the Repository


git clone https://github.com/YOUR_USERNAME/saucedemo-reqres-automation.git
cd saucedemo-reqres-automation


Replace YOUR_USERNAME with your GitHub username.

### Step 2: Install Dependencies


npm install


### Step 3: Install the Playwright Browser


npx playwright install chromium


## Running UI Tests

Run the locked-out user test:


npm run test:ui:q1


Run the standard user checkout test:


npm run test:ui:q2


Run the performance-glitch user checkout test:


npm run test:ui:q3


Run all UI scenarios sequentially:


npm run test:ui:all


Run all configured Playwright tests:


npm test


To run the tests with a visible browser:


npm run test:ui:headed


## Running API Tests

Execute the Postman collection from the command line:


npm run api


This command runs the collection using Newman and generates an HTML report.

The report is saved at:


reports/reqres-api-report.html


The collection and environment JSON files can also be imported into Postman for manual inspection or execution.

## Test Reporting

### Playwright HTML Report

After a UI test run, the report is generated in:


playwright-report/index.html


Open the report with:


npm run report


The report provides test results, pass/fail status, and supporting artifacts where available.

### Newman HTML Report

After an API test run, open:


reports/reqres-api-report.html


The report summarizes API requests, response status assertions, and test results.

**Note:** Reports are regenerated during subsequent runs. Copy or archive previous reports if you need to retain execution history. Generated reports are excluded from Git by default.

## Execution Strategy

The UI tests are configured to run sequentially with one worker and parallel execution disabled. Each scenario can also be executed individually.

Every API request includes an HTTP response-status assertion. API response-body validations check the expected fields and values where applicable.

## GitHub Submission

To submit the project:

1. Create a public GitHub repository.
2. Upload the project source code and Postman JSON files.
3. Ensure that README.md is included.
4. Execute the UI and API tests locally.
5. Review the generated reports and fix any failures.
6. Share the public GitHub repository URL with the assessor.

## Important Notes

- Use only the provided public SauceDemo test accounts.
- Do not commit private API keys, passwords, or other secrets to GitHub.
- Confirm the expected Reqres user data before executing the API tests.
- The demo API may simulate profile updates instead of permanently saving them.
- Verify that all tests pass in your own environment before final submission.

## Author

Md.Khairuzzaman

Software Quality Assurance (SQA) Engineer | UI Automation | API Automation

Email    : khairuzzaman173@gmail.com
Linkedin : www.linkedin.com/in/md-khairuzzamannwu 
