const express = require('express');

const db = require('./middleware/db');

const DB_URI = "mongodb://localhost:27017/acc-test";
const app = express();

require('./api')(app);

db(DB_URI)
  .then(() => {
    console.log('db connected...');
    app.listen(3000, () => {
      console.log('server started...');
    });
  });