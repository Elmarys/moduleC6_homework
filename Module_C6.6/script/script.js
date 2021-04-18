const input = document.querySelector('.input-message');
const sendButton = document.querySelector('.send-message');
const geoButton = document.querySelector('.geo');
const chatWindow = document.querySelector('.chat');

const wsUrl = "wss://echo.websocket.org/";

let geoMsg;

let websocket;

let right;

openConnection();

function openConnection () {
  websocket = new WebSocket(wsUrl);
  writeToScreen('CONNECTION...');
  websocket.onopen = function(evt) {
    writeToScreen("CONNECTED");
    sendButton.disabled = false;
  };
};


websocket.onmessage = function(evt) {
    writeToScreen(
      '<p style="padding: 3px; word-wrap: break-word; max-width: 240px;">' + evt.data+'</p>', client = false
    );
  };
websocket.onerror = function(evt) {
    writeToScreen(
      '<p style="padding: 3px; word-wrap: break-word;max-width: 240px;">ERROR:</p> ' + evt.data, client = false
    );
  };

function writeToScreen(message, client) {
  let cssStyle;
  if (client) {
    cssStyle = `
    margin-top: 20px; 
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    width: 250px; 
    border: 4px solid #87CEFA; 
    border-radius: 15px; 
    margin-left: auto;
    `
  } else {
    cssStyle = `
    word-wrap: break-word; 
    margin-top: 20px; 
    margin-left: 10px; 
    margin-right: 10px;
    margin-bottom: 5px;
    width: 250px; 
    border: 4px solid #87CEFA; 
    border-radius: 15px;
    `
  };
  let pre = document.createElement("div");
  pre.style.cssText = cssStyle
  pre.innerHTML = message;
  chatWindow.appendChild(pre);
};

const error = () => {
  geoMsg = 'Невозможно получить ваше местоположение';
  writeToScreen(geoMsg);
};

const success = (position) => {

  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  let mapLink = document.createElement("a");
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Геолокация';
  mapLink.style.cssText = "margin-top: 25px; margin-left: 10px; border: 4px solid #87CEFA; border-radius: 15px; padding: 5px; width:250px;"
  chatWindow.appendChild(mapLink);
};

function showGeolocation() {
  
  if (!navigator.geolocation) {
    geoMsg = 'Geolocation не поддерживается вашим браузером';
    writeToScreen(geoMsg);
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

sendButton.addEventListener('click', () => {
  const message = input.value;
  writeToScreen('<p style="padding: 3px; word-wrap: break-word;max-width: 240px;">' + message +'</p>', client = true);
  websocket.send(message);
});

geoButton.addEventListener('click', () => {
  showGeolocation();
});

