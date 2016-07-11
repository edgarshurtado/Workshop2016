var express = require('express');
var router = express.Router();
var nombres = require('../controllers/Data.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hellow Twig', nombres: nombres.getNames() });
});

module.exports = router;
