// ===========================
// FARSI ASTRO BLASTER - Game Script
// ===========================

// Canvas and Context Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Elements
const answerInput = document.getElementById('answerInput');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
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
// SENTENCE DATASET (for advanced levels)
// ===========================
const sentences = [
    { 
        sentence: "I ___ to the store yesterday",
        blank: "went",
        options: [
            { farsi: "raft", english: "went", note: "past tense, 3rd person" },
            { farsi: "miram", english: "i go", note: "present tense" },
            { farsi: "raftan", english: "to go", note: "infinitive" }
        ]
    },
    {
        sentence: "Please ___ my hand",
        blank: "take",
        options: [
            { farsi: "begir", english: "take", note: "imperative form" },
            { farsi: "bardār", english: "take", note: "imperative form" },
            { farsi: "beshkan", english: "break", note: "imperative form" }
        ]
    },
    {
        sentence: "I ___ the dishes to the kitchen",
        blank: "carry",
        options: [
            { farsi: "mibaram", english: "i carry", note: "present continuous" },
            { farsi: "miram", english: "i go", note: "present tense" },
            { farsi: "miāyam", english: "i come", note: "present tense" }
        ]
    },
    {
        sentence: "Don't ___ your promises",
        blank: "break",
        options: [
            { farsi: "beshkan", english: "break", note: "imperative form" },
            { farsi: "bezan", english: "hit", note: "imperative form" },
            { farsi: "bego", english: "say", note: "imperative form" }
        ]
    },
    {
        sentence: "I need to ___ now",
        blank: "go",
        options: [
            { farsi: "raftan", english: "to go", note: "infinitive verb" },
            { farsi: "miram", english: "i go", note: "present tense" },
            { farsi: "raft", english: "went", note: "past tense" }
        ]
    },
    {
        sentence: "My ___ is full of joy",
        blank: "heart",
        options: [
            { farsi: "del", english: "heart", note: "noun" },
            { farsi: "dast", english: "hand", note: "noun" },
            { farsi: "hāl", english: "state", note: "noun" }
        ]
    },
    {
        sentence: "The ___ is shining bright",
        blank: "sun",
        options: [
            { farsi: "khorshid", english: "sun", note: "noun" },
            { farsi: "māh", english: "moon", note: "noun" },
            { farsi: "setāre", english: "star", note: "noun" }
        ]
    },
    {
        sentence: "I drink ___ every day",
        blank: "water",
        options: [
            { farsi: "āb", english: "water", note: "noun" },
            { farsi: "bārān", english: "rain", note: "noun" },
            { farsi: "daryā", english: "sea", note: "noun" }
        ]
    }
];

// ===========================
// GRAMMAR TIPS & LEARNING CONTENT
// ===========================
const grammarTips = [
    "💡 Tip: The 'mi-' prefix indicates present tense (e.g., miram = I go)",
    "💡 Tip: Imperative verbs often start with 'be-' (e.g., bego = say!)",
    "💡 Tip: Past tense verbs often end in '-dam', '-di', or '-d'",
    "💡 Tip: '-an' ending often indicates infinitive form (e.g., raftan = to go)",
    "💡 Tip: Many Farsi nouns are short and simple (e.g., āb = water, del = heart)",
    "💡 Tip: Adjectives like 'sard' (cold) and 'garm' (hot) are opposites",
    "💡 Tip: Verbs conjugate by person - 'am/m' for 'I', 'i' for 'you'",
    "💡 Tip: Long vowels are shown with 'ā' (e.g., āsemān = sky)",
    "💡 Tip: 'sh' sound is common in Farsi (e.g., shab = night)",
    "💡 Tip: Natural words: āb (water), ātash (fire), bād (wind), khāk (earth)"
];

