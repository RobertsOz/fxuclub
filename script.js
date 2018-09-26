//Start time?
var play = 0;
// Start Timer on Spacebar
document.body.onkeyup = function(e){
	"use strict";
    if(e.keyCode === 32 && Boolean(play)===false){
		document.getElementById("blind").innerHTML = "Playing";
        play = 1;
    }
	else if(e.keyCode === 32 && Boolean(play)===true){
		play = 0;
		document.getElementById("blind").innerHTML = "Paused";
	}
};
var currentBlindTime = 15;
var currentBlindSeconds = currentBlindTime * 60;
var timePassed = 1;
//count down every second
var x = setInterval(function() {
	"use strict";
	if(Boolean(play)){
		var time = currentBlindSeconds-timePassed;
		var minutes = Math.floor(time/60);
		var seconds = Math.floor(time%60);
		var formattedMinutes = ("0" + minutes).slice(-2);
		var formattedSeconds = ("0" + seconds).slice(-2);
		// Output the result in an element with id="demo"
    	document.getElementById("demo").innerHTML = formattedMinutes + ":" + formattedSeconds;
    	timePassed = timePassed+1;
    	// If the count down is over, write some text 
    	if (time < 0) {
        	clearInterval(x);
        	document.getElementById("demo").innerHTML = "00:00";
    	}
		
	}

}, 1000);

//Switch to set up view

function openTab(evt, tabName) {
	"use strict";
    var i, content, tablinks;
    content = document.getElementsByClassName("content");
    for (i = 0; i < content.length; i++) {
		content[i].className = content[i].className.replace(" activeContent","");
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).className += " activeContent";
    evt.currentTarget.className += " active";
}
