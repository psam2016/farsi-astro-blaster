// ===========================
// FARSI ASTRO BLASTER - Game Script
// ===========================

// Canvas and Context Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Elements
const answerInput = document.getElementById('answerInput');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const comboDisplay = document.getElementById('combo');
const highScoreDisplay = document.getElementById('highScore');
const finalScoreDisplay = document.getElementById('finalScore');
const highScoreMessage = document.getElementById('highScoreMessage');
const feedbackMessage = document.getElementById('feedbackMessage');

// Overlays
const startScreen = document.getElementById('startScreen');
const pauseScreen = document.getElementById('pauseScreen');
const gameOverScreen = document.getElementById('gameOverScreen');

// Buttons
const startButton = document.getElementById('startButton');
const resumeButton = document.getElementById('resumeButton');
const restartButton = document.getElementById('restartButton');
const toggleInstructions = document.getElementById('toggleInstructions');
const instructionsPanel = document.getElementById('instructionsPanel');

// ===========================
// VOCABULARY DATASET
// ===========================
const vocabulary = [
    { farsi: "shekondam", english: "i broke", note: "past tense, 1st person singular" },
    { farsi: "mibaram", english: "i carry", note: "present continuous with mi- prefix" },
    { farsi: "bardār", english: "take", note: "imperative form" },
    { farsi: "raft", english: "went", note: "past tense, 3rd person" },
    { farsi: "shekāyat", english: "complaint", note: "noun" },
    { farsi: "del", english: "heart", note: "noun" },
    { farsi: "dast", english: "hand", note: "noun" },
    { farsi: "hāl", english: "state", note: "noun" },
    { farsi: "dāghūn", english: "burning", note: "adjective" },
    { farsi: "raftan", english: "to go", note: "infinitive verb" },
    { farsi: "miram", english: "i go", note: "present tense with mi- prefix" },
    { farsi: "miāyam", english: "i come", note: "present tense with mi- prefix" },
    { farsi: "beshkan", english: "break", note: "imperative form" },
    { farsi: "bezan", english: "hit", note: "imperative form" },
    { farsi: "bego", english: "say", note: "imperative form" },
    { farsi: "begir", english: "take", note: "imperative form" },
    { farsi: "āsemān", english: "sky", note: "noun" },
    { farsi: "setāre", english: "star", note: "noun" },
    { farsi: "khorshid", english: "sun", note: "noun" },
    { farsi: "māh", english: "moon", note: "noun" },
    { farsi: "daryā", english: "sea", note: "noun" },
    { farsi: "kuh", english: "mountain", note: "noun" },
    { farsi: "bād", english: "wind", note: "noun" },
    { farsi: "bārān", english: "rain", note: "noun" },
    { farsi: "āb", english: "water", note: "noun" },
    { farsi: "ātash", english: "fire", note: "noun" },
    { farsi: "khāk", english: "earth", note: "noun" },
    { farsi: "zamin", english: "ground", note: "noun" },
    { farsi: "havā", english: "air", note: "noun" },
    { farsi: "ruz", english: "day", note: "noun" },
    { farsi: "shab", english: "night", note: "noun" },
    { farsi: "sard", english: "cold", note: "adjective" },
    { farsi: "garm", english: "hot", note: "adjective" },
    { farsi: "bozorg", english: "big", note: "adjective" },
    { farsi: "kuchak", english: "small", note: "adjective" }
];

// ===========================
// GAME STATE
// ===========================
let gameState = 'start'; // start, playing, paused, gameOver
let score = 0;
let lives = 3;
let combo = 0;
let highScore = parseInt(localStorage.getItem('farsiAstroHighScore')) || 0;
let asteroids = [];
let particles = [];
let lastSpawnTime = 0;
let spawnInterval = 2000; // milliseconds
let baseSpeed = 1;

// ===========================
// SPACESHIP
// ===========================
const spaceship = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 60,
    height: 40
};

