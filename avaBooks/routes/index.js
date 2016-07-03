var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET hello world. */
router.get('/helloWorld', function(req, res, next) {
  res.render('index', { title: 'Whatsup World' });
});

/* GET Userlist page. */
router.get('/books', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('books', {
            "books" : docs
        });
    });
});

module.exports = router;
