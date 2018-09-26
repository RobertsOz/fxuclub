
// Set the date we're counting down to
//var countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();
var play = 0;
// Update the count down every 1 second
document.body.onkeyup = function(e){
	"use strict";
    if(e.keyCode === 32){
		document.getElementById("blind").innerHTML = "Start";
        play = 1;
    }

};
var currentBlindTime = 15;
var currentBlindSeconds = currentBlindTime * 60;
var x = setInterval(function() {
	"use strict";
	if(Boolean(play)){
		var timePassed;
		var time = currentBlindSeconds-timePassed;
		var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((time % (1000 * 60)) / 1000);
		// Output the result in an element with id="demo"
    	document.getElementById("demo").innerHTML = minutes + ":" + seconds;
    
    	// If the count down is over, write some text 
    	if (time < 0) {
        	clearInterval(x);
        	document.getElementById("demo").innerHTML = "00:00";
    	}
		timePassed++;
	}

}, 1000);
