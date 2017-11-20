var express = require("express");
var router = express.Router();
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = require('mongodb').ObjectID;


router.get('/:id', (req, res) => {
  
  var bookId = new ObjectID(req.params.id);

  db.collection('books').find({_id:bookId}).toArray((err, results) =>{
    if(err) return console.log(err);
    //TODO: Need to update to send (or cookie) userId
    res.render("read.ejs", {context: results})

  });
});


router.post('/read/:id', (req, res) => {
  //TODO: Coming from book page, I have read: X amount of pages
  //TODO: Need to update user table to include booksRead collection with _id and pagesRead

  var bookId = new ObjectID(req.params.id);

  db.collection('books').find({_id:bookId}).toArray((err, results) =>{
    if(err) return console.log(err);
    res.render("read.ejs", {context: results})

  });
});


module.exports = router