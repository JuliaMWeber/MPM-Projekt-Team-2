// Hier kommt das Custom Script Zeug rein
//testanimation mib9

$('#mib9').on('load', () => {
    console.log("SVG Loaded");
  let mib9Object = document.getElementById("mib9");
    let thmColored = mib9Object.contentDocument.getElementById("thm-colored");
  
    gsap.from(thmColored, {opacity: 0, duration: 3, delay: 3});
    let vivus = new Vivus('mib9', {
      type: "scenario",
    }, function(e) {
      console.log("Animation done");
    }); 
    vivus.play();
  });
