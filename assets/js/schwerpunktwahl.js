function displaySchwerpunktwahl(id) {
  gsap.registerPlugin(MotionPathPlugin, Draggable, SnapPlugin);

  let data = {};
  data.app = $("#app");
  data.sun = data.app.find('#sun');
  data.animationwrapper = data.app.find('#animation');
  data.portal = data.app.find('#portal');
  data.id = id;

  let starbg = document.getElementById("stars");
  for (let i = 0; i < StarCount; i++) {
    generateStartPosition(starbg);
  }

  let sunSvg = document.createElement("object");
  sunSvg.setAttribute("data", "./assets/svg/Sonne.svg");

  let sunSize = device.height + 100;
  let tl = gsap.timeline();
  tl.set(data.sun, {
    left: device.width / 2 - sunSize / 2,
    top: device.height / 2 - sunSize / 2,
    opacity: 0,
    width: sunSize,
    height: sunSize,
    scale: 0,
  });
  data.sun.append(sunSvg);

  tl.to(data.sun, {
    opacity: 1,
    duration: 1,
    scale: 1,
    delay: 0.5
  });

  // Portal Event
  data.portal.on('click', function () {
    let prev;
    if (sessionStorage.getItem("last_url") == window.location.href) {
      prev = '/';
    } else {
      prev = sessionStorage.getItem("last_url");
    }

    gsap.to("#animation", {
      opacity: 0,
      duration: 0.5,
    }).then(function() {
      tl.reverse().then(function () {
        window.location.href = prev;
      });
    });
  });

  tl.then(function () {

    if (id == 1) {
      animateMP(data, '#medienproduktion');
    } else if (id == 2) {
      animateWM(data, '#webmobile');
    } else {
      console.log("ID not found");
    }

  });

}

function animateMP(data, svgElement) {

  let id = svgElement.replace('#', '');

  let object = document.createElement('object');
  object.setAttribute('data', '/assets/svg/ModulanimationSVGS/MPSchwerpunkt.svg');
  object.setAttribute('id', id);
  let objectsize = device.width < data.sun[0].getBoundingClientRect().width ? device.width : data.sun[0].getBoundingClientRect().width * 0.55;
  object.setAttribute('width', objectsize );
  object.setAttribute('height', objectsize );
  data.animationwrapper.append(object);

  let headline = "Schwerpunktwahl: Medienproduktion";
  let headlineEl = document.createElement('h2');
  headlineEl.setAttribute('class', 'sp_headline');
  headlineEl.textContent = headline;
  data.sun.append(headlineEl);

  let headlineTL = gsap.timeline({duration: 1, repeat: 1, repeatDelay: 1, yoyo: true});
  headlineTL.set(headlineEl, {
    opacity: 0,
  });
  headlineTL.to(headlineEl, {
    opacity: 1,
  });

  svgLoad(svgElement).then(function () {
    headlineTL.then(function() {
      gsap.to(data.animationwrapper, {
        opacity: 1,
        duration: 0.5,
      });
  
      let tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 0,
      });
      let svg = document.getElementById(id);
      content = svg.contentDocument;
  
      tl.add(animateCar()).add(animateAv());

    });
    

  });

  function animateCar() {
    let tl = gsap.timeline();

    let keyframes = content.getElementById("KeyFrames").children;
    let keypoints = content.getElementById("KeyPoints").children;
    let car = content.getElementById("Car");
    let playhead = content.getElementById("Playhead");

    gsap.registerEffect({
      name: "moveToKey",
      effect: (target, config) => {
        let pos = {
          x: keypoints[config.point].getAttribute("cx") - keypoints[0].getAttribute("cx"),
          y: keypoints[config.point].getAttribute("cy") - keypoints[0].getAttribute("cy")
        };

        let rotate = 0;
        if (config.point == 3) {
          rotate = "45deg";
        } else if (config.point > 3) {
          rotate = "90deg";
        }

        return gsap.to(target, {
          duration: config.duration,
          x: pos.x,
          y: pos.y,
          rotate: rotate,
          ease: config.ease
        });
      },
      defaults: {
        duration: 0,
        ease: "none"
      },
      extendTimeline: true
    });

    tl.to(keyframes[0], {
      opacity: "100%",
      duration: 0.5
    })
    for (let i = 1; i <= 6; i++) {
      tl.moveToKey(car, {
          point: i
        }, "> 0.5")
        .to(playhead, {
          x: keyframes[i].getAttribute("cx") - 10,
          duration: 0
        })
        .to(keyframes[i], {
          opacity: "100%",
          duration: 0.5
        });
    }
    tl.moveToKey(car, {
        point: 0
      }, "> 0.5")
      .to(playhead, {
        x: keyframes[0].getAttribute("cx") - 10,
        duration: 0
      })
    for (let i = 1; i <= 6; i++) {
      tl.moveToKey(car, {
          point: i,
          duration: 0.5
        })
        .to(playhead, {
          x: keyframes[i].getAttribute("cx") - 10,
          duration: 0.5,
          ease: "none"
        }, "<");
    }

    return tl;
  }

  function animateAv() {
    let tl = gsap.timeline();

    let av = content.getElementById("AV3");
    let arms = [];
    arms.push(content.getElementById("Arm1"));
    arms.push(content.getElementById("Arm2"));
    let mouse = content.getElementById("Mouse");
    let live = content.getElementById("live");
    let overlay1 = content.getElementById("Overlay1");
    let overlay2 = content.getElementById("Overlay2");
    let overlay3 = content.getElementById("Overlay3");

    tl.to(av, {
        opacity: 1
      })
      .to(mouse, {
        x: -20,
        y: -235,
        duration: 1
      })
      .to(mouse, {
        scale: 0.8,
        duration: 0.3
      })
      .to(mouse, {
        scale: 1,
        duration: 0.3
      })
      .fromTo(overlay1, {
        scale: 0.7,
        transformOrigin: "right"
      }, {
        opacity: 1,
        scale: 1
      }, "<")
      .to(mouse, {
        x: 100,
        y: -20,
        duration: 1
      }, "> 0.5")
      .to(mouse, {
        scale: 0.8,
        duration: 0.3
      })
      .to(mouse, {
        scale: 1,
        duration: 0.3
      })
      .fromTo(overlay2, {
        scale: 0,
        opacity: 1,
        transformOrigin: "right"
      }, {
        scale: 1
      }, "<")
      .to(mouse, {
        x: 140,
        y: -20,
        duration: 1
      }, "> 0.5")
      .to(mouse, {
        scale: 0.8,
        duration: 0.3
      })
      .to(mouse, {
        scale: 1,
        duration: 0.3
      })
      .fromTo(overlay3, {
        scale: 0,
        opacity: 1,
        transformOrigin: "left"
      }, {
        scale: 1
      }, "<")
      .to(mouse, {
        opacity: 0
      })
      .to(av, {
        opacity: 0
      }, "> 1")

    let playTl = gsap.timeline({
      repeat: tl.duration() * 2,
      yoyo: true
    });
    playTl.to(arms[0], {
        rotate: "-15deg",
        duration: 0.5
      })
      .to(arms[1], {
        rotate: "15deg",
        duration: 0.5
      }, 0)
      .to(live, {
        opacity: 0.5,
        duration: 0.5
      }, 0);

    tl.add(playTl, 0);

    return tl;
  }

}

