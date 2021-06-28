var paths = {};

//Json Datei laden
$.ajax({
    url: "./assets/data/modulAnim.json",
    success: async function(data){
        for(var i=0; i < data.length;i++){
            paths[data[i].id] = data[i].svg;
        }
    }
});

function insertAnim(container, moduleId) {
    let animSvg = document.createElement("object");
    container.appendChild(animSvg);
    
    //Zugehöriges Svg laden
    animSvg.data = paths[moduleId];
    animSvg.onload = function() {
        loadAnimationScript(moduleId);
    }
}

//Animation Script ausführen
function loadAnimationScript(moduleId){

}