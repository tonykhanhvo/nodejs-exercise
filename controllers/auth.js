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
  req.session.isLoggedIn = true;
  res.redirect('/');
}