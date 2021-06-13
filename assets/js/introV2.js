// Global Variables
let app = "";

// GSAP Plugins aktivieren/registrieren
gsap.registerPlugin(MotionPathPlugin, Draggable, SnapPlugin); 

function getPoints(elements) {
  let points = [];

  $.each(elements, function() {
    points.push($(this));
  });
  return points;
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

let quantity = 1000;
// Minimum 300
quantity = (Math.log(device.width * device.height) - 10) * (quantity * 0.2);
console.log(quantity);

let baseStarSize = "100"; // Anfangs groß - wird über scale() reduziert

// Animation-Settings
let animDelay = 0.5;
let animDuration = 3;
let animEase = "back.inOut(1)";
//animEase = "power3.inOut";
//animEase = "back.inOut(4)";
  


let letters = {
  t: {
    selector: ".letterT",
    element: null,
    content: null,
  },
  h: {
    selector: ".letterH",
    element: null,
    content: null,
  },
  m: {
    selector: ".letterM",
    element: null,
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

function startIntro(section) {
  app = section;
  starbg = $(app).find('#stars').first();

  generateStars(quantity);
  loadLetters(letters);
}

function loadLetters(letters) {

  $.each(letters, function(index, value) {
    value.element = $(app).find(value.selector).first().children()[0];

    $(value.element).on("ready load loaded", function() {
      console.log(index + ": SVG LOADED");

      value.content = value.element.contentDocument;
      let points = getPoints($(value.content).find("circle"));
      console.log(points.length);

      $.each(points, function() {
        koords[index].push( getPositionOfElement($(this)[0]) );
      });
      let options = {
        index: index,
      };
      animateStars(value.element, koords[index], options);

    });

  });
}

function animateStars(target, coords, options) {

  let tmp = elements;

  let letterPos = getPositionOfElement($(target)[0]);


  let guid = generateGUID();
  $(target).parent().attr('id', guid);

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

      let tmp_ease = "back.out(4)";
      //tmp_ease = animEase;

      let random_coords = {
        x: coords[i].x + letterPos.x,
        y: coords[i].y + letterPos.y
      }
      let tmp_duration = animDuration;

      animEase = "power3.out";

      
      let tl = new TimelineMax({onComplete: function() {
        //$(e).addClass("moved");
        $(target).parent().css('opacity', 0.2);
      }});
      let bounds = {
        min: 0,
        max: 50,
      }

      let ownSize = baseStarSize/2;

      tl.to(e, {
        motionPath: {
          path: [
            {
              x: device.width/2 + randomBetween(0, 3) - ownSize, 
              y: device.height/2 + randomBetween(0, 3) - ownSize, 
            },
            {
              x: device.width/2 + randomBetween(-50,50) - ownSize, 
              y: device.height/2 + randomBetween(-50,50) - ownSize, 
            },
            {
              x: device.width/2 + randomBetween(0, 3) - ownSize, 
              y: device.height/2 + randomBetween(0, 3) - ownSize, 
            },
            {
              x: device.width/2 + randomBetween(-100,100) - ownSize, 
              y: device.height/2 + randomBetween(-100,100) - ownSize, 
            },
            {
              x: device.width/2 + randomBetween(0, 3) - ownSize, 
              y: device.height/2 + randomBetween(0, 3) - ownSize, 
            },
            {
              x: device.width/2 + randomBetween(-150,150) - ownSize, 
              y: device.height/2 + randomBetween(-150,150) - ownSize, 
            },
            {
              x: device.width/2 + randomBetween(0, 3) - ownSize, 
              y: device.height/2 + randomBetween(0, 3) - ownSize, 
            },
            {
              x: device.width/2 + randomBetween(-100,100) - ownSize, 
              y: device.height/2 + randomBetween(-100,100) - ownSize, 
            },
            {
              x: device.width/2 + randomBetween(0, 3) - ownSize, 
              y: device.height/2 + randomBetween(0, 3) - ownSize, 
            },
            {
              x: device.width/2 + randomBetween(-50,50) - ownSize, 
              y: device.height/2 + randomBetween(-50,50) - ownSize, 
            },
            {
              x: device.width/2 + randomBetween(-25,25) - ownSize, 
              y: device.height/2 + randomBetween(-25,25) - ownSize, 
            },
            {
              x: device.width/2 - ownSize, 
              y: device.height/2 - ownSize, 
            },
          ],
          curviness: 2,
        },
        scale: scaleByBaseSize(randomFloatBetween(1, 5, 2)),
        duration: 2,
        delay: 1,
      });

      tl.to(e, {
        scale: scaleByBaseSize(1),
        duration: 0.5,
        ease: Circ.easeOut,
      });

      tl.to(e, {
        motionPath: {
          path: [
            {
              x:coords[i].x + letterPos.x + randomBetween(-bounds.max, bounds.max) - ownSize, 
              y:coords[i].y + letterPos.y + randomBetween(-bounds.max, bounds.max) - ownSize,
            },
            {
              x:coords[i].x + letterPos.x - ownSize, 
              y:coords[i].y + letterPos.y - ownSize,
            }
          ],
          curviness: 1,
        },
        scale: scaleByBaseSize(randomFloatBetween(3, 6, 2)),
        duration: 1.5,
        ease: animEase,
        delay: 0.5,
      });
      tl.set(e, { className: e.getAttribute('class') + " moved"});

    }
  }

  $(starbg).append(starGroup);



  // Events
  if(options.index == 't') {
    $(target).parent().on("click", function() {
      zoomIntoAndLoad(target, '#sem1');
    });
  }
  if(options.index == 'h') {
    $(target).parent().on("click", function() {
      zoomIntoAndLoad(target, '#sem2');
    });
  }
  // Drag 
  if(options.index == 'm') {


    // Wiggle-Animation
    var wiggle = new TimelineMax({
      repeat:-1,
      repeatDelay: 4,
      delay: 10,
    })
    .to([ $(target).parent(), $('[data-ref=' + guid +']') ], 0.7,{
      rotation: -45,
    })
    .to([ $(target).parent(), $('[data-ref=' + guid +']') ], 6,{
      rotation: 0,
      ease: "elastic.out(4, 0.1)",
    });


    let drag = Draggable.create( $(target).parent(), {
      type: "rotation",

      onPress:function(e) {
        console.log("onPress");
      },
      onDrag:function(e) {
        console.log("onDrag");

        // Referenzierende Element mit drehen
        gsap.set($('[data-ref=' + guid +']'), {rotation: drag[0].rotation });

      },
      onClick:function(e) {
        console.log("onClick");
      },
      onDragEnd:function(e) {
        console.log("onDragEnd");

        // eigener Snapper auf 180Grad
        gsap.set([$(target).parent(), $('[data-ref=' + guid +']')], {rotation: (Math.round(drag[0].rotation / 180) * 180) });

        drag[0].update();

        // Wiggle deaktivieren
        wiggle.pause();
      }
    });

  }

}

function generateStars(quantity) {
  for (let i = 0; i < quantity; i++) {
    generateStartPosition();
  }
}

function generateStartPosition() {
  let e = document.createElement("div");
  e.classList.add('star');

  let position = generatePosition(device.width - safegap, device.height - safegap);

  let x = position.left - (baseStarSize/2) + "px";
  let y = position.top - (baseStarSize/2) + "px";

  let scale = scaleByBaseSize(randomFloatBetween(1, 5, 2));

  e.style.transform = "translate(" + x + ", " + y + ") scale(" + scale + ")";

  positions.push([position.left, position.top]);
  e.style.width = baseStarSize + "px";
  e.style.height = baseStarSize + "px";


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

  $(starbg).append(e);

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

function zoomInto(destination) {

  let tl = new TimelineMax();
  let transformOrigin = getCenterOfElement(destination);

  tl.to($(app), {
    duration: 2,
    //ease: Power1.easeOut,
    ease: Sine.easeInOut,
    css: {
      opacity: 0, 
      scale: 200, 
      transformOrigin: transformOrigin.x + "px " + transformOrigin.y + "px"
    }
  });

  return tl;
}

function zoomIntoAndLoad(destination, hash) {
  
  zoomInto(destination).then(function(){
    loadSectionByHash(hash);
    resetAppStyle();
  });

}

function loadSectionByHash(hash) {
  let url_original = new URL(document.URL);
  url_original.hash = hash;

  // new url
  let new_url = url_original.href;
  document.location.href = new_url;
}

function resetAppStyle() {
  let tl = new TimelineMax();
  tl.to($(app), {
    duration: 1,
    ease: Sine.easeInOut,
    css: {
      scale: 1, 
      transformOrigin: "center"
    }
  });
  tl.to($(app), {
    duration: 0.2,
    ease: Sine.easeInOut,
    css: {
      opacity: 1, 
    }
  }).then(function(){
    $(app).attr('style', '');
  });

}

function scaleByBaseSize(scale) {
  let length = (Math.log10(baseStarSize) + 1);

  if(baseStarSize == 0) {
    baseStarSize = 1;
  }

  return scale / baseStarSize; 
}