// ===========================
// ASTEROID CLASS
// ===========================
class Asteroid {
    constructor(word) {
        this.word = word.farsi;
        this.english = word.english.toLowerCase().trim();
        this.note = word.note;
        this.x = Math.random() * (canvas.width - 120) + 60;
        this.y = -50;
        this.radius = 40;
        this.color = this.getRandomColor();
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        
        // Pre-calculate shape points for consistent asteroid shape
        this.shapePoints = [];
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = this.radius * (0.8 + Math.random() * 0.4);
            this.shapePoints.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            });
        }
    }

    getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa07a', '#98d8c8', '#f7dc6f', '#bb8fce'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        const speed = baseSpeed + (score / 500);
        this.y += speed;
        this.rotation += this.rotationSpeed;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw asteroid shape (irregular polygon)
        ctx.fillStyle = this.color;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < this.shapePoints.length; i++) {
            const point = this.shapePoints[i];
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw word on asteroid
        ctx.rotate(-this.rotation);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.word, 0, 0);

        ctx.restore();
    }

    isOffScreen() {
        return this.y > canvas.height + 50;
    }
}

// ===========================
// PARTICLE CLASS (for explosions)
// ===========================
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;
        this.radius = Math.random() * 3 + 2;
        this.color = color;
        this.life = 1;
        this.decay = 0.02;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    isDead() {
        return this.life <= 0;
    }
}

// ===========================
// INITIALIZATION
// ===========================
function init() {
    highScoreDisplay.textContent = highScore;
    updateDisplay();
}

// ===========================
// GAME LOOP
// ===========================
function gameLoop(timestamp) {
    if (gameState !== 'playing') {
        requestAnimationFrame(gameLoop);
        return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw spaceship
    drawSpaceship();

    // Spawn asteroids
    if (timestamp - lastSpawnTime > spawnInterval) {
        spawnAsteroid();
        lastSpawnTime = timestamp;
    }

    // Update and draw asteroids
    for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i];
        asteroid.update();
        asteroid.draw();

        // Check if asteroid reached bottom
        if (asteroid.isOffScreen()) {
            asteroids.splice(i, 1);
            loseLife();
        }
    }

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();

        if (particle.isDead()) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(gameLoop);
}

