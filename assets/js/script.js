/* 
* TEMPORÄRE LÖSUNG!
*
* Lädt das Semester als Startelement in APP
* Semesterauswahl ist bestimmbar anhand des Anchor (#sem1, #sem2, ...)
*
*/
document.getElementById("app").innerHTML = document.getElementById("semester").innerHTML;
let hash = window.location.hash.substr(1);
let anchor = hash.replace("sem", "");
displayOrbit( parseInt(hash.replace("sem", "")));

// Checken ob onHashChange möglich ist
if ("onhashchange" in window) {
  // Event darauf setzen auf, ob der Url-Hash geändert wurde
  window.onhashchange = function () {
    // Daten werden neu reingeladen
    document.getElementById("app").innerHTML = document.getElementById("semester").innerHTML;
    hash = window.location.hash.substr(1);
    displayOrbit(parseInt(hash.replace("sem", "")));
  }
} 