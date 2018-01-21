const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const router = express.Router();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use((req, res, next) => {  // https://enable-cors.org/server_expressjs.html
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => { // SPA default route
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(3000, () => {
  console.log('listening on *:3000');  // eslint-disable-line
});
