var svg = document.getElementById("orbitSvg");
var planetGroup = document.getElementById("planets");
var clientWidth = document.documentElement.clientWidth;
var clientHeight = document.documentElement.clientHeight;

//System Settings
let semester = 1;
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
                let planet = document.createElement("object");
                planet.classList.add("planet");
                planet.data = planetLink;
                planet.style.height = planetSize + "px";
                planet.style.width = planetSize + "px";
                planet.style.left = startPos.x-planetSize/2 + "px";
                planet.style.top = startPos.y-planetSize/2 + "px";
                planetGroup.appendChild(planet);
                let orbit = {"orbit": ellipse, "planet": planet, "pos": startLength};
                orbits[i] = orbit;
            }
        }
    });
});


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


    }
}

gsap.ticker.add(animateOrbits);