var svg = document.getElementById("orbitSvg");
var svgWidth = svg.getAttribute("width");
var svgHeight = svg.getAttribute("height");

//System Settings
var orbitCount = 5;
var orbitSpacing = 60;
var aspectRatio = 0.8; //Compress Orbit y-Size by this Value
var sunSize = 120;
var planetSize = 40;

//Orbit Speed = baseSpeed + (numberOfOrbit * distanceImpact)
var baseSpeed = 2;
var distanceImpact = 0.2;

//Orbit List
var orbits = [];


let sun = document.createElementNS("http://www.w3.org/2000/svg", "circle");
sun.setAttribute("r", sunSize/2);
sun.setAttribute("id", "sun");
sun.setAttribute("cx", svgWidth/2);
sun.setAttribute("cy", svgHeight/2);

svg.appendChild(sun);

for(let i=0;i<orbitCount;i++){
    let ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    ellipse.setAttribute("class", "orbit");
    ellipse.setAttribute("cx", svgWidth/2);
    ellipse.setAttribute("cy", svgHeight/2);
    ellipse.setAttribute("rx", (sunSize/2)+(orbitSpacing*(i+1)));
    ellipse.setAttribute("ry", ellipse.getAttribute("rx")*aspectRatio);
    svg.appendChild(ellipse);

    let startLength = Math.random()*ellipse.getTotalLength();
    let startPos = ellipse.getPointAtLength(startLength);
    let planet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    planet.setAttribute("class", "planet");
    planet.setAttribute("cx", startPos.x);
    planet.setAttribute("cy", startPos.y);
    planet.setAttribute("r", planetSize/2);
    svg.appendChild(planet);

    let orbit = {"orbit": ellipse, "planet": planet, "pos": startLength};
    orbits[i] = orbit;
}

//console.log(orbits);

function animateOrbits(){
    for(let i=0;i<orbits.length;i++){

        let nextLength = orbits[i].pos+baseSpeed+distanceImpact*(orbits.length-i);

        if(nextLength>orbits[i].orbit.getTotalLength()){ //if next length greater then orbitPathLength
            nextLength-=orbits[i].orbit.getTotalLength();
        }

        orbits[i].pos = nextLength;

        let nextPos = orbits[i].orbit.getPointAtLength(nextLength);

        orbits[i].planet.setAttribute("cx", nextPos.x);
        orbits[i].planet.setAttribute("cy", nextPos.y);


    }
}

gsap.ticker.add(animateOrbits);