// ===========================
// GAME STATE
// ===========================
let gameState = 'start'; // start, playing, paused, gameOver
let gameMode = 'translate'; // 'translate' or 'sentence'
let currentSentence = null;
let difficulty = localStorage.getItem('farsiDifficulty') || 'normal'; // easy, normal, hard
let sentenceModeEnabled = localStorage.getItem('farsiSentenceMode') === 'true';
let hintsEnabled = localStorage.getItem('farsiHintsEnabled') !== 'false'; // default true
let currentHintLevel = 0; // 0 = no hint, 1 = grammar, 2 = first letter, 3 = full answer
let currentGrammarTip = '';
let grammarTipIndex = 0;
let score = 0;
let lives = 3;
let combo = 0;
let level = 1;
let asteroidsDestroyed = 0;
let highScore = parseInt(localStorage.getItem('farsiAstroHighScore')) || 0;
let asteroids = [];
let particles = [];
let missedWords = new Set(); // Track missed words for word bank
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
            // Track missed word before removing asteroid
            missedWords.add(JSON.stringify({
                farsi: asteroid.word,
                english: asteroid.english,
                note: asteroid.note
            }));
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
// LEVEL & DIFFICULTY MANAGEMENT
// ===========================
function updateLevel() {
    // Level up every 5 asteroids destroyed
    const newLevel = Math.floor(asteroidsDestroyed / 5) + 1;
    if (newLevel > level) {
        level = newLevel;
        levelDisplay.textContent = level;
        
        // Switch to sentence mode at level 6 (only if enabled)
        if (sentenceModeEnabled && level >= 6 && gameMode === 'translate') {
            gameMode = 'sentence';
            showFeedback('correct', `Level ${level}! 🎊 Sentence Mode!`);
            showSentenceDisplay();
            selectNewSentence();
        } else {
            showFeedback('correct', `Level ${level}! 🎊`);
        }
    }
}

function getDifficultySettings() {
    // Progressive difficulty based on level - optimized for A1 learners
    let settings = {
        spawnInterval: 6000,  // Default: very slow
        baseSpeed: 0.3,       // Default: very slow
        maxAsteroids: 1       // Default: only 1 at a time
    };
    
    if (level === 1) {
        // Level 1: Complete beginner - extremely easy
        settings.spawnInterval = 8000;  // 8 seconds between spawns
        settings.baseSpeed = 0.25;      // Very slow movement
        settings.maxAsteroids = 1;
    } else if (level === 2) {
        // Level 2: Still learning - very easy
        settings.spawnInterval = 7000;
        settings.baseSpeed = 0.3;
        settings.maxAsteroids = 1;      // Keep it to 1 asteroid
    } else if (level === 3) {
        // Level 3: Building confidence - easy
        settings.spawnInterval = 6000;
        settings.baseSpeed = 0.4;
        settings.maxAsteroids = 1;      // Still just 1
    } else if (level === 4) {
        // Level 4: Ready for more - moderate
        settings.spawnInterval = 5000;
        settings.baseSpeed = 0.5;
        settings.maxAsteroids = 2;      // Now introduce 2 asteroids
    } else if (level === 5) {
        // Level 5: Getting comfortable
        settings.spawnInterval = 4500;
        settings.baseSpeed = 0.6;
        settings.maxAsteroids = 2;
    } else if (level === 6) {
        // Level 6: Sentence mode begins (if enabled)
        settings.spawnInterval = 4000;
        settings.baseSpeed = 0.7;
        settings.maxAsteroids = 2;
    } else if (level === 7) {
        // Level 7: Intermediate
        settings.spawnInterval = 3500;
        settings.baseSpeed = 0.8;
        settings.maxAsteroids = 3;
    } else {
        // Level 8+: Progressive difficulty (much slower progression than before)
        settings.spawnInterval = Math.max(2000, 3500 - ((level - 7) * 150));
        settings.baseSpeed = 0.8 + ((level - 7) * 0.1);
        settings.maxAsteroids = Math.min(4, 3 + Math.floor((level - 7) / 3));
    }
    
    // Apply difficulty modifier
    if (difficulty === 'easy') {
        settings.spawnInterval *= 1.5;  // 50% more time
        settings.baseSpeed *= 0.7;      // 30% slower
        settings.maxAsteroids = Math.max(1, settings.maxAsteroids - 1);
    } else if (difficulty === 'hard') {
        settings.spawnInterval *= 0.7;  // 30% less time
        settings.baseSpeed *= 1.4;      // 40% faster
        settings.maxAsteroids += 1;
    }
    
    return settings;
}

