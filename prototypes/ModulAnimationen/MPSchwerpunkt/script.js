let svg = document.getElementById("svgObj");
svg.onload = function() {
    let tl = gsap.timeline({repeat: -1, repeatDelay: 0});
    content = svg.contentDocument;

    tl.add(animateCar())
    .add(animateAv());
}

/*
AutoAnim

7x {
    setkeyframe
    autobewegen
    playhead bewegen
}

auto flüssig durchfahren
playhead läuft durch

*/

function animateCar(){
    let tl = gsap.timeline();

    let keyframes = content.getElementById("KeyFrames").children;
    let keypoints = content.getElementById("KeyPoints").children;
    let car = content.getElementById("Car");
    let playhead = content.getElementById("Playhead");

    gsap.registerEffect({
        name: "moveToKey",
        effect: (target, config) => {
            let pos = {x: keypoints[config.point].getAttribute("cx")-keypoints[0].getAttribute("cx"), y: keypoints[config.point].getAttribute("cy")-keypoints[0].getAttribute("cy")};

            let rotate = 0;
            if(config.point==3){
                rotate = "45deg";
            } else if(config.point>3){
                rotate = "90deg";
            }

            return gsap.to(target, {duration: config.duration, x: pos.x, y:pos.y, rotate: rotate, ease: config.ease});            
        },
        defaults: {duration: 0, ease:"none"},
        extendTimeline: true
    });

    tl.to(keyframes[0], {opacity: "100%", duration: 0.5})
    for(let i=1;i<=6;i++){
        tl.moveToKey(car, {point: i}, "> 0.5")
        .to(playhead, {x: keyframes[i].getAttribute("cx") - 10, duration:0})
        .to(keyframes[i], {opacity: "100%", duration: 0.5});
    }
    tl.moveToKey(car, {point: 0}, "> 0.5")
    .to(playhead, {x: keyframes[0].getAttribute("cx") - 10, duration:0})
    for(let i=1;i<=6;i++){
        tl.moveToKey(car, {point: i, duration: 0.5})
        .to(playhead, {x: keyframes[i].getAttribute("cx") - 10, duration:0.5, ease:"none"}, "<");
    }

    return tl;
}

/*
AvAnim

durchgehend arme bewegen

maus zu @campus
mausclick
overlay erscheint

maus zu sebastian overlay
mausclick
overlay erscheint

maus zu benjamin overlay
mausclick
overlay erscheint

maus wieder nach unten links
*/

function animateAv(){
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
    
    tl.to(av, {opacity: 1})
    .to(mouse, {x: -20, y: -235, duration: 1})
    .to(mouse, {scale: 0.8, duration: 0.3})
    .to(mouse, {scale: 1, duration: 0.3})
    .fromTo(overlay1, {scale: 0.7, transformOrigin: "right"}, {opacity: 1, scale: 1}, "<")
    .to(mouse, {x: 100, y: -20, duration: 1}, "> 0.5")
    .to(mouse, {scale: 0.8, duration: 0.3})
    .to(mouse, {scale: 1, duration: 0.3})
    .fromTo(overlay2, {scale: 0, opacity: 1, transformOrigin: "right"}, {scale: 1}, "<")
    .to(mouse, {x: 140, y: -20, duration: 1}, "> 0.5")
    .to(mouse, {scale: 0.8, duration: 0.3})
    .to(mouse, {scale: 1, duration: 0.3})
    .fromTo(overlay3, {scale: 0, opacity: 1, transformOrigin: "left"}, {scale: 1}, "<")
    .to(mouse, {opacity: 0})
    .to(av, {opacity: 0}, "> 1")

    let playTl = gsap.timeline({repeat: tl.duration()*2, yoyo: true});
    playTl.to(arms[0], {rotate: "-15deg", duration: 0.5})
    .to(arms[1], {rotate: "15deg", duration: 0.5}, 0)
    .to(live, {opacity: 0.5, duration: 0.5}, 0);

    tl.add(playTl, 0);

    return tl;
}