var paths = {};

//Json Datei laden
$.ajax({
    url: "./assets/data/modulAnim.json",
    success: async function(data){
        for(var i=0; i < data.length;i++){
            paths[data[i].id] = data[i].svg;
        }
    }
});

function insertAnim(container, moduleId) {
    let animSvg = document.createElement("object");
    container.appendChild(animSvg);
    animSvg.id = "modulAnimObj";
    
    //Zugehöriges Svg laden
    animSvg.data = paths[moduleId];
    animSvg.onload = function() {
        loadAnimationScript(moduleId, animSvg.contentDocument);
    }
}

//Animation Script ausführen
function loadAnimationScript(moduleId, content){
    switch (moduleId) {
        case "MIB1" :
            mib1Anim(content);
            break;
        case "MIB2a" :
            mib2Anim(content);
            break;
        case "MIB3" :
            mib3Anim(content);
            break;
        case "MIB4a" :
            mib4Anim(content);
            break;
        case "MIB5" :
            mib5Anim(content);
            break;
        case "MIB6" :
            mib6Anim(content);
            break;
        case "MIB7" :
            mib7Anim(content);
            break;
        case "MIB8" :
            mib8Anim(content);
            break;
        case "MIB9" :
            mib9Anim(content);
            break;
        case "MIB10" :
            mib10Anim(content);
            break;        
    }
}

function mib1Anim(content) {
    let overlay = content.getElementById("thm_overlay")
    let thm = content.getElementById("thm")
    let showChecker = function () {
        gsap.to(overlay,{opacity:1,duration:2})
        gsap.to(thm,{fill:"white",duration:2})
    }

    let hideChecker = function(){
        gsap.to(overlay,{opacity:0,duration:1})
    }

    let tM = content.getElementById("t_m")
    let tR = content.getElementById("t_r")
    let tL = content.getElementById("t_l")

    let hM = content.getElementById("h_m")
    let hR = content.getElementById("h_r")
    let hL = content.getElementById("h_l")

    let mM1 = content.getElementById("m_m1")
    let mM2 = content.getElementById("m_m2")
    let mM3 = content.getElementById("m_m3")
    let mMR = content.getElementById("m_r")
    let mML = content.getElementById("m_l")

    let koordSystem = content.getElementById("koord_system")

    let doInitAnimation = function () {
        let buildSystem = new Vivus(document.getElementById("modulAnimObj") ,{type:"sync",duration:100,},function (e){
            startGSAP()

        })
    }

    let startGSAP = function () {
        //gsap.to(thm,{fill:"#4fe084",duration:1})
        let timeline = gsap.timeline({repeat: -1,repeatDelay:5})
            .to(thm,{fill:"#4fe084",duration:1})
            .to(tM,{y:-200},1)
            .to(tR,{x:-50},1)
            .to(tL,{x:50},1)
            .to(tM,{y:0,opacity:1,duration:0.4,ease:"bounce"},2)
            .to(tR,{x:0,opacity:1,duration:0.4},2.3)
            .to(tL,{x:0,opacity:1,duration:0.3},2.5)

            .to(hR,{y:-300},2.6)
            .to(hL,{y:-100},2.6)
            .to(hM,{x:100},2.6)
            .to(hR,{y:0,opacity:1,duration:0.4,ease:"bounce"},3)
            .to(hL,{y:0,opacity:1,duration:0.4,ease:"bounce"},3.2)
            .to(hM,{x:0,opacity:1,duration:0.3},3.5)

            .to(mMR,{y:-300},3.6)
            .to(mML,{y:-100},3.6)
            .to(mM1,{x:-100},3.6)
            .to(mM2,{y:-300},3.6)
            .to(mM3,{x:100},3.6)
            .to(mMR,{y:0,opacity:1,duration:0.4,ease:"bounce"},4.2)
            .to(mML,{y:0,opacity:1,duration:0.4,ease:"bounce"},4.3)
            .to(mM1,{x:0,opacity:1,duration:0.4},4.5)
            .to(mM2,{y:0,opacity:1,duration:0.3},4.5)
            .to(mM3,{y:0,opacity:1,duration:0.3},4.6)
            .to(mM3,{x:0,duration:0.5,onComplete:checker => {
                showChecker()
                    setTimeout(function (){hideChecker()},3500)
                }},4.9)
    }

    doInitAnimation()
}

