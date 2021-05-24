var stars = [[]];
var svg = document.getElementById("starfield");

//Settings
var starSpawnChance = 0.005;
var starSize = 1;

var width = svg.getBoundingClientRect().width;
var height = svg.getBoundingClientRect().height;

for(var x=0; x<width; x++){
    for(let y=0; y<height; y++){
        if(Math.random()<starSpawnChance){
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("r", starSize);
            circle.setAttribute("class", "star1");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            svg.appendChild(circle);
        }
    }
}