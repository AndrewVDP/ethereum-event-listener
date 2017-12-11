const rabbitUrl = process.env.RABBITMQ_URL || 'amqp://localhost';
console.log('rabbitUrl')
const options = {
	url: rabbitUrl
}
const bus = require('servicebus').bus(options);

const publish = (queue, event) => {
	bus.publish(queue, event);
	return;
}

const subscribe = (queue) => {
	bus.subscribe(queue, (event) => {
    console.log('subscribe', event);
  });	
}

exports.publish = publish;
exports.subscribe = subscribe;
