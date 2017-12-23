var express = require("express");
var router = express.Router();
const bodyParser= require('body-parser')
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    ObjectID = require('mongodb').ObjectID;
router.use(bodyParser.json());
const context = {}


/***** START READING PAGE *****/
router.post('/:id', (req, res) => {
  
  const bookId = new ObjectID(req.params.id);
  const userId = new ObjectID(req.body.userId);

  //Query user database to find this book ID, and then return the number of pages read from that book.
  //IF IT DOES NOT EXIST, CREATE BOOK_INFO OBJECT WITH BOOK ID (BOOKINFO.BOOKID = BOOKID)
  //IF IT DOES EXIST ALREADY, DO NOTHING AND NOT OVERRIDE
  db.collection("users").update(
    {"_id": userId},
    {$set:{'bookInfo.bookId':bookId}}, 
      {upsert: true}
    ) 

  db.collection('books').find({_id:bookId}).toArray((err, results) =>{
    if(err) return console.log(err);
    context["results"] = results;
    context["userId"] = userId;
    //TODO: Need to update to send (or cookie) userId
    res.render("read.ejs", {context:context})

  });
});









/****** DONE READING PAGE ******/
router.post('/read/:id', (req, res) => {
  //TODO: Coming from book page, I have read: X amount of pages
  //TODO: Need to update user table to include booksRead collection with _id and pagesRead

  var bookId = new ObjectID(req.params.id);
  console.log(req.body)
  context["pagesRead"] = req.body.pagesRead;
  const userObjectId = new ObjectID(req.body.userId);

    var dbPromise = new Promise((resolve, reject)=>{
      db.collection('users').find({"_id": userObjectId}).toArray((err, results) =>{
        if(err) reject(err);
        resolve(results);
      });
    });

    dbPromise.then(function(result){
      context["userInfo"] = result[0];
    }).then(function(){
      //DO OPERATION HERE FOR ADDING THE NUMBER OF PAGES READ
      //for bookId, do math to increment and add start and stop by date
      db.collection('users').update(
         {"_id":userObjectId,"bookInfo.bookId":bookId },
         { $addToSet:{
          "bookInfo.pageHistory":{
              "pagesRead": context.pagesRead,
              "dateRead": new Date()
  
            }
            }
          } )
       }
       
      )

  db.collection('books').find({_id:bookId}).toArray((err, results) =>{
    if(err) return console.log(err);
    context["book"] = results[0];
    res.render("doneReading.ejs", {context: context}) 

  });
});


module.exports = router


// FOR SPECIFIC USER ID, WHERE THE BOOKID ALSO MATCHES
// ADD NEW CHILD OBJECT UNDER PAGE HISTORY
// ADD A NEW OBJECT WITH NEW PAGES READ AND DATEOFREADING
