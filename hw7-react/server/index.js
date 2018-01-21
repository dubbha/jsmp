const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {  // https://enable-cors.org/server_expressjs.html
  res.header('Access-Control-Allow-Origin', '*');
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
