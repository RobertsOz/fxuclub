//Start time?
var play = 0;
// Start Timer on Spacebar
var currentBlindLevel = 0;


var timePassed = 1;
var currentBlindTime, currentBlindSeconds, currentSmallBlind, currentBigBlind;




document.body.onkeyup = function(e){
	
	"use strict";
    if(e.keyCode === 32 && Boolean(play)===false){
		currentBlindTime = document.getElementsByName("duration")[currentBlindLevel].value;
		
		currentBlindSeconds = currentBlindTime * 60;
		
		currentSmallBlind = document.getElementsByName("blinds_small")[currentBlindLevel].value;
		
		currentBigBlind = document.getElementsByName("blinds_big")[currentBlindLevel].value;
		
		document.getElementById("instr").innerHTML = "Playing";
		document.getElementById("blind").innerHTML = "SmallBlind: "+currentSmallBlind+ " BigBlind: "+ currentBigBlind;
        play = 1;
    }
	else if(e.keyCode === 32 && Boolean(play)===true){
		play = 0;
		document.getElementById("instr").innerHTML = "Paused";
	}
};

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
function openSubTab(evt, tabName) {
	"use strict";
    var i, subcontent, subtablinks;
    subcontent = document.getElementsByClassName("subcontent");
    for (i = 0; i < subcontent.length; i++) {
		subcontent[i].className = subcontent[i].className.replace(" activeSubContent","");
    }
    subtablinks = document.getElementsByClassName("subtablinks");
    for (i = 0; i < subtablinks.length; i++) {
        subtablinks[i].className = subtablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).className += " activeSubContent";
    evt.currentTarget.className += " active";
}


