var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  res.send("testing the create.js route")
});


//Create / Book route
router
.get('/book', (req, res) => {
  res.send("book creation route without post")
})
.post('/book', (req, res) =>{
  db.collection('books').save(req.body, (err, result) => {
    res.redirect("/");
  })

})


module.exports = router