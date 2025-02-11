const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', function () {
    const hamIcon = this.querySelector('.hamburger-icon');
    const crossIcon = this.querySelector('.cross-icon');
    if (hamIcon.style.display === "none") {
        hamIcon.style.display = "inline-block"
        menu.style.display = "none"
        crossIcon.style.display = "none"
    }
    else {
        crossIcon.style.display = "inline-block"
        hamIcon.style.display = "none"
        menu.style.display = "block"
    }
});




const paddleSpeed = 5;
const ballSpeed = 2;
const gameHeight = 400;
const gameWidth = 600;

const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const ball = document.getElementById("ball");

const score1Display = document.getElementById("score1");
const score2Display = document.getElementById("score2");

let player1Position = 160; // Player 1 paddle Y position
let player2Position = 160; // Player 2 paddle Y position
let ballX = 292; // Ball X position
let ballY = 192; // Ball Y position
let ballDirectionX = ballSpeed; // Ball horizontal speed
let ballDirectionY = ballSpeed; // Ball vertical speed
let score1 = 0; // Player 1 score
let score2 = 0; // Player 2 score

// Key State Tracking
const keys = {};

// Paddle Movement
document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});
document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// Game Loop
function gameLoop() {
    // Move Player 1 (W/S keys)
    if (keys["w"] && player1Position > 0) {
        player1Position -= paddleSpeed;
    }
    if (keys["s"] && player1Position < gameHeight - 80) {
        player1Position += paddleSpeed;
    }

    // Move Player 2 (O/L keys)
    if (keys["o"] && player2Position > 0) {
        player2Position -= paddleSpeed;
    }
    if (keys["l"] && player2Position < gameHeight - 80) {
        player2Position += paddleSpeed;
    }

    // Update Paddle Positions
    player1.style.top = player1Position + "px";
    player2.style.top = player2Position + "px";

    // Move Ball
    ballX += ballDirectionX;
    ballY += ballDirectionY;

    // Ball Collision with Top/Bottom Walls
    if (ballY <= 0) {
        ballDirectionY = Math.abs(ballDirectionY); // Bounce down
    }
    if (ballY >= gameHeight - 15) {
        ballDirectionY = -Math.abs(ballDirectionY); // Bounce up
    }

    // Ball Collision with Paddles
    const ballRect = ball.getBoundingClientRect();
    const player1Rect = player1.getBoundingClientRect();
    const player2Rect = player2.getBoundingClientRect();

    // Check collision with Player 1 paddle
    if (
        ballRect.left <= player1Rect.right &&
        ballRect.top < player1Rect.bottom &&
        ballRect.bottom > player1Rect.top
    ) {
        ballDirectionX = Math.abs(ballDirectionX); // Change direction to the right
        ballDirectionY += (Math.random() - 0.5) * 2; // Add slight vertical randomness
    }

    // Check collision with Player 2 paddle
    if (
        ballRect.right >= player2Rect.left &&
        ballRect.top < player2Rect.bottom &&
        ballRect.bottom > player2Rect.top
    ) {
        ballDirectionX = -Math.abs(ballDirectionX); // Change direction to the left
        ballDirectionY += (Math.random() - 0.5) * 2; // Add slight vertical randomness
    }

    // Ball Out of Bounds (Score)
    if (ballX <= 0) {
        score2++;
        updateScore();
        resetBall(1); // Reset ball towards Player 2
    }
    if (ballX >= gameWidth - 15) {
        score1++;
        updateScore();
        resetBall(-1); // Reset ball towards Player 1
    }

    // Update Ball Position
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";

    // Keep the game loop running
    requestAnimationFrame(gameLoop);
}

// Reset Ball Position
function resetBall(direction) {
    ballX = gameWidth / 2 - 7.5; // Center ball horizontally
    ballY = gameHeight / 2 - 7.5; // Center ball vertically
    ballDirectionX = direction * ballSpeed; // Reverse ball direction based on scorer
    ballDirectionY = Math.random() > 0.5 ? ballSpeed : -ballSpeed; // Randomize vertical direction
}

// Update Scoreboard
function updateScore() {
    score1Display.textContent = score1;
    score2Display.textContent = score2;
}

// Start the Game
gameLoop();

