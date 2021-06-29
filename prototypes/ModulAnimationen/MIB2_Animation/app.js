// let svgObj = document.getElementById("MIB2Obj");

// svgObj.onload = function () {
//     content = svgObj.contentDocument;
//     // let firstBtn = document.getElementById("firstBtn");
//     // let secondBtn = document.getElementById("secondBtn");
//     // let thirdBtn = document.getElementById("thirdBtn");
//     // let firstWave = document.getElementById("firstWave");
//     // let secondWave = document.getElementById("secondWave");
//     // let thirdWave = document.getElementById("thirdWave");
//     // let speakerWave = document.getElementById("speakerWave");

//     let masterTl = gsap.timeline({
//         repeat: -1,
//         repeatDelay: 1
//     });

//     masterTl.to(firstBtn, {
//         y: -10
//     }, '+=0.2').to(secondBtn, {
//         y: -50
//     }, '+=0.2').to(thirdBtn, {
//         y: -90
//     }, '+=0.2')


//     gsap.to(firstWave, {
//         duration: 2,
//         scale: 0.5,
//         repeat: -1
//     })

//     gsap.to(secondWave, {
//         duration: 1,
//         scale: 0.5,
//         repeat: -1
//     })

//     gsap.to(thirdWave, {
//         duration: 0.5,
//         scale: 0.9,
//         repeat: -1
//     })

//     gsap.from(speakerWave, {
//         duration: 1,
//         scale: 1.1,
//         repeat: -1
//     })

// }

// let masterTl = gsap.timeline({
//     repeat: -1,
//     repeatDelay: 1
// });

// masterTl.to('#firstBtn', {
//     y: -10
// }, '+=0.2').to('#secondBtn', {
//     y: -50
// }, '+=0.2').to('#thirdBtn', {
//     y: -90
// }, '+=0.2')


// gsap.to('#firstWave', {
//     duration: 2,
//     scale: 0.5,
//     repeat: -1
// })

// gsap.to('#secondWave', {
//     duration: 1,
//     scale: 0.5,
//     repeat: -1
// })

// gsap.to('#thirdWave', {
//     duration: 0.5,
//     scale: 0.9,
//     repeat: -1
// })

// gsap.from('#speakerWave', {
//     duration: 1,
//     scale: 1.1,
//     repeat: -1
// })

window.addEventListener("load", function () {
    var svgObject = document.getElementById('MIB2Obj').contentDocument;
    let firstBtn = svgObject.getElementsByClassName("firstBtn");
    let secondBtn = svgObject.getElementsByClassName("secondBtn");
    let thirdBtn = svgObject.getElementsByClassName("thirdBtn");
    let firstWave = svgObject.getElementsByClassName("firstWave");
    let secondWave = svgObject.getElementsByClassName("secondWave");
    let thirdWave = svgObject.getElementsByClassName("thirdWave");
    let speakerWave = svgObject.getElementsByClassName("speakerWave");

    let masterTl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1
    });

    masterTl.to(firstBtn, {
        y: -10
    }, '+=0.2').to(secondBtn, {
        y: -50
    }, '+=0.2').to(thirdBtn, {
        y: -90
    }, '+=0.2')


    gsap.to(firstWave, {
        duration: 2,
        scale: 0.5,
        repeat: -1
    })

    gsap.to(secondWave, {
        duration: 1,
        scale: 0.5,
        repeat: -1
    })

    gsap.to(thirdWave, {
        duration: 0.5,
        scale: 0.9,
        repeat: -1
    })

    gsap.from(speakerWave, {
        duration: 1,
        scale: 1.1,
        repeat: -1
    })

});