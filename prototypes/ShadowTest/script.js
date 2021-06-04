var svgList = document.getElementsByTagName("object");

for(let i=0;i<svgList.length;i++){
    svgList[i].style.width = "800px";
    svgList[i].style.height = "800px";
}


function rotateShadow(){
    gsap.set(svgList[1], {rotation: "+=2deg"})
}

gsap.ticker.add(rotateShadow);