var express = require('express');
var router = express.Router();

router.get('/basic/menu', function(req, res, next) {
  res.render('basic/menu', { title: 'Express' });
});

/*router.get('/login', function(req, res, next) {
  res.render('login', { message: 'Express' });
});*/

module.exports = router;
