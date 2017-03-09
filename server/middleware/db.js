const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function(dbURI) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbURI);

    // When successfully connected
    mongoose.connection.on('connected', function () {
      console.log('Mongoose connection open to ' + dbURI);
      resolve();
    });

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
      reject('Mongoose default connection error: ' + err);
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });

      // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
      mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });

  });
};