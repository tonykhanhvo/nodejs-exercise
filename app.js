const path = require('path');

const express = require('express');
const bodyParse = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParse.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
// User.hasMany(Product); - viet nghich dao voi line tren

sequelize
  .sync({force: true})
  .then(result => {
    // console.log('🚀 ~ file: app.js ~ line 26 ~ sequelize.sync ~ result', result);
    app.listen(3000);
  })
  .catch(err => {
    console.log('🚀 ~ file: app.js ~ line 31 ~ err', err);
  });
