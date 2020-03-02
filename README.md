# YNAB Quick Add Chrome Extension

### Description
This extension allows you to log transactions from your browser without having to open the YNAB web or mobile apps.

### Disclaimer
This extension is for development/personal use only as it requires a YNAB personal access token for your YNAB account. This token is cached in your Chrome account and nowhere else. This application is not authorized for distribution. Asking YNAB users to provide their personal access token does not comply with their YNAB's terms of use.

To clear your personal access token, right-click the extension icon, select Options, and then click the Logout button.

### Installation
* Clone this repository: `git@github.com:jessenovotny/ynab_extension.git`
* Open Chrome web browser and navigate to chrome://extensions.
* Toggle 'Developer mode' on.
* Click the 'Load unpacked' button and select the 'ynab_extension' folder.
* The YNAB Quick Add extension is now installed.

### Setup
* Click the YNAB extension icon.
* Enter your Personal Access token and hit Enter.
  - Clicking the ? will take you to https:ave//app.youneedabudget.com/settings/developer where you can generate a new token.
* Select a budget and hit Enter.
  - If you only have one budget, this step is skipped automatically.
  - To change budgets, you must logout and start over.

### Adding Transactions
* Select an Account from the dropdown.
* Add a memo.
* Add the amount.
* Hit Enter.
  - The fields will reset if the transaction was successfully created
* New transactions will be missing a Payee & Category. 
  - YNAB will will prompted you to provide these details when you next visit the app.


### Future Features
* Add Payee field
  - Select from list of Payees. 
  - Autocomplete while the user types. 
  - Create New Payee if none already exists.
* After selecting an Account, this selection remains as the default selected option until it is changed.