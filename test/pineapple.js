var Pineapple = artifacts.require("./Pineapple.sol");

contract('Pineapple', async function(accounts) {
  
  it("should set apples", async () => {
    const instance = await Pineapple.deployed();
    const res = await instance.setApple.call('poo', 5);

    console.log('res', res);
    assert.equal(res, 10000, "apples were not set");

  });
});
