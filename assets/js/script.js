/* 
* TEMPORÄRE LÖSUNG!
*
* Lädt das Semester als Startelement in APP
* Semesterauswahl ist bestimmbar anhand des Anchor (#sem1, #sem2, ...)
*
*/

// Url speichern für späteren Wechsel
sessionStorage.setItem("current_url", window.location);

reactToHash();

// Checken ob onHashChange möglich ist
if ("onhashchange" in window) {
  // Event darauf setzen auf, ob der Url-Hash geändert wurde
  window.onhashchange = reactToHash;
}

function reactToHash() {
  // Daten werden neu reingeladen
  let hash = window.location.hash.substr(1);

  // Schauen ob wir eine passende Section haben
  let section = null;
  $("section").each(function() {
    if($(this).attr('id') == hash) {
      section = $(this);
      return;
    }
  });

  if(section) {

  } else {
    if(hash.includes("sem")) {
      // Urls speichern/überschreiben für Browser Prev/Next Buttons
      sessionStorage.setItem("last_url", sessionStorage.getItem("current_url"));
      sessionStorage.setItem("current_url", window.location);

      switchToSemester(getSemesterNumberByHash());
    } else if(hash === "") {
      document.getElementById("app").innerHTML = document.getElementById("intro").innerHTML;
      startIntro(document.getElementById("app"));
    } else {
      // Kein Match?
      console.log("Keine passende Section gefunden");
    }
  }

}

function getSemesterNumberByHash() {
  let hash = window.location.hash.substr(1);
  let number = parseInt( hash.replace("sem", "") ) || 0;
  if(number > 0 ) {
    return number;
  }
  return 1;
}

function switchToSemester(semester){
  document.getElementById("app").innerHTML = document.getElementById("semester").innerHTML;
  displayOrbit(semester);
}