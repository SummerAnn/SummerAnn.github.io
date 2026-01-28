/**
 * Summer Ann Portfolio - Game Hub
 * Unified game launcher with multiple games
 */

(function() {
  'use strict';

  const SAE = window.SummerAnnEnhancements || {};

  // Games configuration
  const games = [
    {
      id: 'whackamole',
      title: 'Whack-a-Mole',
      emoji: '🐹',
      description: 'Whack the moles as fast as you can!',
      color: '#6c63ff'
    },
    {
      id: 'memory',
      title: 'Tech Memory',
      emoji: '🧠',
      description: 'Match the programming technologies!',
      color: '#00ffe7'
    },
    {
      id: 'typing',
      title: 'Code Typer',
      emoji: '⌨️',
      description: 'Type code snippets as fast as you can!',
      color: '#a1c4fd'
    }
  ];

  // High scores storage
  const STORAGE_KEY = 'summerann_game_scores';
  let highScores = {};

  // Memory game cards (tech icons)
  const memoryCards = [
    { name: 'Python', icon: 'devicon-python-plain' },
    { name: 'React', icon: 'devicon-react-plain' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain' },
    { name: 'AWS', icon: 'devicon-amazonwebservices-original' },
    { name: 'Docker', icon: 'devicon-docker-plain' },
    { name: 'Go', icon: 'devicon-go-plain' },
    { name: 'Swift', icon: 'devicon-swift-plain' }
  ];

  // Code snippets for typing game
  const codeSnippets = [
    'const sum = (a, b) => a + b;',
    'for (let i = 0; i < n; i++)',
    'import React from "react"',
    'def hello_world():',
    'SELECT * FROM users',
    'git commit -m "fix"',
    'npm install express',
    'docker-compose up -d'
  ];

  let hubTrigger = null;
  let hubModal = null;

  /**
   * Load high scores from localStorage
   */
  function loadScores() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        highScores = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not load game scores');
    }
  }

  /**
   * Save high scores to localStorage
   */
  function saveScores() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(highScores));
    } catch (e) {
      console.warn('Could not save game scores');
    }
  }

  /**
   * Get high score for a game
   */
  function getHighScore(gameId) {
    return highScores[gameId] || 0;
  }

  /**
   * Set high score for a game
   */
  function setHighScore(gameId, score) {
    if (score > getHighScore(gameId)) {
      highScores[gameId] = score;
      saveScores();
      return true;
    }
    return false;
  }

  /**
   * Create game hub trigger button
   */
  function createTrigger() {
    // Hide original whackamole button
    const wamBtn = document.getElementById('wam-btn');
    if (wamBtn) {
      wamBtn.style.display = 'none';
    }

    // Check if trigger already exists
    if (document.getElementById('game-hub-trigger')) {
      hubTrigger = document.getElementById('game-hub-trigger');
      return;
    }

    hubTrigger = document.createElement('button');
    hubTrigger.id = 'game-hub-trigger';
    hubTrigger.innerHTML = '🎮';
    hubTrigger.setAttribute('aria-label', 'Open Game Hub');
    hubTrigger.setAttribute('title', 'Play Games!');

    hubTrigger.addEventListener('click', openHub);

    document.body.appendChild(hubTrigger);
    document.body.classList.add('game-hub-active');
  }

  /**
   * Create game hub modal
   */
  function createHubModal() {
    if (document.getElementById('game-hub-modal')) return;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      #game-hub-modal-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(30, 40, 80, 0.4);
        backdrop-filter: blur(8px);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      #game-hub-modal-bg.open {
        opacity: 1;
        visibility: visible;
      }
      #game-hub-modal {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(16px) saturate(180%);
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
        padding: 32px;
        min-width: 400px;
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.9) translateY(20px);
        transition: transform 0.3s ease;
      }
      #game-hub-modal-bg.open #game-hub-modal {
        transform: scale(1) translateY(0);
      }
      .hub-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
      }
      .hub-title {
        font-size: 1.8em;
        font-weight: 700;
        background: linear-gradient(90deg, #6c63ff, #00ffe7);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
      }
      .hub-close {
        font-size: 1.5em;
        cursor: pointer;
        color: #6c63ff;
        transition: color 0.2s;
        background: none;
        border: none;
        padding: 8px;
      }
      .hub-close:hover {
        color: #00ffe7;
      }
      .games-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 16px;
      }
      .game-card {
        background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4));
        border: 1.5px solid rgba(108, 99, 255, 0.2);
        border-radius: 16px;
        padding: 20px;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      .game-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(108, 99, 255, 0.3);
        border-color: var(--neon-primary, #6c63ff);
      }
      .game-emoji {
        font-size: 3em;
        display: block;
        margin-bottom: 12px;
      }
      .game-title {
        font-size: 1.1em;
        font-weight: 700;
        color: #2d2d4d;
        margin-bottom: 8px;
      }
      .game-desc {
        font-size: 0.85em;
        color: #666;
        margin-bottom: 12px;
      }
      .game-highscore {
        font-size: 0.8em;
        color: #6c63ff;
        font-weight: 600;
      }
      /* Memory Game Styles */
      .memory-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        max-width: 400px;
        margin: 0 auto;
      }
      .memory-card {
        aspect-ratio: 1;
        background: linear-gradient(90deg, #6c63ff, #00ffe7);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 2em;
        color: white;
        transition: transform 0.3s ease;
      }
      .memory-card.flipped {
        background: white;
        border: 2px solid #6c63ff;
      }
      .memory-card.matched {
        background: rgba(0, 255, 231, 0.2);
        border: 2px solid #00ffe7;
        cursor: default;
      }
      .memory-card i {
        opacity: 0;
        transition: opacity 0.2s;
      }
      .memory-card.flipped i,
      .memory-card.matched i {
        opacity: 1;
        color: #6c63ff;
      }
      /* Typing Game Styles */
      .typing-container {
        text-align: center;
      }
      .typing-display {
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.2em;
        background: #1e293b;
        color: #e2e8f0;
        padding: 20px;
        border-radius: 12px;
        margin-bottom: 16px;
        letter-spacing: 1px;
      }
      .typing-display .correct {
        color: #00ffe7;
      }
      .typing-display .incorrect {
        color: #ff6b6b;
        text-decoration: underline;
      }
      .typing-display .cursor {
        background: #6c63ff;
        animation: blink 1s infinite;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }
      .typing-input {
        width: 100%;
        padding: 12px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 1em;
        border: 2px solid #6c63ff;
        border-radius: 8px;
        outline: none;
        transition: border-color 0.2s;
      }
      .typing-input:focus {
        border-color: #00ffe7;
      }
      .game-stats {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin: 16px 0;
        font-weight: 600;
      }
      .stat-item {
        color: #6c63ff;
      }
      [data-theme="dark"] #game-hub-modal {
        background: rgba(30, 40, 80, 0.9);
      }
      [data-theme="dark"] .game-card {
        background: linear-gradient(135deg, rgba(30, 40, 80, 0.8), rgba(30, 40, 80, 0.4));
      }
      [data-theme="dark"] .game-title {
        color: #f1f5f9;
      }
      [data-theme="dark"] .game-desc {
        color: #94a3b8;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Open the game hub
   */
  function openHub() {
    // Create modal if it doesn't exist
    createHubModal();

    // Generate modal HTML
    const gamesHtml = games.map(game => `
      <div class="game-card" data-game="${game.id}">
        <span class="game-emoji">${game.emoji}</span>
        <div class="game-title">${game.title}</div>
        <div class="game-desc">${game.description}</div>
        <div class="game-highscore">High Score: ${getHighScore(game.id)}</div>
      </div>
    `).join('');

    const modalHtml = `
      <div id="game-hub-modal-bg">
        <div id="game-hub-modal">
          <div class="hub-header">
            <h2 class="hub-title">🎮 Game Hub</h2>
            <button class="hub-close" aria-label="Close">&times;</button>
          </div>
          <div class="games-grid">
            ${gamesHtml}
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    hubModal = document.getElementById('game-hub-modal-bg');

    // Stop scroll
    if (SAE.stopScroll) SAE.stopScroll();

    // Animate in
    requestAnimationFrame(() => {
      hubModal.classList.add('open');
    });

    // Event listeners
    hubModal.querySelector('.hub-close').addEventListener('click', closeHub);
    hubModal.addEventListener('click', (e) => {
      if (e.target === hubModal) closeHub();
    });

    // Game card clicks
    hubModal.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => {
        const gameId = card.dataset.game;
        launchGame(gameId);
      });
    });
  }

  /**
   * Close the game hub
   */
  function closeHub() {
    if (!hubModal) return;

    hubModal.classList.remove('open');
    setTimeout(() => {
      hubModal.remove();
      hubModal = null;
      if (SAE.startScroll) SAE.startScroll();
    }, 300);
  }

  /**
   * Launch a specific game
   */
  function launchGame(gameId) {
    closeHub();

    setTimeout(() => {
      switch (gameId) {
        case 'whackamole':
          launchWhackamole();
          break;
        case 'memory':
          launchMemoryGame();
          break;
        case 'typing':
          launchTypingGame();
          break;
      }
    }, 350);
  }

  /**
   * Launch Whack-a-Mole (uses existing game)
   */
  function launchWhackamole() {
    const wamBtn = document.getElementById('wam-btn');
    if (wamBtn) {
      // Show button temporarily and click it
      wamBtn.style.display = 'block';
      wamBtn.click();
      setTimeout(() => {
        wamBtn.style.display = 'none';
      }, 100);
    }
  }

  /**
   * Launch Memory Game
   */
  function launchMemoryGame() {
    const shuffledCards = [...memoryCards, ...memoryCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let startTime = Date.now();

    const modalHtml = `
      <div id="game-hub-modal-bg" class="open">
        <div id="game-hub-modal">
          <div class="hub-header">
            <h2 class="hub-title">🧠 Tech Memory</h2>
            <button class="hub-close" aria-label="Close">&times;</button>
          </div>
          <div class="game-stats">
            <span class="stat-item">Moves: <span id="memory-moves">0</span></span>
            <span class="stat-item">Pairs: <span id="memory-pairs">0</span>/8</span>
          </div>
          <div class="memory-grid">
            ${shuffledCards.map(card => `
              <div class="memory-card" data-id="${card.id}" data-name="${card.name}">
                <i class="${card.icon}"></i>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    hubModal = document.getElementById('game-hub-modal-bg');

    if (SAE.stopScroll) SAE.stopScroll();

    hubModal.querySelector('.hub-close').addEventListener('click', closeHub);

    hubModal.querySelectorAll('.memory-card').forEach(card => {
      card.addEventListener('click', () => {
        if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
          return;
        }

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          moves++;
          document.getElementById('memory-moves').textContent = moves;

          const [card1, card2] = flippedCards;
          if (card1.dataset.name === card2.dataset.name) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            document.getElementById('memory-pairs').textContent = matchedPairs;
            flippedCards = [];

            if (matchedPairs === 8) {
              const time = Math.round((Date.now() - startTime) / 1000);
              const score = Math.max(1000 - moves * 10 - time * 2, 0);
              const isNewHighScore = setHighScore('memory', score);
              setTimeout(() => {
                alert(`🎉 You won!\nMoves: ${moves}\nTime: ${time}s\nScore: ${score}${isNewHighScore ? '\n🏆 New High Score!' : ''}`);
                closeHub();
              }, 500);
            }
          } else {
            setTimeout(() => {
              card1.classList.remove('flipped');
              card2.classList.remove('flipped');
              flippedCards = [];
            }, 1000);
          }
        }
      });
    });
  }

  /**
   * Launch Typing Game
   */
  function launchTypingGame() {
    let currentSnippet = '';
    let typed = '';
    let score = 0;
    let timeLeft = 30;
    let timer = null;

    function getNewSnippet() {
      currentSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      typed = '';
      updateDisplay();
    }

    function updateDisplay() {
      const display = document.getElementById('typing-display');
      if (!display) return;

      let html = '';
      for (let i = 0; i < currentSnippet.length; i++) {
        if (i < typed.length) {
          if (typed[i] === currentSnippet[i]) {
            html += `<span class="correct">${currentSnippet[i]}</span>`;
          } else {
            html += `<span class="incorrect">${currentSnippet[i]}</span>`;
          }
        } else if (i === typed.length) {
          html += `<span class="cursor">${currentSnippet[i]}</span>`;
        } else {
          html += currentSnippet[i];
        }
      }
      display.innerHTML = html;
    }

    const modalHtml = `
      <div id="game-hub-modal-bg" class="open">
        <div id="game-hub-modal">
          <div class="hub-header">
            <h2 class="hub-title">⌨️ Code Typer</h2>
            <button class="hub-close" aria-label="Close">&times;</button>
          </div>
          <div class="typing-container">
            <div class="game-stats">
              <span class="stat-item">Score: <span id="typing-score">0</span></span>
              <span class="stat-item">Time: <span id="typing-time">30</span>s</span>
            </div>
            <div class="typing-display" id="typing-display"></div>
            <input type="text" class="typing-input" id="typing-input" placeholder="Start typing..." autofocus />
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    hubModal = document.getElementById('game-hub-modal-bg');

    if (SAE.stopScroll) SAE.stopScroll();

    const input = document.getElementById('typing-input');
    getNewSnippet();

    // Focus input
    setTimeout(() => input.focus(), 100);

    // Start timer
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById('typing-time').textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        const isNewHighScore = setHighScore('typing', score);
        input.disabled = true;
        setTimeout(() => {
          alert(`⏱️ Time's up!\nScore: ${score}${isNewHighScore ? '\n🏆 New High Score!' : ''}`);
          closeHub();
        }, 100);
      }
    }, 1000);

    input.addEventListener('input', (e) => {
      typed = e.target.value;
      updateDisplay();

      if (typed === currentSnippet) {
        score += currentSnippet.length;
        document.getElementById('typing-score').textContent = score;
        e.target.value = '';
        getNewSnippet();
      }
    });

    hubModal.querySelector('.hub-close').addEventListener('click', () => {
      clearInterval(timer);
      closeHub();
    });
  }

  /**
   * Initialize game hub
   */
  function init() {
    loadScores();
    createTrigger();
    console.log('Game hub initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 600));
  } else {
    setTimeout(init, 600);
  }

  // Export for manual use
  SAE.modules = SAE.modules || {};
  SAE.modules.gameHub = {
    init,
    openHub,
    closeHub,
    getHighScore,
    setHighScore
  };
})();
