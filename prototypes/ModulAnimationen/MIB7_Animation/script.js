// GSAP Plugins aktivieren/registrieren
gsap.registerPlugin(MotionPathPlugin, Draggable, SnapPlugin); 

$('object').each(function() {
  $(this).attr('data', $(this).attr('load-data'));
});

let svgcontent;

$('#mib7').on('load', () => {
  console.log("SVG Loaded");
  $('#mib7').hide();

  // Content speichern
  svgcontent = document.getElementById("mib7").contentDocument;

  prepareSVG();
  startAnimation();
});

function prepareSVG(restart = false) {
  if(!restart) {
    $(svgcontent).find("#Lines").children("path").each(function() {
      gsap.set($(this), {scaleX:0, opacity:1});
    });
  
    $(svgcontent).find("#Checklist").children("g").each(function() {
      gsap.set($(this), {opacity:0})
    });
  
    $(svgcontent).find("#Frames").children("path").each(function() {
      gsap.set($(this), {scaleY:0})
    });
  } else {

    // Restart
    $(svgcontent).find("#Lines").children("path").each(function() {

      gsap.to($(this), {opacity:0, delay: 0.5, duration: 0.2}).then(function() {
        gsap.to($(this), {scaleX:0, delay: 0.5, duration: 0.1});
      });

    }).promise().then( function() {

      $(svgcontent).find("#Checklist").children("g").each(function() {
        gsap.to($(this), {opacity:0, delay: 0.5, duration: 0.2});
      });

    }).promise().then( function() {

      $(svgcontent).find("#Frames").children("path").each(function() {
        gsap.to($(this), {scaleY:0, delay: 0.3, duration: 0.5});
      }).delay(2000).promise().then( function() {

        prepareSVG();
        startAnimation();

      });

    });

  }

}

function startAnimation() {
  $('#mib7').show();

  let servers = $(svgcontent).find("#Rack").children("g");
  let serverLEDs = servers.find('circle');
  let checklist = $(svgcontent).find("#Checklist").children("g");
  let codelines = $(svgcontent).find("#Lines").children("path");

  let frames = $(svgcontent).find("#Frames").children("path");


  let framesTL = gsap.timeline({delay: 0, duration: 1.3});
  frames.each(function() {
    framesTL.to( $(this), {
      scaleY: 1,
    });
  });

  let ledload = '#21E6A7';

  let codelineTL = gsap.timeline({delay: 2, onComplete: function() {
    serverLEDs.each(function() {
      gsap.to( $(this), {
        duration: 0.4,
        delay: 1.5,
        fill: ledload,
      });
    });
  }});

  codelines.each(function() {
    let el = $(this);

    codelineTL.to( el, {
      scaleX: 1,
      duration: 0.6,
      delay: 0.5,
      onUpdate: (function() {
        let blink = gsap.timeline({repeat: 2, duraton: 0.2});
        blink.to( serverLEDs.eq( randomBetween(0, serverLEDs.length -1) )[0], {
          duration: 0.1,
          delay: 0,
          fill: ledload,
        });
        blink.to( serverLEDs.eq( randomBetween(0, serverLEDs.length -1) )[0], {
          fill: 'transparent',
        });
      }),
      onComplete: (function() {

      }),
    });

  });

  // Checklist durchgehen nach Codeline
  codelineTL.then(function() {
    checklistTL = gsap.timeline({delay: -1, duration: 4});
    checklist.each(function() {
      checklistTL.to($(this), {
        opacity: 1,
      });
    });
  }).then(function() {
    checklistTL.then( function() {
      prepareSVG(true);
    });
  });

}

