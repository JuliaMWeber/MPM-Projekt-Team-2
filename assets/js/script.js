/* 
* TEMPORÄRE LÖSUNG!
*
* Lädt das Semester als Startelement in APP
* Semesterauswahl ist bestimmbar anhand des Anchor (#sem1, #sem2, ...)
*
*/
document.getElementById("app").innerHTML = document.getElementById("intro").innerHTML;
displayIntro();

reactToHash();

// Checken ob onHashChange möglich ist
if ("onhashchange" in window) {
  // Event darauf setzen auf, ob der Url-Hash geändert wurde
  window.onhashchange = reactToHash;
}

function reactToHash(){
  // Daten werden neu reingeladen
  let hash = window.location.hash.substr(1);
  if(hash.includes("sem")){
    animateToSemester(getSemesterNumberByHash());
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


function animateToSemester(semester){
  document.getElementById("app").innerHTML = document.getElementById("semester").innerHTML;
  displayOrbit(semester);
}