var express = require("express");
var router = express.Router();
const bodyParser= require('body-parser')
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.send("testing the create.js route")
});


//Create / Book route
router
.post('/start', (req, res) =>{
  //WHERE THE USER ID FROM THE HOME PAGE LOGIN ITEM IS FOUND
  var listedUser = req.body.users;

    db.collection('books').find().toArray((err, results) =>{
      if(err) return console.log(err);

      // render the view for the view books
      res.render('viewBooks.ejs', {books: results, users:listedUser})
  });

})


module.exports = router