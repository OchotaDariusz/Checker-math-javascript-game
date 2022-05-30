initGame();

function initGame() {

    // Your game can start here, but define separate functions, don't write everything in here :)

}


let countDownDate = new Date().getTime() + 10000


let x = setInterval(function() {


  let now = new Date().getTime();
    

  let distance = countDownDate - now;
    


  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  let miliseconds = Math.floor((distance % (1000 )) );

  if (distance <5000) {
    document.querySelector(".timer").style.color="red"
    document.querySelector(".timer").innerHTML = minutes + "m " + seconds + "s "+miliseconds +"ms";
  }
  else {

    document.querySelector(".timer").innerHTML = minutes + "m " + seconds + "s "+miliseconds +"ms";
  }

  if (distance < 0) {
    clearInterval(x);
    document.querySelector(".timer").innerHTML = "Time Out";
  }
}, 10);