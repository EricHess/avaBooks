var express = require("express");
var router = express.Router();
const bodyParser= require('body-parser')
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = require('mongodb').ObjectID;
router.use(bodyParser.json());
const context = {}

router.post('/:id', (req, res) => {
  
  var bookId = new ObjectID(req.params.id);

  context["userId"] = req.body.userId

  db.collection('books').find({_id:bookId}).toArray((err, results) =>{
    if(err) return console.log(err);
    context["results"] = results;
    //TODO: Need to update to send (or cookie) userId
    res.render("read.ejs", {context:context})

  });
});


router.post('/read/:id', (req, res) => {
  //TODO: Coming from book page, I have read: X amount of pages
  //TODO: Need to update user table to include booksRead collection with _id and pagesRead

  var bookId = new ObjectID(req.params.id);
  context["userId"] = req.body.userId;


    var dbPromise = new Promise((resolve, reject)=>{

    db.collection('users').find({_id:context["userId"]}).toArray((err, results) =>{
      if(err) return console.log(err);
    
      //If the mainContext.users is created, resolve the promise (Go to line 43)
      if(context.userId){
        resolve(context.userId);
      }else{
        reject("No users found");
      }

  });
});

    dbPromise.then(
    (msg)=>{
      console.log(msg)
    }, 
    (errorMsg)=>{
      console.log(errorMsg)
  })

  //TODO: NEED TO GET USER ID HERE
  

  db.collection('books').find({_id:bookId}).toArray((err, results) =>{
    if(err) return console.log(err);
    context["results"] = results;
    res.render("doneReading.ejs", {context: context}) 

  });
});


module.exports = router