$(document).ready(function() {

	$('#outputbtc').hide();
	$('#outputrzr').hide();
	
	document.getElementById("currentsetting").innerHTML = "BTC";
	
	getBitstamp();
	
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

function getBitstamp() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var jsonbitstamp = xmlhttp.responseText;
			var parsedbitstamp = JSON.parse(jsonbitstamp);
			var btcpriceUSD = parsedbitstamp.LastUSD;
			var btcpriceEUR = parsedbitstamp.LastEUR;
			$("#footer").data("priceUSD", btcpriceUSD);
			$("#footer").data("priceEUR", btcpriceEUR);
		}
	}
	xmlhttp.open("GET","./getPrice.php",true);
	xmlhttp.send();
}

function calcCloak(bits, currency) {
	if (bits == "") {
		$('#outputbtc').hide();
		$('#rzrcoins').show();
	} else {
		$('#outputbtc').show();
		$('#rzrcoins').hide();
	}
	
	var lastprice = $("#footer").data("mintpalprice");
	var rzr = (bits / lastprice);
	
	if (currency == "BTC") {
		if (rzr == 0) {
			document.getElementById("outputbtc").innerHTML = "";
		} else {
			document.getElementById("outputbtc").innerHTML = parseFloat(rzr).toFixed(8);
		}
	} else if (currency == "EUR") {
		var eur = ($("#footer").data("priceEUR"));
		var lastprice = (rzr / eur);
		if (lastprice == 0) {
		document.getElementById("outputbtc").innerHTML = "";
		} else {
			document.getElementById("outputbtc").innerHTML = parseFloat(lastprice).toFixed(8);
		}
	} else if (currency == "USD") {
		var usd = ($("#footer").data("priceUSD"));
		var lastprice = (rzr / usd);
		if (lastprice == 0) {
			document.getElementById("outputbtc").innerHTML = "";
		} else {
			document.getElementById("outputbtc").innerHTML = parseFloat(lastprice).toFixed(8);
		}
	}
}

function calcBTC(rzrs, currency) {
	if (rzrs == "") {
		$('#outputrzr').hide();
		$('#bitcoins').show();
	} else {
		$('#outputrzr').show();
		$('#bitcoins').hide();
	}
		
	var lastprice = $("#footer").data("mintpalprice");
	var bit = (rzrs * lastprice);
		
	if (currency == "BTC") {
		if (bit == 0) {
			document.getElementById("outputrzr").innerHTML = "";
		} else {
			document.getElementById("outputrzr").innerHTML = parseFloat(bit).toFixed(8);
		}
	} else if (currency == "EUR") {
		var eur = ($("#footer").data("priceEUR"));
		var lastprice = (bit * eur);
		if (lastprice == 0) {
		document.getElementById("outputrzr").innerHTML = "";
		} else {
			document.getElementById("outputrzr").innerHTML = parseFloat(lastprice).toFixed(2);
		}
	} else if (currency == "USD") {
		var usd = ($("#footer").data("priceUSD"));
		var lastprice = (bit * usd);
		if (lastprice == 0) {
			document.getElementById("outputrzr").innerHTML = "";
		} else {
			document.getElementById("outputrzr").innerHTML = parseFloat(lastprice).toFixed(2);
		}
	}
}

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
			var domain = "Cloakcoin.com - ";
			var title = domain.concat(lastmintpal);
			document.title = title;
		}
	}
	xmlhttp.open("GET","./getMintpal.php",true);
	xmlhttp.send();
};

function updateCryptsy() {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var json = xmlhttp.responseText;
			var parsedcryptsy = JSON.parse(json);
			var lastcryptsy = parsedcryptsy.Last;
			var bidcryptsy = parsedcryptsy.Bid;
			var askcryptsy = parsedcryptsy.Ask;
			document.getElementById("bidcryptsy").innerHTML = textbid.concat(bidcryptsy);
			document.getElementById("askcryptsy").innerHTML = textask.concat(askcryptsy);
			document.getElementById("lastcryptsy").innerHTML = textlast.concat(lastcryptsy);
		}
	}
	xmlhttp.open("GET","./getCryptsy.php",true);
	xmlhttp.send();
};


$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
            scrollTop: target.offset().top
        }, 1000);
        return false;
		}
        }
    });
});