var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  res.send("testing the view.js route")
});

//Create / Book route
router
.get('/book', (req, res) => {

  db.collection('books').find().toArray((err, results) =>{
      if(err) return console.log(err);

      // render the view for the view books
      res.render('viewBooks.ejs', {books: results})
  });
})


module.exports = router