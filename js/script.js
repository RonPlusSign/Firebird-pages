////█							█////
////█			♥♥♥♥			█////
////█	Script text-modifier.	█//// Questo è uno script dedicato solo modificare l'HTML a seconda dell'esigenza
////█			♥♥♥♥			█////
////█							█////

/*
────────────────────────────────────────────────────────────┤♦│
████████████████████████████████████████████████████████████│!│-TITLE & MESSAGES (alert-primary)-
────────────────────────────────────────────────────────────┤♦│

Con il titolo è possibile controllare in che stato è Firebird (Connesso/Non Connesso/Denied)
*/

try {
  var str = document.querySelectorAll("#TITLE")[0].innerHTML;
  str = str
    .split("<!--[TITLETEXT_START]-->")
    .pop()
    .split("<!--[TITLETEXT_END]-->")[0];

  switch (str) {
    //Index
    case "INDEX":
      $("#TITLE h2").addClass("blue");
      $("#TITLE h2").text("Pagina di accesso a Firebird");
      break;

    // Not connected
    case "Effettua il login":
      $("#TITLE h2").addClass("blue");
      $("#TITLE h2").text("Effettua il login");

      // Cambia il contenuto del messaggio
      $("#msg-disconnessione").html(
        "<p><hr><b>ATTENZIONE</b>: ricordati di effettuare la disconnessione al termine della sessione di lavoro.</p>"
      );
      break;

    // Connected
    case "Stato connessione":
      $("#TITLE h2").addClass("green");
      $("#TITLE h2").text("Connesso");

      // Se il login è stato effettuato, nascondi il messaggio per ricordare di connettersi con l'account istituzionale
      $("#msg-posta-istituzionale").addClass("hidden");
      break;

    // Denied
    case "ACCESSO NEGATO":
      $("#TITLE h2").addClass("red");
      $("#TITLE h2").text("Accesso Negato");
      break;
  }
} catch (ex) {}

/*
────────────────────────────────────────────────────────────┤♦│
████████████████████████████████████████████████████████████│!│-BUTTONS-
────────────────────────────────────────────────────────────┤♦│

Se c'è il bottone, sostituiscilo con quello pre-made

*/

try {
  //───── Pagina di login ─────

  var str = document.querySelectorAll("#LOGINBTN")[0].innerHTML;
  str = str
    .split("<!--[LOGINBTN_START]-->")
    .pop()
    .split("<!--[LOGINBTN_END]-->")[0];

  if (str != "") {
    $("#LOGINBTN").html("");
    $("#LOGINBTN").append($("#loginbtn-obj"));
  }

  //───── Pagina di logout ─────

  var str = document.querySelectorAll("#LOGOUTBTN")[0].innerHTML;
  str = str
    .split("<!--[LOGOUTBTN_START]-->")
    .pop()
    .split("<!--[LOGOUTBTN_END]-->")[0];

  if (str != "") {
    $("#LOGOUTBTN").html("");
    $("#LOGOUTBTN").append($("#logoutbtn-obj"));
  }
} catch (ex) {}

/*
────────────────────────────────────────────────────────────┤♦│
████████████████████████████████████████████████████████████│!│-TABLE (connected)-
────────────────────────────────────────────────────────────┤♦│

Modifica il contenuto delle INFO da una serie di <p> a una tabella.
La gestione del toggle è in "tableToggle.js"
*/

try {
  // Prendi il contenuto da manipolare
  var str = document.querySelectorAll("#INFO")[0].innerHTML;
  str = str
    .split("<!--[INFO_START]-->")
    .pop()
    .split("<!--[INFO_END]-->")[0];

  // Controlla se l'area d'info non è vuota
  if (str != "") {
    str = str
      .split("<!--[INFOTEXT_START]-->")
      .pop()
      .split("<!--[INFOTEXT_END]-->")[0];

    // Aggiungi il bottone di toggle (per apertura/chiusura della tabella)
    $("#INFO").before($("#toggle-obj"));

    // Lista delle icone di font-awesome
    var list = [
      "fas fa-user",
      "far fa-envelope",
      "fas fa-signal",
      "fas fa-network-wired",
      "fas fa-users",
      "fas fa-calendar-alt",
      "fas fa-file-download",
      "fas fa-file-upload",
      "fas fa-tachometer-alt",
      "fas fa-tachometer-alt"
    ];

    /**
     * Inverte 2 elementi all'interno dell'array
     * @param {[]} arr array di elementi
     * @param {number} indexA primo indice
     * @param {number} indexB secondo indice
     */
    function swapArrayElements(arr, indexA, indexB) {
      var temp = arr[indexA];
      arr[indexA] = arr[indexB];
      arr[indexB] = temp;
    }

    // Rimuovi tutti i </p>
    str = str.replace(/\<\/\p\>/g, "");
    // Dividi tutti gli elementi delle info
    var camps = str.split("<p>");
    // Rimuovi gli elementi vuoti
    camps = camps.filter(function(el) {
      return el != "";
    });

    swapArrayElements(camps, 0, 2);

    // Creazione della tabella
    var i = 0;
    var table = "<table>";
    camps.forEach(function(el) {
      el = "<tr><td><i class='" + list[i] + "'></i>" + el + "</td></tr>";
      el = el.replace(":", "</td><td>");
      i++;
      table += el;
    });
    table += "</table>";

    // Aggiunta della tabella al DOM
    $("#INFO").html("");
    $("#INFO").append($(table));
  }
} catch (ex) {}

/*
────────────────────────────────────────────────────────────┤♦│
████████████████████████████████████████████████████████████│!│-TABLE (denied)-
────────────────────────────────────────────────────────────┤♦│

Conversione del contenuto della pagina denied
Il contenuto cambia da delle frasi separate da <br> a una tabella
*/

try {
  // Prendi il contenuto da manipolare
  var str = document.querySelectorAll("#DENIED")[0].innerHTML;
  str = str
    .split("<!--[FAILTEXT_START]-->")
    .pop()
    .split("<!--[FAILTEXT_END]-->")[0];

  // Dividi i campi
  str = str.split("<br>");

  // Creazione della tabella
  var firstTr = "<tr><td>" + str[0] + ":</td><td>" + str[1] + "</td></tr>";
  var secondTr =
    "<tr><td>" +
    str[2].split(":")[0] +
    ":</td><td>" +
    str[2].split(":")[1] +
    "</td></tr>";

  var table = "<table>" + firstTr + secondTr + "</table>";

  // Aggiunta della tabella al DOM
  $("#DENIED").html("");
  $("#DENIED").append($(table));
} catch (ex) {}

$("html").fadeIn();
