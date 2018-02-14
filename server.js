const express = require('express');
const server = express();
server.use(express.static('build'));
var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log("Server running on port 3000");
});
