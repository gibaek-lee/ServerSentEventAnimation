function alertAnimation(sseRespData){
  let start = Date.now();
  var alertDOM = document.getElementById("alertPopUp");

  let timer = setInterval(function() {
    let timePassed = Date.now() - start;

    if (timePassed > 2000) {
      clearDOM(alertDOM);//after 2000ms, clear alertPopUp
      clearInterval(timer); // finish the animation after 2000ms, take a rest 1000ms
      return;
    }

    //draw
    if(sseRespData.resC.result && !sseRespData.resD.result){
      //0~1000ms: cctv notify, 1000ms~2000ms: safe notify
      (timePassed < 1000) ? cctvNotiAni(sseRespData.resC, alertDOM, timePassed) : safeNotiAni(alertDOM, timePassed);
    }else if(!sseRespData.resC.result && sseRespData.resD.result){
      dangerNotiAni(sseRespData.resD, alertDOM, timePassed);
    }
  }, 20);//draw animation every 20 milli seconds, about 50 frame per second.
}

//draw functions
function cctvNotiAni(data, dom, time){
  dom.children[0].children[0].src='image/cctvNotifyImg.png';
  dom.children[1].innerHTML=data.comment;
  dom.style.opacity=time/2000;//opacity 0 to 1 during 2000ms
}
function safeNotiAni(dom, time){
  dom.children[0].children[0].src='image/safeNotifyImg.png';
  dom.children[1].innerHTML='safe!';
  dom.style.opacity=time/2000;
}
function dangerNotiAni(data, dom, time){
  dom.children[0].children[0].src='image/dangerNotifyImg.png';
  dom.children[1].innerHTML=data.comment;
  dom.style.opacity=time/2000;
}
function clearDOM(dom){
  dom.children[0].children[0].src='';
  dom.children[1].innerHTML='';
  dom.style.opacity=0;
}
