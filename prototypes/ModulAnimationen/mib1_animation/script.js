// window.onload = function () {
//     svg = document.getElementById("svgMIB1")
//
//     svgContent= svg.contentDocument
//     console.log("test")
// }

$('#svgMIB1').on('load', () => {
    console.log("SVG Loaded");

    let obj = document.getElementById("svgMIB1");
    let content = obj.contentDocument

    let overlay = content.getElementById("thm_overlay")
    let thm = content.getElementById("thm")

    let tM = content.getElementById("t_m")
    let tR = content.getElementById("t_r")
    let tL = content.getElementById("t_l")

    let hM = content.getElementById("h_m")
    let hR = content.getElementById("h_r")
    let hL = content.getElementById("h_l")

    let mM1 = content.getElementById("m_m1")
    let mM2 = content.getElementById("m_m2")
    let mM3 = content.getElementById("m_m3")
    let mMR = content.getElementById("m_r")
    let mML = content.getElementById("m_l")

    let koordSystem = document.getElementById("koord_system")

    let showChecker = function () {
        gsap.to(overlay,{opacity:1,duration:2})
        gsap.to(thm,{fill:"white",duration:2})
    }

    let hideChecker = function(){
        gsap.to(overlay,{opacity:0,duration:1})
    }

    let doInitAnimation = function () {
        let buildSystem = new Vivus('svgMIB1',{type:"sync",duration:200,},function (e){
            console.log("Vivus")
            startGSAP()
        })
    }

    let startGSAP = function () {
        //gsap.to(thm,{fill:"#4fe084",duration:1})
        let timeline = gsap.timeline({repeat: -1,repeatDelay:5})
            .to(thm,{fill:"#4fe084",duration:1})
            .to(tM,{y:-200},1)
            .to(tR,{x:-50},1)
            .to(tL,{x:50},1)
            .to(tM,{y:0,opacity:1,duration:0.4,ease:"bounce"},2)
            .to(tR,{x:0,opacity:1,duration:0.4},2.3)
            .to(tL,{x:0,opacity:1,duration:0.3},2.5)

            .to(hR,{y:-300},2.6)
            .to(hL,{y:-100},2.6)
            .to(hM,{x:100},2.6)
            .to(hR,{y:0,opacity:1,duration:0.4,ease:"bounce"},3)
            .to(hL,{y:0,opacity:1,duration:0.4,ease:"bounce"},3.2)
            .to(hM,{x:0,opacity:1,duration:0.3},3.5)

            .to(mMR,{y:-300},3.6)
            .to(mML,{y:-100},3.6)
            .to(mM1,{x:-100},3.6)
            .to(mM2,{y:-300},3.6)
            .to(mM3,{x:100},3.6)
            .to(mMR,{y:0,opacity:1,duration:0.4,ease:"bounce"},4.2)
            .to(mML,{y:0,opacity:1,duration:0.4,ease:"bounce"},4.3)
            .to(mM1,{x:0,opacity:1,duration:0.4},4.5)
            .to(mM2,{y:0,opacity:1,duration:0.3},4.5)
            .to(mM3,{y:0,opacity:1,duration:0.3},4.6)
            .to(mM3,{x:0,duration:0.5,onComplete:checker => {
                    showChecker()
                    setTimeout(function (){hideChecker()},3500)
                }},4.9)

    }

    doInitAnimation()

});