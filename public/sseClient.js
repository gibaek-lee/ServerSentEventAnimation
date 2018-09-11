if(typeof(EventSource) !== "undefined") {
    var source = new EventSource("/events");
    source.onmessage = function(event) {//event = flush data from sse server
      console.log("Data from the server : " + event.data);

      //when sse occur, do something.For example, Facebook/Twitter updates, etc.
      alertAnimation(JSON.parse(event.data));

    };
} else {
  console.log('Sorry! No server-sent events support.');

    //do something when browser doesn't have a server sent event

}
