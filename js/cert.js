var tutorial = document.getElementById("Tutorial");
var link = document.getElementById("Download");
var popup = document.getElementById("popup");
var body = document.querySelectorAll("BODY")[0];
var html = document.querySelectorAll("HTML")[0];
var text = document.querySelectorAll(".OS");
var modal = document.getElementById("modal-obj");
var screen = document.getElementById("screen-obj");
var x = document.getElementById("MODAL_CLOSE");

text.forEach(function(x) {
  x.append( document.createTextNode(getOS()) );
});

switch(getOS()){
    case "Windows":
    link.onclick = certDotDer;
	tutorial.href = "tutorials/windows.html"
    break;
    case "Android":
    link.onclick = certDotPem;
	tutorial.href = "tutorials/android.html"
    break;
	case "iOS":
    link.onclick = certDotPem;
	tutorial.href = "tutorials/android.html"
	break;
    default:
    break;
}

function certDotDer(){
    window.location='cert.der';
}

function certDotPem(){
    window.location='cert.pem';
}

/* Modal */

popup.onclick = showModal;
screen.onclick = closeModal;
body.style.transition = "0.2s";
screen.style.display = "block";
modal.style.display = "block";

function showModal(){

    body.style.filter = "blur(5px)";
    ModalOpen();
}

function closeModal(){

    body.style.filter = "blur(0px)";
    ModalClose();
}

ModalClose();

function ModalOpen(){
    modal.className = "up";
    body.append(screen);
    html.append(modal);
}

function ModalClose(){
    modal.remove();
    screen.remove();
}

x.onclick = closeModal;