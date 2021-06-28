// Hier kommt das Custom Script Zeug rein
// GSAP Plugins aktivieren/registrieren
gsap.registerPlugin(MotionPathPlugin, Draggable, SnapPlugin);

$('object').each(function () {
  $(this).attr('data', $(this).attr('load-data'));
});

let leds = [];

const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZÄÜÖabcdefghijklmnopqrstuvwxyzßäüö"?!#=$%&.,-_/ ';

function simpleEncrypt(text, shift) {
  let letterArray = Array.from(letters);
  let textArray = Array.from(text);

  if (shift > letterArray.length) {
    shift = letterArray.length;
  }

  let tmp = [];
  $.each(textArray, function (index, value) {
    let i = letterArray.indexOf(value);

    if ((i + shift) > letterArray.length) {
      //console.log("Encrypt", value, letterArray[(i+shift - letterArray.length)] );
      tmp.push(letterArray[(i + shift - letterArray.length)]);
    } else {
      //console.log("Encrypt", value, letterArray[(i+shift)] );
      tmp.push(letterArray[i + shift]);
    }
  });

  return tmp.join('');
}

function simpleDecrypt(text, shift) {
  let letterArray = Array.from(letters);
  let textArray = Array.from(text);

  if (shift > letterArray.length) {
    shift = letterArray.length;
  }

  let tmp = [];
  $.each(textArray, function (index, value) {
    let i = letterArray.indexOf(value);

    if ((i - shift) < 0) {
      //console.log("Decrypt", value, letterArray[(letterArray.length + (i-shift))] );
      tmp.push(letterArray[(letterArray.length + (i - shift))]);
    } else {
      //console.log("Decrypt", value, letterArray[(i-shift)] );
      tmp.push(letterArray[i - shift]);
    }
  });

  return tmp.join('');
}


let animEase = "slow(0.7, 0.7, false)";


let svgcontent;
let splitter;
let encryptShift = 16;

/**
 * Wartet darauf, dass alle übergebenen SVGs geladen sind 
 *
 * @param array svgs
 * @return {object} Promise 
 */
function svgLoad(svgs) {
  // Zeit für timeout speichern
  let start = Date.now();
  return new Promise(loadSVGs);

  function loadSVGs(resolve, reject) {
    let loaded = 0;
    $.each(svgs, function (index, value) {
      // Schauen ob im Content des Elements, ob ein svg-tag im content drin ist
      if ($(value)[0] && $(value)[0].contentDocument && $(value)[0].contentDocument.getElementsByTagName('svg')[0]) {
        loaded++;
      }
    });

    if (loaded == svgs.length) {
      console.log("All SVGs completely loaded.");
      resolve(true);
    } else if ((Date.now() - start) >= (1000 * 30)) {
      reject(new Error("Couldnt load all SVGs!"));
    } else {
      //console.log("try again");
      // noch nix da dann probieren wir es noch mal
      setTimeout(loadSVGs.bind(this, resolve, reject), 10);
    }
  }
};


function prepare() {
  let plaintext = $(svgcontent).find("#String").children('text').first();

  let charArray = [];
  // Jeder Char
  charArray = Array.from(plaintext.text());
  // Jedes Wort
  charArray = Array.from(plaintext.text().split(" "));
  plaintext.html('').hide();
  
  splitter = $("<div>", {"class": "splitter"});
  $("body").append(splitter);
  
  $(charArray).each(function (index, value) {
    let $div = $("<div>", {
      "class": "char"
    });
    $div.html(value);
    splitter.append($div);
  });
}

function animateLock(open = true) {
  let ring = $(svgcontent).find("#ring").first();

  let tl = gsap.timeline({});

  let deg = open ? -25 : 0;

  tl.to(ring, {
    rotate: deg,
    duration: 1,
    transformOrigin: '0% 100%', // left-bottom
  });

  return tl;
}

function animateLineup() {

  let tmpWidth = 0;
  let tl = gsap.timeline({delay: 2});
  
  let laptop = $(svgcontent).find('#CaseTop');
  let laptopPos = getCenterOfElement(laptop[0]);

  let status = $(svgcontent).find('#Status').find('#s1')[0];
  tl.to(status, {
    opacity: 1,
    duration: 0.4,
    onStart: (function() {
      hideStatus(status);
    }),
    onUpdate: (function() {
      if($(status).attr('called')) {
        $(status).css('opacity', 0);
      }
    }),
    onComplete: (function() {
      $(status).attr('called', true);
    }),
    onReverseComplete: (function() {
      $(status).removeAttr('called');
    }),
  });
  
  $(splitter).children().each(function (index, value) {
    let el = $(this);

    let x;
    if (index == 0) {
      x = laptopPos.x + 10 + tmpWidth;
    } else {
      x = 6 + tmpWidth;
    }

    tl.to(el, {
      opacity: 0,
    });
    tl.set(el, {
      x: x,
      y: laptopPos.y + (getPositionOfElement(laptop[0]).y / 3),
      delay: 0,
      duration: 0.1
    });
    tl.to(el, {
      opacity: 1,
      duration: 0.1,
      onReverseComplete: (function() {
        let status = $(svgcontent).find('#Status').find('#s0')[0];
        gsap.to(status, {
          opacity: 1,
          duration: 0.5,
          onStart: (function() {
            hideStatus(status);
          }),
        });
        animateDB();
      }),

    });

    tmpWidth = x + el.width();

    tl.set(el, {
      attr: {
        encrypt: 'false',
        decrypt: 'false'
      }
    });

  });

  return tl;
}

