var svg;
var planetGroup;
var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;
var focusedPlanet;
var paused = false;

//System Settings
//let semester = 2; // obsulet (wird nun als Parameter in displayOrbit() übergeben)
var planetSpacing = 5;
var borderSpace = 5;
var aspectRatio = 0.8; //Compress Orbit y-Size by this Value

var sunSize = 120;
var StarCount = 500;

//Orbit Speed = baseSpeed + (numberOfOrbit * distanceImpact)
var baseSpeed = 0.7;
var distanceImpact = 0.1;

//Orbit List
var orbits = [];
var modules = [];

function resetOrbit(){
    gsap.ticker.remove(animateOrbits);
    orbits.length = 0;
    modules.length = 0;
}
/**
 * Generiert den Orbit anhand der Semester-Nummer
 *
 * @param int semesterNum
 */
function displayOrbit(semesterNum) {
    // erstmal resetten - safety first
    resetOrbit();

    svg = document.getElementById("orbitSvg");
    planetGroup = document.getElementById("planets");
    portal = document.getElementById("portal");
    sun = document.getElementById("sun");
    portal.onclick = animateToIntro;

    let starbg = document.getElementById("stars");
    for(let i=0;i<StarCount;i++){
        generateStartPosition(starbg);
    }

    $.getJSON("./assets/data/modulhandbuch.json", function (data) {
        var orbitCount = 0;

        $.ajax({
            url: "./assets/data/planets.json",
            success: async function(planetData){

                // Module durchlaufen auf Basis des Semesters
                for(var i=0; i < data.length;i++){
                    if(data[i].Semester == semesterNum) {
                        orbitCount++;
                        // Planeten-Zuweisung an Module anhängen
                        for(var j=0; j < planetData.length; j++) {
                            if(planetData[j]['modules'].indexOf(data[i]['Kuerzel']) >= 0) {
                                data[i]['planetPath'] = planetData[j]['path'];
                            }
                        }
                        modules.push(data[i]);
                    }
                }
                
                //Sun
                let sunSvg = document.createElement("object");
                sunSvg.setAttribute("data", "./assets/svg/sonne.svg");
                gsap.set(sun, {left: clientWidth/2 - sunSize/2, top: clientHeight/2 - sunSize/2, width: sunSize, height:sunSize}); 
                sun.appendChild(sunSvg);

                let sunCaption = document.createElementNS("http://www.w3.org/2000/svg", "text");
                sunCaption.id = "semNumber";
                sunCaption.textContent = convertDecimalToRoman(semesterNum);
                sunCaption.style.textAnchor = "middle";
                sunCaption.style.fontSize = (sunSize*0.8) + "px"; //*0.8 to try and keep Text inside Sun
                sunCaption.setAttribute("x", clientWidth/2);
                sunCaption.setAttribute("y", clientHeight/2+sunSize/3.5); //sunSize/3.5 to try and center   
                svg.appendChild(sunCaption);

                var viewportAspect = clientHeight/clientWidth;
                
                var availableSpace;
                if(viewportAspect<aspectRatio){ //resized for height
                    availableSpace = (clientHeight-borderSpace*2-sunSize)/2;
                    orbitSpacing = (availableSpace/(orbitCount+0.5))/aspectRatio;
                } else { //resized for width
                    availableSpace = (clientWidth-borderSpace*2-sunSize)/2;
                    orbitSpacing = availableSpace/(orbitCount+0.5);
                }
                planetSize = orbitSpacing*aspectRatio-planetSpacing;
                
                for(let i=0;i < modules.length;i++){
                    let ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
                    ellipse.setAttribute("class", "orbit");
                    ellipse.setAttribute("cx", clientWidth/2 + "px");
                    ellipse.setAttribute("cy", clientHeight/2 + "px");
                    ellipse.setAttribute("rx", (sunSize/2)+(orbitSpacing*(i+1)));
                    ellipse.setAttribute("ry", ellipse.getAttribute("rx")*aspectRatio);
                    svg.appendChild(ellipse);
                
                    let startLength = Math.random()*ellipse.getTotalLength();
                    let startPos = ellipse.getPointAtLength(startLength);
                    // SVG zuweisen
                    let planetLink = modules[i]['planetPath'];

                    // Planeten SVG erstellen
                    let planetSVG = document.createElement("object");
                    planetSVG.data = planetLink;
                    planetSVG.style.height = planetSize + "px";
                    planetSVG.style.width = planetSize + "px";

                    // Planeten Schatten erstellen
                    let shadowSVG = document.createElement("object");
                    shadowSVG.data = "./assets/svg/Schatten.svg";
                    shadowSVG.style.height = planetSize + "px";
                    shadowSVG.style.width = planetSize + "px";

                    // Planeten Gruppe (Planet + Schatten) erstellen
                    let planet = document.createElement("g");
                    planet.style.height = planetSize + "px";
                    planet.style.width = planetSize + "px";
                    planet.appendChild(planetSVG);
                    planet.appendChild(shadowSVG);
                    planet.style.left = startPos.x-planetSize/2 + "px";
                    planet.style.top = startPos.y-planetSize/2 + "px";
                    planet.classList.add("planet");
                    planet.setAttribute('title', modules[i]['Modulname']);
                    planet.onclick = planetClick;

                    planetGroup.appendChild(planet);
                    let orbit = {"orbit": ellipse, "planet": planet, "pos": startLength};
                    orbits[i] = orbit;

                    await sleep(250);
                }
            }
        });
    });

    gsap.ticker.add(animateOrbits);
}

