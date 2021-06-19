// Hier kommt das Custom Script Zeug rein
//testanimation  





  $('#mib5').on('load', () => {
    console.log("SVG Loaded");
    let mib5Object = document.getElementById("mib5");
    let fensterWord = mib5Object.contentDocument.getElementById("word-Fenster");
  
    let iconLeisteYoutube = mib5Object.contentDocument.getElementById("YoutubeIconLeiste-2");
    let tl= gsap.timeline({
      repeat: -1
    });
    tl.to(iconLeisteYoutube, {opacity: 0})
    .to(fensterWord, {opacity:0, x: 20, y: 380, scale: 0, duration: 2, delay: 1})
    .to(iconLeisteYoutube, {opacity: 100, delay: -1})
    ;

      
    const vivus = new Vivus('mib5', {
      type: "scenario",
    }, function(e) {
      console.log("Animation done");
    }); 
    vivus.play(function(){
      vivus.reset().play();
    });
  
  });
