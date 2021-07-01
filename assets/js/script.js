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
  mobiledevice();
}

function reactToHash() {
  // Daten werden neu reingeladen
  let hash = window.location.hash.substr(1);

  // Schauen ob wir eine passende Section haben
  let section = null;
  $("section").each(function () {
    if ($(this).attr('id') == hash) {
      section = $(this);
      return;
    }
  });

  if (section) {

  } else {
    // Urls speichern/überschreiben für Browser Prev/Next Buttons
    sessionStorage.setItem("last_url", sessionStorage.getItem("current_url"));
    sessionStorage.setItem("current_url", window.location);

    if (hash.includes("sem")) {

      switchToSemester(getSemesterNumberByHash());
    } else if (hash === "") {
      // Just to be safe
      resetOrbit();

      document.getElementById("app").innerHTML = document.getElementById("intro").innerHTML;
      startIntro(document.getElementById("app"));

    } else if (hash.includes("schwerpunktwahl")) {

      switchToSchwerpunktwahl(getSchwerpunktNumberByHash());
    } else {
      // Kein Match?
      console.log("Keine passende Section gefunden");
    }
  }

}


function getSemesterNumberByHash() {
  let hash = window.location.hash.substr(1);
  let number = parseInt(hash.replace("sem", "")) || 0;
  if (number > 0) {
    return number;
  }
  return 1;
}

function switchToSemester(semester) {
  document.getElementById("app").innerHTML = document.getElementById("semester").innerHTML;
  displayOrbit(semester);
}

function getSchwerpunktNumberByHash() {
  let hash = window.location.hash.substr(1);
  let number = parseInt(hash.replace("schwerpunktwahl", "")) || 0;
  if (number > 0) {
    return number;
  }
  return 1;
}

function switchToSchwerpunktwahl(id) {
  document.getElementById("app").innerHTML = document.getElementById("schwerpunktwahl").innerHTML;
  displaySchwerpunktwahl(id);
}


// QR-Code
function generateQRCode() {
  let qrcodewrapper = $('#app').find('#satellite');
  if (qrcodewrapper.length > 0) {

    let sat = qrcodewrapper.find('#satellite_svg').first();

    $(sat).on("load", function () {
      if (sat[0].contentDocument) {
        let wing = $(sat[0].contentDocument).find('#qrplace')[0];

        let url = window.location.href;
        let qrcode = new QRCode(wing, {
          text: url,
          width: 250,
          height: 250,
          colorDark: "#000000",
          colorLight: "transparent",
          correctLevel: QRCode.CorrectLevel.H,
          useSVG: true
        });

        gsap.set(wing, {
          rotate: -45,
          transformOrigin: "center",
          x: 75,
          y: 75,
          scale: 0.8
        });

        let wiggle = gsap.timeline();
        // wiggle.to(sat, {
        //   x: 15,
        //   y: 15,
        //   rotate: 5,
        //   repeat: -1,
        //   yoyo: true,
        //   duration: 2,
        // });

        wiggle.to(sat, {
          x: 'random(-15, 15, 5)',
          y: 'random(-15, 15, 5)',
          repeat: -1,
          yoyo: true,
          repeatRefresh: true
        })

        let comein = gsap.timeline({
          duration: 0.5,
          paused: true
        });

        let scale = 5;
        comein.to(sat.parent(), {
          scale: scale,
          rotate: 45,
          x: (device.width / 2) - (sat.parent().width() * scale / 2),
          y: -(device.height / 2) + (sat.parent().height() * scale / 2),
          transformOrigin: "bottom",
        });

        sat.parent().on('click', function () {

          console.log((device.width / 2), (sat.parent().width() * scale / 2));

          if (sat.parent().attr('clicked') == 'true') {
            comein.reverse();
            wiggle.play();

            sat.parent().attr('clicked', false);

          } else {
            comein.play();
            wiggle.pause();

            sat.parent().attr('clicked', true);
          }
        });

      }
    });
  }
}


// Mobile-Detection
function mobiledevice() {
  let deviceDetect = $(".mobiledevice");
  let orientation;

  let tl = gsap.timeline({repeat: -1,  yoyo: true, duration: 0.8, repeatDelay: 0.5});

  // desktop
  if (window.orientation === undefined) {
    gsap.set(deviceDetect, {
      display: "none",
    });
    return;
  }

  if (window.matchMedia("(orientation: landscape)").matches) {
    orientation = 'landscape';
    gsap.set(deviceDetect, {
      display: "none",
    });
  }
  if (window.matchMedia("(orientation: portrait)").matches) {
    orientation = 'portrait';
    gsap.set(deviceDetect, {
      display: "block",
    });

    tl.to(deviceDetect.find(".device"), {
      rotate: 90,
    });
  }

  // reload
  if(sessionStorage.getItem("orientation") != orientation) {
    updateDeviceSettings();
    sessionStorage.setItem("orientation", orientation);

    if(window.location.hash.substr(1)) {
      reactToHash();
    } else {
      window.location.href = window.location.href.split('#')[0];
    }
  }

}

window.addEventListener("resize", function() {
  mobiledevice();
}, false);
