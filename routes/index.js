var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  let opt = {
    title: 'Index',
  }
  res.render('index', opt);
});

router.get('/colorchange', function(req, res, next) {
  let opt = {
    title: 'Color change',
  }
  res.render('colorchange', opt);
});

router.get('/shutten', function(req, res, next) {
  let opt = {
    title: '出典',
  }
  res.render('shutten', opt);
});


module.exports = router;
