let svgObj = document.getElementById("MIB8Obj");

svgObj.onload = function() {
    content = svgObj.contentDocument;

    let bosTl = animateBos();
    let ideTl = animateIDE();
}

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