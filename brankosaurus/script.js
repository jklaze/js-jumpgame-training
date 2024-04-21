const home = document.querySelector('#home');
const start_button = document.querySelector('#start-button');
const game_over = document.querySelector('#game-over');
const retry_button = document.querySelector('#retry-button');
const final_score = document.querySelector('#final-score');
const current_score = document.querySelector('#score');
const player = document.querySelector('#player');

let score;
let respawn_millis;
let step;
let current_obstacle;

let spawnInterval;
let collisionInterval;
let scoreCheckInterval;
let cleanInterval;

function startGame() {
    home.classList.add('hidden');
    score = 0;
    current_score.textContent = score;
    respawn_millis = 2500;
    step = 100;
    spawnObstacle();

    spawnInterval = setInterval(spawnObstacle, respawn_millis);
    collisionInterval = setInterval(checkCollision, 10);
    scoreCheckInterval = setInterval(checkScore, 10);
    cleanInterval = setInterval(cleanObstacle, 1000);
}

function jump() {
    player.classList.add('hop');
    setTimeout(() => {
        player.classList.remove('hop');
    }, 800);
    console.log('jump');
}

// Game functions
function gameOver() {
    player.style.animationPlayState = 'paused';
    current_obstacle.style.animationPlayState = 'paused';
    final_score.textContent = score;
    clearInterval(spawnInterval);
    clearInterval(collisionInterval);
    clearInterval(scoreCheckInterval);
    clearInterval(cleanInterval);
    game_over.classList.remove('hidden');
}
function retry() {
    game_over.classList.add('hidden');
    current_obstacle.remove();
    player.style.animationPlayState = 'running';
    startGame();
}

// Interval functions
function spawnObstacle() {
    const obstacle = document.createElement('img');
    obstacle.src = 'images/shark.png';
    obstacle.classList.add('obstacle');
    document.querySelector('#container').appendChild(obstacle);
    obstacle.style.animationDuration = `${respawn_millis / 1000}s`;
    current_obstacle = obstacle;
    if (respawn_millis > 1000) {
        respawn_millis = respawn_millis - step;
    }
}
function checkCollision() {
    const playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'));
    const obstacleLeft = parseInt(window.getComputedStyle(current_obstacle).getPropertyValue('left'));
    if (obstacleLeft < 160 && obstacleLeft > 40 && playerBottom <= 70) {
        gameOver();
    }
}
function checkScore() {
    const obstacleLeft = parseInt(window.getComputedStyle(current_obstacle).getPropertyValue('left'));
    if (obstacleLeft < 40 && !current_obstacle.classList.contains('passed')){
        current_obstacle.classList.add('passed');
        score++;
        current_score.textContent = score;
    }
}
function cleanObstacle() {
    const passedObstacles = document.querySelectorAll('.passed');
    passedObstacles.forEach((obstacle) => {
        obstacle.remove();
    }); 
}

start_button.addEventListener('click', startGame);
retry_button.addEventListener('click', retry);
window.addEventListener('mousedown', jump);
window.addEventListener('keydown', function(e) {
    if (e.key === ' ' || e.key === 'ArrowUp') {
        jump();
    }
});