count=1;
var x=setInterval(function(){
    console.log("recursive message")
    if(count > 5) clearInterval(x);
  count++;
}, 1000);