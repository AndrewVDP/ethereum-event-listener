var express = require('express');
var app = express();
var router = express.Router();
var main = require('./index.js');

router.get('/', (req, res, next) => {
  main.fireEvent();
  res.json({ you: 'win' });
})

app.use(router);

const port = process.env.PORT || 3000
app.listen(port, function () {
  main.listener();
  console.log(`listening on port ${port}`);
});

