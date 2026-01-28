/**
 * Summer Ann Portfolio - Enhanced Game Hub v2.0
 * Unified game launcher with multiple polished games
 */

(function() {
  'use strict';

  const SAE = window.SummerAnnEnhancements || {};

  // Games configuration with 6 games
  const games = [
    {
      id: 'snake',
      title: 'Code Snake',
      emoji: '🐍',
      description: 'Classic snake with a coding twist!',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      id: 'memory',
      title: 'Tech Memory',
      emoji: '🧠',
      description: 'Match the programming technologies!',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
    },
    {
      id: 'typing',
      title: 'Code Typer',
      emoji: '⌨️',
      description: 'Type code snippets fast!',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    {
      id: 'reaction',
      title: 'Reaction Test',
      emoji: '⚡',
      description: 'Test your reaction speed!',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    },
    {
      id: 'puzzle',
      title: 'Number Puzzle',
      emoji: '🧩',
      description: 'Slide tiles to solve the puzzle!',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
    },
    {
      id: 'taprush',
      title: 'Tap Rush',
      emoji: '🔥',
      description: 'Tap fast before time runs out!',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)'
    },
    {
      id: 'aim',
      title: 'Aim Dash',
      emoji: '🎯',
      description: 'Hit moving targets in time!',
      color: '#22c55e',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
    },
    {
      id: 'whackamole',
      title: 'Whack-a-Mole',
      emoji: '🐹',
      description: 'Whack the moles quickly!',
      color: '#6c63ff',
      gradient: 'linear-gradient(135deg, #6c63ff 0%, #5a52d5 100%)'
    }
  ];

  // High scores storage
  const STORAGE_KEY = 'summerann_game_scores_v2';
  let highScores = {};

  // Memory game cards (tech icons)
  const memoryCards = [
    { name: 'Python', icon: '🐍', color: '#3776ab' },
    { name: 'React', icon: '⚛️', color: '#61dafb' },
    { name: 'JavaScript', icon: '📜', color: '#f7df1e' },
    { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
    { name: 'AWS', icon: '☁️', color: '#ff9900' },
    { name: 'Docker', icon: '🐳', color: '#2496ed' },
    { name: 'Go', icon: '🔵', color: '#00add8' },
    { name: 'Swift', icon: '🍎', color: '#fa7343' }
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
    'docker-compose up -d',
    'async function fetch()',
    'useState(initialValue)',
    'export default App;',
    'console.log("Hello!")',
    'return response.json()',
    'if (condition) { }',
    'array.map(x => x * 2)'
  ];

  let hubTrigger = null;
  let hubModal = null;
  let activeModal = null;
  let cleanupHandlers = [];
  let scrollPaused = false;

  function setScrollPaused(paused) {
    if (scrollPaused === paused) return;
    scrollPaused = paused;
    if (paused) {
      if (SAE.stopScroll) SAE.stopScroll();
    } else if (SAE.startScroll) {
      SAE.startScroll();
    }
  }

  function registerCleanup(handler) {
    if (typeof handler === 'function') cleanupHandlers.push(handler);
  }

  function runCleanup() {
    const handlers = cleanupHandlers.splice(0);
    handlers.forEach((handler) => {
      try {
        handler();
      } catch (err) {
        // ignore cleanup errors
      }
    });
  }

  function clearActiveModal(resumeScroll = true) {
    runCleanup();
    const existing = document.getElementById('game-hub-modal-bg');
    if (existing) existing.remove();
    activeModal = null;
    hubModal = null;
    if (resumeScroll) setScrollPaused(false);
  }

  function mountModal(html, { pauseScroll = true } = {}) {
    clearActiveModal(false);
    document.body.insertAdjacentHTML('beforeend', html);
    activeModal = document.getElementById('game-hub-modal-bg');
    hubModal = activeModal;
    if (pauseScroll) setScrollPaused(true);
    return activeModal;
  }

  function closeModal({ resumeScroll = true } = {}) {
    if (!activeModal) {
      if (resumeScroll) setScrollPaused(false);
      return;
    }

    const modal = activeModal;
    activeModal = null;
    hubModal = null;
    modal.classList.remove('open');
    runCleanup();

    setTimeout(() => {
      if (modal.parentElement) modal.remove();
      if (resumeScroll) setScrollPaused(false);
    }, 320);
  }

  function loadScores() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) highScores = JSON.parse(stored);
    } catch (e) {
      console.warn('Could not load game scores');
    }
  }

  function saveScores() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(highScores));
    } catch (e) {
      console.warn('Could not save game scores');
    }
  }

  function getHighScore(gameId) {
    return highScores[gameId] || 0;
  }

  function setHighScore(gameId, score) {
    if (score > getHighScore(gameId)) {
      highScores[gameId] = score;
      saveScores();
      return true;
    }
    return false;
  }

  function injectStyles() {
    if (document.getElementById('game-hub-styles-v2')) return;

    const style = document.createElement('style');
    style.id = 'game-hub-styles-v2';
    style.textContent = `
      /* Game Hub Trigger Button */
      #game-hub-trigger {
        position: fixed;
        bottom: 24px;
        left: 24px;
        z-index: 9997;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        border: none;
        cursor: pointer;
        font-size: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4), 0 0 0 0 rgba(99, 102, 241, 0.4);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        animation: game-hub-pulse 2s infinite;
      }

      @keyframes game-hub-pulse {
        0%, 100% { box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4), 0 0 0 0 rgba(99, 102, 241, 0.4); }
        50% { box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4), 0 0 0 8px rgba(99, 102, 241, 0); }
      }

      #game-hub-trigger:hover {
        transform: scale(1.1) rotate(10deg);
        box-shadow: 0 12px 40px rgba(99, 102, 241, 0.5);
      }

      /* Modal Background */
      #game-hub-modal-bg {
        position: fixed;
        inset: 0;
        background: rgba(5, 5, 15, 0.85);
        backdrop-filter: blur(12px);
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      #game-hub-modal-bg.open {
        opacity: 1;
        visibility: visible;
      }

      /* Modal Container */
      #game-hub-modal {
        background: linear-gradient(135deg, rgba(30, 30, 50, 0.95), rgba(20, 20, 35, 0.95));
        backdrop-filter: blur(20px);
        border-radius: 28px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        padding: 32px;
        min-width: min(600px, 90vw);
        max-width: 90vw;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.9) translateY(30px);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      #game-hub-modal-bg.open #game-hub-modal {
        transform: scale(1) translateY(0);
      }

      /* Modal Header */
      .hub-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 28px;
      }

      .hub-title {
        font-family: 'Space Grotesk', system-ui, sans-serif;
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #fff 0%, #6366f1 50%, #f43f5e 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .hub-close {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      }

      .hub-close:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: rotate(90deg);
      }

      /* Games Grid */
      .games-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 16px;
      }

      .game-card {
        position: relative;
        padding: 24px 16px;
        border-radius: 20px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.08);
        text-align: center;
        cursor: pointer;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
      }

      .game-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--card-gradient);
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: 0;
      }

      .game-card:hover::before {
        opacity: 0.15;
      }

      .game-card:hover {
        transform: translateY(-6px) scale(1.02);
        border-color: var(--card-color);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px var(--card-glow);
      }

      .game-card > * {
        position: relative;
        z-index: 1;
      }

      .game-emoji {
        font-size: 3rem;
        display: block;
        margin-bottom: 12px;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        transition: transform 0.3s ease;
      }

      .game-card:hover .game-emoji {
        transform: scale(1.2) rotate(-5deg);
      }

      .game-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        color: white;
        margin-bottom: 6px;
      }

      .game-desc {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.6);
        margin-bottom: 12px;
      }

      .game-highscore {
        display: inline-block;
        padding: 4px 12px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        font-size: 0.75rem;
        color: var(--card-color);
        font-weight: 600;
      }

      /* Game Container Styles */
      .game-container {
        text-align: center;
      }

      .game-stats {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin: 16px 0;
      }

      .stat-item {
        background: rgba(255, 255, 255, 0.1);
        padding: 8px 16px;
        border-radius: 12px;
        font-weight: 600;
        color: white;
      }

      .stat-value {
        color: #6366f1;
      }

      /* Snake Game */
      .snake-canvas-container {
        display: flex;
        justify-content: center;
        margin: 20px 0;
      }

      #snake-canvas {
        background: #0a0a1a;
        border-radius: 16px;
        border: 2px solid rgba(16, 185, 129, 0.3);
        box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
      }

      .snake-controls {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 16px;
      }

      .snake-btn {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .snake-btn:hover {
        background: rgba(16, 185, 129, 0.3);
      }

      .snake-btn:active {
        transform: scale(0.9);
      }

      /* Memory Game */
      .memory-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        max-width: 360px;
        margin: 20px auto;
      }

      .memory-card {
        aspect-ratio: 1;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 2rem;
        color: white;
        transition: all 0.3s ease;
        border: 2px solid transparent;
      }

      .memory-card:hover {
        transform: scale(1.05);
      }

      .memory-card.flipped {
        background: rgba(255, 255, 255, 0.95);
        border-color: #6366f1;
      }

      .memory-card.matched {
        background: linear-gradient(135deg, #10b981, #059669);
        border-color: #10b981;
        animation: memory-match 0.5s ease;
      }

      @keyframes memory-match {
        50% { transform: scale(1.1); }
      }

      .memory-card .card-icon {
        opacity: 0;
        transform: rotateY(180deg);
        transition: all 0.3s ease;
      }

      .memory-card.flipped .card-icon,
      .memory-card.matched .card-icon {
        opacity: 1;
        transform: rotateY(0);
      }

      /* Typing Game */
      .typing-display {
        font-family: 'JetBrains Mono', 'Fira Code', monospace;
        font-size: 1.3rem;
        background: #0a0a1a;
        color: rgba(255, 255, 255, 0.9);
        padding: 24px;
        border-radius: 16px;
        margin: 20px 0;
        letter-spacing: 0.5px;
        border: 1px solid rgba(99, 102, 241, 0.3);
      }

      .typing-display .correct { color: #10b981; }
      .typing-display .incorrect { color: #ef4444; text-decoration: underline; }
      .typing-display .cursor {
        background: #6366f1;
        animation: cursor-blink 1s infinite;
      }

      @keyframes cursor-blink {
        50% { opacity: 0; }
      }

      .typing-input {
        width: 100%;
        padding: 16px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 1.1rem;
        background: rgba(255, 255, 255, 0.05);
        border: 2px solid rgba(99, 102, 241, 0.3);
        border-radius: 12px;
        color: white;
        outline: none;
        transition: border-color 0.3s ease;
      }

      .typing-input:focus {
        border-color: #6366f1;
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
      }

      /* Reaction Test */
      .reaction-box {
        width: 100%;
        height: 300px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1.5rem;
        font-weight: 600;
        color: white;
      }

      .reaction-box.waiting {
        background: linear-gradient(135deg, #ef4444, #dc2626);
      }

      .reaction-box.ready {
        background: linear-gradient(135deg, #10b981, #059669);
      }

      .reaction-box.result {
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
      }

      .reaction-result {
        font-size: 3rem;
        font-weight: 700;
      }

      /* Number Puzzle */
      .puzzle-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        max-width: 320px;
        margin: 20px auto;
      }

      .puzzle-tile {
        aspect-ratio: 1;
        background: linear-gradient(135deg, #ec4899, #db2777);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        font-weight: 700;
        color: white;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
      }

      .puzzle-tile:hover:not(.empty) {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(236, 72, 153, 0.4);
      }

      .puzzle-tile.empty {
        background: rgba(255, 255, 255, 0.05);
        cursor: default;
      }

      /* Tap Rush */
      .taprush-area {
        display: grid;
        place-items: center;
        padding: 24px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.1);
        min-height: 220px;
      }

      .taprush-button {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        border: none;
        color: white;
        font-size: 20px;
        font-weight: 700;
        background: linear-gradient(135deg, #ef4444, #f97316);
        box-shadow: 0 20px 50px rgba(239, 68, 68, 0.35);
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.2s ease;
      }

      .taprush-button:active {
        transform: scale(0.95);
        box-shadow: 0 12px 30px rgba(239, 68, 68, 0.45);
      }

      /* Aim Dash */
      .aim-arena {
        position: relative;
        width: 100%;
        height: 320px;
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.12);
        overflow: hidden;
      }

      .aim-target {
        position: absolute;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: radial-gradient(circle, #fff 0%, #22c55e 60%, #15803d 100%);
        box-shadow: 0 12px 30px rgba(34, 197, 94, 0.4);
        cursor: pointer;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
      }

      .aim-target:active {
        transform: translate(-50%, -50%) scale(0.9);
      }

      /* Common Game Button */
      .game-btn {
        padding: 12px 28px;
        border-radius: 12px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        border: none;
        color: white;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 16px;
      }

      .game-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
      }

      .game-btn.secondary {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      /* Responsive */
      @media (max-width: 600px) {
        .games-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .memory-grid {
          max-width: 280px;
        }

        .puzzle-grid {
          max-width: 260px;
        }

        #snake-canvas {
          max-width: 280px;
          max-height: 280px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createTrigger() {
    // Hide original whackamole button
    const wamBtn = document.getElementById('wam-btn');
    if (wamBtn) wamBtn.style.display = 'none';

    if (document.getElementById('game-hub-trigger')) {
      hubTrigger = document.getElementById('game-hub-trigger');
      return;
    }

    injectStyles();

    hubTrigger = document.createElement('button');
    hubTrigger.id = 'game-hub-trigger';
    hubTrigger.innerHTML = '🎮';
    hubTrigger.setAttribute('aria-label', 'Open Game Hub');
    hubTrigger.setAttribute('title', 'Play Games!');
    hubTrigger.addEventListener('click', openHub);

    document.body.appendChild(hubTrigger);
  }

  function openHub() {
    if (document.getElementById('game-hub-modal-bg')) return;

    const gamesHtml = games.map(game => `
      <div class="game-card" data-game="${game.id}"
           style="--card-gradient: ${game.gradient}; --card-color: ${game.color}; --card-glow: ${game.color}40">
        <span class="game-emoji">${game.emoji}</span>
        <div class="game-title">${game.title}</div>
        <div class="game-desc">${game.description}</div>
        <div class="game-highscore">Best: ${getHighScore(game.id)}</div>
      </div>
    `).join('');

    const modalHtml = `
      <div id="game-hub-modal-bg">
        <div id="game-hub-modal">
          <div class="hub-header">
            <h2 class="hub-title">🎮 Game Hub</h2>
            <button class="hub-close" aria-label="Close">✕</button>
          </div>
          <div class="games-grid">${gamesHtml}</div>
        </div>
      </div>
    `;

    hubModal = mountModal(modalHtml, { pauseScroll: true });
    if (hubModal) {
      requestAnimationFrame(() => hubModal.classList.add('open'));
    }

    hubModal.querySelector('.hub-close').addEventListener('click', closeHub);
    hubModal.addEventListener('click', (e) => {
      if (e.target === hubModal) closeHub();
    });

    hubModal.querySelectorAll('.game-card').forEach(card => {
      card.addEventListener('click', () => launchGame(card.dataset.game));
    });
  }

  function closeHub() {
    closeModal({ resumeScroll: true });
  }

  function launchGame(gameId) {
    closeModal({ resumeScroll: false });
    setTimeout(() => {
      switch (gameId) {
        case 'snake': launchSnakeGame(); break;
        case 'memory': launchMemoryGame(); break;
        case 'typing': launchTypingGame(); break;
        case 'reaction': launchReactionGame(); break;
        case 'puzzle': launchPuzzleGame(); break;
        case 'taprush': launchTapRushGame(); break;
        case 'aim': launchAimGame(); break;
        case 'whackamole': launchWhackamole(); break;
      }
    }, 450);
  }

  // ========== SNAKE GAME ==========
  function launchSnakeGame() {
    const GRID_SIZE = 20;
    const CELL_SIZE = 14;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 10 };
    let direction = { x: 1, y: 0 };
    let nextDirection = { x: 1, y: 0 };
    let score = 0;
    let gameLoop = null;
    let gameOver = false;

    const modalHtml = `
      <div id="game-hub-modal-bg" class="open">
        <div id="game-hub-modal">
          <div class="hub-header">
            <h2 class="hub-title">🐍 Code Snake</h2>
            <button class="hub-close" aria-label="Close">✕</button>
          </div>
          <div class="game-container">
            <div class="game-stats">
              <span class="stat-item">Score: <span class="stat-value" id="snake-score">0</span></span>
              <span class="stat-item">Best: <span class="stat-value" id="snake-best">${getHighScore('snake')}</span></span>
            </div>
            <div class="snake-canvas-container">
              <canvas id="snake-canvas" width="${GRID_SIZE * CELL_SIZE}" height="${GRID_SIZE * CELL_SIZE}"></canvas>
            </div>
            <p style="color: rgba(255,255,255,0.6); margin-top: 12px;">Use arrow keys or WASD to move</p>
            <div class="snake-controls">
              <button class="snake-btn" data-dir="up">↑</button>
            </div>
            <div class="snake-controls">
              <button class="snake-btn" data-dir="left">←</button>
              <button class="snake-btn" data-dir="down">↓</button>
              <button class="snake-btn" data-dir="right">→</button>
            </div>
            <button class="game-btn" id="snake-restart" style="display:none;">Play Again</button>
          </div>
        </div>
      </div>
    `;

    hubModal = mountModal(modalHtml, { pauseScroll: true });

    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');

    function spawnFood() {
      do {
        food.x = Math.floor(Math.random() * GRID_SIZE);
        food.y = Math.floor(Math.random() * GRID_SIZE);
      } while (snake.some(s => s.x === food.x && s.y === food.y));
    }

    function draw() {
      ctx.fillStyle = '#0a0a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(canvas.width, i * CELL_SIZE);
        ctx.stroke();
      }

      // Draw food
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(food.x * CELL_SIZE + CELL_SIZE / 2, food.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw snake
      snake.forEach((segment, i) => {
        const gradient = ctx.createRadialGradient(
          segment.x * CELL_SIZE + CELL_SIZE / 2,
          segment.y * CELL_SIZE + CELL_SIZE / 2,
          0,
          segment.x * CELL_SIZE + CELL_SIZE / 2,
          segment.y * CELL_SIZE + CELL_SIZE / 2,
          CELL_SIZE / 2
        );
        gradient.addColorStop(0, i === 0 ? '#34d399' : '#10b981');
        gradient.addColorStop(1, '#059669');
        ctx.fillStyle = gradient;
        ctx.fillRect(segment.x * CELL_SIZE + 1, segment.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      });

      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px Space Grotesk';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
      }
    }

    function update() {
      if (gameOver) return;

      direction = nextDirection;
      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

      // Wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        endGame();
        return;
      }

      // Self collision
      if (snake.some(s => s.x === head.x && s.y === head.y)) {
        endGame();
        return;
      }

      snake.unshift(head);

      // Eat food
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('snake-score').textContent = score;
        spawnFood();
      } else {
        snake.pop();
      }

      draw();
    }

    function endGame() {
      gameOver = true;
      clearInterval(gameLoop);
      const isNewBest = setHighScore('snake', score);
      if (isNewBest) document.getElementById('snake-best').textContent = score;
      document.getElementById('snake-restart').style.display = 'inline-block';
      draw();
    }

    function setDirection(x, y) {
      if ((x !== 0 && direction.x === 0) || (y !== 0 && direction.y === 0)) {
        nextDirection = { x, y };
      }
    }

    function handleKey(e) {
      const key = e.key.toLowerCase();
      if (key === 'arrowup' || key === 'w') setDirection(0, -1);
      if (key === 'arrowdown' || key === 's') setDirection(0, 1);
      if (key === 'arrowleft' || key === 'a') setDirection(-1, 0);
      if (key === 'arrowright' || key === 'd') setDirection(1, 0);
    }

    document.addEventListener('keydown', handleKey);

    hubModal.querySelectorAll('.snake-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = btn.dataset.dir;
        if (dir === 'up') setDirection(0, -1);
        if (dir === 'down') setDirection(0, 1);
        if (dir === 'left') setDirection(-1, 0);
        if (dir === 'right') setDirection(1, 0);
      });
    });

    document.getElementById('snake-restart').addEventListener('click', () => {
      snake = [{ x: 10, y: 10 }];
      direction = { x: 1, y: 0 };
      nextDirection = { x: 1, y: 0 };
      score = 0;
      gameOver = false;
      document.getElementById('snake-score').textContent = 0;
      document.getElementById('snake-restart').style.display = 'none';
      spawnFood();
      gameLoop = setInterval(update, 120);
    });

    hubModal.querySelector('.hub-close').addEventListener('click', () => {
      closeModal({ resumeScroll: true });
    });

    hubModal.addEventListener('click', (e) => {
      if (e.target === hubModal) closeModal({ resumeScroll: true });
    });

    registerCleanup(() => {
      clearInterval(gameLoop);
      document.removeEventListener('keydown', handleKey);
    });

    draw();
    gameLoop = setInterval(update, 120);
  }

  // ========== MEMORY GAME ==========
  function launchMemoryGame() {
    const shuffledCards = [...memoryCards, ...memoryCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: index }));

    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let startTime = Date.now();
    let flipTimeout = null;
    let winTimeout = null;

    const modalHtml = `
      <div id="game-hub-modal-bg" class="open">
        <div id="game-hub-modal">
          <div class="hub-header">
            <h2 class="hub-title">🧠 Tech Memory</h2>
            <button class="hub-close" aria-label="Close">✕</button>
          </div>
          <div class="game-container">
            <div class="game-stats">
              <span class="stat-item">Moves: <span class="stat-value" id="memory-moves">0</span></span>
              <span class="stat-item">Pairs: <span class="stat-value" id="memory-pairs">0</span>/8</span>
            </div>
            <div class="memory-grid">
              ${shuffledCards.map(card => `
                <div class="memory-card" data-id="${card.id}" data-name="${card.name}">
                  <span class="card-icon" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3))">${card.icon}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    hubModal = mountModal(modalHtml, { pauseScroll: true });

    hubModal.querySelector('.hub-close').addEventListener('click', () => {
      closeModal({ resumeScroll: true });
    });
    hubModal.addEventListener('click', (e) => {
      if (e.target === hubModal) closeModal({ resumeScroll: true });
    });

    hubModal.querySelectorAll('.memory-card').forEach(card => {
      card.addEventListener('click', () => {
        if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) return;

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
              const isNew = setHighScore('memory', score);
              winTimeout = setTimeout(() => {
                alert(`🎉 You won!\nMoves: ${moves} | Time: ${time}s\nScore: ${score}${isNew ? '\n🏆 New Best!' : ''}`);
                closeModal({ resumeScroll: true });
              }, 500);
            }
          } else {
            flipTimeout = setTimeout(() => {
              card1.classList.remove('flipped');
              card2.classList.remove('flipped');
              flippedCards = [];
            }, 1000);
          }
        }
      });
    });

    registerCleanup(() => {
      if (flipTimeout) clearTimeout(flipTimeout);
      if (winTimeout) clearTimeout(winTimeout);
    });
  }

  // ========== TYPING GAME ==========
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
          html += typed[i] === currentSnippet[i]
            ? `<span class="correct">${currentSnippet[i]}</span>`
            : `<span class="incorrect">${currentSnippet[i]}</span>`;
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
            <button class="hub-close" aria-label="Close">✕</button>
          </div>
          <div class="game-container">
            <div class="game-stats">
              <span class="stat-item">Score: <span class="stat-value" id="typing-score">0</span></span>
              <span class="stat-item">Time: <span class="stat-value" id="typing-time">30</span>s</span>
            </div>
            <div class="typing-display" id="typing-display"></div>
            <input type="text" class="typing-input" id="typing-input" placeholder="Start typing..." autofocus />
          </div>
        </div>
      </div>
    `;

    hubModal = mountModal(modalHtml, { pauseScroll: true });

    const input = document.getElementById('typing-input');
    getNewSnippet();
    setTimeout(() => input.focus(), 100);

    timer = setInterval(() => {
      timeLeft--;
      document.getElementById('typing-time').textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        input.disabled = true;
        const isNew = setHighScore('typing', score);
        setTimeout(() => {
          alert(`⏱️ Time's up!\nScore: ${score}${isNew ? '\n🏆 New Best!' : ''}`);
          closeModal({ resumeScroll: true });
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
      closeModal({ resumeScroll: true });
    });

    hubModal.addEventListener('click', (e) => {
      if (e.target === hubModal) closeModal({ resumeScroll: true });
    });

    registerCleanup(() => {
      clearInterval(timer);
    });
  }

  // ========== REACTION GAME ==========
  function launchReactionGame() {
    let state = 'waiting';
    let startTime = 0;
    let timeout = null;
    let results = [];

    const modalHtml = `
      <div id="game-hub-modal-bg" class="open">
        <div id="game-hub-modal">
          <div class="hub-header">
            <h2 class="hub-title">⚡ Reaction Test</h2>
            <button class="hub-close" aria-label="Close">✕</button>
          </div>
          <div class="game-container">
            <div class="game-stats">
              <span class="stat-item">Best: <span class="stat-value" id="reaction-best">${getHighScore('reaction') || '---'}</span>ms</span>
              <span class="stat-item">Avg: <span class="stat-value" id="reaction-avg">---</span>ms</span>
            </div>
            <div class="reaction-box waiting" id="reaction-box">
              <span id="reaction-text">Wait for green...</span>
            </div>
            <p style="color: rgba(255,255,255,0.6);">Click when the box turns green!</p>
          </div>
        </div>
      </div>
    `;

    hubModal = mountModal(modalHtml, { pauseScroll: true });

    const box = document.getElementById('reaction-box');
    const text = document.getElementById('reaction-text');

    function startRound() {
      state = 'waiting';
      box.className = 'reaction-box waiting';
      text.innerHTML = 'Wait for green...';

      const delay = 1000 + Math.random() * 3000;
      timeout = setTimeout(() => {
        state = 'ready';
        box.className = 'reaction-box ready';
        text.innerHTML = 'CLICK NOW!';
        startTime = Date.now();
      }, delay);
    }

    box.addEventListener('click', () => {
      if (state === 'waiting') {
        clearTimeout(timeout);
        text.innerHTML = 'Too early! Click to try again';
        box.className = 'reaction-box result';
        state = 'result';
      } else if (state === 'ready') {
        const reactionTime = Date.now() - startTime;
        results.push(reactionTime);

        const avg = Math.round(results.reduce((a, b) => a + b, 0) / results.length);
        document.getElementById('reaction-avg').textContent = avg;

        // For reaction, lower is better, so we store inverse for high score
        const bestTime = Math.min(...results);
        if (getHighScore('reaction') === 0 || bestTime < getHighScore('reaction')) {
          highScores['reaction'] = bestTime;
          saveScores();
          document.getElementById('reaction-best').textContent = bestTime;
        }

        text.innerHTML = `<div class="reaction-result">${reactionTime}ms</div>Click to try again`;
        box.className = 'reaction-box result';
        state = 'result';
      } else if (state === 'result') {
        startRound();
      }
    });

    hubModal.querySelector('.hub-close').addEventListener('click', () => {
      closeModal({ resumeScroll: true });
    });

    hubModal.addEventListener('click', (e) => {
      if (e.target === hubModal) closeModal({ resumeScroll: true });
    });

    startRound();

    registerCleanup(() => {
      clearTimeout(timeout);
    });
  }

  // ========== PUZZLE GAME ==========
  function launchPuzzleGame() {
    let tiles = [];
    let moves = 0;
    let startTime = Date.now();
    let winTimeout = null;

    function shuffle() {
      tiles = [...Array(15).keys()].map(i => i + 1);
      tiles.push(0); // Empty tile

      // Shuffle
      for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
      }

      // Ensure solvable
      let inversions = 0;
      for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
          if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) inversions++;
        }
      }
      const emptyRow = Math.floor(tiles.indexOf(0) / 4);
      if ((inversions + emptyRow) % 2 !== 1) {
        // Swap first two non-empty tiles
        const idx1 = tiles.findIndex(t => t !== 0);
        const idx2 = tiles.findIndex((t, i) => t !== 0 && i !== idx1);
        [tiles[idx1], tiles[idx2]] = [tiles[idx2], tiles[idx1]];
      }
    }

    function render() {
      const grid = document.getElementById('puzzle-grid');
      if (!grid) return;

      grid.innerHTML = tiles.map((tile, i) => `
        <button class="puzzle-tile ${tile === 0 ? 'empty' : ''}" data-index="${i}">
          ${tile || ''}
        </button>
      `).join('');

      grid.querySelectorAll('.puzzle-tile').forEach(btn => {
        btn.addEventListener('click', () => {
          const index = parseInt(btn.dataset.index);
          tryMove(index);
        });
      });
    }

    function tryMove(index) {
      const emptyIndex = tiles.indexOf(0);
      const row = Math.floor(index / 4);
      const col = index % 4;
      const emptyRow = Math.floor(emptyIndex / 4);
      const emptyCol = emptyIndex % 4;

      const isAdjacent =
        (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
        (Math.abs(col - emptyCol) === 1 && row === emptyRow);

      if (isAdjacent) {
        [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
        moves++;
        document.getElementById('puzzle-moves').textContent = moves;
        render();
        checkWin();
      }
    }

    function checkWin() {
      const isWin = tiles.slice(0, 15).every((t, i) => t === i + 1);
      if (isWin) {
        const time = Math.round((Date.now() - startTime) / 1000);
        const score = Math.max(5000 - moves * 10 - time * 5, 0);
        const isNew = setHighScore('puzzle', score);
        winTimeout = setTimeout(() => {
          alert(`🎉 Solved!\nMoves: ${moves} | Time: ${time}s\nScore: ${score}${isNew ? '\n🏆 New Best!' : ''}`);
          closeModal({ resumeScroll: true });
        }, 300);
      }
    }

    shuffle();

    const modalHtml = `
      <div id="game-hub-modal-bg" class="open">
        <div id="game-hub-modal">
          <div class="hub-header">
            <h2 class="hub-title">🧩 Number Puzzle</h2>
            <button class="hub-close" aria-label="Close">✕</button>
          </div>
          <div class="game-container">
            <div class="game-stats">
              <span class="stat-item">Moves: <span class="stat-value" id="puzzle-moves">0</span></span>
              <span class="stat-item">Best: <span class="stat-value">${getHighScore('puzzle')}</span></span>
            </div>
            <div class="puzzle-grid" id="puzzle-grid"></div>
            <button class="game-btn secondary" id="puzzle-shuffle">Shuffle</button>
          </div>
        </div>
      </div>
    `;

    hubModal = mountModal(modalHtml, { pauseScroll: true });

    render();

    document.getElementById('puzzle-shuffle').addEventListener('click', () => {
      shuffle();
      moves = 0;
      startTime = Date.now();
      document.getElementById('puzzle-moves').textContent = 0;
      render();
    });

    hubModal.querySelector('.hub-close').addEventListener('click', () => {
      closeModal({ resumeScroll: true });
    });

    hubModal.addEventListener('click', (e) => {
      if (e.target === hubModal) closeModal({ resumeScroll: true });
    });

    registerCleanup(() => {
      if (winTimeout) clearTimeout(winTimeout);
    });
  }

  // ========== TAP RUSH ==========
  function launchTapRushGame() {
    let taps = 0;
    let timeLeft = 7;
    let timer = null;
    let running = false;

    const modalHtml = `
      <div id="game-hub-modal-bg" class="open">
        <div id="game-hub-modal">
          <div class="hub-header">
            <h2 class="hub-title">🔥 Tap Rush</h2>
            <button class="hub-close" aria-label="Close">✕</button>
          </div>
          <div class="game-container">
            <div class="game-stats">
              <span class="stat-item">Taps: <span class="stat-value" id="taprush-score">0</span></span>
              <span class="stat-item">Time: <span class="stat-value" id="taprush-time">7</span>s</span>
              <span class="stat-item">Best: <span class="stat-value" id="taprush-best">${getHighScore('taprush')}</span></span>
            </div>
            <div class="taprush-area">
              <button class="taprush-button" id="taprush-button">Tap!</button>
            </div>
            <button class="game-btn secondary" id="taprush-restart">Restart</button>
          </div>
        </div>
      </div>
    `;

    hubModal = mountModal(modalHtml, { pauseScroll: true });

    const scoreEl = document.getElementById('taprush-score');
    const timeEl = document.getElementById('taprush-time');
    const bestEl = document.getElementById('taprush-best');
    const tapBtn = document.getElementById('taprush-button');
    const restartBtn = document.getElementById('taprush-restart');

    function updateUI() {
      scoreEl.textContent = taps;
      timeEl.textContent = timeLeft;
    }

    function endGame() {
      running = false;
      clearInterval(timer);
      timer = null;
      tapBtn.disabled = true;
      const isNew = setHighScore('taprush', taps);
      if (isNew) bestEl.textContent = taps;
    }

    function startTimer() {
      if (running) return;
      running = true;
      tapBtn.disabled = false;
      timer = setInterval(() => {
        timeLeft -= 1;
        updateUI();
        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);
    }

    tapBtn.addEventListener('click', () => {
      if (!running) startTimer();
      if (timeLeft <= 0) return;
      taps += 1;
      updateUI();
    });

    restartBtn.addEventListener('click', () => {
      taps = 0;
      timeLeft = 7;
      updateUI();
      tapBtn.disabled = false;
      clearInterval(timer);
      timer = null;
      running = false;
    });

    hubModal.querySelector('.hub-close').addEventListener('click', () => {
      closeModal({ resumeScroll: true });
    });

    hubModal.addEventListener('click', (e) => {
      if (e.target === hubModal) closeModal({ resumeScroll: true });
    });

    registerCleanup(() => {
      clearInterval(timer);
    });
  }

  // ========== AIM DASH ==========
  function launchAimGame() {
    let score = 0;
    let timeLeft = 20;
    let timer = null;
    let running = false;

    const modalHtml = `
      <div id="game-hub-modal-bg" class="open">
        <div id="game-hub-modal">
          <div class="hub-header">
            <h2 class="hub-title">🎯 Aim Dash</h2>
            <button class="hub-close" aria-label="Close">✕</button>
          </div>
          <div class="game-container">
            <div class="game-stats">
              <span class="stat-item">Score: <span class="stat-value" id="aim-score">0</span></span>
              <span class="stat-item">Time: <span class="stat-value" id="aim-time">20</span>s</span>
              <span class="stat-item">Best: <span class="stat-value" id="aim-best">${getHighScore('aim')}</span></span>
            </div>
            <div class="aim-arena" id="aim-arena">
              <div class="aim-target" id="aim-target" style="display:none;"></div>
            </div>
            <button class="game-btn secondary" id="aim-start">Start</button>
          </div>
        </div>
      </div>
    `;

    hubModal = mountModal(modalHtml, { pauseScroll: true });

    const scoreEl = document.getElementById('aim-score');
    const timeEl = document.getElementById('aim-time');
    const bestEl = document.getElementById('aim-best');
    const arena = document.getElementById('aim-arena');
    const target = document.getElementById('aim-target');
    const startBtn = document.getElementById('aim-start');

    function placeTarget() {
      const rect = arena.getBoundingClientRect();
      const padding = 32;
      const x = padding + Math.random() * (rect.width - padding * 2);
      const y = padding + Math.random() * (rect.height - padding * 2);
      target.style.left = `${x}px`;
      target.style.top = `${y}px`;
    }

    function updateUI() {
      scoreEl.textContent = score;
      timeEl.textContent = timeLeft;
    }

    function endGame() {
      running = false;
      clearInterval(timer);
      timer = null;
      target.style.display = 'none';
      const isNew = setHighScore('aim', score);
      if (isNew) bestEl.textContent = score;
    }

    function startGame() {
      if (running) return;
      running = true;
      score = 0;
      timeLeft = 20;
      updateUI();
      target.style.display = 'block';
      placeTarget();
      timer = setInterval(() => {
        timeLeft -= 1;
        updateUI();
        if (timeLeft <= 0) {
          endGame();
        }
      }, 1000);
    }

    target.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!running) return;
      score += 1;
      updateUI();
      placeTarget();
    });

    startBtn.addEventListener('click', () => {
      startGame();
    });

    hubModal.querySelector('.hub-close').addEventListener('click', () => {
      closeModal({ resumeScroll: true });
    });

    hubModal.addEventListener('click', (e) => {
      if (e.target === hubModal) closeModal({ resumeScroll: true });
    });

    registerCleanup(() => {
      clearInterval(timer);
    });
  }

  // ========== WHACK-A-MOLE ==========
  function launchWhackamole() {
    const wamBtn = document.getElementById('wam-btn');
    if (wamBtn) {
      wamBtn.style.display = 'block';
      wamBtn.click();
      setTimeout(() => wamBtn.style.display = 'none', 100);
    }
  }

  function init() {
    loadScores();
    createTrigger();
    console.log('Game Hub v2 initialized with', games.length, 'games');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 600));
  } else {
    setTimeout(init, 600);
  }

  SAE.modules = SAE.modules || {};
  SAE.modules.gameHub = { init, openHub, closeHub, getHighScore, setHighScore };
})();
