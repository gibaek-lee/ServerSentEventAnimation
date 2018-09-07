var SSE = require('sse');
var http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});//text/plain - response information from http server
  res.end('okay');
});

server.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);

  var sse = new SSE(server);
  sse.on('connection', function(client) {

    /*
      //DB request and get response here.

      //after that, make data to send to client
        //sample data structure
          {
            result : true/ false ,
            comment : 확인용 코멘트,
            item : 결과 좌표들 ( 없으면 null 값)
          }
    */

    client.send('This is a data you made via DB responsed data');

  });
});
