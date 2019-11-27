# Firebird pages
### Autori:
- Andrea Delli
- Alexander Nettenbreijers
# 
**ATTENZIONE: questo branch è una versione vecchia del progetto**

A differenza del branch `master`, all'interno di questo branch è presente la documentazione su come installare i certificati nel browser e i bottoni per scaricarlo, ceh non sono più necessari vista la nuova organizzazione scolastica.
#
Le pagine web del progetto hanno i seguenti scopi:
- Migliorare la vecchia interfaccia grafica e renderla **più intuitiva** per gli utenti
- Permettere di effettuare **Login e Logout** con l'account Google scolastico
- Far visualizzare le informazioni riguardanti la connessione dell'utente

La parte di login e generazione del contenuto dinamico della pagina è gestita dal server back-end presente a scuola, che riceve le informazioni e le inserisce nelle pagine index.html e denied.html all'interno degli appositi commenti.

Dentro `index.html` e `denied.html` sono presenti dei commenti standard html con una sintassi simile a  “`\<!--[AREA_START]-->`” che finiscono con  “`\<!--[AREA_END]-->`”. Questi sono due commenti che delimitano i punti dove il server Firebird andrà ad agire processando e inserendo le informazioni necessarie. Quando le pagine saranno visualizzate sul browser del client, index.html e denied.html saranno due pagine contenenti di base l’HTML scritto da noi e tra i commenti delimitatori le informazioni generate da Firebird: questi file HTML saranno poi modificati tramite gli script, che agiscono post-generazione dell’HTML. 

Il lavoro da noi svolto è stato rifare i due file html (index.html e denied.html) inserendo i commenti necessari al funzionamento della pagina come già funzionava in precedenza. In seguito abbiamo aggiunto la grafica creando un foglio CSS (`style.css`), e per finire abbiamo aggiunto gli script per modificare l’HMTL generato da Firebird, coi contenuti aggiunti tra i commenti (quindi non i file index.html e denied.html così come sono bensì con le informazioni dell'utente e della connessione aggiunti dal server). 
 
#

| File                 | Utilizzo                                                                          |
|----------------------|-----------------------------------------------------------------------------------|
| index.html           | Pagina principale                                                                 |
| denied.html          | Pagina utilizzata per mostrare un errore all'utente (esempio: contenuto bloccato) |
| style.css            | Pagina di stile principale                                                        |
| js/$.js              | jQuery                                                                            |
| js/TableToggle.js    | funzione che gestisce la \<table> con informazioni sull’utente                    |
| js/script.js         | funzione dedicata a modificare l’HTML ricevuto nel modo desiderato                |
| bundle/bootstrap/    | Bootstrap v4.3.1                                                                  |
| bundle/font-awesome/ | Font-Awesome Free v5.8.2                                                          |
| resources/           | Immagini                                                                          |
| resources/font/      | Font usati nelle pagine HTML                                                      |

#
 ### Change Log (Estetica)
 - Sono stati spostati i bottoni (login/logout) in alto (sotto il titolo) per renderli più visibili
- Le informazioni dell’utente connesso sono visibili solo in parte, nel seguente modo:
    - Nome, Cognome, E-mail: sempre visibili
    - Cliccando il bottone raffigurato da una freccia appariranno informazioni aggiuntive
- Lo stile della pagina è stato rifatto totalmente

#

### Spiegazione generale degli script
**`tableToggle.js`**

Questo script gestisce la tabella con le informazioni relative all’utente connesso, stabilisce quanto veloce si apre e chiude la tabella e anche quante informazioni mostrare.

_Se si desidera cambiare QUANTI parametri visualizzare, modificare questo file .js_

_Se si desidera cambiare QUALI parametri visualizzare, modificare lo script “script.js” nella sezione “INFO TABLE”_

**`script.js`**

Questo è lo script più importante. Quando la pagina html viene generata, le informazioni che restituisce Firebird si trovano all’interno dei commenti `\<!--[INFOTEXT_START]-->` e `\<!--[INFOTEXT_END]-->`, ma sono diverse da come desiderato per la corretta visualizzazione. In altre parole, le informazioni utente sono restituite come una serie di “`\<p>info:info\</p>`...” Lo script modifica questo in una `\<table>` con i relativi `\<td>` e il corretto contenuto.

Questo script gestisce il formato dei dati scritti all’interno dell’HTML, cambiandone il formato in quello desiderato per poi modificarne lo stile col file CSS.

**Logica di base per script.js**: Tutti i commenti nell’HTML sono compresi in un `\<div>` con un id specifico relativo a cosa racchiude. **script.js** guarda all’interno di questi `\<div>` e decide cosa fare: A pescindere dal fatto che l’utente sia connesso oppure no, Firebird non rimuove i commenti ma li lascia vuoti. Lo script controlla se questi sono vuoti o pieni e decide cosa fare a proposito. Esempio pratico: se il div che racchiude il commento per le informazioni sull’utente è vuoto, allora lo script non fa apparire il bottone per “ToggleTable".
