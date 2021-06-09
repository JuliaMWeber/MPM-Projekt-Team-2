//contentDocument.firstChild.children

function displayIntro(){
    logoBG = document.getElementById("logoFill");
    logoWire = document.getElementById("logoWire");

    starQuantity = 2000;
    logoGroup = document.getElementById("logo");
    logostars = document.getElementById("logostars");
    starbg = document.getElementById("stars");
    app = document.getElementById("app");
    elements = [];
    positions = [];

    device = {};
    device.width = document.documentElement.clientWidth;
    device.height = document.documentElement.clientHeight;
    logoSafeGap = device.width / device.height * 20;
    safegap = device.width / device.height * 2.5;

    //Animation-Settings
    animDelay = 0.5;
    animDuration = 3;
    animEase = "back.inOut(1)";
    //animEase = "power3.inOut";
    //animEase = "back.inOut(4)";

    starGrid = 5;

    logoBG.addEventListener("load",  resizeLogo);
    logoBG.addEventListener("load",  animateStars);
}

function resizeLogo(){

  let bg = logoBG.contentDocument.getElementById("LogoLayer");
  let wire = logoWire.contentDocument.getElementById("LogoLayer");

  let scale = (device.width-logoSafeGap*2) / (bg.getBoundingClientRect().width);    //available/current
  if(scale > (device.height-logoSafeGap*2) / (bg.getBoundingClientRect().height)){
    scale = (device.height-logoSafeGap*2) / (bg.getBoundingClientRect().height);
  }
  let aligny = (device.height-logoSafeGap*2 - scale*bg.getBoundingClientRect().height) / 2;
  let alignx = (device.width-logoSafeGap*2 - scale*bg.getBoundingClientRect().width) / 2;

  logoGroup.style.transform = "translate(" + (logoSafeGap + alignx) + "px ," + (logoSafeGap + aligny) + "px)";

  bg.style.transform = "scale(" + scale + ")";
  wire.style.transform = "scale(" + scale + ")";
  logostars.style.transform = "scale(" + scale + ")";
}

function animateStars(){

  destPositions = getPointsInPath(logoWire.contentDocument.getElementById("T_Wireframe"), starGrid)
  .concat(getPointsInPath(logoWire.contentDocument.getElementById("H_Wireframe"), starGrid))
  .concat(getPointsInPath(logoWire.contentDocument.getElementById("M_Wireframe"), starGrid));

  console.log("Destpositions:" + destPositions.length);

  for (let i = 0; i < starQuantity; i++) {
      generateStartPosition();
  }

  randomAnimate();
}

function randomAnimate() {
  let tmp = elements;

  let scale = 1.5;

  let originalLength = tmp.length;

  //resize translate hier berechnen um startpos nicht zu beeinflussen
  let xOffset = logoGroup.getBoundingClientRect().x;
  let yOffset = logoGroup.getBoundingClientRect().y;

  while(destPositions.length>0 && tmp.length>0 && tmp.length>originalLength*0.3) {
    let starindex = randomBetween(0, tmp.length);
    let destindex = randomBetween(0, destPositions.length);
    let e = tmp[starindex];

    if(e && destPositions[destindex]) {
      // array bereinigen, damit wir keinen stern doppelt treffen
      if (starindex > -1) {
        tmp.splice(starindex, 1);
      }
      logostars.appendChild(e);
      gsap.to(e, {
        x: destPositions[destindex].x + xOffset,
        y: destPositions[destindex].y + yOffset,
        duration: animDuration,
        ease: animEase,
        delay: animDelay
      })
      // array bereinigen, damit wir keinen destPoint doppelt treffen
      if (destindex > -1) {
        destPositions.splice(destindex, 1);
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

        if(path.isPointInFill(point)) {
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