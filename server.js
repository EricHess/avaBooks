const express = require('express');
const app = express();


const create = require('./routers/create');
const view = require('./routers/view');
const user = require('./routers/user');
const index = require('./routers/index');
const book = require('./routers/book');


const staticViewsPath = __dirname+"/views/";
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;

app.set('view engine', 'ejs')
//PRE-SERVER STARTUP
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://testuser:testpassword@ds113636.mlab.com:13636/books', (err, database) => {
  if(err) return console.log(err);
  db = database;

  app.listen(3005, function() {
    console.log('listening on 3005')
  });

})

//App Uses
app.use("/", index);
app.use("/book", book);
app.use("/create", create);
app.use("/user", user);
app.use("/view", view);