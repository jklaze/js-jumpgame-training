let container = document.querySelector(".container");

let ScoreElement = document.getElementById("score");
var Score = 0;

var enemyPosition = 6;
var prewEnemyPosition;

let Matrix = [
    [1, 2, 1, 1, 1, 2, 1],
    [6, 6, 6, 6, 6, 6, 6],
    [3, 4, 3, 3, 3, 3, 3],
];

function boardGame() {
    container.innerHTML = "";

    Matrix.forEach((row, rowIndex) => {
        row.forEach((column) => {
            let element = document.createElement("div");
            element.classList.add("element");
            container.appendChild(element);

            ambience(column, element);
            characters(column, element, rowIndex);

        });
    });
    gameOver();
}

function ambience(column, element) {
    if (column === 3) element.classList.add("Darkgrass");
    if (column === 1) element.classList.add("sky");
    if (column === 6) grass(element);
    if (column === 2 ) cloud(element)
}

function grass(element) {
    let img = document.createElement("img");
    element.classList.add("sky");
    element.classList.add("GrassAligned");
    img.src = "images/grass-image.png";
    img.style.width = "144px";
    img.style.height = "110px";
    element.appendChild(img);
}

function cloud(element){
    let img = document.createElement("img");
    element.classList.add("sky");
    img.src = "images/Clouds.png";
    img.style.width = "144px";
    img.style.height = "110px";
    element.appendChild(img)
}


function characters(column, element, rowIndex) {
    if (column === 4) pikachu(element, rowIndex);
    if (column === 5) enemy(element);
}

function pikachu(element, rowIndex) {
    let img = document.createElement("img");
    img.src = "images/pikachu.gif";
    img.style.width = "100px";
    img.style.height = "100px";
    rowIndex === 1 ? element.classList.add("sky") : element.classList.add("Darkgrass");
    element.appendChild(img);
}

function enemy(element) {
    let img = document.createElement("img");
    element.classList.add("Darkgrass");
    img.src = "images/geodude.gif";
    img.classList.add("enemy");
    img.style.width = "130px";
    img.style.height = "110px";
    element.appendChild(img);
}

function enemySpawn() {
    let lastRow = Matrix[Matrix.length - 1];
    enemyPosition >= 6 ? prewEnemyPosition = null : prewEnemyPosition = enemyPosition + 1;
    if (enemyPosition < 0) enemyPosition = 6;
    lastRow.splice(prewEnemyPosition, 1, 3);
    lastRow.splice(enemyPosition, 1, 5);
    enemyPosition = enemyPosition - 1;
}

function jump() {
    window.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            let PikachuRowPosition = Matrix[Matrix.length - 1];
            PikachuRowPosition.splice(1, 1, 3);
            let PikachuRowUpperPosition = Matrix[Matrix.length - 2];
            PikachuRowUpperPosition.splice(1, 1, 4);
            setTimeout(jumpdown, 1300);
        }
    });
}

function jumpdown() {
    let PikachuRowPosition = Matrix[Matrix.length - 1];
    PikachuRowPosition.splice(1, 1, 4);
    
    let PikachuRowUpperPosition = Matrix[Matrix.length - 2];
    PikachuRowUpperPosition.splice(1, 1, 6);
}

function gameOver() {
    let lastRow = Matrix[Matrix.length - 1];
    let PikachuRowUpperPosition = Matrix[Matrix.length - 2];
    if (!lastRow.includes(4) && !PikachuRowUpperPosition.includes(4))  clearInterval(gameInterval);

}

function score() {
    Score++;
    ScoreElement.innerText = "Score: " + Score;
}

function game() {
    score();
    enemySpawn();
    boardGame();
}

let gameInterval = setInterval(game, 600);

jump();