function animateToIntro(){
    gsap.fromTo("#app", {opacity: "100%"}, {scale: 0.1, opacity: "0%", duration: 2, onComplete: function(){
        gsap.set("#app", {clearProps: "scale"});
        gsap.to("#app", {opacity: "100%", duration: 1, clearProps: "opacity"});
        loadIntro();
    }});
}

function animateOrbits(){
    for(let i=0;i<orbits.length;i++){

        let nextLength = orbits[i].pos+baseSpeed+distanceImpact*(orbits.length-i);

        if(nextLength>orbits[i].orbit.getTotalLength()){ //if next length greater then orbitPathLength
            nextLength-=orbits[i].orbit.getTotalLength();
        }

        orbits[i].pos = nextLength;

        let nextPos = orbits[i].orbit.getPointAtLength(nextLength);

        orbits[i].planet.style.left = nextPos.x-planetSize/2 + "px";
        orbits[i].planet.style.top = nextPos.y-planetSize/2 + "px";

        let rotate = (nextLength/orbits[i].orbit.getTotalLength())*360 + "deg";+

        gsap.set(orbits[i].planet.lastChild, {rotation: rotate})
    }
}

function pauseAnimation(state){
    if(state){
        gsap.ticker.remove(animateOrbits);
        paused = true;
    } else if(!state) {
        gsap.ticker.add(animateOrbits);
        paused = false;
    }
}

function planetClick(event){

    if(paused){
        let tween = planetZoom(0, 0, 1)
        svg.classList.remove("clicked");
        tween.eventCallback("onComplete", function() {
            pauseAnimation(false);
            focusedPlanet.classList.remove("clicked");
        });
    } else {
        var planet = event.srcElement;
        var centerx = parseFloat(planet.style.left.replace("px", "")) + parseFloat(planet.style.width.replace("px", ""))/2;
        var centery = parseFloat(planet.style.top.replace("px", "")) + parseFloat(planet.style.height.replace("px", ""))/2;
        var zoomFactor = clientHeight / parseInt(planet.style.width.replace("px", ""),10);

        var sun = document.getElementById("sun");
        var x = parseFloat(sun.getAttribute("cx").replace("px", "")) - centerx;
        var y = parseFloat(sun.getAttribute("cy").replace("px", "")) - centery;

        //Settings
        var zoomOffset = 10;
        var zoomPositionOffsetx = -1*parseFloat(planet.style.width.replace("px", ""))/2.5;
        var zoomPositionOffsety = 0;

        zoomFactor += zoomOffset;
        x += zoomPositionOffsetx;
        y += zoomPositionOffsety;

        focusedPlanet = planet;
        pauseAnimation(true);
        let tl = planetZoom(x, y, zoomFactor);
        tl.eventCallback("onComplete", function(){
            displayOverlay();
        });
        planet.classList.add("clicked");
        svg.classList.add("clicked");
    }
}

function planetZoom(x, y, zoomlvl){
    var duration = 1.5;
    var sunSystem = document.getElementById("sunSystem").children;
    var tween;
    for(let i=0; i<sunSystem.length;i++) {
        var zoomTranslate;
        if(zoomlvl==1){
            gsap.to(sunSystem[i], {x: 0 + "px",y: 0 + "px" , duration: duration, ease: "power1.inOut"});
            gsap.set(portal, {className: "", delay: duration/2, onComplete: function() {
                portal.onclick = animateToIntro;
            }});
        } else {
            gsap.to(sunSystem[i], {x: x*zoomlvl + "px",y: y*zoomlvl + "px" , duration: duration, ease: "power1.inOut"});
            gsap.set(portal, {className: "clicked", delay: duration/2, onComplete: function() {
                portal.onclick = planetClick;
            }});
        }
        tween = gsap.to(sunSystem[i], {scale: zoomlvl, duration: duration, ease: "power1.inOut"});
    }
    let tl = gsap.timeline();
    tl.fromTo(portal, {opacity: "100%"}, {opacity: "0%", duration: duration/3})
    .to(portal, {opacity: "100%", duration: duration/3}, ">" + (duration/3));

    return tl;
}

function displayOverlay(){
    let animDiv = document.getElementById("moduleanim");
    let txtDiv = document.getElementById("moduletxt");

    let animWidth = focusedPlanet.getBoundingClientRect().width + focusedPlanet.getBoundingClientRect().x;
    
    gsap.set(animDiv, {width: animWidth, height: clientHeight});
    gsap.set(txtDiv, {x: animWidth, y: 0, width: clientWidth - animWidth, height: clientHeight - portal.getBoundingClientRect().height});
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function loadIntro() {
    document.location.hash = "";
}

/**
 * Konvert eine Dezimalzahl in Römische Zeichen
 *
 * @param int decimal
 * @return string 
 */
function convertDecimalToRoman(decimal) {
    let roman = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1};
    let str = '';
  
    for (let i of Object.keys(roman)) {
      let q = Math.floor(decimal / roman[i]);
      decimal -= q * roman[i];
      str += i.repeat(q);
    }
    return str;
}
