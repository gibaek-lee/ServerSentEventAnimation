/*---------------------------[Basic Node.js Sever]----------------------------*/
//npm sse ref: https://www.npmjs.com/package/sse

var SSE = require('sse')
  , http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
});

server.listen(8080, '127.0.0.1', function() {
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

    client.send(/*data you made by using DB responsed data*/);

  });
});


/*----------------------[Client javascript code for sse]----------------------*/
//npm sse ref: https://www.npmjs.com/package/sse
//w3schools sse ref: https://www.w3schools.com/html/html5_serversentevents.asp
if(typeof(EventSource) !== "undefined") {
    var source = new EventSource("/sse");
    source.onmessage = function(event) {//event=client.send(data) from sse server

      //when sse occur, do something.For example, Facebook/Twitter updates, etc.
      alertAnimation(event.data);

    };
} else {

    //do something when browser doesn't have a server sent event

}


/*--------------[Client animation code for server sent event]-----------------*/
//javascript animation definition
//ref: https://javascript.info/js-animation
function alertAnimation(sseRespData){

  //definition

}
