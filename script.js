//Start time?
var play = 0;
// Start Timer on Spacebar
var currentBlindLevel = 0;
var blindOffset = 0;
var onBreak = 0;
var timePassed = 1;
var currentBlindTime, currentBlindSeconds, currentSmallBlind, currentBigBlind;




document.body.onkeyup = function(e){
	
	"use strict";
    if(e.keyCode === 32 && Boolean(play)===false && Boolean(onBreak)===false){
		document.getElementById("instr").innerHTML = "Playing";
		document.getElementById("blind").innerHTML = "SmallBlind: "+currentSmallBlind+ " BigBlind: "+ currentBigBlind;
        play = 1;
    }
	else if(e.keyCode === 32 && Boolean(play)===true && Boolean(onBreak)===false){
		play = 0;
		document.getElementById("instr").innerHTML = "Paused";
	}
	else if(e.keyCode === 32 && Boolean(play)===false && Boolean(onBreak)===true){
        document.getElementById("instr").innerHTML = "Playing";
		play = 1;
		onBreak = 0;
        timePassed = 0;
        currentBlindLevel++;
        document.getElementById("blind").innerHTML = "Blinds: "+nextBlindLevel();
	}
};
//count down every second
var x = setInterval(function() {
	"use strict";
	//Update loop
    if(Boolean(onBreak)===false){
        currentBlindTime = document.getElementsByName("duration")[currentBlindLevel-blindOffset].value;
        currentBlindSeconds = currentBlindTime * 60;
        currentSmallBlind = document.getElementsByName("blinds_small")[currentBlindLevel-blindOffset].value;
        currentBigBlind = document.getElementsByName("blinds_big")[currentBlindLevel-blindOffset].value;
        document.getElementById("blind").innerHTML = "SmallBlind: "+currentSmallBlind+ " BigBlind: "+ currentBigBlind;
	}
    document.getElementById("next").innerHTML = "Next Level: "+nextBlindLevel();
	//Play loop
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
    	if (time < 1) {
    		timePassed= 0;
    		if(nextBlindLevel() === "Break"){
				blindOffset++;
                document.getElementById("instr").innerHTML = "Press Spacebar to Resume";
                document.getElementById("blind").innerHTML = " ";
                document.getElementById("demo").innerHTML = "BREAK";
				play = 0;
				onBreak = 1;
			}
            currentBlindLevel++;
        	//clearInterval(x);
        	//document.getElementById("demo").innerHTML = "00:00";
    	}
	}

}, 1000);
//Next Level
function nextBlindLevel(){
	var levelList = document.getElementById("blindList").children;
	if(levelList[currentBlindLevel+1].className == "level"){
		var nextChildren = levelList[currentBlindLevel+1].children;

		return nextChildren[0].value + "/" + nextChildren[1].value;
	}
	else if(levelList[currentBlindLevel+1].className == "break"){
		return "Break";
	}
	return levelList[currentBlindLevel+1];
}
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
function deleteTab(evt){
	"use strict";
	evt.currentTarget.parentNode.remove();
}
function createInput(min,max,name,type,pholder){
	"use strict";
	var x = document.createElement("INPUT");
	x.setAttribute("min",min);
	x.setAttribute("max",max);
	x.setAttribute("name",name);
	x.setAttribute("type",type);
	x.setAttribute("placeholder",pholder);
	return x;
}
function createBtn(cls,onclk){
	"use strict";
	var btn = document.createElement("BUTTON");
	btn.className = cls;
	btn.setAttribute("onclick",onclk);
	return btn;
}
function addBlind(evt,arg){
	"use strict";
    var li = document.createElement("LI");
    li.className = "level";
    var smallBlind = createInput(0,100000,"blinds_small","number","Small Blind");
    li.appendChild(smallBlind);
    var bigBlind = createInput(0,100000,"blinds_big","number","Big Blind");
    li.appendChild(bigBlind);
    var ante = createInput(0,100000,"ante","number","Ante");
    li.appendChild(ante);
    var minutes = createInput(0,60,"duration","number","Minutes");
    li.appendChild(minutes);
    var deleteBtn=createBtn("delete","deleteTab(event)");
    li.appendChild(deleteBtn);
    var addBtn=createBtn("addblind","addBlind(event,1)");
    li.appendChild(addBtn);
    var breakBtn=createBtn("break","addBreak(event,1)");
    li.appendChild(breakBtn);
	if(arg===1){
		var clicked = evt.currentTarget.parentNode;
		var clickedParent = evt.currentTarget.parentNode.parentNode;
		clickedParent.insertBefore(li,clicked.nextElementSibling);
    }
    else{
    	var ol = document.getElementById("blindList");
    	ol.appendChild(li);
	}
}
function addBreak(evt,arg){
    "use strict";
    var li = document.createElement("LI");
    li.className = "break";
	var h3brk = document.createElement("H3");
	h3brk.className = "brk";
	h3brk.textContent = "Break";
	li.appendChild(h3brk);
    var deleteBtn=createBtn("delete","deleteTab(event)");
    li.appendChild(deleteBtn);
    var addBtn=createBtn("addblind","addBlind(event,1)");
    li.appendChild(addBtn);
    var breakBtn=createBtn("break","addBreak(event,1)");
    li.appendChild(breakBtn);
    if(arg===1){
        var clicked = evt.currentTarget.parentNode;
        var clickedParent = evt.currentTarget.parentNode.parentNode;
        clickedParent.insertBefore(li,clicked.nextElementSibling);
	}
	else{
        var ol = document.getElementById("blindList");
        ol.appendChild(li);
	}
}

