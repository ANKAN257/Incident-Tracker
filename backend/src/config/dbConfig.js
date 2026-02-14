const mongoose = require('mongoose');
// console.log("process.env.mongo_url:",process.env.mongo_url);

mongoose.connect(process.env.mongo_url)
  .then(() => console.log('Database connection established '))
  .catch(err => console.error('Error connecting to Database:', err));

module.exports = mongoose.connection;
