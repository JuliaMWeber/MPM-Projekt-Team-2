//contentDocument.firstChild.children

function displayIntro(){
    logoBG = document.getElementById("logoFill");
    logoWire = document.getElementById("logoWire");

    starQuantity = 3000;
    logoGroup = document.getElementById("logo");
    logoSvg = document.getElementById("logosvg");
    logobase = document.getElementById("logobase");
    starbg = document.getElementById("stars");
    app = document.getElementById("app");
    elements = [];
    positions = [];

    device = {};
    device.width = document.documentElement.clientWidth;
    device.height = document.documentElement.clientHeight;
    logoSafeGap = 50;
    safegap = device.width / device.height * 2.5;
    starSizeMax = Math.floor((device.width * device.height) / (10*37000));

    //Animation-Settings
    animDelay = 0.5;
    animDuration = 3;
    animEase = "back.inOut(1)";
    //animEase = "power3.inOut";
    //animEase = "back.inOut(4)";

    starGrid = 4;

    logoBG.addEventListener("load",  animateStars);
}

function initialiseLogo(){
  let bg = logoBG.contentDocument.getElementById("outline");
  let wire = logoWire.contentDocument.getElementById("wireframe");

  logoSvg.appendChild(bg);
  logoSvg.appendChild(wire);
  logoSvg.appendChild(logoBG.contentDocument.getElementsByTagName("defs")[0])

  logoSvg.setAttribute("width", bg.getBoundingClientRect().width);
  logoSvg.setAttribute("height", bg.getBoundingClientRect().height);

  logoGroup.remove();
}

function resizeLogo(){
  let targetwidth = logobase.getBoundingClientRect().width;
  let targetheight = logobase.getBoundingClientRect().height;
  targetwidth -= logoSafeGap*2;
  targetheight -= logoSafeGap*2;

  let currentwidth = logoSvg.getBoundingClientRect().width;
  let currentheight = logoSvg.getBoundingClientRect().height;

  let scale = targetwidth / currentwidth;
  if(scale > targetheight / currentheight){
    scale = targetheight / currentheight;
  }

  logobase.style.transform = "scale(" + scale + ")";
  logobase.style.transformOrigin = "top left";

  let xOffset = (device.width - logoSvg.getBoundingClientRect().width)/2;
  let yOffset = (device.height - logoSvg.getBoundingClientRect().height)/2;

  logobase.style.transform = "translate(" + xOffset + "px, " + yOffset + "px)scale(" + scale + ") ";

}

function animateStars(){
  initialiseLogo();

  let letters = logoSvg.children;

  destPositions = [];

  for(let i=0;i<letters[0].children.length;i++){
    destPositions = destPositions.concat(getPointsInPath(letters[1].children[i], starGrid));
  }

  for(let i=0;i<destPositions.length;i++){ 
    if(Math.random()>0.8){ //reducing destpoints for optimization
      destPositions.splice(i,1);
      i--;
    }
  }

  let tmp = document.createElement("div");
  tmp.id = "destpoints";
  tmp.style = "position: absolute; display: block; top: 0px; left: 0px;";
  tmp.setAttribute("width", logoSvg.getBoundingClientRect().width);
  tmp.setAttribute("height", logoSvg.getBoundingClientRect().height);
  logobase.appendChild(tmp);
  for(let i=0;i<destPositions.length;i++){
    tmp.appendChild(document.createElement("div"));
    tmp.lastChild.style = "transform: translate(" + destPositions[i].x + "px, " + destPositions[i].y + "px);";
    tmp.lastChild.className = "point";
  }

  resizeLogo(); 

  destPositions.length = 0;
  let newpoints = tmp.children;
  for(let i=0;i<newpoints.length;i++){ //get new points after resize
    destPositions[i] = newpoints[i].getBoundingClientRect();
  }

  tmp.remove();

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

  while(destPositions.length>0 && tmp.length>0 && tmp.length>originalLength*0.3) {
    let starindex = randomBetween(0, tmp.length);
    let destindex = randomBetween(0, destPositions.length);
    let e = tmp[starindex];

    if(e && destPositions[destindex]) {
      e.classList.remove("bgStar");
      e.classList.add("fgStar");
      // array bereinigen, damit wir keinen stern doppelt treffen
      if (starindex > -1) {
        tmp.splice(starindex, 1);
      }
      gsap.to(e, {
        x: destPositions[destindex].x,
        y: destPositions[destindex].y,
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


    for (let x = boundRec.x; x <= (boundRec.x + boundRec.width); x += gridSize) {
        for (let y = boundRec.y; y <= (boundRec.y + boundRec.height); y += gridSize) {
          let point = logoSvg.createSVGPoint();
          point.x = x;
          point.y = y;
          if(path.isPointInFill(point)) {
              pointList.push(point);
          }
        }
    }

    return pointList;
}


function generateStartPosition() {
let e = document.createElement("div");
e.classList.add('bgStar');

let position = generatePosition(device.width - safegap, device.height - safegap);

let x = position.left + "px";
let y = position.top + "px";
e.style.transform = "translate(" + x + ", " + y + ")";

positions.push([position.left, position.top]);

let size = randomBetween(0, starSizeMax) + "px";
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