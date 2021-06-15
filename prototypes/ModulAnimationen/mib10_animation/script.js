// Hier kommt das Custom Script Zeug rein

gsap.registerPlugin(Draggable)

let svg;
let svgContent;
let typ;
let denkblasen;
let formeln;
let gluehbirne
let traehne;
let mundSad;
let strahlen;
let mundhappy;


window.onload = function () {
    svg = document.getElementById("svgMIB10")

    svgContent= svg.contentDocument

    setSVGs(svgContent)

    doAnimations()
}

function doHitTest(element1,element2){
    return Draggable.hitTest(element1, element2);
}

let doAnimations = function (){

    let typRect = typ.getBoundingClientRect()
    gsap.set('.container',{perspective:500})

    let tl = gsap.timeline()
    .from(denkblasen,{opacity:0,stagger:0.3,},1)

    .from(formeln[2],{opacity:0},2)
    .to(formeln[2],{x:typRect.x,y:typRect.y,duration:1.5,onUpdate:hide => {
            if (doHitTest(typ,formeln[2])){
                gsap.to(formeln[2],{opacity:0,ease:"power4",duration:0.25})
                gsap.to(traehne,{opacity:1,y:10})
                gsap.to(traehne,{opacity:0, delay:0.25})
            }
        }},2)

    .from(formeln[1],{opacity:0},2.5)
    .to(formeln[1],{x:typRect.x,y:typRect.y,duration:1.5,onUpdate:hide => {
            if (doHitTest(typ,formeln[1])){
                gsap.to(formeln[1],{opacity:0,ease:"power4",duration:0.25})
            }
        }},2.5)

        .from(formeln[0],{opacity:0},3)
        .to(formeln[0],{x:typRect.x,y:typRect.y,duration:1.5,onUpdate:hide => {
                if (doHitTest(typ,formeln[0])){

                    gsap.to(formeln[0],{opacity:0,ease:"power4",duration:0.25})
                }
            }},3)

        .to(gluehbirne,{opacity:1,y:-10},5)
        .to(mundSad,{transformOrigin:"50% 50%",rotate:"180deg"},5)
        .to(denkblasen,{opacity:0,stagger:0.25},5)

        .to(strahlen,{opacity:1},7)
        .to(mundSad,{opacity:0},7)
        .to(mundhappy,{opacity:1},7)



}

let setSVGs = function (content) {
    typ = content.getElementById("typ")
    denkblasen = [
        content.getElementById("gedankenblase1"),
        content.getElementById("gedankenblase2"),
        content.getElementById("gedankenblase")]
    formeln = [
        content.getElementById("formel1"),
        content.getElementById("formel2"),
        content.getElementById("formel3")
    ]
    gluehbirne = content.getElementById("gluehbirne")
    traehne = content.getElementById("traehne")
    mundSad = content.getElementById("mund_traurig")
    strahlen = content.getElementById("strahlen")
    mundhappy = content.getElementById("mund_happy")
}