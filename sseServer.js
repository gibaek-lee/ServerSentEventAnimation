const express = require('express');
const path = require('path');

var compression = require('compression')

const app = express();

const hostname = '127.0.0.1';
const port = 8080;

app.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*you only set one directory in your app.js file as a "static files directory"
so every path in the html(like javascript and css files) should be in public folder*/
app.use(express.static(__dirname + '/public' ));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, './index.html'));
});

/* server-sent event stream using compession npm
https://expressjs.com/en/resources/middleware/compression.html*/
app.use(compression());
app.get('/events', function (req, res) {
  //DB requset
  /*

  */

  //make sever sent event data
  res.setHeader('Content-Type', 'text/event-stream');//text/plain도 옵션으로 있음
  res.setHeader('Cache-Control', 'no-cache');

  // send a ping approx every 2 seconds
  var timer = setInterval(function () {
    var sampleData = {
      resC:{
        result: true,
        comment: "cctv!"
      },
      resD:{
        result: false,
        comment: "danger!"
      }
    }

    //res.write('data: ping\n\n');//text/event-stream에서 data: 와 \n\n은 write에 필수.
    //\n\n 안해주면 write가 안끝나서 클라이언트 request에 response를 flush하지 않고 계속 쓰기만 한다.
    res.write(`data:${JSON.stringify(sampleData)}\n\n`);

    //flush data
    res.flush();
    console.log("flush data!");

  }, 3000);//every 3000ms, flush data to client

  res.on('close', function () {//클라이언트 요청이 끊겼을때
    console.log("clear timer!");
    clearInterval(timer);
  });
});
