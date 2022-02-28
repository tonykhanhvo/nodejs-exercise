const http = require('http');

const express = require('express');
const bodyParse = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParse.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
})

const server = http.createServer(app);

server.listen(3000);