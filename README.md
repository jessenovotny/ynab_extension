# YNAB Quick Add Chrome Extension

### Description
This extension allows you to log transactions from your browser without having to open the YNAB web or mobile apps.

### Disclaimer
This extension is for development/personal use only as it requires a YNAB personal access token for your YNAB account. This token is cached in your Chrome account and nowhere else. This application is not authorized for distribution. Asking YNAB users to provide their personal access token does not comply with their YNAB's terms of use.

To clear your personal access token, right-click the extension icon, select Options, and then click the Logout button.

### Installation
1. Clone this repository: `git@github.com:jessenovotny/ynab_extension.git`
2. Open Chrome web browser and navigate to chrome://extensions.
3. Toggle 'Developer mode' on.
4. Click the 'Load unpacked' button and select the 'ynab_extension' folder.
5. The YNAB Quick Add extension is now installed.

### Setup
1. Click the YNAB extension icon.
2. Enter your Personal Access token and hit Enter.
  1. Clicking the ? will take you to https:ave//app.youneedabudget.com/settings/developer where you can generate a new token.
3. Select a budget and hit Enter.
  1. If you only have one budget, this step is skipped automatically.
  2. To change budgets, you must logout and start over.

### Adding Transactions
1. Select an Account from the dropdown.
2. Add a memo.
3. Add the amount.
4. Hit Enter.
 - The fields will reset if the transaction was successfully created