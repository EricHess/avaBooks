var http = require('http');

const port = 8080;

function serverRunning(req, res){
  res.end("server is up and running: "+ req.url)
};

//Create a server
var server = http.createServer(serverRunning);

//Lets start our server
server.listen(port, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", port);
}); 