function animateDB() {
  let db = $(svgcontent).find('#DB').first();
  let tl = gsap.timeline({
    duration: 0.3,
  });
  let layer = db.find('#Layer2').children('path').first();
  let color = layer.css('fill');

  tl.to( layer , {
    fill: "#9DB8D8",
  });
  tl.to( layer , {
    fill: color,
  });

  return tl;
}

function hideStatus(active) {
  let el = $(svgcontent).find('#Status').find('text');

  el.each(function() {
    if($(this)[0] != active) {
      gsap.set($(this), {
        opacity: 0,
      });
    }
  });
}

function animateEncrypt() {

  let tl = gsap.timeline({delay: 2});
  let lock = $(svgcontent).find('#Lock').first();
  let lockPos = getCenterOfElement(lock[0]);

  let laptop = $(svgcontent).find('#CaseTop');
  let laptopPos = getCenterOfElement(laptop[0]);

  let status = $(svgcontent).find('#Status').find('#s2')[0];
  tl.to(status, {
    opacity: 1,
    duration: 0.4,
    onStart: (function() {
      hideStatus(status);
    }),
    onUpdate: (function() {
      if($(status).attr('called')) {
        $(status).css('opacity', 0);
      }
    }),
    onComplete: (function() {
      $(status).attr('called', true);
    }),
    onReverseComplete: (function() {
      $(status).removeAttr('called');
    }),
  });

  // "Verschlüsselung"
  $(splitter).children().each(function() {
    let el = $(this);

    tl.to(el, {
      motionPath: {
        path: [{
          x: lockPos.x - (el.width() / 2),
          y: laptopPos.y,
        }],
        curviness: 0.5,
      },
      opacity: 1,
      duration: 0.3,
      ease: animEase,
      onStart: (function() {
        el.addClass('selected');
      }),
      onReverseComplete: (function() {
        el.removeClass('selected');
      }),
    });
    tl.to(el, {
      motionPath: {
        path: [{
          x: lockPos.x - (el.width() / 2),
          y: lockPos.y - (el.height() / 2),
        }],
        curviness: 0.5,
      },
      opacity: 0,
      delay: 0.5,
      duration: 0.3,
    });

    tl.to(el, {
      onUpdate: (function() {
        if (el.attr('decrypt') && el.attr('decrypt') == 'true') {
          el.text(simpleDecrypt(el.text(), encryptShift));
          el.removeAttr('decrypt');
        }
        if (!el.attr('encrypt') || el.attr('encrypt') == 'false') {
          el.html(simpleEncrypt(el.text(), encryptShift));
          el.attr('encrypt', true);
        }
      }),
      onReverseComplete: (function() {
        let status = $(svgcontent).find('#Status').find('#s5')[0];
        gsap.to(status, {
          opacity: 1,
          duration: 0.5,
          onStart: (function() {
            hideStatus(status);
          }),
        });
      }),
    });


  });

  return tl;
}

function animateTransfer() {
  let tl = gsap.timeline({delay: 2});

  let lock = $(svgcontent).find('#Lock').first();
  let lockPos = getCenterOfElement(lock[0]);

  let db = $(svgcontent).find('#DB').first();
  let dbPos = getCenterOfElement(db[0]);

  let laptop = $(svgcontent).find('#CaseTop');
  let laptopPos = getCenterOfElement(laptop[0]);


  let status = $(svgcontent).find('#Status').find('#s3')[0];
  tl.to(status, {
    opacity: 1,
    duration: 0.4,
    onStart: (function() {
      hideStatus(status);
    }),
    onUpdate: (function() {
      if($(status).attr('called')) {
        $(status).css('opacity', 0);
      }
    }),
    onComplete: (function() {
      $(status).attr('called', true);
    }),
    onReverseComplete: (function() {
      $(status).removeAttr('called');
    }),
  });

  // "Verschlüsselung"
  $(splitter).children().each(function() {
    let el = $(this);

    tl.to(el, {
      opacity: 1,
      motionPath: {
        path: [{
          x: dbPos.x - (el.width() / 2),
          y: dbPos.y - (el.height() / 2),
        }, ],
        curviness: 0.5,
      },
      duration: 0.8,
      ease: animEase,
      delay: 0.3,
    });

    tl.to(el, {
      opacity: 0,
      onComplete: (function () {
        if (!el.attr('decrypt') || el.attr('decrypt') == 'false') {
          el.attr('decrypt', true);
          animateDB();
        }
      }),
      onReverseComplete: (function() {
        let status = $(svgcontent).find('#Status').find('#s4')[0];
        gsap.to(status, {
          opacity: 1,
          duration: 0.5,
          onStart: (function() {
            hideStatus(status);
          }),
        });
        animateDB();
      }),
    });

  });

  return tl;
}

svgLoad(['#svg_swwm']).then(function () {
  svgcontent = document.getElementById("svg_swwm").contentDocument;

  prepare();

  let tl = gsap.timeline({repeat:-1, repeatDelay: 2, yoyo: true});
  tl.add(animateLineup());
  tl.add(animateLock(true));
  tl.add(animateEncrypt(true));
  tl.add(animateLock(false));
  tl.add(animateTransfer(true));

})