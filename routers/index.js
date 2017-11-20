var express = require("express");
var router = express.Router();


router.get('/', (req, res) => {

  mainContext = {};

  //Create a promise to read from the Database and return the items to the context object
  var dbPromise = new Promise((resolve, reject)=>{

    db.collection('users').find().toArray((err, results) =>{
      if(err) return console.log(err);
      mainContext["users"] = results;
    
      //If the mainContext.users is created, resolve the promise (Go to line 43)
      if(mainContext.users){
        resolve(mainContext.users);
      }else{
        reject("No users found");
      }

  });

  

});


  dbPromise.then(
    (msg)=>{
      //If the promise succeeds, pass the context to the index.ejs
      res.render('index.ejs', {context: mainContext})
    }, 
    (errorMsg)=>{
      console.log(errorMsg)
  })
    
});


module.exports = router