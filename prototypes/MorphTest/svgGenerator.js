//Registered Animations [[ElementReference, startState, endState, startTime, endTime]]
var animations = [];

gsap.ticker.add(animate);

function generateCircle(x, y, r){
    return generateEllipse(x, y, r*2, r*2);
}

function generateEllipse(x, y, width, height){
    var output = "M " + x + " " + (y+height/2) + ",";

    //A rx ry rotation sweepflag lasflag targetx targety
    output+= "A " + width/2 + " " + height/2 + " " + "0 0 1 " + (x+width) + " " + (y+height/2) + ",";
    output+= "A " + width/2 + " " + height/2 + " " + "0 0 1 " + x + " " + (y+height/2);

    var element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    element.setAttributeNS(null ,"d", output);

    return element;
}

function generateRec(x, y, width, height){
    var output = "M " + x + " " + y + ",";
    output += "H " + (x+width) + ",";
    output += "V " + (y+height) + ",";
    output += "H " + x + ",";
    output += "V " + y;
    
    var element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    element.setAttributeNS(null ,"d", output);

    return element;
}

function generateRecRound(x, y, width, height, corner) {
    let min = Math.min(width, height);
    if(corner*2>min){
        corner = min/2;
    }


    var output = "M " + x + " " + (y+corner) + ",";
    output += "A " + corner + " " + corner + " 0 0 1 " + (x+corner) + " " + y + ",";
    output += "H " + (x+width-corner) + ",";
    output += "A " + corner + " " + corner + " 0 0 1 " + (x+width) + " " + (y+corner) + ",";
    output += "V " + (y+height-corner) + ",";
    output += "A " + corner + " " + corner + " 0 0 1 " + (x+width-corner) + " " + (y+height) + ",";
    output += "H " + (x+corner) + ",";
    output += "A " + corner + " " + corner + " 0 0 1 " + x + " " + (y+height-corner) + ",";
    output += "V " + (y+corner);
    
    var element = document.createElementNS("http://www.w3.org/2000/svg", "path");
    element.setAttributeNS(null ,"d", output);

    return element;
}

function animate(){
    for(let i=0;i<animations.length;i++){
        let date = new Date();

        let animation = animations[i];
        let startPath = animation[1].split(",");
        let endPath = animation[2].split(",");
        let progress = (date.getTime()-animation[3])/(animation[4]-animation[3]);

        if(animation[4]<date.getTime()){ //When Animation is completed --> unregister
            animations.splice(i,1);
            i--;
            continue;
        }
        let path = "";

        for(let c=0; c<startPath.length;c++) {
            let startC = startPath[c].split(" ");
            let endC = endPath[c].split(" ");

            for(let p = 0;p<startC.length;p++){
                let nmb = Number(startC[p]);

                //wenn buchstabe --> copy  
                //wenn zahl interpolate
                if(nmb == NaN){
                    path+=startC[p];
                } else {
                    path+=gsap.utils.interpolate(startC[p], endC[p], progress);
                }

                //insert space
                path+=" ";
            }
            if(c!=startPath.length-1){
                path+=",";
            }
        }

        animation[0].setAttributeNS(null, "d", path);        
    }
}

function morphAnimate(startPath, endPath, duration){
    var date = new Date();

    //start and endpath need same signature


    animations.push([startPath, startPath.getAttributeNS(null, "d"), endPath.getAttributeNS(null, "d"), date.getTime(), date.getTime() + duration*1000]);
}