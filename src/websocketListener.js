const WebSocket = require('ws');
const rabbit = require('./rabbitmq');
const mail = require('./mailer');

const listen = (websocketUrl) => {
	const wss = new WebSocket(websocketUrl);

	wss.on('connection', (ws, req) => {
	  const ip = req.connection.remoteAddress;
	  console.log('ip', ip);
	});

	wss.on('open', () => {
		console.log('open');
		pinger();
		const event = {
			"event": "txlist",
			"address": "0x2a65aca4d5fc5b5c859090a6c34d164135398226"
		}

		wss.send(JSON.stringify(event));
	});

	wss.on('close', () => {
	  console.log('disconnected from websocket');
	});

	wss.on('message', (data) => {
	  const parsedData = JSON.stringify(data);
	  rabbit.publish('events', parsedData);
	  mail.mail(parsedData);
	  console.log(`found event:\n ${parsedData}`);
	});
}


const pinger = () => {
	var timer = setInterval(() => {
    if (wss.readyState == 1) {
      console.log(JSON.stringify({ event: "ping" }));
      wss.send(JSON.stringify({ event: "ping" }));
    }
  }, 19000);
  // return { stop: function () { clearInterval(timer); } };
}

exports.listen = listen;
