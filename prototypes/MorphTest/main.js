var drawSpace = document.getElementById("drawSpace");

drawSpace.appendChild(generateRec(10, 10, 100, 50));
drawSpace.appendChild(generateRecRound(150, 200, 150, 100, 100));
drawSpace.appendChild(generateCircle(120,0,50));
drawSpace.appendChild(generateEllipse(10, 200, 100, 50));

morphAnimate(drawSpace.children[0], generateRec(10, 10, 50, 100), 2);