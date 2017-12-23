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
  db.collection("users").update(
    {"_id": userId},
    {$set:{'bookInfo.bookId':req.params.id}}, 
      {upsert: true}
    )

    db.collection("users").find({_id:userId}).toArray((err,results) =>{
      const historyArray = results[0].bookInfo.pageHistory;
      let pageCount = 0;
      for (var i = historyArray.length - 1; i >= 0; i--) {
        historyArray[i].bookId == req.params.id ? pageCount += parseInt(historyArray[i].pagesRead) : false
      }
      context["pagesRead"] = pageCount;
    }) 

  db.collection('books').find({_id:bookId}).toArray((err, results) =>{
    if(err) return console.log(err);
    context["results"] = results;
    context["userId"] = userId;

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
         {"_id":userObjectId,"bookInfo.bookId":req.params.id },
         { 
            $addToSet:{
              "bookInfo.pageHistory":{
                "bookId":req.params.id,
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


router.post('/read/:id/done', (req, res) => {
  //find the most recent entry, make sure it matches the bookId, then add in the new textarea fields
});

module.exports = router


// FOR SPECIFIC USER ID, WHERE THE BOOKID ALSO MATCHES
// ADD NEW CHILD OBJECT UNDER PAGE HISTORY
// ADD A NEW OBJECT WITH NEW PAGES READ AND DATEOFREADING
