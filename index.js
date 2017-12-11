const Web3 = require('web3');
const pineapple_artifacts = require('./build/contracts/Pineapple.json')
const contract = require('truffle-contract');
const Pineapple = contract(pineapple_artifacts);

const websocketListener = require('./src/websocketListener.js');
const rabbit = require('./src/rabbitmq');
const mail = require('./src/mailer');

let instance;

const account = '0xc983c906be216b8e9e50af80d33b977c3879335b';
// const providerUrl = process.env.PROVIDER_URL || 'wss://socket.etherscan.io/wshandler/';
const providerUrl = process.env.PROVIDER_URL || 'http://localhost:8545';

const listener = async () => {
  rabbit.subscribe('events');

  if(providerUrl.slice(0,1) === 'w') {
    websocketListener.listen(providerUrl);
    return;
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

  Pineapple.setProvider(web3.currentProvider);
  if (typeof Pineapple.currentProvider.sendAsync !== "function") {
    Pineapple.currentProvider.sendAsync = function() {
      return Pineapple.currentProvider.send.apply(
        Pineapple.currentProvider, arguments
      );
    };
  }

  instance = await Pineapple.new({ from: account, gas: 4712388 })
  const pineEvent = await instance.Pine();

  pineEvent.watch((error, result) => {
    if(!error) {
      mail.mail(JSON.stringify(result));
      rabbit.publish('events', result);
      console.log('result', result);
    }
  })
}

const fireEvent = () => {
  instance.setApple('poo', 5, { from: account })
    .then(data => Promise.resolve())
    .catch(error => Promise.reject())
}

exports.fireEvent = fireEvent;
exports.listener = listener;
