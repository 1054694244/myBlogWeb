var express = require('express');
var router = express.Router();

/**
 * 生成一个路由实例用来捕获访问主页的GET请求，
 * 导出这个路由并在app.js中通过app.use('/', routes);
 * 加载。这样，当访问主页时，就会调用res.render('index', { title: 'Express' });渲染views/index.ejs模版并显示到浏览器中。
 */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { message: 'Express' });
});
router.get('/basic/menu', function(req, res, next) {
  res.render('basic/menu', { title: 'Express' });
});
router.get('/basic/user', function(req, res, next) {
    res.render('basic/user', { title: 'Express' });
});
router.get('/basic/role', function(req, res, next) {
    res.render('basic/role', { title: 'Express' });
});
router.get('/basic/myEchart', function(req, res, next) {
    res.render('basic/myEchart', { title: 'Express' });
});

module.exports = router;
