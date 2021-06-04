var svg;
var planetGroup;
var clientWidth;
var clientHeight;

//System Settings
let semester = 3;
var planetSpacing = 5;
var borderSpace = 5;
var aspectRatio = 0.8; //Compress Orbit y-Size by this Value

var sunSize = 120;

//Orbit Speed = baseSpeed + (numberOfOrbit * distanceImpact)
var baseSpeed = 0.7;
var distanceImpact = 0.1;

//Orbit List
var orbits = [];
var modules = [];

function resetOrbit(){
    orbits.length = 0;
    modules.length = 0;
}

function displayOrbit(){
    svg = document.getElementById("orbitSvg");
    planetGroup = document.getElementById("planets");
    clientWidth = document.documentElement.clientWidth;
    clientHeight = document.documentElement.clientHeight;


    $.getJSON("./assets/data/MH.json", function (data) {
        var orbitCount = 0;

        $.ajax({
            url: "./assets/svg/Planets",
            success: function(planetData){
                var planets= $(planetData).find("a:contains(.svg)");

                for(var i=0; i<data.length;i++){
                    if(data[i].Semester==semester){
                        orbitCount++;
                        modules.push(data[i]);
                    }
                }
                
                //Sun
                let sun = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                sun.setAttribute("r", sunSize/2);
                sun.setAttribute("id", "sun");
                sun.setAttribute("cx", clientWidth/2);
                sun.setAttribute("cy", clientHeight/2);        
                svg.appendChild(sun);

                let sunCaption = document.createElementNS("http://www.w3.org/2000/svg", "text");
                sunCaption.id = "semNumber";
                sunCaption.textContent = arabicToRoman(semester);
                sunCaption.style.textAnchor = "middle";
                sunCaption.style.fontSize = sunSize*0.8; //*0.8 to try and keep Text inside Sun
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
                
                
                
                for(let i=0;i<orbitCount;i++){
                    let ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
                    ellipse.setAttribute("class", "orbit");
                    ellipse.setAttribute("cx", clientWidth/2);
                    ellipse.setAttribute("cy", clientHeight/2);
                    ellipse.setAttribute("rx", (sunSize/2)+(orbitSpacing*(i+1)));
                    ellipse.setAttribute("ry", ellipse.getAttribute("rx")*aspectRatio);
                    svg.appendChild(ellipse);
                
                    let startLength = Math.random()*ellipse.getTotalLength();
                    let startPos = ellipse.getPointAtLength(startLength);
                    let planetLink = planets.splice(gsap.utils.random(0, planets.length-1, 1), 1)[0].getAttribute("href");

                    let planetSVG = document.createElement("object");
                    planetSVG.data = planetLink;
                    planetSVG.style.height = planetSize + "px";
                    planetSVG.style.width = planetSize + "px";

                    let shadowSVG = document.createElement("object");
                    shadowSVG.data = "./assets/svg/Schatten.svg";
                    shadowSVG.style.height = planetSize + "px";
                    shadowSVG.style.width = planetSize + "px";

                    let planet = document.createElement("g");
                    planet.appendChild(planetSVG);
                    planet.appendChild(shadowSVG);
                    planet.style.left = startPos.x-planetSize/2 + "px";
                    planet.style.top = startPos.y-planetSize/2 + "px";
                    planet.classList.add("planet");

                    planetGroup.appendChild(planet);
                    let orbit = {"orbit": ellipse, "planet": planet, "pos": startLength};
                    orbits[i] = orbit;
                }
            }
        });
    });

    gsap.ticker.add(animateOrbits);
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

        let rotate = (nextLength/orbits[i].orbit.getTotalLength())*360 + "deg";

        gsap.set(orbits[i].planet.lastChild, {rotation: rotate})
    }
}

function arabicToRoman(arabic){
    switch(arabic){
        case 1:
            return "I";
        case 2:
            return "II";
        case 3:
            return "III";
        case 4:
            return "IV";
        case 5:
            return "V";
        case 6:
            return "VI";
        case 7:
            return "VII";
        case 8:
            return "VIII";
        case 7:
            return "IX";
        case 8:
            return "X";
    }
}