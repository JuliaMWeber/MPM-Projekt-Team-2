//contentDocument.firstChild.children

function displayIntro(){
    logoBG = document.getElementById("logoFill");
    logoWire = document.getElementById("logoWire");

    starQuantity = 1563;
    mainsvg = document.getElementById("thmlogo");
    starbg = document.getElementById("stars");
    app = document.getElementById("app");
    elements = [];
    positions = [];

    device = {};
    device.width = document.documentElement.clientWidth;
    device.height = document.documentElement.clientHeight;

    safegap = device.width / device.height * 2.5;

    //Animation-Settings
    animDelay = 0.5;
    animDuration = 3;
    animEase = "back.inOut(1)";
    //animEase = "power3.inOut";
    //animEase = "back.inOut(4)";

    starGrid = 15;

    logoBG.addEventListener("load",  animateStars);
}

function animateStars(){
    destPositions = getPointsInPath(logoBG.contentDocument.getElementById("T_BG"), starGrid)
    .concat(getPointsInPath(logoBG.contentDocument.getElementById("H_BG"), starGrid))
    .concat(getPointsInPath(logoBG.contentDocument.getElementById("M_BG"), starGrid));

    console.log(destPositions.length);

    for (let i = 0; i < starQuantity; i++) {
        generateStartPosition();
    }

    randomAnimate();
}

function randomAnimate() {
  let tmp = elements;

  console.log(tmp.length);

  let scale = 1.5;

  for(let i=0; i < destPositions.length; i++) {
    // ohne sterne brauchen wir nicht weitermachen
    if(tmp.length <= 0) {
      return;
    }

    if(Math.random() < 1) { //default 0.3 -- 1 just for testing
      let index = randomBetween(0, tmp.length);
      let e = tmp[index];

      if(e) {
        // array bereinigen, damit wir keinen stern doppelt treffen
        if (index > -1) {
          tmp.splice(index, 1);
        }
        gsap.to(e, {
          x: destPositions[i].x,
          y: destPositions[i].y,
          duration: animDuration,
          ease: animEase,
          delay: animDelay
        })
      }
    }
  }
}

function getPointsInPath(path, gridSize) {

let boundRec = path.getBoundingClientRect();

let pointList = [];
const svgtmp = document.getElementById("tmp");

for (let x = boundRec.x; x <= (boundRec.x + boundRec.width); x += gridSize) {
    for (let y = boundRec.y; y <= (boundRec.y + boundRec.height); y += gridSize) {
    let point = svgtmp.createSVGPoint();
    point.x = Math.floor(x);
    point.y = Math.floor(y);

    if(path.isPointInStroke(point) || path.isPointInFill(point)) {
        pointList.push(point);
    }
    }
}
return pointList;
}


function generateStartPosition() {
let e = document.createElement("div");
e.classList.add('star');

let position = generatePosition(device.width - safegap, device.height - safegap);

let x = position.left + "px";
let y = position.top + "px";
e.style.transform = "translate(" + x + ", " + y + ")";

positions.push([position.left, position.top]);

let size = randomBetween(0, safegap) + "px";
e.style.width = size;
e.style.height = size;

starbg.appendChild(e);

elements.push(e);
}

function generatePosition(viewWidth, viewHeight) {
let pos = {};

pos.left = randomBetween(safegap, viewWidth);
pos.top = randomBetween(safegap, viewHeight);

for (let i = 0; i < positions.length; i++) {
    if (positions[i] === pos.left) {
    for (let j = 0; j < positions.length; j++) {
        if (positions[i][j] === pos.top) {
        return generatePosition(viewWidth, viewWidth);
        }
    }
    }
}
  return pos;
}

function randomBetween(min, max) {
  let rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand;
}