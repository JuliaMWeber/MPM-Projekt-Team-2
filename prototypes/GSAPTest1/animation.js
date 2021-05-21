function animateEllipse(){
    gsap.fromTo("ellipse", {cy: 50}, {duration: 2, cy: 460, ease: "bounce", onUpdate: function(){
        let radius = gsap.getProperty("ellipse", "r");
        let posy = gsap.getProperty("ellipse", "cy");
        let sizey = document.getElementById("ellipseSvg").getAttribute("height");

        if(sizey-posy<50){
            gsap.set("ellipse", {ry: sizey-posy});
        } else {
            gsap.set("ellipse", {ry: 50});
        }
    }, onComplete: function(){
        gsap.to("ellipse", {duration: 0.1, ry: 50, cy:450});
    }
    });
    gsap.fromTo("ellipse", {cx: 50}, {duration: 2, cx: 300});
}