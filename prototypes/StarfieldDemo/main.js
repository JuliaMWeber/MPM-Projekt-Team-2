var stars = [[]];
var svg = document.getElementById("starfield");

//StarField-Settings
var starGridSize = 4;
var starSpawnChance = 0.01;
var star2Chance = 0.5;
var minStarSize = 2;
var maxStarSize = 5;
var minStarOpacity = 0.5;
var maxStarOpacity = 1;
//Animation-Settings
var animDelay = 3;
var animDuration = 5;
var animEase = "back.inOut(1)";

var width = svg.getBoundingClientRect().width;
var height = svg.getBoundingClientRect().height;
var starCount = [0,0];

//Testing SVG Path to animate Stars to
let targetSectionPath = "M 730 220, h 100, v 190, h 190, v -190, h 100, v 480, h -100, v -190, h -190, v 190, h -100, v -190" //H
let targetSection = document.createElementNS("http://www.w3.org/2000/svg", "path");
targetSection.setAttribute("d", targetSectionPath);
targetSection.setAttribute("opacity", "0%"); //Comment out to make visible
svg.appendChild(targetSection);

generateStars();

let targetPoints = getPointsInPath(targetSection, 2);
let stars2 = document.getElementsByClassName("star2");

animateStars(stars2, targetPoints);


function generateStars() {
    for(var x=0; x<width; x+=starGridSize){
        for(let y=0; y<height; y+=starGridSize){
            if(random()<starSpawnChance){
                let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("r", random(minStarSize, maxStarSize));
                if(random()>star2Chance){
                    circle.setAttribute("class", "star1");
                    starCount[0]++;
                } else {
                    circle.setAttribute("class", "star2");
                    starCount[1]++;
                }
                circle.setAttribute("opacity", random(minStarOpacity, maxStarOpacity));
                circle.setAttribute("cx", x);
                circle.setAttribute("cy", y);
                svg.appendChild(circle);
            }
        }
    }
    console.log(starCount[0] + " Star1");
    console.log(starCount[1] + " Star2");
}

function getPointsInPath(path, gridSize){
    var boundRec = path.getBoundingClientRect();

    let pointList = [[]];

    for(var x=boundRec.x; x<boundRec.x+boundRec.width;x+=gridSize){
        for(let y=boundRec.y; y<boundRec.y+boundRec.height;y+=gridSize){
            let point = svg.createSVGPoint();
            point.x = x;
            point.y = y;
            if(path.isPointInFill(point)){
                pointList.push([x, y]);
            }
        }
    }
    console.log(pointList.length + " Points generated!");
    return pointList;
}

function animateStars(stars, targetPoints) {
    if(stars.length>targetPoints.length){
        console.error("TargetPoint Array is smaller than Star Array!");
        return;
    }
    for(let i=0; i<stars.length;i++){
        let index = gsap.utils.random(0, targetPoints.length, 1);
        let point = targetPoints.splice(index,1)[0];

        gsap.to(stars[i], {cx: point[0], cy: point[1], duration: animDuration, ease: animEase, delay: animDelay});
        //stars[i].setAttribute("cx", point[0]);
        //stars[i].setAttribute("cy", point[1]);
    }
}

//Random function to keep seed possibility
function random(min, max) {
    if(min === undefined){
        return Math.random();
    } else {
        return min + random()*(max-min);
    }
}