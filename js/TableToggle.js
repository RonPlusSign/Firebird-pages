var rowAmountWhenClosed = 2; // Numero di righe da mostrare mentre la tabella è chiusa
var sleepTime = 10;	// Intervallo di tempo che c'è tra l'apparizione/scomparsa di una riga e la successiva
var deg = 180;

// Elementi del DOM su cui lavorare
var toggle = document.getElementById("toggle");
var table = document.getElementById("INFO");
var trs = table.getElementsByTagName("tr");
var toggler = document.getElementsByClassName("fa-chevron-down");
toggler[0].style.transition = "0.5s";

// Nascondi le righe in eccesso al caricamento della pagina
for (var i = rowAmountWhenClosed; i < trs.length; i++) {
  trs[i].style.display = "none";
}

/**
 * Ferma la pagina per il tempo passato come parametro
 * @param {number} ms il valore in millisecondi
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Gestione della chiusura della tabella
 * @async
 */
async function close() {
  deg -= 180;

  // Ruota il bottone
  toggler[0].style.transform = "rotate(" + deg + "deg)";

  // Nascondi le righe in più
  for (
    var i = trs.length - (rowAmountWhenClosed - 1); i > rowAmountWhenClosed - 1; i--) {
    trs[i].style.display = "none";

    await sleep(sleepTime);
  }

  toggle.onclick = open;
}

/**
 * Gestione dell'apertura della tabella
 * @async
 */
async function open() {
  deg -= 180;

  // Ruota il bottone
  toggler[0].style.transform = "rotate(" + deg + "deg)";

  // Mostra tutte le righe
  for (var i = rowAmountWhenClosed - 1; i < trs.length; i++) {
    trs[i].style.display = "table-row";
    await sleep(sleepTime);
  }

  toggle.onclick = close;
}

toggle.onclick = open;
close();
