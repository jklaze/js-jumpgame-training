const home = document.querySelector('#home');
const pause_menu = document.querySelector('#pause');
const game_over = document.querySelector('#game-over');
const start_button = document.querySelector('#start-button');
const resume_button = document.querySelector('#resume-button');
const retry_button = document.querySelector('#retry-button');
const countdown_text = document.querySelector('#countdown');
const current_score = document.querySelector('#score');
const final_score = document.querySelector('#final-score');
const player = document.querySelector('#player');

let current_obstacle = document.querySelector('.obstacle');
current_obstacle.style.animationPlayState = 'paused';
let score;
let respawn_millis;
let step;

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
    resumeGame();
}
function pauseGame() {
    pause_menu.classList.remove('hidden');
    player.style.animationPlayState = 'paused';
    current_obstacle.style.animationPlayState = 'paused';
    clearInterval(spawnInterval);
    clearInterval(collisionInterval);
    clearInterval(scoreCheckInterval);
    clearInterval(cleanInterval);
}
function resumeGame() {
    pause_menu.classList.add('hidden');
    showCountdown();
    setTimeout(() => {
        player.style.animationPlayState = 'running';
        current_obstacle.style.animationPlayState = 'running';
        spawnInterval = setInterval(spawnObstacle, respawn_millis);
        collisionInterval = setInterval(checkCollision, 10);
        scoreCheckInterval = setInterval(checkScore, 10);
        cleanInterval = setInterval(cleanObstacle, 1000);
    }, 2500);
}

function showCountdown() {
    let countdown = 3;
    countdown_text.textContent = countdown;
    countdown_text.classList.remove('hidden');
    const countdownInterval = setInterval(() => {
        if (countdown === 1) {
            countdown_text.classList.add('hidden');
            clearInterval(countdownInterval);
        } else {
            countdown--;
            countdown_text.textContent = countdown;
        }
    }, 700);
}

function jump() {
    player.classList.add('hop');
    setTimeout(() => {
        player.classList.remove('hop');
    }, 800);
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
resume_button.addEventListener('click', resumeGame);
retry_button.addEventListener('click', retry);
window.addEventListener('mousedown', jump);
window.addEventListener('blur', function() {
    if (pause_menu.classList.contains('hidden') && game_over.classList.contains('hidden') && home.classList.contains('hidden')){
        pauseGame();
    }
});
window.addEventListener('keydown', function(e) {
    if ((e.key === ' ' || e.key === 'ArrowUp') && !player.classList.contains('hop')){
        jump();
    }
    if (e.key === 'Enter' && !home.classList.contains('hidden')) {
        startGame();
    }
    if (e.key === 'Enter' && !game_over.classList.contains('hidden')) {
        retry();
    }
    if (e.key === 'Enter' && !pause_menu.classList.contains('hidden')) {
        resumeGame();
    }
    if (e.key === 'Escape' && pause_menu.classList.contains('hidden') && game_over.classList.contains('hidden') && home.classList.contains('hidden')) {
        pauseGame();
    }
});