function animateWM(data, svgElement) {

  let object = document.createElement('object');
  object.setAttribute('data', '/assets/svg/ModulanimationSVGS/WMSchwerpunkt.svg');
  object.setAttribute('id', svgElement.replace('#', ''));
  let objectsize = device.width < data.sun[0].getBoundingClientRect().width ? device.width : data.sun[0].getBoundingClientRect().width * 0.7;

  object.setAttribute('width', objectsize );
  object.setAttribute('height', objectsize );
  data.animationwrapper.append(object);

  let animEase = "slow(0.7, 0.7, false)";
  let svgcontent;
  let splitter;
  let encryptShift = randomBetween(10,16);
  const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZÄÜÖabcdefghijklmnopqrstuvwxyzßäüö"?!#=$%&.,-_/ ';

  let headline = "Schwerpunktwahl: Web & Mobile";
  let headlineEl = document.createElement('h2');
  headlineEl.setAttribute('class', 'sp_headline');
  headlineEl.textContent = headline;
  data.sun.append(headlineEl);

  let headlineTL = gsap.timeline({duration: 1, repeat: 1, repeatDelay: 1, yoyo: true});
  headlineTL.set(headlineEl, {
    opacity: 0,
  });
  headlineTL.to(headlineEl, {
    opacity: 1,
  });

  svgLoad(svgElement).then(function () {
    headlineTL.then(function() {

      svgcontent = document.getElementById( svgElement.replace('#', '') ).contentDocument;

      gsap.to(data.animationwrapper, {
        opacity: 1,
        duration: 0.5
      });
  
      prepare(data);
  
      let tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 2,
        yoyo: true
      });
      tl.add(animateLineup(data));
      tl.add(animateLock(data, true));
      tl.add(animateEncrypt(data,true));
      tl.add(animateLock(data,false));
      tl.add(animateTransfer(data,true));

    });
    

  });

  function prepare() {
    let plaintext = $(svgcontent).find("#String").children('text').first();

    let charArray = [];
    // Jeder Char
    charArray = Array.from(plaintext.text());
    // Jedes Wort
    charArray = Array.from(plaintext.text().split(" "));
    plaintext.html('').hide();

    splitter = $("<div>", {
      "class": "splitter"
    });
    data.animationwrapper.append(splitter);

    let laptop = $(svgcontent).find('#CaseTop');
    let laptopPos = laptop[0].getBoundingClientRect().width;

    data.fontsize = (laptopPos/charArray.length * 0.35);
    data.svgPos = object.getBoundingClientRect();

    $(charArray).each(function (index, value) {
      let $div = $("<div>", {
        "class": "char",
        "style": "font-size:" + data.fontsize + "px"
      });
      $div.html(value);
      splitter.append($div);
    });
  }

  function animateLock(data, open = true) {
    let ring = $(svgcontent).find("#ring").first();

    let tl = gsap.timeline({});

    let deg = open ? -25 : 0;

    tl.to(ring, {
      rotate: deg,
      duration: 1,
      transformOrigin: '0% 100%', // left-bottom
    });

    return tl;
  }

  function animateLineup(data) {

    let tmpWidth = 0;
    let tl = gsap.timeline({
      delay: 2
    });

    let laptop = $(svgcontent).find('#CaseTop');
    let laptopPos = getCenterOfElement(laptop[0]);

    let status = $(svgcontent).find('#Status').find('#s1')[0];
    tl.to(status, {
      opacity: 1,
      duration: 0.4,
      onStart: (function () {
        hideStatus(status);
      }),
      onUpdate: (function () {
        if ($(status).attr('called')) {
          $(status).css('opacity', 0);
        }
      }),
      onComplete: (function () {
        $(status).attr('called', true);
      }),
      onReverseComplete: (function () {
        $(status).removeAttr('called');
      }),
    });

    $(splitter).children().each(function (index, value) {
      let el = $(this);

      let x;
      if (index == 0) {
        x = data.svgPos.x + laptopPos.x + 10 + tmpWidth - (laptop[0].getBoundingClientRect().width / 2);
      } else {
        x = (data.fontsize * 0.3) + tmpWidth;
      }

      tl.to(el, {
        opacity: 0,
      });
      tl.set(el, {
        x: x,
        y: data.svgPos.y + laptopPos.y,
        delay: 0,
        duration: 0.1
      });
      tl.to(el, {
        opacity: 1,
        duration: 0.1,
        onReverseComplete: (function () {
          let status = $(svgcontent).find('#Status').find('#s0')[0];
          gsap.to(status, {
            opacity: 1,
            duration: 0.5,
            onStart: (function () {
              hideStatus(status);
            }),
          });
          animateDB();
        }),

      });

      tmpWidth = x + el.width();

      tl.set(el, {
        attr: {
          encrypt: 'false',
          decrypt: 'false'
        }
      });

    });

    return tl;
  }

  function animateEncrypt(data) {

    let tl = gsap.timeline({
      delay: 2
    });

    let lock = $(svgcontent).find('#Lock').first();
    let lockPos = getCenterOfElement(lock[0]);

    let laptop = $(svgcontent).find('#CaseTop');
    let laptopPos = getCenterOfElement(laptop[0]);

    let status = $(svgcontent).find('#Status').find('#s2')[0];
    tl.to(status, {
      opacity: 1,
      duration: 0.4,
      onStart: (function () {
        hideStatus(status);
      }),
      onUpdate: (function () {
        if ($(status).attr('called')) {
          $(status).css('opacity', 0);
        }
      }),
      onComplete: (function () {
        $(status).attr('called', true);
      }),
      onReverseComplete: (function () {
        $(status).removeAttr('called');
      }),
    });

    // "Verschlüsselung"
    $(splitter).children().each(function () {
      let el = $(this);

      tl.to(el, {
        motionPath: {
          path: [{
            x: data.svgPos.x + lockPos.x - (el.width() / 2),
            y: data.svgPos.y + laptopPos.y,
          }],
          curviness: 0.5,
        },
        opacity: 1,
        duration: 0.3,
        ease: animEase,
        onStart: (function () {
          el.addClass('selected');
        }),
        onReverseComplete: (function () {
          el.removeClass('selected');
        }),
      });

      tl.to(el, {
        motionPath: {
          path: [{
            x: data.svgPos.x + lockPos.x - (el.width() / 2),
            y: data.svgPos.y + lockPos.y - (el.height() / 2),
          }],
          curviness: 0.5,
        },
        opacity: 0,
        delay: 0.5,
        duration: 0.3,
      });

      tl.to(el, {
        onUpdate: (function () {
          if (el.attr('decrypt') && el.attr('decrypt') == 'true') {
            el.text(simpleDecrypt(el.text(), encryptShift));
            el.removeAttr('decrypt');
          }
          if (!el.attr('encrypt') || el.attr('encrypt') == 'false') {
            el.html(simpleEncrypt($(el).text(), encryptShift));
            el.attr('encrypt', true);
          }
        }),
        onReverseComplete: (function () {
          let status = $(svgcontent).find('#Status').find('#s5')[0];
          gsap.to(status, {
            opacity: 1,
            duration: 0.5,
            onStart: (function () {
              hideStatus(status);
            }),
          });
        }),
      });


    });

    return tl;
  }

  function animateDB(data) {
    let db = $(svgcontent).find('#DB').first();
    let tl = gsap.timeline({
      duration: 0.3,
    });
    let layer = db.find('#Layer2').children('path').first();
    let color = layer.css('fill');

    tl.to(layer, {
      fill: "#9DB8D8",
    });
    tl.to(layer, {
      fill: color,
    });

    return tl;
  }

  function hideStatus(active) {
    let el = $(svgcontent).find('#Status').find('text');

    el.each(function () {
      if ($(this)[0] != active) {
        gsap.set($(this), {
          opacity: 0,
        });
      }
    });
  }

  function animateTransfer(data) {
    let tl = gsap.timeline({
      delay: 2
    });

    let lock = $(svgcontent).find('#Lock').first();
    let lockPos = getCenterOfElement(lock[0]);

    let db = $(svgcontent).find('#DB').first();
    let dbPos = getCenterOfElement(db[0]);

    let laptop = $(svgcontent).find('#CaseTop');
    let laptopPos = getCenterOfElement(laptop[0]);

    let status = $(svgcontent).find('#Status').find('#s3')[0];
    tl.to(status, {
      opacity: 1,
      duration: 0.4,
      onStart: (function () {
        hideStatus(status);
      }),
      onUpdate: (function () {
        if ($(status).attr('called')) {
          $(status).css('opacity', 0);
        }
      }),
      onComplete: (function () {
        $(status).attr('called', true);
      }),
      onReverseComplete: (function () {
        $(status).removeAttr('called');
      }),
    });

    // "Verschlüsselung"
    $(splitter).children().each(function () {
      let el = $(this);

      tl.to(el, {
        opacity: 1,
        motionPath: {
          path: [{
            x: data.svgPos.x + dbPos.x - (el.width() / 2),
            y: data.svgPos.y + dbPos.y - (el.height() / 2),
          }, ],
          curviness: 0.5,
        },
        duration: 0.8,
        ease: animEase,
        delay: 0.3,
      });

      tl.to(el, {
        opacity: 0,
        onComplete: (function () {
          if (!el.attr('decrypt') || el.attr('decrypt') == 'false') {
            el.attr('decrypt', true);
            animateDB();
          }
        }),
        onReverseComplete: (function () {
          let status = $(svgcontent).find('#Status').find('#s4')[0];
          gsap.to(status, {
            opacity: 1,
            duration: 0.5,
            onStart: (function () {
              hideStatus(status);
            }),
          });
          animateDB();
        }),
      });

    });

    return tl;
  }

  function simpleEncrypt(text, shift) {
    let letterArray = Array.from(letters);
    let textArray = Array.from(text);

    if (shift > letterArray.length) {
      shift = letterArray.length;
    }

    let tmp = [];
    $.each(textArray, function (index, value) {
      let i = letterArray.indexOf(value);

      if ((i + shift) > letterArray.length) {
        //console.log("Encrypt", value, letterArray[(i+shift - letterArray.length)] );
        tmp.push(letterArray[(i + shift - letterArray.length)]);
      } else {
        //console.log("Encrypt", value, letterArray[(i+shift)] );
        tmp.push(letterArray[i + shift]);
      }
    });

    return tmp.join('');
  }

  function simpleDecrypt(text, shift) {
    let letterArray = Array.from(letters);
    let textArray = Array.from(text);

    if (shift > letterArray.length) {
      shift = letterArray.length;
    }

    let tmp = [];
    $.each(textArray, function (index, value) {
      let i = letterArray.indexOf(value);

      if ((i - shift) < 0) {
        //console.log("Decrypt", value, letterArray[(letterArray.length + (i-shift))] );
        tmp.push(letterArray[(letterArray.length + (i - shift))]);
      } else {
        //console.log("Decrypt", value, letterArray[(i-shift)] );
        tmp.push(letterArray[i - shift]);
      }
    });

    return tmp.join('');
  }

}