function mib2Anim(content) {
    let firstBtn = content.getElementsByClassName("firstBtn");
    let secondBtn = content.getElementsByClassName("secondBtn");
    let thirdBtn = content.getElementsByClassName("thirdBtn");
    let firstWave = content.getElementsByClassName("firstWave");
    let secondWave = content.getElementsByClassName("secondWave");
    let thirdWave = content.getElementsByClassName("thirdWave");
    let speakerWave = content.getElementsByClassName("speakerWave");

    let masterTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1
    });

    masterTl.to(firstBtn, {
        y: -10
    }, '+=0.2').to(secondBtn, {
        y: -50
    }, '+=0.2').to(thirdBtn, {
        y: -90
    }, '+=0.2');


    gsap.to(firstWave, {
        duration: 2,
        scale: 0.5,
        repeat: -1
    });

    gsap.to(secondWave, {
        duration: 1,
        scale: 0.5,
        repeat: -1
    });

    gsap.to(thirdWave, {
        duration: 0.5,
        scale: 0.9,
        repeat: -1
    });

    gsap.from(speakerWave, {
        duration: 1,
        scale: 1.1,
        repeat: -1
    });
}

function mib3Anim(content) {
    let cls3 = content.querySelectorAll('.cls-3, .cls-18');
    let cls21 = content.getElementsByClassName('cls-21');
    let cls22 = content.getElementsByClassName('cls-22');
    let cls23 = content.getElementsByClassName('cls-23');
    let cls26 = content.getElementsByClassName('cls-26');
    let cls27 = content.getElementsByClassName('cls-27');
    let cls28 = content.getElementsByClassName('cls-28');
    let cursor = content.getElementById('cursor');
    let title = content.querySelectorAll('.title');

    let c = gsap.to(cursor, {
        opacity: 0,
        ease: 'power2.inOut',
        repeat: -1
    });

    const words = ['Designer.', 'Entwickler.', 'Entrepreneur.'];

    let masterTL = gsap
        .timeline({
            repeat: -1
        })
        .pause();

    words.forEach((word) => {
        let tl = gsap.timeline({
            repeat: 1,
            yoyo: true,
            repeatDelay: 1
        });
        tl.to(title, {
            duration: 1,
            text: word
        });
        masterTL.add(tl);
    });

    let tl = gsap.timeline({
        defaults: {
            duration: 0.5,
            ease: 'none',
            opacity: 0
        }
    });

    let tl1 = gsap.timeline({
        defaults: {
            duration: 0.1,
            ease: 'power3.out',
            opacity: 0,
            stagger: 0.03
        }
    });

    tl1.from(
        cls3, {
            x: 100
        },
        '+=0.01'
    );

    tl
        .from(
            cls21, {
                y: -400,
                ease: 'power3.out'
            },
            '+=0.2'
        )
        .from(
            cls26, {
                x: -400
            },
            '-=0.2'
        )
        .from(
            cls27, {
                x: -400,
                stagger: 0.2
            },
            '+=0.3'
        )
        .from(
            cls22, {
                y: 100
            },
            '-=0.2'
        )
        .from(
            cls23, {
                x: -400,
                stagger: 0.2
            },
            '-=0.2'
        );

    tl.from(cls28, {
        duration: 0.5,
        stagger: 0.2,
        transform: 'translateX(-100vw)',
        ease: 'power3.out',
        onComplete: () => masterTL.play()
    });
}

function mib4Anim(content) {

    setTimeout(function (){
        animate()
    },500);

    function animate() {
        let darkBlue = "#000039";
        let markedColor = "#CC0000";
        let bosColor = "#bc7252";
        //rgb(188,124,82)

        //IDE
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
    
        //Bos    
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
        let theCode = content.getElementById("theCode");
        let theBos = content.getElementById("Dreieck");
        for (let codeLine of theCode.children) {
            timeLine.setCodeColor(codeLine, {fill: darkBlue}).writeCode(codeLine);
        }

        for (let codeLine of theCode.children) {
            timeLine.markAll(codeLine, {fill: markedColor});
        }

        for (let codeLine of theCode.children) {
            timeLine.deleteAll(codeLine);
        }
        timeLine.setBosColor(theBos, {fill: bosColor, duration:0})
        .deleteAll(theBos, {duration:1});
    }
}

function mib5Anim(content) {
    let obj = document.getElementById("modulAnimObj");
    let fensterWord = content.getElementById("word-Fenster");
  
    let iconLeisteYoutube = content.getElementById("YoutubeIconLeiste-2");
    let tl= gsap.timeline({
      repeat: -1
    });
    tl.to(iconLeisteYoutube, {opacity: 0})
    .to(fensterWord, {opacity:0, x: 20, y: 380, scale: 0, duration: 2, delay: 1})
    .to(iconLeisteYoutube, {opacity: 100, delay: -1})
    ;

    const vivus = new Vivus(obj, {
      type: "scenario",
    }, function(e) {
      vivus.reset().play();
    });
}

