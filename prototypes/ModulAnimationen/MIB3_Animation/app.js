gsap.registerPlugin(TextPlugin, EasePack);

window.addEventListener('load', function () {
    let svgObj = document.getElementById('MIB3Obj').contentDocument;
    let cls3 = svgObj.querySelectorAll('.cls-3, .cls-18');
    let cls21 = svgObj.getElementsByClassName('cls-21');
    let cls22 = svgObj.getElementsByClassName('cls-22');
    let cls23 = svgObj.getElementsByClassName('cls-23');
    let cls26 = svgObj.getElementsByClassName('cls-26');
    let cls27 = svgObj.getElementsByClassName('cls-27');
    let cls28 = svgObj.getElementsByClassName('cls-28');
    let cursor = svgObj.getElementById('cursor');
    let title = svgObj.querySelectorAll('.title');

    let c = gsap.to(cursor, {
        opacity: 0,
        ease: 'power2.inOut',
        repeat: -1
    });

    const words = ['Designer.', 'Entwickler.', 'Entrepreneur.'];

    let masterTL = gsap
        .timeline({
            repeat: -1
        })
        .pause();

    words.forEach((word) => {
        let tl = gsap.timeline({
            repeat: 1,
            yoyo: true,
            repeatDelay: 1
        });
        tl.to(title, {
            duration: 1,
            text: word
        });
        masterTL.add(tl);
    });

    let tl = gsap.timeline({
        defaults: {
            duration: 0.5,
            ease: 'none',
            opacity: 0
        }
    });

    let tl1 = gsap.timeline({
        defaults: {
            duration: 0.1,
            ease: 'power3.out',
            opacity: 0,
            stagger: 0.03
        }
    });

    tl1.from(
        cls3, {
            x: 100
        },
        '+=0.01'
    );

    tl
        .from(
            cls21, {
                y: -400,
                ease: 'power3.out'
            },
            '+=0.2'
        )
        .from(
            cls26, {
                x: -400
            },
            '-=0.2'
        )
        .from(
            cls27, {
                x: -400,
                stagger: 0.2
            },
            '+=0.3'
        )
        .from(
            cls22, {
                y: 100
            },
            '-=0.2'
        )
        .from(
            cls23, {
                x: -400,
                stagger: 0.2
            },
            '-=0.2'
        );

    tl.from(cls28, {
        duration: 0.5,
        stagger: 0.2,
        transform: 'translateX(-100vw)',
        ease: 'power3.out',
        onComplete: () => masterTL.play()
    });
});