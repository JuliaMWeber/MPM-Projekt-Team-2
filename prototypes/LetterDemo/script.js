// Global Variables
let app = document.getElementById("app");

let device = {};
device.width = document.documentElement.clientWidth;
device.height = document.documentElement.clientHeight;

/**
 * Liefert zufälligen Wert aus einer bestimmten Range
 *
 * @param int min
 * @param int max
 * @return int 
 */
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Liefert X & Y Koordinaten eines Elements als Object zurück
 *
 * @param Node element
 * @return Object 
 */
 function getPositionOfElement(element) {

  let rect = element.getBoundingClientRect();
  return {x: rect.left, y: rect.top};
}



function getPoints(elements) {
  let points = [];

  elements.each(function(){
    points.push($(this));
  });

  return points;
}

function sumArray(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}


function generateGUID() {
  return 'guid_xxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function rotate(cx, cy, x, y, angle) {
  var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
      ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
  return [nx, ny];
}

function getCenterOfPoints(points) {
  let x = [];
  let y = [];

  $.each(points, function() {
    x.push( this.x );
    y.push( this.y );
  });
  
  let sumX = sumArray(x);
  let sumY = sumArray(y);

  let center = {
    x: sumX / x.length,
    y: sumY / y.length,
  }
  
  return center;
}

function getCenterOfElement(element) {
  let coords = getPositionOfElement(element);

  return {
    x: coords.x + ($(element).width() / 2),
    y: coords.y + ($(element).height() / 2)
  }
}



let quantity = 1000;

// Animation-Settings
let animDelay = 0.5;
let animDuration = 3;
let animEase = "back.inOut(1)";
//animEase = "power3.inOut";
//animEase = "back.inOut(4)";


let letters = {
  t: {
    element: $(".letterT").children()[0],
    content: null,
  },
  h: {
    element: $(".letterH").children()[0],
    content: null,
  },
  m: {
    element: $(".letterM").children()[0],
    content: null,
  },
};


let starbg = document.getElementById("stars");
let elements = [];
let positions = [];
let koords = {
  t: [],
  h: [],
  m: [],
};
let selected = [];

let safegap = device.width / device.height * 2.5;


startIntro();


function startIntro() {
  generateStars(quantity);

  $.each(letters, function(index, value) {

    $(value.element).on("load", function() {
      console.log(index + ": SVG LOADED");

      value.content = value.element.contentDocument;

      let points = getPoints($(value.content).find("circle"));
      $.each(points, function() {
        koords[index].push( getPositionOfElement($(this)[0]) );
      });

      let options = {};
      if(index == 'm') {
        options.wiggle = true;
      }

      animateStars(value.element, koords[index], options);

    });

  });
}


function animateStars(target, coords, options) {

  let tmp = elements;

  let letterPos = getPositionOfElement($(target)[0]);

  //console.log(tmp);

  let guid = generateGUID();
  $(target).parent().attr('id', guid);

  $(target).parent().on("click", function() {
    $('[data-ref=' + guid +']').toggleClass("rotate180n");
    $(this).toggleClass("rotate180n");
  });

  let center = getCenterOfElement(target);

  let starGroup = document.createElement("div");
  starGroup.classList.add('group');
  starGroup.setAttribute('data-ref', guid);
  starGroup.style.transformOrigin = center.x + "px " + center.y + "px";

  for(let i=0; i < coords.length; i++) {
    // ohne sterne brauchen wir nicht weitermachen
    if(tmp.length <= 0) {
      return;
    }

    let e = tmp[i];

    if(e) {
      starGroup.appendChild(e);

      tmp.splice(i, 1);

      gsap.to(e, {
        x: coords[i].x + letterPos.x,
        y: coords[i].y + letterPos.y,
        scaleX: 1.5,
        scaleY: 1.5,
        duration: animDuration,
        ease: animEase,
        delay: animDelay
      });

      $(e).addClass("moved");

      setTimeout(function(){

        $(target).parent().css('opacity', 0.2);

      }, (animDuration * 1000) + 1000 );

    }
  }

  starbg.appendChild(starGroup);
}


function generateStars(quantity) {
  for (let i = 0; i < quantity; i++) {
    generateStartPosition();
  }
}

function generateStartPosition() {
  let e = document.createElement("div");
  e.classList.add('element');

  let position = generatePosition(device.width - safegap, device.height - safegap);

  let x = position.left + "px";
  let y = position.top + "px";
  e.style.transform = "translate(" + x + ", " + y + ")";

  positions.push([position.left, position.top]);

  let size = randomBetween(1, safegap) + "px";
  e.style.width = size;
  e.style.height = size;

  let random = Math.random();

  if(random < 0.3) {
    e.classList.add('color-1');
  }
  if(random > 0.3 && random < 0.5) {
    e.classList.add('color-2');
  }
  if(random > 0.5 && random < 0.8) {
    e.classList.add('color-3');
  }
  if(random > 0.8) {
    e.classList.add('color-4');
  }

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