function mib6Anim(content) {
    let animateTl = animate(); 

    function animate() {
        gsap.registerEffect({
            name: "tardis",
            effect: (target, config) => {
            return gsap.to(target, {yoyo: true, repeat: config.repeat, fill: config.fill, opacity: 1, duration: config.duration, repeatDelay: config.repeatDelay});             
            },
            defaults: {duration: 2, scale: 1},
            extendTimeline: true
        });

        gsap.registerEffect({
            name: "yolo",
            effect: (target, config) => {
                return gsap.to(target, {yoyo: true, repeat: 0, opacity: 1, duration: config.duration, scale: config.scale, transformOrigin: "left"});            
            },
            defaults: {duration: 1, scale: 1},
            extendTimeline: true
        });

        gsap.registerEffect({
            name: "now",
            effect: (target, config) => {
                return gsap.to(target, {yoyo: true, repeat: 0, opacity: 1, duration: config.duration, scale: config.scale, transformOrigin: "left"});            
            },
            defaults: {duration: 0},
            extendTimeline: true
        });

        gsap.registerEffect({
            name: "moveTexture",
            effect: (target, config) => {
                return gsap.to(target, {yoyo: true, repeat: 0, opacity: 1, duration: config.duration, scale: config.scale, transformOrigin: "left", translateX:200, translateY:200});            
            }, 
        
            defaults: {duration: 1,scale:0},
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

        let timeLord = gsap.timeline({repeat: -1, repeatDelay: 1});
        //let timeLord = gsap.timeline({repeat: 0, repeatDelay: 0}); alte v
        let cube = content.getElementById("wuerfel");
        let chess = content.getElementById("schachbrett");
        let cubetexture = content.getElementById("texturWuerfel");
        let texture = content.getElementById("textur");
        

        timeLord.tardis(cube, {opacity: 1, repeat: 0, repeatDelay: 0.04, duration: 0.5})
        .to(cube, {opacity: 1})
        .yolo(chess)
        .to(chess, {opacity: 1})
        .moveTexture(texture, {duration:3})
        //.deleteAll(texture)
        .now(cubetexture);
    }
}

function mib7Anim(content) {
    // GSAP Plugins aktivieren/registrieren
    gsap.registerPlugin(MotionPathPlugin, Draggable, SnapPlugin); 

    prepareSVG();
    startAnimation();

    function prepareSVG(restart = false) {
    if(!restart) {
        $(content).find("#Lines").children("path").each(function() {
        gsap.set($(this), {scaleX:0, opacity:1});
        });
    
        $(content).find("#Checklist").children("g").each(function() {
        gsap.set($(this), {opacity:0})
        });
    
        $(content).find("#Frames").children("path").each(function() {
        gsap.set($(this), {scaleY:0})
        });
    } else {

        // Restart
        $(content).find("#Lines").children("path").each(function() {

        gsap.to($(this), {opacity:0, delay: 0.5, duration: 0.2}).then(function() {
            gsap.to($(this), {scaleX:0, delay: 0.5, duration: 0.1});
        });

        }).promise().then( function() {

        $(content).find("#Checklist").children("g").each(function() {
            gsap.to($(this), {opacity:0, delay: 0.5, duration: 0.2});
        });

        }).promise().then( function() {

        $(content).find("#Frames").children("path").each(function() {
            gsap.to($(this), {scaleY:0, delay: 0.3, duration: 0.5});
        }).delay(2000).promise().then( function() {

            prepareSVG();
            startAnimation();

        });

        });

    }

    }

    function startAnimation() {
    let servers = $(content).find("#Rack").children("g");
    let serverLEDs = servers.find('circle');
    let checklist = $(content).find("#Checklist").children("g");
    let codelines = $(content).find("#Lines").children("path");

    let frames = $(content).find("#Frames").children("path");


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
}

function mib8Anim(content) {
    animateBos();
    animateIDE();


    /*BOS

    4x {
    -Linker Pfeil wird groß
    -Roter Ball fällt nach unten
    -Rechts mitte Pfeil wird groß
    -Blauer Ball fällt nach unten
    }

    Rote Punkte blinken
    punkte werden ausgeblendet
    */
    function animateBos(){
        let arrowL = content.getElementById("arrow1");
        let arrowR = content.getElementById("arrow3");
        let red = "#c34745";
        let blue = "#478888";

        gsap.registerEffect({
            name: "colorBlink",
            effect: (target, config) => {
                return gsap.to(target, {yoyo: true, repeat: config.repeat, fill: config.fill, opacity: 1, duration: config.duration, repeatDelay: config.repeatDelay});            
            },
            defaults: {duration: 0.2, repeatDelay: 0.2, repeat: 1},
            extendTimeline: true
        });
        gsap.registerEffect({
            name: "sizeBlink",
            effect: (target, config) => {
                return gsap.to(target, {yoyo: true, repeat: 1, duration: config.duration, scale: config.scale, transformOrigin: "center"});            
            },
            defaults: {duration: 0.3, scale: 1.3},
            extendTimeline: true
        });

        let tl = gsap.timeline({repeat: -1, repeatDelay: 1});
        tl.sizeBlink(arrowL)
        .colorBlink(getGrid(1,4), {fill: red})
        .colorBlink(getGrid(1,3), {fill: red})
        .colorBlink(getGrid(1,2), {fill: red})
        .colorBlink(getGrid(1,1), {fill: red, repeat:0})
        .sizeBlink(arrowR)
        .colorBlink(getGrid(3,4), {fill: blue})
        .colorBlink(getGrid(3,3), {fill: blue})
        .colorBlink(getGrid(3,2), {fill: blue})
        .colorBlink(getGrid(3,1), {fill: blue, repeat:0})
        .sizeBlink(arrowL)
        .colorBlink(getGrid(1,4), {fill: red})
        .colorBlink(getGrid(1,3), {fill: red})
        .colorBlink(getGrid(1,2), {fill: red, repeat:0})
        .sizeBlink(arrowR)
        .colorBlink(getGrid(3,4), {fill: blue})
        .colorBlink(getGrid(3,3), {fill: blue})
        .colorBlink(getGrid(3,2), {fill: blue, repeat:0})
        .sizeBlink(arrowL)
        .colorBlink(getGrid(1,4), {fill: red})
        .colorBlink(getGrid(1,3), {fill: red, repeat:0})
        .sizeBlink(arrowR)
        .colorBlink(getGrid(3,4), {fill: blue})
        .colorBlink(getGrid(3,3), {fill: blue, repeat:0})
        .sizeBlink(arrowL)
        .colorBlink(getGrid(1,4), {fill: red, repeat:0});
    }

    /*IDE

    Zeilen werden kürzer/länger
    Model wird ausgewählt
    Zeilen werden kürzer/länger
    Controller wird ausgewählt
    Zeilen werden kürzer/länger
    View wird ausgewählt

    */

    function animateIDE(){
        let viewTab = content.getElementById("ViewTab");
        let modelTab = content.getElementById("ModelTab");
        let controllerTab = content.getElementById("ControllerTab");
        let viewCode = content.getElementById("ViewCode");
        let modelCode = content.getElementById("ModelCode");
        let controllerCode = content.getElementById("ControllerCode");

        let selectColor = "#4a465d";
        let defaultColor = "#1d1835";

        let master = gsap.timeline({repeat: -1});
        let viewTl = gsap.timeline();
        let modelTl = gsap.timeline();
        let controllerTl = gsap.timeline();

        gsap.registerEffect({
            name: "scaleIncrementX",
            effect: (target, config) => {
                let iter = Math.abs((1 - config.scale) / config.increment);
                if(1 > config.scale){
                    config.increment *= -1;
                }

                let tl = gsap.timeline();
                for(let i=0;i<iter;i++){
                    tl.to(target, {duration: config.duration, scaleX: "+=" + config.increment, delay: config.delay});
                }

                return tl;
            },
            defaults: {increment: 0.05, delay:0.05, duration: 0.02},
            extendTimeline: true
        });

        viewTl.to(viewCode, {opacity: 1})
        .to(viewTab, {fill: selectColor}, "<")
        .scaleIncrementX(viewCode.children[0], {scale: 0.5})
        .scaleIncrementX(viewCode.children[7], {scale: 1.2}, ">0.5")
        .scaleIncrementX(viewCode.children[3], {scale: 0, delay:0.03}, ">0.5")
        .scaleIncrementX(viewCode.children[13], {scale: 1.4}, ">0.5")
        .to(viewCode, {opacity: 0})
        .to(viewTab, {fill: defaultColor}, "<");

        modelTl.to(modelCode, {opacity: 1})
        .to(modelTab, {fill: selectColor}, "<")
        .scaleIncrementX(modelCode.children[5], {scale: 0.5})
        .scaleIncrementX(modelCode.children[12], {scale: 1.2}, ">0.5")
        .scaleIncrementX(modelCode.children[2], {scale: 0, delay:0.03}, ">0.5")
        .scaleIncrementX(modelCode.children[7], {scale: 1.4}, ">0.5")
        .scaleIncrementX(modelCode.children[10], {scale: 1.4}, ">0.5")
        .to(modelCode, {opacity: 0})
        .to(modelTab, {fill: defaultColor}, "<");

        controllerTl.to(controllerCode, {opacity: 1})
        .to(controllerTab, {fill: selectColor}, "<")
        .scaleIncrementX(controllerCode.children[0], {scale: 0})
        .scaleIncrementX(controllerCode.children[1], {scale: 0}, ">0.5")
        .scaleIncrementX(controllerCode.children[2], {scale: 0, delay:0.03}, ">0.5")
        .scaleIncrementX(controllerCode.children[0], {scale: 2}, ">0.5")
        .scaleIncrementX(controllerCode.children[1], {scale: 2.5}, ">0.5")
        .to(controllerCode, {opacity: 0})
        .to(controllerTab, {fill: defaultColor}, "<");

        master.add(viewTl);
        master.add(modelTl);
        master.add(controllerTl);
    }

    function getGrid(x, y){
        return content.getElementById(x + "" + y);
    }
}

function mib9Anim(content) {
    let obj = document.getElementById("modulAnimObj");
    let thmColored = content.getElementById("thm-colored");
    let tl = gsap.timeline({
        repeat: -1
    });
    tl.from(thmColored, {opacity: 0, duration: 3, delay: 3});
    let vivus = new Vivus(obj, {
        type: "scenario", duration: 330
    }, function(e) {  
        vivus.reset().play();  
    });
}

function mib10Anim(content) {
    gsap.registerPlugin(Draggable)

    let typ;
    let denkblasen;
    let formeln;
    let gluehbirne
    let traehne;
    let mundSad;
    let strahlen;
    let mundhappy;

    setSVGs(content)

    doAnimations()

    function doHitTest(element1,element2){
        return Draggable.hitTest(element1, element2);
    }

    function doAnimations(){
        
        let typx = typ.getBBox().x
        let typy = typ.getBBox().y

        let tl = gsap.timeline({repeat: -1, repeatDelay: 0})
        .from(denkblasen,{opacity:0,stagger:0.3,},1)

        .from(formeln[2],{opacity:0},2)
        .to(formeln[2],{x:typx,y:typy,duration:1.5,onUpdate:hide => {
                if (doHitTest(typ,formeln[2])){
                    gsap.to(formeln[2],{opacity:0,ease:"power4",duration:0.25})
                    gsap.to(traehne,{opacity:1,y:10})
                    gsap.to(traehne,{opacity:0, delay:0.25})
                }
            }},2)

        .from(formeln[1],{opacity:0},2.5)
        .to(formeln[1],{x:typx,y:typy,duration:1.5,onUpdate:hide => {
                if (doHitTest(typ,formeln[1])){
                    gsap.to(formeln[1],{opacity:0,ease:"power4",duration:0.25})
                }
            }},2.5)

            .from(formeln[0],{opacity:0},3)
            .to(formeln[0],{x:typx,y:typy,duration:1.5,onUpdate:hide => {
                    if (doHitTest(typ,formeln[0])){

                        gsap.to(formeln[0],{opacity:0,ease:"power4",duration:0.25})
                    }
                }},3)

            .to(gluehbirne,{opacity:1,y:-10,ease:"bounce"},5)
            .to(mundSad,{transformOrigin:"50% 50%",rotate:"180deg"},5)
            .to(denkblasen,{opacity:0,stagger:0.25},5)

            .to(strahlen,{opacity:1},7)
            .to(mundSad,{opacity:0, ease:"power3"},7)
            .to(mundhappy,{opacity:1, ease:"power3"},7)
            .to(mundhappy,{})




    }

    function setSVGs(content) {
        typ = content.getElementById("typ")
        denkblasen = [
            content.getElementById("gedankenblase1"),
            content.getElementById("gedankenblase2"),
            content.getElementById("gedankenblase")]
        formeln = [
            content.getElementById("formel1"),
            content.getElementById("formel2"),
            content.getElementById("formel3")
        ]
        gluehbirne = content.getElementById("gluehbirne")
        traehne = content.getElementById("traehne")
        mundSad = content.getElementById("mund_traurig")
        strahlen = content.getElementById("strahlen")
        mundhappy = content.getElementById("mund_happy")
    }
}