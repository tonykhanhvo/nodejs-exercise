const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add-Product',
    path: '/admin/add-product',
    productCSS: true,
    formsCSS: true,
    activeProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop', {
    prods: products,
    path: '/',
    pageTitle: 'Shop',
    activeShop: true,
    productCSS: true,
    hasProducts: products.length > 0
  });
};