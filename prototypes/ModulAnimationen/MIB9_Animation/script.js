$('#mib9').on('load', () => {
    console.log("SVG Loaded");
  let mib9Object = document.getElementById("mib9");
    let thmColored = mib9Object.contentDocument.getElementById("thm-colored");
  let tl = gsap.timeline({
    repeat: -1
  });
    tl.from(thmColored, {opacity: 0, duration: 3, delay: 3});
    let vivus = new Vivus('mib9', {
      type: "scenario", duration: 330
    }, function(e) {  
      vivus.reset().play();
      console.log("Animation done");    
    });

  });

