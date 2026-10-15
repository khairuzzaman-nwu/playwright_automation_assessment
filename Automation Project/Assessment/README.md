# SauceDemo UI + Reqres API Automation Assessment

JavaScript project using **Playwright Test + Page Object Model** for UI scenarios and **Postman Collection + Newman** for API scenarios.

## Included
- UI Q1: `locked_out_user` error assertion.
- UI Q2: `standard_user`, reset app state, add three products, verify cart names and final checkout subtotal/total, finish order, reset state and logout.
- UI Q3: `performance_glitch_user`, reset app state, sort Name (Z to A), add first product, verify product name and checkout prices, finish order, reset and logout.
- API Q3: login and store token.
- API Q4: GET user and compare name/email against environment values.
- API Q5: PUT profile and validate `updatedAt`.
- API Q6: PATCH one field and validate response contains the changed field and timestamp without the unrelated `name` field.
- API Q8: four bad-request cases, each asserting a 4xx status.
- Playwright HTML report on each UI execution; Newman HTML report on API execution.

## Requirements
- Node.js 18+ (Node 20 LTS recommended)
- Google Chrome/Chromium supported by Playwright
- Postman optional for opening/editing the collection; Newman runs it from the command line.

## Install
```bash
npm install
npx playwright install chromium
```

## Run UI scenarios separately
Each command generates/updates `playwright-report/`.
```bash
npm run test:ui:q1
npm run test:ui:q2
npm run test:ui:q3
```
Open the latest report:
```bash
npm run report
```

## Run all UI scenarios sequentially
The config sets `workers: 1` and `fullyParallel: false`, so scenarios run one after another:
```bash
npm run test:ui:all
```
Or run all tests:
```bash
npm test
```
After each Playwright execution, the HTML report is written to `playwright-report/index.html`. A new run replaces the prior report; archive/copy it before the next run if you need to retain each run.

## Run API tests with Postman/Newman
The collection is executable locally from the command line:
```bash
npm run api
```
Or directly:
```bash
npx newman run postman/reqres-assessment.postman_collection.json \
  -e postman/reqres-local.postman_environment.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export reports/reqres-api-report.html
```
Open `reports/reqres-api-report.html` after execution. API requests are in collection order. The login request saves the returned `token` to `authToken`; the subsequent requests use environment variables for IDs and test data.

## Reqres API notes
Reqres is a hosted demo API. Depending on the current Reqres account/API configuration, an API key may be required. The included environment sets `apiKey` to `reqres-free-v1`; if your Reqres documentation/account supplies a different key, update `apiKey` in Postman environment before running. Do not commit private/paid API keys to a public repository. Demo endpoints may simulate writes rather than persist them. The sample GET user check expects user ID `2` to be Janet Weaver; update `expectedName` / `expectedEmail` if you choose a different user ID.

## GitHub upload
1. Create a **public** GitHub repository, e.g. `saucedemo-reqres-automation`.
2. Unzip this project.
3. From the extracted folder:
```bash
git init
git add .
git commit -m "Add Playwright POM and Reqres Postman automation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/saucedemo-reqres-automation.git
git push -u origin main
```
4. Share the real repository URL after pushing. This package does not create or publish a GitHub repository for you.

## Project structure
```text
pages/
  LoginPage.js
  InventoryPage.js
  CartPage.js
  CheckoutPage.js
tests/ui/
  locked-out.spec.js
  standard-user-checkout.spec.js
  performance-glitch-checkout.spec.js
postman/
  reqres-assessment.postman_collection.json
  reqres-local.postman_environment.json
playwright.config.js
package.json
README.md
```

## Troubleshooting
- If the site/API is temporarily unavailable, rerun after checking connectivity.
- If Reqres rejects the API key, replace the environment variable with the key specified in your Reqres dashboard/docs.
- If an API test fails because the public demo data changed, verify the user record at `GET /users/{{userId}}` and update expected values.
- Keep `node_modules`, generated reports, and credentials out of GitHub.
