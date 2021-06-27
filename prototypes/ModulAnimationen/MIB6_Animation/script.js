let mySvg = document.getElementById("mib6");

mySvg.onload = function() {
    content = mySvg.contentDocument;
   
    let animateTl = animate(); 
}

function animate() {
  gsap.registerEffect({
    name: "tardis",
    effect: (target, config) => {
      return gsap.to(target, {yoyo: true, repeat: config.repeat, fill: config.fill, opacity: 1, duration: config.duration, repeatDelay: config.repeatDelay});             
    },
    defaults: {duration: 2, scale: 1},
    extendTimeline: true
});

gsap.registerEffect({
    name: "yolo",
      effect: (target, config) => {
        return gsap.to(target, {yoyo: true, repeat: 0, opacity: 1, duration: config.duration, scale: config.scale, transformOrigin: "left"});            
    },
    defaults: {duration: 1, scale: 1},
    extendTimeline: true
});

gsap.registerEffect({
    name: "now",
      effect: (target, config) => {
        return gsap.to(target, {yoyo: true, repeat: 0, opacity: 1, duration: config.duration, scale: config.scale, transformOrigin: "left"});            
    },
    defaults: {duration: 0},
    extendTimeline: true
});

gsap.registerEffect({
    name: "moveTexture",
      effect: (target, config) => {
        return gsap.to(target, {yoyo: true, repeat: 0, opacity: 1, duration: config.duration, scale: config.scale, transformOrigin: "left", translateX:200, translateY:200});            
    }, 
  
    defaults: {duration: 1,scale:0},
    extendTimeline: true
});
gsap.registerEffect({
    name: "deleteAll",
    effect: (target, config) => {
        return gsap.to(target, {yoyo: true, repeat: 0, duration: config.duration, scale: config.scale, transformOrigin: "left"});            
    },
    defaults: {duration: 0.02, scale: 0},
    extendTimeline: true
});

  let timeLord = gsap.timeline({repeat: -1, repeatDelay: 1});
  //let timeLord = gsap.timeline({repeat: 0, repeatDelay: 0}); alte v
  let cube = content.getElementById("wuerfel");
  let chess = content.getElementById("schachbrett");
  let cubetexture = content.getElementById("texturWuerfel");
  let texture = content.getElementById("textur");
  

  timeLord.tardis(cube, {opacity: 1, repeat: 0, repeatDelay: 0.04, duration: 0.5})
  .to(cube, {opacity: 1})
  .yolo(chess)
  .to(chess, {opacity: 1})
  .moveTexture(texture, {duration:3})
  //.deleteAll(texture)
  .now(cubetexture);


}

