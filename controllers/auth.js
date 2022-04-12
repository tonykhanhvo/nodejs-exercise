const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie') ? req
    .get('Cookie')
    .split('=')[1] == 'true' : false;
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('62330680cb57770ee440f8d9')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect('/');
      })
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};