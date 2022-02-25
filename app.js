const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('In the middleware here!');
  next(); //Call next() cho phep request di den middleware tiep theo
});

app.use((req, res, next) => {
  console.log('In another middleware!')
  //... Send Response
});

const server = http.createServer(app);

server.listen(3000);