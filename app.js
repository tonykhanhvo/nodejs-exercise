const http = require('http');

const express = require('express');
const bodyParse = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParse.urlencoded({extended: false}));

app.use(adminRoutes);
app.use(shopRoutes);

const server = http.createServer(app);

server.listen(3000);