// ===========================
// ASTEROID SPAWNING
// ===========================
function spawnAsteroid() {
    const settings = getDifficultySettings();
    
    // Don't spawn if we already have max asteroids for current level
    if (asteroids.length >= settings.maxAsteroids) {
        return;
    }
    
    let word;
    if (gameMode === 'sentence' && currentSentence) {
        // In sentence mode, spawn from the sentence options
        word = currentSentence.options[Math.floor(Math.random() * currentSentence.options.length)];
    } else {
        // In translate mode, spawn from vocabulary
        word = vocabulary[Math.floor(Math.random() * vocabulary.length)];
    }
    
    const asteroid = new Asteroid(word);
    asteroids.push(asteroid);

    // Update difficulty settings based on level
    spawnInterval = settings.spawnInterval;
    baseSpeed = settings.baseSpeed;
    
    // Show a grammar tip when asteroid spawns (if hints enabled and in easy/normal mode)
    if (hintsEnabled && (difficulty === 'easy' || difficulty === 'normal')) {
        showGrammarTip();
    }
    
    // Reset hint level for new asteroid
    resetHints();
}

// ===========================
// SENTENCE MODE FUNCTIONS
// ===========================
function selectNewSentence() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    displaySentence();
}

function displaySentence() {
    const sentenceText = document.getElementById('sentenceText');
    if (currentSentence) {
        // Replace the blank with an underlined space
        const displayText = currentSentence.sentence.replace('___', '<span class="sentence-blank">______</span>');
        sentenceText.innerHTML = displayText;
    }
}

function showSentenceDisplay() {
    const sentenceDisplay = document.getElementById('sentenceDisplay');
    const inputLabel = document.getElementById('inputLabel');
    sentenceDisplay.classList.remove('hidden');
    inputLabel.textContent = 'Type the Farsi word:';
}

function hideSentenceDisplay() {
    const sentenceDisplay = document.getElementById('sentenceDisplay');
    const inputLabel = document.getElementById('inputLabel');
    sentenceDisplay.classList.add('hidden');
    inputLabel.textContent = 'Type English meaning:';
}

// ===========================
// HINT SYSTEM FUNCTIONS
// ===========================
function showHintPanel() {
    if (!hintsEnabled || asteroids.length === 0) return;
    
    const hintPanel = document.getElementById('hintPanel');
    hintPanel.classList.remove('hidden');
    updateHintContent();
}

function hideHintPanel() {
    const hintPanel = document.getElementById('hintPanel');
    hintPanel.classList.add('hidden');
}

function updateHintContent() {
    const hintContent = document.getElementById('hintContent');
    
    if (asteroids.length === 0) {
        hintContent.innerHTML = '<p>No asteroids on screen! Wait for the next one.</p>';
        return;
    }
    
    // Get the first asteroid (oldest one on screen)
    const currentAsteroid = asteroids[0];
    
    if (currentHintLevel === 0) {
        hintContent.innerHTML = '<p>Click "Show Hint" to get help with this word!</p>';
    } else if (currentHintLevel === 1) {
        // Show grammar note
        hintContent.innerHTML = `<div class="hint-grammar">📖 Grammar: ${currentAsteroid.note}</div>`;
    } else if (currentHintLevel === 2) {
        // Show first letter
        const firstLetter = currentAsteroid.english.charAt(0).toUpperCase();
        hintContent.innerHTML = `
            <div class="hint-grammar">📖 Grammar: ${currentAsteroid.note}</div>
            <div class="hint-letter">First letter: ${firstLetter}___</div>
        `;
    } else if (currentHintLevel >= 3) {
        // Show full answer
        hintContent.innerHTML = `
            <div class="hint-grammar">📖 Grammar: ${currentAsteroid.note}</div>
            <div class="hint-answer">Answer: ${currentAsteroid.english}</div>
        `;
    }
}

