// Whack-a-Mole game modal for Summer Ann's website
(function() {
  console.log("Whack-a-Mole script loaded!");
  // Add styles for modal and button
  const style = document.createElement('style');
  style.innerHTML = `
    #wam-btn { position:fixed;bottom:24px;left:24px;z-index:9999;background:linear-gradient(90deg,#a1c4fd 0%,#00ffe7 100%);color:#fff;font-family:'Nunito',system-ui,sans-serif;font-size:1.1em;font-weight:700;padding:16px 28px;border:none;border-radius:18px;box-shadow:0 0 16px #00ffe7cc,0 2px 8px #6c63ff55;cursor:pointer;transition:box-shadow 0.2s,background 0.2s;}
    #wam-btn:hover { box-shadow:0 0 32px #00ffe7,0 2px 8px #6c63ff99; }
    #wam-modal-bg { position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(30,40,80,0.25);backdrop-filter:blur(4px);z-index:10000;display:flex;align-items:center;justify-content:center; }
    #wam-modal { background:rgba(255,255,255,0.85);backdrop-filter:blur(16px) saturate(180%);border-radius:24px;box-shadow:0 8px 32px 0 rgba(31,38,135,0.37);padding:32px 28px 24px 28px;min-width:340px;max-width:95vw;position:relative; }
    #wam-close { position:absolute;top:18px;right:22px;font-size:1.5em;cursor:pointer;color:#6c63ff;transition:color 0.2s; }
    #wam-close:hover { color:#00ffe7; }
    #wam-title { font-size:1.5em;font-weight:700;text-align:center;margin-bottom:18px;color:#6c63ff;letter-spacing:1px; }
    #wam-score,#wam-timer { font-size:1.1em;font-weight:600;margin:8px 0;text-align:center; }
    #wam-grid { display:grid;grid-template-columns:repeat(3,60px);grid-template-rows:repeat(3,60px);gap:18px;justify-content:center;margin:18px 0 12px 0; }
    .wam-cell { background:linear-gradient(90deg,#a1c4fd 0%,#c2e9fb 100%);border-radius:16px;box-shadow:0 0 8px #00ffe7aa,0 0 2px #6c63ff;display:flex;align-items:center;justify-content:center;font-size:2.2em;cursor:pointer;transition:box-shadow 0.2s,background 0.2s; }
    .wam-cell.active { background:linear-gradient(90deg,#6c63ff 0%,#00ffe7 100%);box-shadow:0 0 16px #00ffe7cc,0 2px 8px #6c63ff99; }
    #wam-end { text-align:center;margin-top:18px; }
    #wam-playagain { background:linear-gradient(90deg,#6c63ff 0%,#00ffe7 100%);color:#fff;border:none;padding:10px 22px;font-size:1em;border-radius:12px;cursor:pointer;box-shadow:0 0 8px #00ffe7aa,0 0 2px #6c63ff;transition:box-shadow 0.2s;margin-top:12px; }
    #wam-playagain:hover { box-shadow:0 0 24px #00ffe7,0 2px 8px #6c63ff99; }
  `;
  document.head.appendChild(style);

  // Add floating button
  const wamBtn = document.createElement('button');
  wamBtn.id = 'wam-btn';
  wamBtn.innerText = 'Play Whack-a-Mole!';
  document.body.appendChild(wamBtn);

  // Modal HTML
  function getModalHTML() {
    return `
      <div id="wam-modal-bg">
        <div id="wam-modal">
          <span id="wam-close">✖</span>
          <div id="wam-title">Whack-a-Mole 🐹</div>
          <div id="wam-score">Score: <span id="wam-score-val">0</span></div>
          <div id="wam-timer">Time: <span id="wam-timer-val">30</span>s</div>
          <div id="wam-grid"></div>
          <div id="wam-end" style="display:none;"></div>
        </div>
      </div>
    `;
  }

  // Game logic
  let timer, moleTimeout;
  function startGame() {
    let score = 0;
    let time = 30;
    let active = -1;
    const grid = document.getElementById('wam-grid');
    const scoreVal = document.getElementById('wam-score-val');
    const timerVal = document.getElementById('wam-timer-val');
    const endDiv = document.getElementById('wam-end');
    endDiv.style.display = 'none';
    endDiv.innerHTML = '';
    // Create grid
    grid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'wam-cell';
      cell.onclick = () => {
        if (i === active) {
          score++;
          scoreVal.innerText = score;
          cell.classList.remove('active');
          cell.innerHTML = '';
          active = -1;
        }
      };
      grid.appendChild(cell);
    }
    // Mole pop logic
    function popMole() {
      if (active !== -1) {
        grid.children[active].classList.remove('active');
        grid.children[active].innerHTML = '';
      }
      active = Math.floor(Math.random() * 9);
      grid.children[active].classList.add('active');
      grid.children[active].innerHTML = '🐹';
      moleTimeout = setTimeout(popMole, 700 + Math.random() * 600);
    }
    popMole();
    // Timer
    timerVal.innerText = time;
    timer = setInterval(() => {
      time--;
      timerVal.innerText = time;
      if (time <= 0) {
        clearInterval(timer);
        clearTimeout(moleTimeout);
        if (active !== -1) {
          grid.children[active].classList.remove('active');
          grid.children[active].innerHTML = '';
        }
        endDiv.style.display = 'block';
        endDiv.innerHTML = `<div style='font-size:1.2em;font-weight:700;color:#6c63ff;'>Time's up!<br>Your score: ${score}</div><button id='wam-playagain'>Play Again</button>`;
        document.getElementById('wam-playagain').onclick = () => startGame();
      }
    }, 1000);
  }

  // Open modal
  wamBtn.onclick = () => {
    if (document.getElementById('wam-modal-bg')) return;
    document.body.insertAdjacentHTML('beforeend', getModalHTML());
    startGame();
    document.getElementById('wam-close').onclick = () => {
      clearInterval(timer);
      clearTimeout(moleTimeout);
      document.getElementById('wam-modal-bg').remove();
    };
  };
})(); 