let mySvg = document.getElementById("MIB4Obj");

//ease: "power2" //string form is preferred (this is the same as "power2.out")
//ease: Power2.easeOut //global object also works


mySvg.onload = function() {
    content = mySvg.contentDocument;
   
    let bosTl = animateBos();
    let ideTl = animateIDE();
}

function animateIDE() {
    let darkBlue = "#000039";
    let markedColor = "#CC0000";

    gsap.registerEffect({
        name: "deleteAll",
        effect: (target, config) => {
            return gsap.to(target, {yoyo: true, repeat: 0, duration: config.duration, scale: config.scale, transformOrigin: "left"});            
        },
        defaults: {duration: 0.02, scale: 0},
        extendTimeline: true
    });
    gsap.registerEffect({
        name: "markAll",
        effect: (target, config) => {
            return gsap.to(target, {yoyo: true, repeat: config.repeat, fill: config.fill, opacity: 1, duration: config.duration, repeatDelay: config.repeatDelay});            
        },
        defaults: {duration: 0, repeatDelay: 0, repeat: 0},
        extendTimeline: true
    });
    gsap.registerEffect({
        name: "setCodeColor",
        effect: (target, config) => {
            return gsap.to(target, {yoyo: true, repeat: config.repeat, fill: config.fill, opacity: 1, duration: config.duration, repeatDelay: config.repeatDelay});            
        },
        defaults: {duration: 0.1, repeatDelay: 0.2, repeat: 0},
        extendTimeline: true
    });
    gsap.registerEffect({
        name: "writeCode",
        effect: (target, config) => {
            return gsap.to(target, {yoyo: true, repeat: 1, duration: config.duration, scale: config.scale, transformOrigin: "left"});            
        },
        defaults: {duration: 0.1, scale: 1.0},
        extendTimeline: true
    });
   
    let timeLine = gsap.timeline({repeat: -1, repeatDelay: 1});
    let theCode = content.getElementById("theCode");
    for (let codeLine of theCode.children) {
        timeLine.setCodeColor(codeLine, {fill: darkBlue}).writeCode(codeLine);
    }

    for (let codeLine of theCode.children) {
        timeLine.markAll(codeLine, {fill: markedColor});
    }

    for (let codeLine of theCode.children) {
        timeLine.deleteAll(codeLine);
    }

}
    
function animateBos() {
    let limeGreen = "#32CD32";
    gsap.registerEffect({
        name: "setBosColor",
        effect: (target, config) => {
            return gsap.to(target, {yoyo: true, repeat: config.repeat, fill: config.fill, opacity: 1, duration: config.duration, repeatDelay: config.repeatDelay});            
        },
        defaults: {duration: 0.12, repeatDelay: 0.2, repeat: 1},
        extendTimeline: true
    });
    gsap.registerEffect({
        name: "deleteAll",
        effect: (target, config) => {
            return gsap.to(target, {yoyo: true, repeat: 0, duration: config.duration, scale: config.scale, transformOrigin: "left"});            
        },
        defaults: {duration: 0.02, scale: 0},
        extendTimeline: true
    });

    let timeLine = gsap.timeline({repeat: -1, repeatDelay: 1});
    
    let theBoss = content.getElementById("Dreieck");
    timeLine.setBosColor(theBoss, {fill: limeGreen})
    .deleteAll(theBoss, {duration:1});
    
    
}

    
    
    
    
    
    
//let theBoss = content.getElementById("BosAusgabeE");
     
    //for (let E of theBoss.children) {
      //  for (let Echild of E.children) {
        //    timeLine.setBosColor(Echild, {fill: limeGreen});
       // }
    //}
//}

