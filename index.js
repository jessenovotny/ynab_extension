var ynabApiKey
var ynabBudgetId

(function() {
  chrome.storage.sync.get(['ynabApiKey', 'ynabBudgetId'], function(result) {
    ynabApiKey = result.ynabApiKey
    ynabBudgetId = result.ynabBudgetId

    if (ynabApiKey && ynabBudgetId) {
      showQuickLogger()
    } else if (ynabApiKey) {
      selectBudget()
    }
  })
})()

function showQuickLogger() {
  $('#api-input-container').hide()
  $('#budget-select-container').hide()
  $('#log-input-container').show()
  getAccounts()
}

function selectBudget() {
  var uri = 'https://api.youneedabudget.com/v1' + 
    `/budgets?access_token=${ynabApiKey}`
  $.get(uri, function(res) {
    if (res.data.budgets.length > 1) {
      populateSelects("#budget-select", res.data.budgets)
      $('#api-input-container').hide()
      $('#budget-select-container').show()
    } else {
      // use one and only budget; skip select
      var budgetId = res.data.budgets[0].id
      storeBudgetId(budgetId)
    }
  })
}

function getAccounts() {
  var uri = `https://api.youneedabudget.com/v1/budgets/${ynabBudgetId}` +
    `/accounts?access_token=${ynabApiKey}`
  $.get(uri, function(res) {
    populateSelects("#log-account", res.data.accounts)
  })
}

function populateSelects(selector, objects) {
  objects.forEach(function(obj) {
    if (!obj.closed) {
      var option = `<option value="${obj.id}">
        ${obj.name}</option>`
      $(selector).append(option)
    }
  })
}

function storeApiKey(apiKey) {
  chrome.storage.sync.set({"ynabApiKey": apiKey}, function() {
    ynabApiKey = apiKey
    selectBudget()
  });
}

function storeBudgetId(budgetId) {
  chrome.storage.sync.set({"ynabBudgetId": budgetId}, function() {
    ynabBudgetId = budgetId
    showQuickLogger()
  });
}

function createTransaction(amount) {
  var uri = `https://api.youneedabudget.com/v1/budgets/${ynabBudgetId}` +
    `/transactions?access_token=${ynabApiKey}`
  var data = { "transaction": {
    "account_id": $("#log-account").val(),
    "date": date(),
    "amount": parseAmount(),
    "memo": $("#log-memo").val()
  }}
  $.post(uri, data, function(res) {
    clearInputs()
  }).fail(function(err){
    alert(err.responseJSON.error.detail)
  })
}

$('#budget-select').keypress(function(event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(isEnterKey(keycode)){
    storeBudgetId(event.target.value)
  }
});

$('#api-input').keypress(function(event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(isEnterKey(keycode)){
    var apiKey = event.target.value
    validateAndStoreApiKey(apiKey)
  }
});

$('#log-amount').keypress(function(event) {
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(isEnterKey(keycode)){
    var amount = event.target.value
    createTransaction(amount)
  }
});

function isEnterKey(code) { return code == '13' }

function clearInputs() {
  $("#log-amount").val('')
  $("#log-memo").val('')
}

function parseAmount() {
  var currency = $("#log-amount").val()
  var cents = Number(currency.replace(/[^0-9.-]+/g,"")) * -1000
  return cents !== 0 ? cents : null
}

function date(){
  var today = new Date()
  var dd = String(today.getDate()).padStart(2, '0')
  var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  var yyyy = today.getFullYear()
  return yyyy + '-' + mm + '-' + dd
}

function validateAndStoreApiKey(apiKey) {
  var uri = 'https://api.youneedabudget.com/v1' +
    `/user?access_token=${apiKey}`
  $.get(uri, function(res) {
    storeApiKey(apiKey)
  }).fail(function(){
    alert("Invalid API Key")
  })
}
