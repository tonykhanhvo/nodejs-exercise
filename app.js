const path = require('path');

const express = require('express');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParse.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6230a2326f8df3d77c2ba0ac')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id); //ntn se nhan day du cac method tu class User
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://funix-nodejs:funix-node@cluster0.kw5wd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(result => {
    app.listen(3000);
    console.log('CONNECTED !!!')
  })
  .catch(err => {
    console.log(err);
  })