function nextHint() {
    if (asteroids.length === 0) return;
    
    currentHintLevel++;
    if (currentHintLevel > 3) currentHintLevel = 3; // Cap at full answer
    
    updateHintContent();
}

function resetHints() {
    currentHintLevel = 0;
    const hintPanel = document.getElementById('hintPanel');
    if (!hintPanel.classList.contains('hidden')) {
        updateHintContent();
    }
}

function showGrammarTip() {
    if (!hintsEnabled) return;
    
    const grammarTipDisplay = document.getElementById('grammarTipDisplay');
    const grammarTipText = document.getElementById('grammarTipText');
    
    // Rotate through grammar tips
    currentGrammarTip = grammarTips[grammarTipIndex];
    grammarTipIndex = (grammarTipIndex + 1) % grammarTips.length;
    
    grammarTipText.textContent = currentGrammarTip;
    grammarTipDisplay.classList.remove('hidden');
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
        grammarTipDisplay.classList.add('hidden');
    }, 8000);
}

function hideGrammarTip() {
    const grammarTipDisplay = document.getElementById('grammarTipDisplay');
    grammarTipDisplay.classList.add('hidden');
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
        
        // In sentence mode, check if answer matches Farsi word (user types Farsi)
        // In translate mode, check if answer matches English (user types English)
        let isMatch = false;
        if (gameMode === 'sentence') {
            isMatch = asteroid.word.toLowerCase() === answer;
        } else {
            isMatch = asteroid.english === answer;
        }
        
        if (isMatch) {
            // Correct answer!
            found = true;
            
            // Create explosion particles
            createExplosion(asteroid.x, asteroid.y, asteroid.color);
            
            // Remove asteroid
            asteroids.splice(i, 1);
            
            // Track destroyed asteroids and update level
            asteroidsDestroyed++;
            updateLevel();
            
            // Update score with combo
            combo++;
            const points = 10 * Math.min(combo, 5);
            score += points;
            
            // Show feedback
            showFeedback('correct', `+${points} points!`);
            
            // Reset hints for next asteroid
            resetHints();
            
            // In sentence mode, select a new sentence after correct answer
            if (gameMode === 'sentence') {
                selectNewSentence();
            }
            
            break;
        }
    }

    if (!found) {
        // Wrong answer - track all current asteroids as potentially missed
        asteroids.forEach(asteroid => {
            missedWords.add(JSON.stringify({
                farsi: asteroid.word,
                english: asteroid.english,
                note: asteroid.note
            }));
        });
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
    levelDisplay.textContent = level;
    
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
    level = 1;
    asteroidsDestroyed = 0;
    asteroids = [];
    particles = [];
    missedWords = new Set(); // Reset missed words for new game
    lastSpawnTime = 0;
    gameMode = 'translate'; // Start in translate mode
    currentSentence = null;
    
    // Hide sentence display at start
    hideSentenceDisplay();
    
    // Get initial difficulty settings for level 1
    const settings = getDifficultySettings();
    spawnInterval = settings.spawnInterval;
    baseSpeed = settings.baseSpeed;
    
    // Update display
    updateDisplay();
    
    // Hide start screen
    startScreen.classList.add('hidden');
    pauseScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    
    // Show hint panel if hints are enabled
    if (hintsEnabled) {
        showHintPanel();
    }
    
    // Reset hint state
    resetHints();
    hideGrammarTip();
    
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
    
    // Display word bank with missed words
    displayWordBank();
    
    // Show game over screen
    gameOverScreen.classList.remove('hidden');
}

