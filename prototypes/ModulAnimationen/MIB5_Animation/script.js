// Hier kommt das Custom Script Zeug rein
//testanimation  

  let mib5Object = document.getElementById("mib5");
  let fensterWord = mib5Object.contentDocument.getElementById("word-Fenster");
  let fensterYoutube = mib5Object.contentDocument.getElementById("youtube-Fenster");
  let iconLeisteYoutube = mib5Object.contentDocument.getElementById("YoutubeIconLeiste-2");
  let schrift= mib5Object.contentDocument.getElementById("Schreibtext");
  let tl = gsap.timeline(
      {
          repeat: -1
      });

gsap.from(fensterYoutube, {opacity:0});
tl.to(fensterWord, {opacity: 0, duration: 1.5, delay:0.5})
  .to(fensterWord, {opacity:1, duration: 0}) 
  .to(fensterYoutube, {opacity: 0, duration: 1.5, delay: 0.5})
  .to(fensterYoutube, {opacity: 1, duration: 0})
  ;
tl.from(schrift, {width: 0});
//variation 2 noch nicht fertig
// tl.to(fensterWord, {width: 1, height: 1, duration: 1})
//   .to(fensterWord, {}) //Icon
// ;

