const mongoose = require('mongoose');

mongoose.Promise = global.Promise;  // use native promises

const uri = `mongodb://admin:admin@cls-shard-00-00-zxxde.mongodb.net:27017,
                                 cls-shard-00-01-zxxde.mongodb.net:27017,
                                 cls-shard-00-02-zxxde.mongodb.net:27017
                                 /chat?ssl=true&replicaSet=cls-shard-0&authSource=admin`;

mongoose.connect(uri)
  .catch((err) => { // catch initial connection error
    console.log('error: ' + err); // eslint-disable-line
  });

const db = mongoose.connection;

db.once('open', () => {
  console.log('connected'); // eslint-disable-line
});

module.exports = { db };
