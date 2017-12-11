const Web3 = require('web3');
const pineapple_artifacts = require('./build/contracts/Pineapple.json')
const contract = require('truffle-contract');
const Pineapple = contract(pineapple_artifacts);

let instance;
const account = '0x161288866b0ae8138ac4e1882bbfa13c0098aa36';

const main = async () => {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

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
      console.log('result', result);
    }
  })

  await fireEvent();

  console.log('result', result[0], result[1].valueOf());
}

const fireEvent = () => {
  instance.setApple('poo', 5, { from: account })
    .then(data => Promise.resolve())
    .catch(error => Promise.reject())
}

main();

exports.fireEvent = fireEvent;
exports.main = main;
