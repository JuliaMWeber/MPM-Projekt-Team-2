// gsap.from('.laptop', {
//     duration: 3,
//     x: 300,
//     opacity: 0,
//     scale: 0.5,
//     ease: 'power2.inOut'
// })

// gsap.to('.laptop', {
//     duration: 2.5,
//     x: -150,
//     ease: "elastic.out(1, 0.3)"
// })

// gsap.to('.laptop', {
//     duration: 2,
//     x: -200,
//     ease: "bounce"
// })

// gsap.from('.laptop', {
//     duration: 3,
//     y: -300,
//     opacity: 0,
//     scale: 0.5,
//     stagger: 0.6
// });

// gsap.from(".laptop", 1, {
//     scale: 0.1,
//     y: -60,
//     yoyo: true,
//     opacity: 0,
//     ease: "power1.inOut",
//     delay: 1,
//     stagger: 1.5
// })


let masterTl = gsap.timeline({
    repeat: -1,
    repeatDelay: 1
});

// masterTl.to('.cls-9', {
//     y: -140
// }, '+=0.9')

masterTl.to('#firstBtn', {
    y: -10
}, '+=0.2').to('#secondBtn', {
    y: -50
}, '+=0.2').to('#thirdBtn', {
    y: -90
}, '+=0.2')

// let tl = gsap.timeline({
//     repeat: -1,
//     repeatDelay: 1
// });

// tl.to('.cls-11', {
//     x: -165
// }, '+=0.5').to('.cls-12', {
//     x: -165
// }, '+=0.5').to('.cls-13', {
//     x: -165
// }, '+=0.5')

gsap.to('#firstWave', {
    duration: 2,
    scale: 0.5,
    repeat: -1
})

gsap.to('#secondWave', {
    duration: 1,
    scale: 0.5,
    repeat: -1
})

gsap.to('#thirdWave', {
    duration: 0.5,
    scale: 0.9,
    repeat: -1
})

gsap.from('#speakerWave', {
    duration: 1,
    scale: 1.1,
    repeat: -1
})