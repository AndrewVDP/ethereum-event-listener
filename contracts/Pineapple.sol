pragma solidity ^0.4.17;

contract Pineapple {
    
  string foo;
  uint bar;

  event Pine(
    string baz,
    uint qux
  );

  function setApple(string _baz, uint _qux) public {
    foo = _baz;
    bar = _qux;
    Pine(_baz, _qux);
  }

  function getApple() view public returns (string, uint) {
    return (foo, bar);
  }
   
}
