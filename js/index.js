$(document).ready(function() {
	
	window.setInterval(function(){
		updateBittrex();
		updateMintpal();
	}, 20000);
	
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var json = xmlhttp.responseText;
			var parsed = JSON.parse(json);
			var lastmintpal = parsed.Last;
			$("#footer").data("mintpalprice", lastmintpal);
		}
	}
	xmlhttp.open("GET","./getMintpal.php",true);
	xmlhttp.send();
});

var textbid = "Bid: ";
var textask = "Ask: ";
var textlast = "Last: ";

function updateBittrex() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var json = xmlhttp.responseText;
			var parsedbittrex = JSON.parse(json);
			var bidbittrex = parsedbittrex.Bid;
			var askbittrex = parsedbittrex.Ask;
			var lastbittrex = parsedbittrex.Last;
			document.getElementById("bidbittrex").innerHTML = textbid.concat(bidbittrex);
			document.getElementById("askbittrex").innerHTML = textask.concat(askbittrex);
			document.getElementById("lastbittrex").innerHTML = textlast.concat(lastbittrex);
		}
	}
	xmlhttp.open("GET","./getBittrex.php",true);
	xmlhttp.send();
};

function updateMintpal() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var json = xmlhttp.responseText;
			var parsedmintpal = JSON.parse(json);
			var lastmintpal = parsedmintpal.Last;
			var bidmintpal = parsedmintpal.Bid;
			var askmintpal = parsedmintpal.Ask;
			document.getElementById("bidmintpal").innerHTML = textbid.concat(bidmintpal);
			document.getElementById("askmintpal").innerHTML = textask.concat(askmintpal);
			document.getElementById("lastmintpal").innerHTML = textlast.concat(lastmintpal);
			var domain = "Razorcoin | ";
			var title = domain.concat(lastmintpal);
			document.title = title;
		}
	}
	xmlhttp.open("GET","./getMintpal.php",true);
	xmlhttp.send();
};