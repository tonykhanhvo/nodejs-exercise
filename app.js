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
const authRoutes = require('./routes/auth');

app.use(bodyParse.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('62330680cb57770ee440f8d9')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://funix-nodejs:funix-nodejs@cluster0.kw5wd.mongodb.net/shop?retryWrites=true&w=majority')
  .then(result => {
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            name: 'Max',
            email: 'tonyvo@test.com',
            cart: {
              items: []
            }
          });
          user.save();
          console.log('Created User');
        }
      })
    app.listen(3000);
    console.log('CONNECTED !!!')
  })
  .catch(err => {
    console.log(err);
  })