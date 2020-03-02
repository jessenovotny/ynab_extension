function logout() {
  chrome.storage.sync.set({
    ynabApiKey: null,
    ynabBudgetId: null
  }, function() {
    alert("New number. Who dis?")
  });
}

document.getElementById('logout').addEventListener('click', logout);