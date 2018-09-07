function alertAnimation(sseRespData){
  let start = Date.now(); // remember start time

  let timer = setInterval(function() {
    if(sseRespData.resC.result && !sseRespData.resD.result){
      cctvNotiAni(sseRespData.resC);
      safeNotiAni();
    }else if(!sseRespData.resC.result && sseRespData.resD.result){
      dangerNotiAni(sseRespData.resD);
    }else{
      //중립
    }
  }, 20);

  // as timePassed goes from 0 to 2000
  // left gets values from 0px to 400px
  function draw(timePassed) {
    train.style.left = timePassed / 5 + 'px';
  }

  //animations
  function cctvNotiAni(data){
    // how much time passed from the start?
    let timePassed = Date.now() - start;

    if (timePassed >= 2000) {
      clearInterval(timer); // finish the animation after 2 seconds
      return;
    }

    // draw the animation at the moment timePassed
    (function draw(timePassed){
      train.style.left = timePassed / 5 + 'px';
    })();
  }
  function safeNotiAni(data){

  }
  function dangerNotiAni(data){

  }
}
