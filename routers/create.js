var express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
  res.send("testing the create.js route")
});


//Create / Book route
router
.post('/book', (req, res) =>{
  db.collection('books').save(req.body, (err, result) => {
    res.redirect("/");
  })
})

router
.post('/user', (req, res) =>{
  db.collection('users').save(req.body, (err, result) => {
    res.redirect("/");
  })
})

module.exports = router