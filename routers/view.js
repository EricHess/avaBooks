var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  res.send("testing the view.js route")
});

//Create / Book route
router
.get('/book', (req, res) => {

  var cursor = db.collection('books').find().toArray(function(err, results){
      res.sendFile('viewBooks.html', { root: "./views" });
  });
})


module.exports = router