// ===========================
// SPACESHIP DRAWING
// ===========================
function drawSpaceship() {
    ctx.save();
    ctx.translate(spaceship.x, spaceship.y);

    // Draw spaceship body
    ctx.fillStyle = '#00d4ff';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    // Main body
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(-20, 20);
    ctx.lineTo(20, 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cockpit
    ctx.fillStyle = '#00ff88';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Wings
    ctx.fillStyle = '#0088ff';
    ctx.beginPath();
    ctx.moveTo(-20, 10);
    ctx.lineTo(-35, 20);
    ctx.lineTo(-20, 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(20, 10);
    ctx.lineTo(35, 20);
    ctx.lineTo(20, 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

// ===========================
// ASTEROID SPAWNING
// ===========================
function spawnAsteroid() {
    const word = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    const asteroid = new Asteroid(word);
    asteroids.push(asteroid);

    // Adjust difficulty
    spawnInterval = Math.max(800, 2000 - (score * 5));
    baseSpeed = 1 + (score / 1000);
}

// ===========================
// ANSWER CHECKING
// ===========================
function checkAnswer() {
    const answer = answerInput.value.toLowerCase().trim();
    
    if (!answer) return;

    let found = false;
    
    // Check each asteroid for a match
    for (let i = asteroids.length - 1; i >= 0; i--) {
        const asteroid = asteroids[i];
        if (asteroid.english === answer) {
            // Correct answer!
            found = true;
            
            // Create explosion particles
            createExplosion(asteroid.x, asteroid.y, asteroid.color);
            
            // Remove asteroid
            asteroids.splice(i, 1);
            
            // Update score with combo
            combo++;
            const points = 10 * Math.min(combo, 5);
            score += points;
            
            // Show feedback
            showFeedback('correct', `+${points} points!`);
            
            break;
        }
    }

    if (!found) {
        // Wrong answer
        combo = 0;
        showFeedback('incorrect', 'Wrong!');
    }

    // Clear input
    answerInput.value = '';
    
    // Update display
    updateDisplay();
}

// ===========================
// EXPLOSION EFFECT
// ===========================
function createExplosion(x, y, color) {
    for (let i = 0; i < 20; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// ===========================
// FEEDBACK MESSAGE
// ===========================
function showFeedback(type, message) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback-message ${type}`;
    
    setTimeout(() => {
        feedbackMessage.className = 'feedback-message hidden';
    }, 1000);
}

// ===========================
// LOSE LIFE
// ===========================
function loseLife() {
    lives--;
    combo = 0;
    updateDisplay();

    if (lives <= 0) {
        endGame();
    }
}

// ===========================
// UPDATE DISPLAY
// ===========================
function updateDisplay() {
    scoreDisplay.textContent = score;
    
    // Update lives display with hearts
    const hearts = '❤️'.repeat(lives);
    livesDisplay.textContent = hearts || '💀';
    
    // Update combo
    const comboMultiplier = Math.min(combo, 5);
    comboDisplay.textContent = comboMultiplier > 1 ? `${comboMultiplier}x` : '1x';
    if (comboMultiplier > 1) {
        comboDisplay.style.color = '#ffd700';
        comboDisplay.style.textShadow = '0 0 10px #ffd700';
    } else {
        comboDisplay.style.color = '#00ff88';
        comboDisplay.style.textShadow = 'none';
    }
}

// ===========================
// START GAME
// ===========================
function startGame() {
    // Reset game state
    score = 0;
    lives = 3;
    combo = 0;
    asteroids = [];
    particles = [];
    lastSpawnTime = 0;
    spawnInterval = 2000;
    baseSpeed = 1;
    
    // Update display
    updateDisplay();
    
    // Hide start screen
    startScreen.classList.add('hidden');
    pauseScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    // Enable input
    answerInput.disabled = false;
    answerInput.focus();
    
    // Start game
    gameState = 'playing';
}

// ===========================
// PAUSE GAME
// ===========================
function pauseGame() {
    if (gameState === 'playing') {
        gameState = 'paused';
        pauseScreen.classList.remove('hidden');
        answerInput.disabled = true;
    }
}

// ===========================
// RESUME GAME
// ===========================
function resumeGame() {
    if (gameState === 'paused') {
        gameState = 'playing';
        pauseScreen.classList.add('hidden');
        answerInput.disabled = false;
        answerInput.focus();
    }
}

// ===========================
// END GAME
// ===========================
function endGame() {
    gameState = 'gameOver';
    answerInput.disabled = true;
    
    // Update final score
    finalScoreDisplay.textContent = score;
    
    // Check for high score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('farsiAstroHighScore', highScore);
        highScoreDisplay.textContent = highScore;
        highScoreMessage.textContent = '🎉 New High Score! 🎉';
    } else {
        highScoreMessage.textContent = '';
    }
    
    // Show game over screen
    gameOverScreen.classList.remove('hidden');
}

// ===========================
// EVENT LISTENERS
// ===========================

// Start button
startButton.addEventListener('click', startGame);

// Resume button
resumeButton.addEventListener('click', resumeGame);

// Restart button
restartButton.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    startGame();
});

// Input field - Enter key
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

// Pause functionality - Spacebar or P key
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === 'p' || e.key === 'P') {
        if (gameState === 'playing') {
            e.preventDefault();
            pauseGame();
        } else if (gameState === 'paused') {
            e.preventDefault();
            resumeGame();
        }
    }
});

// Toggle instructions
toggleInstructions.addEventListener('click', () => {
    instructionsPanel.classList.toggle('hidden');
    toggleInstructions.textContent = instructionsPanel.classList.contains('hidden') 
        ? 'Show Instructions' 
        : 'Hide Instructions';
});

// ===========================
// INITIALIZE AND START
// ===========================
init();
requestAnimationFrame(gameLoop);
