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

// server-sent event stream using compession npm
app.use(compression());
app.get('/events', function (req, res) {
  //DB requset
  /*

  */

  //make sever sent event data
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')

  // send a ping approx every 2 seconds
  var timer = setInterval(function () {
    res.write('data: ping\n\n')

    // !!! this is the important part
    res.flush()
  }, 2000)

  res.on('close', function () {
    clearInterval(timer)
  })
})
