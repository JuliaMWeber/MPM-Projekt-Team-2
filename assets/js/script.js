document.getElementById("app").innerHTML = document.getElementById("intro").innerHTML;
displayIntro();

function animateToSemester(semester){
    document.getElementById("app").innerHTML = document.getElementById("semester").innerHTML;
    displayOrbit(semester);
}