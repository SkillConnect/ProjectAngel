var heartbeatInterval;

function startWebSocket(jwtToken, clientCode) {
  const wsUri = `wss://smartapisocket.angelbroking.com/websocket?jwttoken=${jwtToken}&&clientcode=${clientCode}&&apikey=${apiKey}`;
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt, jwtToken, clientCode) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(event, jwtToken, clientCode) {
  var data = `{
    "actiontype": "subscribe",
    "feedtype": "order_feed",
    "jwttoken": "${jwtToken}",
    "clientcode": "${clientCode}",
    "apikey": "${apiKey}"
  }`
  websocket.send(data);
  startHeartbeat(jwtToken, clientCode);
  showStatusLog('Listening for orders...', 'info');
}

function onClose() {
  showStatusLog('WebSocket disconnected!', 'danger');
  clearInterval(heartbeatInterval)
}

function onMessage(event) {
  showStatusLog(`Message received from Angel Broking API. Details: ${event.data}`, 'warning');
  if (typeof(event.data) === 'object') {
    copyOrders(event.data);
  }
}

function onError(event) {
  showStatusLog(`WebSocket Error: ${event.data}`, 'warning');
  console.log(event);
}

function startHeartbeat(jwtToken, clientCode) {
  heartbeatInterval = setInterval(function () {
    var _hb_req = `{
        "actiontype": "heartbeat",
        "feedtype": "order_feed",
        "jwttoken": "${jwtToken}",
        "clientcode": "${clientCode}",
        "apikey": "${apiKey}"
    }`
    websocket.send(_hb_req);
    console.log('Heartbeat sent')
  }, 58000);
}
