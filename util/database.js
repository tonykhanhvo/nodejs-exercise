const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://funix-nodejs:funix-nodejs@cluster0.kw5wd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(client => {
      console.log('Connected!');
      callback(client);
    })
    .catch(err => {console.log(err)});
};

module.exports = mongoConnect;