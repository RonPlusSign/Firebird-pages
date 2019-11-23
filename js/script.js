////█							█////
////█			♥♥♥♥			█////
////█	Script text-modifier.	█//// Questo è uno script dedicato solo modificare l'html a seconda dell'esigenza
////█			♥♥♥♥			█////
////█							█////


/*
────────────────────────────────────────────────────────────┤♦│
████████████████████████████████████████████████████████████│!│-TITLE-
────────────────────────────────────────────────────────────┤♦│

Con il titolo posso controllare in che stato è FireBird (Connesso/Non Connesso/Denied)

*/

var status;

try{

var str = document.querySelectorAll("#TITLE")[0].innerHTML;
str = str.split('<!--[TITLETEXT_START]-->').pop().split('<!--[TITLETEXT_END]-->')[0];

switch(str){
	
	// index
	case "INDEX":
		$("#TITLE h2").addClass("blue");
		$("#TITLE h2").text("Script.js edited this");
		status = "INDEX"
		break;
	
	// not connected
	case "Effettua il login":
		$("#TITLE h2").addClass("blue");
		$("#TITLE h2").text("Effettua il login");
		status = "NOT_CONNECTED"
		break;
	
	// connected
	case "Stato connessione":
		$("#TITLE h2").addClass("green");
		$("#TITLE h2").text("Connesso");
		status = "CONNECTED"
		break;
	
	// denied
	case "ACCESSO NEGATO":
		$("#TITLE h2").addClass("red");
		$("#TITLE h2").text("Accesso Negato");
		status = "DENIED"
		break;

}

} catch(ex) {}

/*
────────────────────────────────────────────────────────────┤♦│
████████████████████████████████████████████████████████████│!│-DOWNLOADER-
────────────────────────────────────────────────────────────┤♦│

L'area per scaricare il certificato con modale
lo script per la modale è in "cert.js"
lo script per vedere l'OS è in "getOS.js"

*/

try {

function appendDownloader(){
	$("#card").append($("#downloader-obj"));
}

switch(status){
	
	// index
	case "INDEX":
		appendDownloader();
		break;
	
	// not connected
	case "NOT_CONNECTED":
		appendDownloader();
		break;
	
	// connected
	case "CONNECTED":
		break;
	
	// denied
	case "DENIED":
		break;
}

} catch(ex) {}

/*
────────────────────────────────────────────────────────────┤♦│
████████████████████████████████████████████████████████████│!│-BUTTON-
────────────────────────────────────────────────────────────┤♦│

Se c'è il bottone, sostituiscilo con quello pre-made

*/

try {

// login

var str = document.querySelectorAll("#LOGINBTN")[0].innerHTML;
str = str.split('<!--[LOGINBTN_START]-->').pop().split('<!--[LOGINBTN_END]-->')[0];

if(str != ""){
	$("#LOGINBTN").html("");
	$("#LOGINBTN").append($("#loginbtn-obj"));
}

// logout

var str = document.querySelectorAll("#LOGOUTBTN")[0].innerHTML;
str = str.split('<!--[LOGOUTBTN_START]-->').pop().split('<!--[LOGOUTBTN_END]-->')[0];

if(str != ""){
	$("#LOGOUTBTN").html("");
	$("#LOGOUTBTN").append($("#logoutbtn-obj"));
}

} catch(ex) {}

/*
────────────────────────────────────────────────────────────┤♦│
████████████████████████████████████████████████████████████│!│-TABLE (connected)-
────────────────────────────────────────────────────────────┤♦│

Da una serie di <p>, ad una tabella.
La gestione del toggle è in "tableToggle.js"

*/

try {

var str = document.querySelectorAll("#INFO")[0].innerHTML;
str = str.split('<!--[INFO_START]-->').pop().split('<!--[INFO_END]-->')[0];

if(str != ""){
	str = str.split('<!--[INFOTEXT_START]-->').pop().split('<!--[INFOTEXT_END]-->')[0];
	// toggle thing
	$("#INFO").before($("#toggle-obj"));
	
	// list of font-awesome char
	var list = [ "fas fa-user",
				 "far fa-envelope",
				 "fas fa-signal",
				 "fas fa-network-wired",
				 "fas fa-users",
				 "fas fa-calendar-alt",
				 "fas fa-file-download",
				 "fas fa-file-upload",
				 "fas fa-tachometer-alt",
				 "fas fa-tachometer-alt"];
		
	//swap 2 items in an array
	function swapArrayElements(arr, indexA, indexB) {
	  var temp = arr[indexA];
	  arr[indexA] = arr[indexB];
	  arr[indexB] = temp;
	};
		
	// code
	str = str.replace(/\<\/\p\>/g, "");
	var camps = str.split('<p>');
	camps = camps.filter(function (el) {
		return el != "";
	});
	
	swapArrayElements(camps, 0, 2);
	
	var i = 0;
	var table = "<table>";
	camps.forEach(function (el) {
		el = "<tr><td><i class='" + list[i] + "'></i>" + el + "</td></tr>";
		el = el.replace(":","</td><td>");
		i++;
		table += el;
	});
	table += "</table>";
	
	
	$("#INFO").html("");
	$("#INFO").append($(table));
}

} catch(ex) {}

/*
────────────────────────────────────────────────────────────┤♦│
████████████████████████████████████████████████████████████│!│-TABLE (denied)-
────────────────────────────────────────────────────────────┤♦│

Delle frasi separate da <br>

*/

try {

var str = document.querySelectorAll("#DENIED")[0].innerHTML;
str = str.split('<!--[FAILTEXT_START]-->').pop().split('<!--[FAILTEXT_END]-->')[0];

str = str.split("<br>");

var firstTr = "<tr><td>" + str[0] + ":</td><td>" + str[1] + "</td></tr>";
var secondTr = "<tr><td>" + str[2].split(":")[0] + ":</td><td>" + str[2].split(":")[1] + "</td></tr>";

var table = "<table>" + firstTr + secondTr + "</table>"

$("#DENIED").html("");
$("#DENIED").append($(table));

} catch(ex) {}





$("html").fadeIn();