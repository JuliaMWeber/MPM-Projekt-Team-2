var tl = gsap.timeline({
    defaults: {
        duration: 0.5,
        ease: 'none',
        opacity: 0
    }
});

var tl1 = gsap.timeline({
    defaults: {
        duration: 0.1,
        ease: 'power3.out',
        opacity: 0,
        stagger: 0.03
    }
});

tl1.from('#cls3', {
    x: 100,
}, '+=0.01')

// .from('.cls-18', {
//     x: 400,

// }, '+=1').from('.cls-19', {
//     x: 400,

// }, '+=1')


// tl.from('.cls-28', {
//     y: 7 vw,
//     stagger: 0.5,
//     ease: 'power3.out'
// }, '+=0.2').from('.cls-32', {
//     y: 400,
// }, '+=0.2')

tl.from('.cls-21', {
    y: -400,
    ease: 'power3.out'
}, '+=0.2').from('.cls-26', {
    x: -400
}, '-=0.2').from('.cls-27', {
    x: -400,
    stagger: 0.2
}, '+=0.3').from('.cls-22', {
    y: 100
}, '-=0.2').from('.cls-23', {
    x: -400,
    stagger: 0.2
}, '-=0.2')



tl.from('.cls-28', {
    duration: 0.5,
    stagger: 0.2,
    x: "-100vw",
    ease: "power3.out",
    onComplete: () => masterTL.play()
})

const words = ['Designer.', 'Entwickler.', 'Entrepreneur.'];

let cursor = gsap.to('#cursor', {
    opacity: 0,
    ease: 'power2.inOut',
    repeat: -1
});

let masterTL = gsap.timeline({
    repeat: -1,

}).pause()

words.forEach(word => {
    let tl = gsap.timeline({
        repeat: 1,
        yoyo: true,
        repeatDelay: 1
    })
    tl.to('#text', {
        duration: 1,
        text: word
    })
    masterTL.add(tl);
});