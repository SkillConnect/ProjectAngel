// 0. Fetch all client details
var allClients = {}
firebase.database().ref('/clients').on('value', (snapshot) => {
  allClients = snapshot.val()
  showStatusLog('Client details loaded!', 'info')
})
var apiKey = ''

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-UserType': 'USER',
  'X-SourceID': 'WEB',
  'X-ClientLocalIP': '192.168.168.168',
  'X-ClientPublicIP': '1.2.3.4',
  'X-MACAddress': 'fe80::216e:6507:4b90:3719',
  'X-PrivateKey': `${apiKey}`
}

function login(credentials){
  var data = JSON.stringify({
    'clientcode': credentials.clientCode || '',
    'password': credentials.password || ''
  });

  var config = {
    method: 'post',
    url: 'https://apiconnect.angelbroking.com/rest/auth/angelbroking/user/v1/loginByPassword',
    headers : headers,
    data : data
  };

  return axios(config)
}

async function placeOrder(credentials, originalOrder, multiplier) {
  var response = await login(credentials)
  if(!response.data.status) {
    showStatusLog(`Failed login for: ${credentials.name}`, 'danger')
    console.log(response.data.errorcode, response.data.message)
    return
  }
  var token = response.data.data.jwtToken
  var data = JSON.stringify({
    'variety': originalOrder['variety'],
    'tradingsymbol': originalOrder['tradingsymbol'],
    'symboltoken': originalOrder['symboltoken'],
    'transactiontype': originalOrder['transactiontype'],
    'exchange': originalOrder['exchange'],
    'ordertype': originalOrder['ordertype'],
    'producttype': originalOrder['producttype'] || originalOrder[''],
    'duration': originalOrder['duration'],
    'price': 0,
    'squareoff': originalOrder['squareoff'],
    'stoploss': originalOrder['stoploss'],
    'quantity': originalOrder['quantity'] * multiplier
  });

  var config = {
    method: 'post',
    url: 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/order/v1/placeOrder',
    headers: headers,
    data : data
  };
  config.headers['Authorization'] = `Bearer ${token}`

  var response = await axios(config)
  if(!response.data.status) {
    showStatusLog(`Failed to place order for: ${credentials.name}`, 'danger')
    return
  }
  showStatusLog(`Successfully placed order for: ${credentials.name}`, 'danger')
}

// 3a. Login to account
// 3b. Create place order config based upon settings
// 3c. Check if order succesful, show success message
// 3d. Else show fail error
function copyOrders(originalOrder) {
  // Retreiving all account details
  jQuery.for(allClients, function(ID, details) {
    if(details){
      let name = details.name;
      let clientCode = details.userID;
      let password = details.password;
      let status = details.status;
      let marketCategory = details.marketCategory;
      let multiplier = details.multiplier;

      if (status === 'ON' && marketCategory.includes(originalOrder.exchange)) {
        var credentials = {name, clientCode, password}
        placeOrder(credentials, originalOrder, multiplier)
      }
      else{
        showStatusLog(`Skipping for ${name}`, 'warning')
      }
    }
  })
}

function showStatusLog(msg, type) {
  const newLog = `
      <div class='alert alert-${type} alert-dismissible fade show' role='alert'>
        ${msg}
        <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
      </div>
  `
  const allLogs = document.getElementById('statusLogs')
  allLogs.innerHTML += newLog
  console.log(msg)
}

async function main() {
  // 0. Fetch owner data from Firebase
  const snapshot = await firebase.database().ref('/owner').once('value')
  const owner = snapshot.val()
  apiKey = owner.apiKey
  const kapilsCredentials = {'clientCode': owner.AngelBrokingID, 'password': owner.AngelBrokingPassword}
  // 1. Login to Kapil's account and obtain JWT token
  showStatusLog('Attempting to login', 'info')
  var response = await login(kapilsCredentials)
  if(!response.data.status) {
    showStatusLog('Login attempt failed, please try refreshing or update your credentials', 'danger')
    console.log(response.data.errorcode, response.data.message)
    return
  }
  showStatusLog('Login Succesful!', 'success')
  const jwtToken = response.data.data.jwtToken
  // 2. Start WebSocket to Kapil's account using JWT token
  startWebSocket(jwtToken, owner.AngelBrokingID)
  // 3. On place order, call a sync function 
  // that loops over all account to copy the order
}

main()