// ===========================
// DISPLAY WORD BANK
// ===========================
function displayWordBank() {
    const wordBankContent = document.getElementById('wordBankContent');
    
    if (missedWords.size === 0) {
        wordBankContent.innerHTML = '<div class="word-bank-empty">🎉 Perfect! You didn\'t miss any words!</div>';
        return;
    }
    
    // Convert Set to array and parse JSON
    const wordsArray = Array.from(missedWords).map(w => JSON.parse(w));
    
    // Sort alphabetically by Farsi word
    wordsArray.sort((a, b) => a.farsi.localeCompare(b.farsi));
    
    // Create table
    let tableHTML = '<table class="word-bank-table">';
    tableHTML += '<thead><tr><th>Farsi</th><th>English</th><th>Notes</th></tr></thead>';
    tableHTML += '<tbody>';
    
    wordsArray.forEach(word => {
        tableHTML += '<tr>';
        tableHTML += `<td class="word-bank-farsi">${word.farsi}</td>`;
        tableHTML += `<td class="word-bank-english">${word.english}</td>`;
        tableHTML += `<td class="word-bank-note">${word.note}</td>`;
        tableHTML += '</tr>';
    });
    
    tableHTML += '</tbody></table>';
    wordBankContent.innerHTML = tableHTML;
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

// Pause functionality - Spacebar or P key (but not when typing in input)
document.addEventListener('keydown', (e) => {
    // Don't trigger pause if user is typing in the input field
    if (document.activeElement === answerInput) {
        return;
    }
    
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

// Difficulty selection
document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        // Update difficulty setting
        difficulty = this.getAttribute('data-difficulty');
        localStorage.setItem('farsiDifficulty', difficulty);
    });
});

// Sentence mode toggle
const sentenceModeToggle = document.getElementById('sentenceModeToggle');
if (sentenceModeToggle) {
    // Set initial state from localStorage
    sentenceModeToggle.checked = sentenceModeEnabled;
    
    sentenceModeToggle.addEventListener('change', function() {
        sentenceModeEnabled = this.checked;
        localStorage.setItem('farsiSentenceMode', sentenceModeEnabled);
    });
}

// Hints toggle
const hintsToggle = document.getElementById('hintsToggle');
if (hintsToggle) {
    // Set initial state from localStorage
    hintsToggle.checked = hintsEnabled;
    
    hintsToggle.addEventListener('change', function() {
        hintsEnabled = this.checked;
        localStorage.setItem('farsiHintsEnabled', hintsEnabled);
    });
}

// Hint button event listeners
const showHintButton = document.getElementById('showHintButton');
const closeHintButton = document.getElementById('closeHintButton');

if (showHintButton) {
    showHintButton.addEventListener('click', () => {
        nextHint();
    });
}

if (closeHintButton) {
    closeHintButton.addEventListener('click', () => {
        hideHintPanel();
    });
}

// Keyboard shortcut for hints (H key)
document.addEventListener('keydown', (e) => {
    if (e.key === 'h' || e.key === 'H') {
        if (gameState === 'playing' && document.activeElement !== answerInput) {
            e.preventDefault();
            const hintPanel = document.getElementById('hintPanel');
            if (hintPanel.classList.contains('hidden')) {
                showHintPanel();
            } else {
                nextHint();
            }
        }
    }
});

// ===========================
// INITIALIZE AND START
// ===========================
// Set initial difficulty button state
document.addEventListener('DOMContentLoaded', () => {
    const savedDifficulty = localStorage.getItem('farsiDifficulty') || 'normal';
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        if (btn.getAttribute('data-difficulty') === savedDifficulty) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
});

init();
requestAnimationFrame(gameLoop);
