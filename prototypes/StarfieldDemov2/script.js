let quantity = 8000;
let app = document.getElementById("app");
let mainsvg = document.getElementById("thmlogo");
let starbg = document.getElementById("stars");
let elements = [];
let positions = [];

let device = {};
device.width = document.documentElement.clientWidth;
device.height = document.documentElement.clientHeight;

let safegap = device.width / device.height * 2.5;

//Animation-Settings
let animDelay = 0.5;
let animDuration = 3;
let animEase = "back.inOut(1)";
//animEase = "power3.inOut";
//animEase = "back.inOut(4)";

const svgtest = document.getElementById("logo-t");
const svgtmp = document.getElementById("tmp");

let grid = 8;

let destPositions = getPointsInPath(svgtest, grid);
console.log(destPositions.length);
destPositions = destPositions
.concat(getPointsInPath(document.getElementById("logo-h"), grid))
.concat(getPointsInPath(document.getElementById("logo-m"), grid));

console.log(destPositions.length);

for (let i = 0; i < quantity; i++) {
  generateStartPosition();
}

randomAnimate();

function randomAnimate() {
  let tmp = elements;

  let scale = 1.1;

  for (let i = 0; i < elements.length; i++) {
    if (i % 5 == 0) {
      elements[i].classList.add('color-1');
      elements[i].classList.add('shine');
    }
    if (i % 7 == 0) {
      elements[i].classList.add('color-2');
    }
    if (i % 9 == 0) {
      elements[i].classList.add('color-3');
    }
    if (i % 10 == 0) {
      elements[i].classList.add('color-4');
    }
  }

  for(let i=0; i < destPositions.length; i++) {
    let index = randomBetween(0, tmp.length);
    let e = tmp[index];

    if(e && Math.random() > 0.5) {
      gsap.to(e, {
        x: destPositions[i].x + (device.width - mainsvg.clientWidth) / 2,
        y: destPositions[i].y + (device.height - mainsvg.clientHeight) / 2,
        scaleX:scale, 
        scaleY:scale,
        duration: animDuration,
        ease: animEase,
        delay: animDelay
      });
      setTimeout(function(){ 
        e.classList.add('move');
      }, (animDuration * 1000) + 400);
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
  e.classList.add('element');

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