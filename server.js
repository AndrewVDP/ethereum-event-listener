var express = require('express');
var app = express();
var router = express.Router();
var main = require('./index.js');

router.get('/', (req, res, next) => {
  main.fireEvent();
  res.json({ you: 'win' });
})

app.use(router);

app.listen(3000, function () {
  main.main();
  console.log('port 3000');
});

