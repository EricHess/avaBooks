const express = require('express');
const app = express();
const create = require('./routers/create');
const view = require('./routers/view');
const staticViewsPath = __dirname+"/views/";
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;


//PRE-SERVER STARTUP
app.use(bodyParser.urlencoded({extended: true}))

MongoClient.connect('mongodb://testuser:testpassword@ds113636.mlab.com:13636/books', (err, database) => {
  if(err) return console.log(err);
  db = database;

  app.listen(3005, function() {
    console.log('listening on 3005')
  });

})


















// app.get('/', function (request, response) {
//  response.send("Hello World")
// })

//The below is ES6'd version of the above

app.get('/', (req, res) => {
  res.sendFile(staticViewsPath + '/index.html')
});




//App Uses
app.use("/create", create);
app.use("/view", view);