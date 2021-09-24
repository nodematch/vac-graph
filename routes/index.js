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






module.exports = router;
