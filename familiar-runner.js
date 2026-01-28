// Familiar Runner - top-down roguelite modal
(function () {
  const FR_VERSION = "1.0";
  const ROOT_ID = "fr-modal-bg";
  const STORAGE_KEY = "familiar_runner_meta";

  const THEMES = {
    neon: {
      name: "Neon Arcade",
      bg0: "#0b0f1f",
      bg1: "#101a3a",
      accent: "#00f5d4",
      accent2: "#ff4fd8",
      text: "#e9f0ff",
      panel: "rgba(12,18,42,0.92)",
      panelAlt: "rgba(18,26,60,0.85)",
      grid: "rgba(255,255,255,0.08)",
      glow: "rgba(0,245,212,0.35)",
      danger: "#ff5d6c",
      friendly: "#7df7ff",
      particle: "#7bfbff"
    },
    cozy: {
      name: "Cozy Pixel",
      bg0: "#f7efe5",
      bg1: "#f0dfcf",
      accent: "#e27d60",
      accent2: "#7bb08a",
      text: "#2f2a24",
      panel: "rgba(255,255,255,0.88)",
      panelAlt: "rgba(255,255,255,0.72)",
      grid: "rgba(47,42,36,0.08)",
      glow: "rgba(226,125,96,0.28)",
      danger: "#d77a61",
      friendly: "#7bb08a",
      particle: "#f2b179"
    }
  };

  const QUESTIONS = [
    {
      clue: "Guardian that sees in the dark",
      options: ["Owl", "Hound", "Rabbit"],
      correct: 0
    },
    {
      clue: "Forest trickster with a quick mind",
      options: ["Fox", "Bear", "Boar"],
      correct: 0
    },
    {
      clue: "Tiny helper that keeps watch",
      options: ["Sprite", "Golem", "Wyrm"],
      correct: 0
    },
    {
      clue: "Loyal protector of the hearth",
      options: ["Hound", "Moth", "Eel"],
      correct: 0
    },
    {
      clue: "Quiet guide of lost paths",
      options: ["Doe", "Raven", "Crab"],
      correct: 1
    },
    {
      clue: "Keeper of small fires",
      options: ["Wisp", "Ox", "Hawk"],
      correct: 0
    }
  ];

  const MODES = [
    {
      id: "arcade",
      title: "Arcade Run",
      desc: "Waves, upgrades, best score",
      hint: "90s run"
    },
    {
      id: "daily",
      title: "Daily Run",
      desc: "One seed per day",
      hint: "Local leaderboard"
    },
    {
      id: "boss",
      title: "Boss Rush",
      desc: "3 bosses, gates to stun",
      hint: "Patterns + timing"
    },
    {
      id: "hub",
      title: "Cozy Hub",
      desc: "Walk to portals",
      hint: "Practice + chill"
    }
  ];

  const UPS_STRONG = [
    {
      id: "dash",
      name: "Dash",
      desc: "Unlock dash with brief invulnerability",
      apply(state) {
        state.player.dashUnlocked = true;
      },
      unique: true
    },
    {
      id: "double_shot",
      name: "Double Shot",
      desc: "Fire two shots with slight spread",
      apply(state) {
        state.player.doubleShot = true;
      },
      unique: true
    },
    {
      id: "shield_pulse",
      name: "Shield Pulse",
      desc: "Q releases a radial shock",
      apply(state) {
        state.player.shieldPulse = true;
      },
      unique: true
    },
    {
      id: "slow_time",
      name: "Slow-Time Burst",
      desc: "E slows enemies briefly",
      apply(state) {
        state.player.slowTime = true;
      },
      unique: true
    },
    {
      id: "homing",
      name: "Homing Shots",
      desc: "Bullets gently bend toward foes",
      apply(state) {
        state.player.homing = true;
      },
      unique: true
    },
    {
      id: "ricochet",
      name: "Ricochet",
      desc: "Shots bounce once off walls",
      apply(state) {
        state.player.ricochet = true;
      },
      unique: true
    },
    {
      id: "drone",
      name: "Orbiting Drone",
      desc: "A drone orbits and damages",
      apply(state) {
        state.player.drones += 1;
      }
    },
    {
      id: "fire_rate",
      name: "Rapid Fire",
      desc: "Fire rate +20%",
      apply(state) {
        state.player.fireRate *= 1.2;
      }
    },
    {
      id: "damage",
      name: "Power Shot",
      desc: "Damage +20%",
      apply(state) {
        state.player.damage *= 1.2;
      }
    },
    {
      id: "magnet",
      name: "XP Magnet",
      desc: "XP vacuum range +40%",
      apply(state) {
        state.player.magnet *= 1.4;
      }
    },
    {
      id: "hp",
      name: "Heart",
      desc: "Max HP +1",
      apply(state) {
        state.player.maxHp += 1;
        state.player.hp += 1;
      }
    }
  ];

  const UPS_CHAOS = [
    {
      id: "glass_cannon",
      name: "Glass Cannon",
      desc: "Damage +60%, max HP -1",
      apply(state) {
        state.player.damage *= 1.6;
        state.player.maxHp = Math.max(1, state.player.maxHp - 1);
        state.player.hp = Math.min(state.player.hp, state.player.maxHp);
      },
      unique: true
    },
    {
      id: "wild_spread",
      name: "Wild Spread",
      desc: "Shots randomly fan out",
      apply(state) {
        state.player.wildSpread = true;
      },
      unique: true
    },
    {
      id: "dash_burn",
      name: "Burning Dash",
      desc: "Dash leaves a burning trail",
      apply(state) {
        state.player.burningDash = true;
      },
      unique: true
    },
    {
      id: "volatile",
      name: "Volatile Orbs",
      desc: "XP orbs explode on pickup",
      apply(state) {
        state.player.orbBoom = true;
      },
      unique: true
    },
    {
      id: "time_slip",
      name: "Time Slip",
      desc: "Random slow bursts trigger",
      apply(state) {
        state.player.timeSlip = true;
      },
      unique: true
    },
    {
      id: "overclock",
      name: "Overclock",
      desc: "Move speed +25%, dash cooldown -20%",
      apply(state) {
        state.player.moveSpeed *= 1.25;
        state.player.dashCooldown *= 0.8;
      }
    },
    {
      id: "lucky",
      name: "Lucky Crits",
      desc: "Crit chance +10%",
      apply(state) {
        state.player.crit += 0.1;
      }
    }
  ];

  const STYLE = `
    #fr-btn { position:fixed;bottom:24px;right:80px;z-index:9997;font-family:'Raleway',system-ui,sans-serif;font-weight:700;letter-spacing:0.5px;padding:14px 22px;border-radius:18px;border:none;cursor:pointer;transition:transform 0.2s ease, box-shadow 0.2s ease; }
    #fr-btn:hover { transform:translateY(-2px) scale(1.02); }
    #fr-modal-bg { position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;z-index:9996;background:rgba(5,8,14,0.35);backdrop-filter:blur(6px); }
    #fr-modal { width:min(1040px,94vw);background:var(--fr-bg0);color:var(--fr-text);border-radius:28px;box-shadow:0 24px 60px rgba(0,0,0,0.35);position:relative;overflow:hidden; }
    #fr-modal::before { content:'';position:absolute;inset:0;background:radial-gradient(circle at 20% 20%, var(--fr-bg1), transparent 60%),radial-gradient(circle at 80% 30%, rgba(255,255,255,0.06), transparent 55%),linear-gradient(135deg, var(--fr-bg0), var(--fr-bg1));opacity:0.95;z-index:0; }
    #fr-modal::after { content:'';position:absolute;inset:-50%;background:repeating-linear-gradient(0deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02) 1px,transparent 1px,transparent 3px);mix-blend-mode:soft-light;opacity:0.35;pointer-events:none; }
    #fr-modal[data-theme="neon"] { --fr-bg0:${THEMES.neon.bg0};--fr-bg1:${THEMES.neon.bg1};--fr-accent:${THEMES.neon.accent};--fr-accent2:${THEMES.neon.accent2};--fr-text:${THEMES.neon.text};--fr-panel:${THEMES.neon.panel};--fr-panel-alt:${THEMES.neon.panelAlt};--fr-grid:${THEMES.neon.grid};--fr-glow:${THEMES.neon.glow};--fr-danger:${THEMES.neon.danger};--fr-friendly:${THEMES.neon.friendly}; }
    #fr-modal[data-theme="cozy"] { --fr-bg0:${THEMES.cozy.bg0};--fr-bg1:${THEMES.cozy.bg1};--fr-accent:${THEMES.cozy.accent};--fr-accent2:${THEMES.cozy.accent2};--fr-text:${THEMES.cozy.text};--fr-panel:${THEMES.cozy.panel};--fr-panel-alt:${THEMES.cozy.panelAlt};--fr-grid:${THEMES.cozy.grid};--fr-glow:${THEMES.cozy.glow};--fr-danger:${THEMES.cozy.danger};--fr-friendly:${THEMES.cozy.friendly}; }
    #fr-header { position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:18px 24px 8px 24px; }
    #fr-title { font-family:'Playfair Display',serif;font-size:1.6rem;letter-spacing:1px; }
    #fr-controls { display:flex;gap:10px;align-items:center; }
    .fr-pill { background:var(--fr-panel);border:1px solid rgba(255,255,255,0.08);color:var(--fr-text);padding:8px 14px;border-radius:999px;font-family:'Raleway',sans-serif;font-weight:600;font-size:0.9rem;cursor:pointer;transition:transform 0.2s ease, box-shadow 0.2s ease; }
    .fr-pill:hover { transform:translateY(-1px);box-shadow:0 0 18px var(--fr-glow); }
    #fr-close { position:absolute;top:16px;right:16px;z-index:5;background:transparent;border:none;color:var(--fr-text);font-size:1.2rem;cursor:pointer;opacity:0.8; }
    #fr-game-wrap { position:relative;z-index:2;margin:8px 24px 18px;border-radius:22px;background:var(--fr-panel);box-shadow:inset 0 0 0 1px rgba(255,255,255,0.06);overflow:hidden; }
    #fr-canvas { width:100%;height:100%;display:block;background:transparent; }
    #fr-overlay { position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15));backdrop-filter:blur(2px);opacity:0;pointer-events:none;transition:opacity 0.2s ease; }
    #fr-overlay.active { opacity:1;pointer-events:auto; }
    #fr-hud { position:absolute;top:14px;left:14px;right:14px;display:flex;justify-content:space-between;align-items:flex-start;font-family:'JetBrains Mono',monospace;font-size:0.85rem;z-index:3;color:var(--fr-text);text-shadow:0 2px 8px rgba(0,0,0,0.3); }
    #fr-hud .fr-hud-block { background:var(--fr-panel-alt);padding:8px 10px;border-radius:12px;min-width:160px;box-shadow:0 8px 18px rgba(0,0,0,0.15); }
    #fr-hud .fr-hud-row { display:flex;justify-content:space-between;margin-bottom:4px; }
    #fr-footer { position:relative;z-index:2;padding:0 24px 22px;color:var(--fr-text);opacity:0.8;font-family:'Raleway',sans-serif;font-size:0.85rem;display:flex;justify-content:space-between;align-items:center; }
    .fr-panel { background:var(--fr-panel);padding:26px 28px;border-radius:22px;min-width:min(680px,85vw);box-shadow:0 12px 28px rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.08);animation:fr-pop 0.25s ease; }
    .fr-panel h2 { font-family:'Playfair Display',serif;margin:0 0 6px;font-size:2rem; }
    .fr-panel p { margin:0 0 12px;font-family:'Raleway',sans-serif; }
    .fr-mode-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-top:16px; }
    .fr-mode-card { background:var(--fr-panel-alt);padding:14px 16px;border-radius:16px;border:1px solid rgba(255,255,255,0.08);cursor:pointer;transition:transform 0.2s ease, box-shadow 0.2s ease; }
    .fr-mode-card:hover { transform:translateY(-2px);box-shadow:0 0 20px var(--fr-glow); }
    .fr-mode-card h3 { margin:0 0 6px;font-family:'Raleway',sans-serif;font-size:1.05rem; }
    .fr-mode-card span { display:block;opacity:0.7;font-size:0.8rem;margin-top:6px; }
    .fr-upgrade-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-top:14px; }
    .fr-upgrade { background:var(--fr-panel-alt);padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,0.08);cursor:pointer;transition:transform 0.2s ease, box-shadow 0.2s ease; }
    .fr-upgrade:hover { transform:translateY(-2px);box-shadow:0 0 18px var(--fr-glow); }
    .fr-upgrade strong { display:block;margin-bottom:4px;font-family:'Raleway',sans-serif; }
    .fr-gate-options { display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:14px; }
    .fr-gate-btn { background:var(--fr-panel-alt);padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,0.08);cursor:pointer;font-family:'Raleway',sans-serif;font-weight:700;font-size:1rem;transition:transform 0.2s ease, box-shadow 0.2s ease;display:flex;flex-direction:column;align-items:center;gap:6px; }
    .fr-gate-btn:hover { transform:translateY(-2px);box-shadow:0 0 18px var(--fr-glow); }
    .fr-sigil { width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,var(--fr-accent),var(--fr-accent2));box-shadow:0 0 16px var(--fr-glow); }
    .fr-sigil-1 { border-radius:50%; }
    .fr-sigil-2 { clip-path:polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
    .fr-label { display:inline-block;margin-top:6px;font-size:0.75rem;opacity:0.7; }
    .fr-line { height:1px;background:rgba(255,255,255,0.12);margin:12px 0; }
    .fr-controls-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-top:10px;font-size:0.85rem; }
    .fr-tag { display:inline-block;padding:4px 8px;border-radius:8px;background:var(--fr-panel-alt);margin-right:8px;margin-top:6px;font-size:0.75rem; }
    @keyframes fr-pop { from { transform:scale(0.96); opacity:0.6; } to { transform:scale(1); opacity:1; } }
  `;

  function loadMeta() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (err) {
      return {};
    }
    return {};
  }

  function saveMeta(meta) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(meta));
    } catch (err) {
      return;
    }
  }

  function ensureStyle() {
    if (document.getElementById("fr-style")) return;
    const style = document.createElement("style");
    style.id = "fr-style";
    style.innerHTML = STYLE;
    document.head.appendChild(style);
  }

  function openModal() {
    if (document.getElementById(ROOT_ID)) return;
    ensureStyle();

    const meta = loadMeta();
    const theme = meta.theme || "neon";

    const wrapper = document.createElement("div");
    wrapper.id = ROOT_ID;
    wrapper.innerHTML = `
      <div id="fr-modal" data-theme="${theme}">
        <button id="fr-close" aria-label="Close">x</button>
        <div id="fr-header">
          <div id="fr-title">Familiar Runner</div>
          <div id="fr-controls">
            <button class="fr-pill" id="fr-theme">Theme: ${THEMES[theme].name}</button>
            <button class="fr-pill" id="fr-restart">Restart</button>
            <button class="fr-pill" id="fr-pause">Pause</button>
          </div>
        </div>
        <div id="fr-game-wrap">
          <canvas id="fr-canvas"></canvas>
          <div id="fr-hud">
            <div class="fr-hud-block">
              <div class="fr-hud-row"><span>HP</span><span id="fr-hp">0</span></div>
              <div class="fr-hud-row"><span>LV</span><span id="fr-lv">1</span></div>
              <div class="fr-hud-row"><span>XP</span><span id="fr-xp">0/0</span></div>
              <div class="fr-hud-row"><span>Combo</span><span id="fr-combo">0</span></div>
            </div>
            <div class="fr-hud-block">
              <div class="fr-hud-row"><span>Time</span><span id="fr-time">0.0</span></div>
              <div class="fr-hud-row"><span>Score</span><span id="fr-score">0</span></div>
              <div class="fr-hud-row"><span>Best</span><span id="fr-best">0</span></div>
              <div class="fr-hud-row"><span>Mode</span><span id="fr-mode">Arcade</span></div>
            </div>
          </div>
          <div id="fr-overlay"></div>
        </div>
        <div id="fr-footer">
          <div>WASD move, Mouse aim, Click shoot, Space dash, Q shield, E slow time, F interact, Esc pause</div>
          <div>v${FR_VERSION}</div>
        </div>
      </div>
    `;

    document.body.appendChild(wrapper);

    const modal = document.getElementById("fr-modal");
    const overlay = document.getElementById("fr-overlay");
    const canvas = document.getElementById("fr-canvas");
    const hud = {
      hp: document.getElementById("fr-hp"),
      lv: document.getElementById("fr-lv"),
      xp: document.getElementById("fr-xp"),
      combo: document.getElementById("fr-combo"),
      time: document.getElementById("fr-time"),
      score: document.getElementById("fr-score"),
      best: document.getElementById("fr-best"),
      mode: document.getElementById("fr-mode")
    };

    const ctx = canvas.getContext("2d");
    let hazardTimer = null;
    let dpr = Math.max(1, window.devicePixelRatio || 1);
    let viewW = 960;
    let viewH = 540;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      viewW = rect.width;
      viewH = rect.height;
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.floor(viewW * dpr);
      canvas.height = Math.floor(viewH * dpr);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const state = createGameState(theme);

    function syncTheme(next) {
      state.theme = next;
      modal.setAttribute("data-theme", next);
      document.getElementById("fr-theme").textContent = `Theme: ${THEMES[next].name}`;
      meta.theme = next;
      saveMeta(meta);
      const btn = document.getElementById("fr-btn");
      if (btn) applyButtonTheme(btn, next);
    }

    function showOverlay(html) {
      overlay.innerHTML = html;
      overlay.classList.add("active");
      state.paused = true;
    }

    function hideOverlay() {
      overlay.classList.remove("active");
      overlay.innerHTML = "";
      state.paused = false;
    }

    function startMenu() {
      const cards = MODES.map((mode) => `
        <div class="fr-mode-card" data-action="mode" data-mode="${mode.id}">
          <h3>${mode.title}</h3>
          <div>${mode.desc}</div>
          <span>${mode.hint}</span>
        </div>
      `).join("");

      const html = `
        <div class="fr-panel">
          <h2>Familiar Runner</h2>
          <p>Top-down roguelite with question gates, upgrades, and combo memory.</p>
          <div class="fr-line"></div>
          <div class="fr-mode-grid">${cards}</div>
          <div class="fr-controls-grid">
            <div><span class="fr-tag">Gate</span>Answer to earn strong upgrades.</div>
            <div><span class="fr-tag">Combo</span>Correct streak boosts magnet + crit.</div>
            <div><span class="fr-tag">Dash</span>Unlock at level 2.</div>
          </div>
        </div>
      `;
      showOverlay(html);
    }

    function pauseMenu() {
      const html = `
        <div class="fr-panel">
          <h2>Paused</h2>
          <p>Catch your breath.</p>
          <div class="fr-line"></div>
          <div class="fr-upgrade-grid">
            <div class="fr-upgrade" data-action="resume"><strong>Resume</strong>Back to the run.</div>
            <div class="fr-upgrade" data-action="restart"><strong>Restart</strong>Start fresh.</div>
            <div class="fr-upgrade" data-action="menu"><strong>Menu</strong>Pick a new mode.</div>
          </div>
        </div>
      `;
      showOverlay(html);
    }

    function gateOverlay(question) {
      const options = question.options.map((opt, idx) => `
        <button class="fr-gate-btn" data-action="gate" data-idx="${idx}">
          <span class="fr-sigil fr-sigil-${idx}"></span>
          <div>${opt}</div>
          <span class="fr-label">Choose</span>
        </button>
      `).join("");

      const html = `
        <div class="fr-panel">
          <h2>Question Gate</h2>
          <p>${question.clue}</p>
          <div class="fr-gate-options">${options}</div>
        </div>
      `;
      showOverlay(html);
    }

    function upgradeOverlay(title, choices) {
      const items = choices.map((up) => `
        <div class="fr-upgrade" data-action="upgrade" data-upgrade="${up.id}">
          <strong>${up.name}</strong>
          <div>${up.desc}</div>
        </div>
      `).join("");

      const html = `
        <div class="fr-panel">
          <h2>${title}</h2>
          <p>Pick one upgrade to shape this run.</p>
          <div class="fr-upgrade-grid">${items}</div>
        </div>
      `;
      showOverlay(html);
    }

    function endOverlay(summary) {
      const html = `
        <div class="fr-panel">
          <h2>Run Complete</h2>
          <p>${summary}</p>
          <div class="fr-line"></div>
          <div class="fr-upgrade-grid">
            <div class="fr-upgrade" data-action="restart"><strong>Restart</strong>Jump back in.</div>
            <div class="fr-upgrade" data-action="menu"><strong>Menu</strong>Pick another mode.</div>
          </div>
        </div>
      `;
      showOverlay(html);
    }

    overlay.addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (!target) return;
      const action = target.getAttribute("data-action");
      if (action === "mode") {
        const mode = target.getAttribute("data-mode");
        hideOverlay();
        startRun(mode);
      }
      if (action === "resume") {
        hideOverlay();
      }
      if (action === "restart") {
        hideOverlay();
        startRun(state.mode || "arcade");
      }
      if (action === "menu") {
        startMenu();
      }
      if (action === "gate") {
        const idx = Number(target.getAttribute("data-idx"));
        resolveGate(idx);
      }
      if (action === "upgrade") {
        const id = target.getAttribute("data-upgrade");
        applyUpgrade(id);
      }
    });

    document.getElementById("fr-close").addEventListener("click", () => {
      teardown();
      wrapper.remove();
    });

    document.getElementById("fr-theme").addEventListener("click", () => {
      syncTheme(state.theme === "neon" ? "cozy" : "neon");
    });

    document.getElementById("fr-restart").addEventListener("click", () => {
      startRun(state.mode || "arcade");
    });

    document.getElementById("fr-pause").addEventListener("click", () => {
      if (state.paused) {
        hideOverlay();
      } else {
        pauseMenu();
      }
    });

    const keys = {};
    const mouse = { x: 0, y: 0, down: false };

    function onKeyDown(e) {
      keys[e.code] = true;
      if (e.code === "Escape") {
        if (state.paused) hideOverlay(); else pauseMenu();
      }
    }

    function onKeyUp(e) {
      keys[e.code] = false;
    }

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * viewW;
      mouse.y = ((e.clientY - rect.top) / rect.height) * viewH;
    }

    function onMouseDown() { mouse.down = true; }
    function onMouseUp() { mouse.down = false; }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);

    function teardown() {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      if (hazardTimer) clearInterval(hazardTimer);
      cancelAnimationFrame(state.rafId);
    }

    function createGameState(initialTheme) {
      return {
        theme: initialTheme,
        mode: null,
        paused: true,
        time: 0,
        runLength: 90,
        nextGateAt: 22,
        nextWaveAt: 18,
        waveIndex: 0,
        score: 0,
        best: 0,
        gatePending: null,
        rng: Math.random,
        hitStop: 0,
        shake: 0,
        bullets: [],
        enemyBullets: [],
        enemies: [],
        particles: [],
        orbs: [],
        hazards: [],
        drones: [],
        overlays: [],
        boss: null,
        player: createPlayer(),
        stars: createStars(),
        cam: { x: 0, y: 0 },
        rafId: 0,
        lastTime: performance.now(),
        hudTimer: 0,
        upgradesTaken: {}
      };
    }

    function createPlayer() {
      return {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 16,
        accel: 2400,
        friction: 8,
        moveSpeed: 520,
        dashSpeed: 1200,
        dashTime: 0.18,
        dashCooldown: 2.4,
        dashReady: 0,
        dashActive: 0,
        dashUnlocked: false,
        dashDir: { x: 1, y: 0 },
        invuln: 0,
        hp: 5,
        maxHp: 5,
        level: 1,
        xp: 0,
        xpTo: 16,
        magnet: 120,
        fireRate: 4,
        fireCd: 0,
        damage: 8,
        crit: 0.05,
        doubleShot: false,
        homing: false,
        ricochet: false,
        drones: 0,
        shieldPulse: false,
        shieldCd: 0,
        slowTime: false,
        slowCd: 0,
        slowActive: 0,
        wildSpread: false,
        burningDash: false,
        orbBoom: false,
        timeSlip: false,
        combo: 0
      };
    }

    function startRun(mode) {
      state.mode = mode;
      state.time = 0;
      state.score = 0;
      state.waveIndex = 0;
      state.nextGateAt = 22;
      state.nextWaveAt = 18;
      state.gatePending = null;
      state.bullets = [];
      state.enemyBullets = [];
      state.enemies = [];
      state.particles = [];
      state.orbs = [];
      state.hazards = [];
      state.drones = [];
      state.boss = null;
      state.player = createPlayer();
      state.stars = createStars();
      state.upgradesTaken = {};

      const worldCenter = { x: 0, y: 0 };
      state.player.x = worldCenter.x;
      state.player.y = worldCenter.y;
      state.cam.x = state.player.x;
      state.cam.y = state.player.y;

      state.runLength = mode === "boss" ? 180 : 90;
      state.rng = mode === "daily" ? seededRng(getDailySeed()) : Math.random;

      state.best = getBestScore(mode);
      hud.mode.textContent = modeLabel(mode);
      hud.best.textContent = state.best;

      if (mode === "hub") {
        setupHub();
      } else if (mode === "boss") {
        spawnBoss(0);
      }

      hideOverlay();
    }

    function setupHub() {
      state.enemies = [];
      state.hazards = [];
      state.orbs = [];
    }

    function modeLabel(mode) {
      if (mode === "daily") return "Daily";
      if (mode === "boss") return "Boss";
      if (mode === "hub") return "Hub";
      return "Arcade";
    }

    function getDailySeed() {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      return hashString(`${yyyy}-${mm}-${dd}`);
    }

    function getBestScore(mode) {
      const key = mode === "daily" ? `fr_best_daily_${getDateKey()}` : `fr_best_${mode}`;
      const val = localStorage.getItem(key);
      return val ? Number(val) : 0;
    }

    function setBestScore(mode, score) {
      const key = mode === "daily" ? `fr_best_daily_${getDateKey()}` : `fr_best_${mode}`;
      localStorage.setItem(key, String(score));
    }

    function getDateKey() {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }

    function resolveGate(choice) {
      const question = state.gatePending;
      if (!question) return;
      const correct = choice === question.correct;
      if (correct) {
        state.player.combo += 1;
      } else {
        state.player.combo = 0;
      }
      if (state.mode === "boss" && state.boss) {
        if (correct) {
          state.boss.vulnerable = 6;
          spawnHit(state.boss.x, state.boss.y);
        } else {
          spawnExplosion(state.boss.x, state.boss.y, 120, 0.6);
        }
      }
      state.gatePending = null;
      const pool = correct ? UPS_STRONG : UPS_CHAOS;
      const label = correct ? "Strong Upgrade" : "Chaos Upgrade";
      upgradeOverlay(label, pickUpgrades(pool));
    }

    function applyUpgrade(id) {
      const upgrade = [...UPS_STRONG, ...UPS_CHAOS].find((u) => u.id === id);
      if (!upgrade) return;
      upgrade.apply(state);
      if (upgrade.unique) state.upgradesTaken[id] = true;
      hideOverlay();
    }

    function pickUpgrades(pool) {
      const choices = [];
      const available = pool.filter((up) => !up.unique || !state.upgradesTaken[up.id]);
      const count = Math.min(3, available.length);
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(state.rng() * available.length);
        choices.push(available.splice(idx, 1)[0]);
      }
      return choices;
    }

    function scheduleGate() {
      const delay = 20 + state.rng() * 20;
      state.nextGateAt = state.time + delay;
    }

    function scheduleWave() {
      state.nextWaveAt = state.time + 18 + state.rng() * 10;
    }

    function onLevelUp() {
      state.player.level += 1;
      state.player.xp -= state.player.xpTo;
      state.player.xpTo = Math.floor(state.player.xpTo * 1.25 + 8);

      if (state.player.level === 2) state.player.dashUnlocked = true;
      if (state.player.level === 3) state.player.doubleShot = true;
      if (state.player.level === 4) state.player.shieldPulse = true;
      if (state.player.level === 5) state.player.slowTime = true;
      if (state.player.level === 2) state.upgradesTaken.dash = true;
      if (state.player.level === 3) state.upgradesTaken.double_shot = true;
      if (state.player.level === 4) state.upgradesTaken.shield_pulse = true;
      if (state.player.level === 5) state.upgradesTaken.slow_time = true;

      upgradeOverlay("Level Up", pickUpgrades(UPS_STRONG));
    }

    function addScore(amount) {
      state.score += amount;
      if (state.score > state.best) {
        state.best = state.score;
        setBestScore(state.mode || "arcade", state.best);
      }
    }

    function updateHud(dt) {
      state.hudTimer += dt;
      if (state.hudTimer < 0.1) return;
      state.hudTimer = 0;
      hud.hp.textContent = `${state.player.hp}/${state.player.maxHp}`;
      hud.lv.textContent = state.player.level;
      hud.xp.textContent = `${Math.floor(state.player.xp)}/${state.player.xpTo}`;
      hud.combo.textContent = state.player.combo;
      hud.time.textContent = state.time.toFixed(1);
      hud.score.textContent = Math.floor(state.score);
      hud.best.textContent = state.best;
    }

    function update(dt) {
      if (state.paused) return;

      if (state.hitStop > 0) {
        state.hitStop -= dt;
        if (state.hitStop < 0) state.hitStop = 0;
        return;
      }

      state.time += dt;

      if (state.mode !== "hub" && state.time >= state.runLength) {
        endRun("Time limit reached.");
        return;
      }

      if (state.mode !== "hub" && state.mode !== "boss") {
        if (state.time >= state.nextGateAt) {
          triggerGate();
          scheduleGate();
        }
        if (state.time >= state.nextWaveAt) {
          state.waveIndex += 1;
          scheduleWave();
          upgradeOverlay("Wave Clear", pickUpgrades(UPS_STRONG));
        }
      }

      updatePlayer(dt);
      updateDrones(dt);
      updateBullets(dt);
      updateEnemies(dt);
      updateEnemyBullets(dt);
      updateOrbs(dt);
      updateHazards(dt);
      updateParticles(dt);
      updateBoss(dt);

      if (state.player.xp >= state.player.xpTo) {
        onLevelUp();
      }

      updateCamera(dt);
    }

    function updatePlayer(dt) {
      const player = state.player;
      const input = {
        x: (keys["KeyD"] ? 1 : 0) - (keys["KeyA"] ? 1 : 0),
        y: (keys["KeyS"] ? 1 : 0) - (keys["KeyW"] ? 1 : 0)
      };

      const len = Math.hypot(input.x, input.y) || 1;
      input.x /= len;
      input.y /= len;

      if (input.x || input.y) {
        player.dashDir.x = input.x;
        player.dashDir.y = input.y;
      }

      const accel = player.accel * dt;
      player.vx += input.x * accel;
      player.vy += input.y * accel;

      const friction = Math.exp(-player.friction * dt);
      player.vx *= friction;
      player.vy *= friction;

      const speed = Math.hypot(player.vx, player.vy);
      const maxSpeed = player.moveSpeed;
      if (speed > maxSpeed) {
        player.vx = (player.vx / speed) * maxSpeed;
        player.vy = (player.vy / speed) * maxSpeed;
      }

      if (player.dashActive > 0) {
        player.dashActive -= dt;
        if (player.dashActive <= 0) {
          player.dashActive = 0;
        }
        if (state.rng() < 0.6) {
          spawnParticle(player.x, player.y, THEMES[state.theme].accent, 1.1, 0.25, 8);
        }
      }

      if (player.dashReady > 0) player.dashReady -= dt;
      if (player.invuln > 0) player.invuln -= dt;

      if (player.dashUnlocked && keys["Space"] && player.dashReady <= 0 && player.dashActive <= 0) {
        startDash();
      }

      if (player.shieldPulse && keys["KeyQ"] && player.shieldCd <= 0) {
        pulseShield();
      }

      if (player.slowTime && keys["KeyE"] && player.slowCd <= 0) {
        triggerSlowTime();
      }

      if (player.shieldCd > 0) player.shieldCd -= dt;
      if (player.slowCd > 0) player.slowCd -= dt;
      if (player.slowActive > 0) player.slowActive -= dt;

      if (player.timeSlip && state.rng() < 0.004) {
        player.slowActive = 2.2;
      }

      player.x += player.vx * dt;
      player.y += player.vy * dt;

      const bounds = 1000;
      player.x = clamp(player.x, -bounds, bounds);
      player.y = clamp(player.y, -bounds, bounds);

      const worldMouse = screenToWorld(mouse.x, mouse.y);
      const aim = normalize(worldMouse.x - player.x, worldMouse.y - player.y);

      if (mouse.down) {
        player.fireCd -= dt;
        if (player.fireCd <= 0) {
          shoot(aim);
          player.fireCd = 1 / player.fireRate;
        }
      } else {
        player.fireCd = Math.min(player.fireCd, 0);
      }
    }

    function startDash() {
      const player = state.player;
      player.dashActive = player.dashTime;
      const comboBonus = Math.min(0.35, player.combo * 0.05);
      player.dashReady = player.dashCooldown * (1 - comboBonus);
      player.invuln = Math.max(player.invuln, 0.35);
      const dir = normalize(player.dashDir.x, player.dashDir.y);
      player.vx = dir.x * player.dashSpeed;
      player.vy = dir.y * player.dashSpeed;
      state.shake = Math.min(1, state.shake + 0.4);
      for (let i = 0; i < 12; i++) {
        spawnParticle(player.x, player.y, THEMES[state.theme].particle, 1.2, 0.3, 10);
      }
      if (player.burningDash) {
        spawnFireTrail(player.x, player.y);
      }
    }

    function pulseShield() {
      const player = state.player;
      player.shieldCd = 8;
      for (let i = 0; i < state.enemies.length; i++) {
        const enemy = state.enemies[i];
        const dist = distance(player.x, player.y, enemy.x, enemy.y);
        if (dist < 140) {
          enemy.hp -= 16;
          spawnHit(enemy.x, enemy.y);
        }
      }
      state.shake = Math.min(1, state.shake + 0.2);
      state.particles.push({
        x: player.x,
        y: player.y,
        vx: 0,
        vy: 0,
        life: 0.35,
        size: 160,
        color: THEMES[state.theme].accent,
        ring: true
      });
    }

    function triggerSlowTime() {
      const player = state.player;
      player.slowCd = 12;
      player.slowActive = 3.2;
      state.particles.push({
        x: player.x,
        y: player.y,
        vx: 0,
        vy: 0,
        life: 0.45,
        size: 180,
        color: THEMES[state.theme].accent2,
        ring: true
      });
    }

    function shoot(aim) {
      const player = state.player;
      if (!aim.x && !aim.y) return;
      const baseSpeed = 760;
      const spread = player.wildSpread ? (state.rng() - 0.5) * 0.5 : 0;
      const angle = Math.atan2(aim.y, aim.x) + spread;
      const shots = player.doubleShot ? 2 : 1;
      const critChance = player.crit + player.combo * 0.02;
      for (let i = 0; i < shots; i++) {
        const offset = shots === 2 ? (i === 0 ? -0.08 : 0.08) : 0;
        const dir = { x: Math.cos(angle + offset), y: Math.sin(angle + offset) };
        state.bullets.push({
          x: player.x + dir.x * 18,
          y: player.y + dir.y * 18,
          vx: dir.x * baseSpeed,
          vy: dir.y * baseSpeed,
          life: 1.4,
          damage: player.damage,
          r: 4,
          crit: state.rng() < critChance,
          homing: player.homing,
          bounce: player.ricochet ? 1 : 0
        });
      }
    }

    function updateBullets(dt) {
      for (let i = state.bullets.length - 1; i >= 0; i--) {
        const b = state.bullets[i];
        let removed = false;
        b.life -= dt;
        if (b.life <= 0) {
          state.bullets.splice(i, 1);
          continue;
        }

        if (b.homing && state.enemies.length) {
          const target = findNearestEnemy(b.x, b.y);
          if (target) {
            const dir = normalize(target.x - b.x, target.y - b.y);
            b.vx += dir.x * 1200 * dt;
            b.vy += dir.y * 1200 * dt;
          }
        }

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        const bounds = 1040;
        if (Math.abs(b.x) > bounds || Math.abs(b.y) > bounds) {
          if (b.bounce > 0) {
            b.bounce -= 1;
            if (Math.abs(b.x) > bounds) b.vx *= -1;
            if (Math.abs(b.y) > bounds) b.vy *= -1;
            b.x = clamp(b.x, -bounds, bounds);
            b.y = clamp(b.y, -bounds, bounds);
          } else {
            state.bullets.splice(i, 1);
            continue;
          }
        }

        for (let j = state.enemies.length - 1; j >= 0; j--) {
          const enemy = state.enemies[j];
          if (distance(b.x, b.y, enemy.x, enemy.y) < enemy.r + b.r) {
            const dmg = b.crit ? b.damage * 1.8 : b.damage;
            enemy.hp -= dmg;
            spawnHit(enemy.x, enemy.y);
            if (!b.bounce) {
              state.bullets.splice(i, 1);
              removed = true;
            }
            if (enemy.hp <= 0) {
              killEnemy(enemy, j);
            }
            break;
          }
        }
        if (removed) continue;
        if (state.mode === "boss" && state.boss) {
          const boss = state.boss;
          if (distance(b.x, b.y, boss.x, boss.y) < boss.r + b.r) {
            const dmg = b.crit ? b.damage * 1.8 : b.damage;
            const scale = boss.vulnerable > 0 ? 1 : 0.25;
            boss.hp -= dmg * scale;
            spawnHit(boss.x, boss.y);
            state.bullets.splice(i, 1);
          }
        }
      }
    }

    function updateEnemyBullets(dt) {
      for (let i = state.enemyBullets.length - 1; i >= 0; i--) {
        const b = state.enemyBullets[i];
        b.life -= dt;
        if (b.life <= 0) {
          state.enemyBullets.splice(i, 1);
          continue;
        }
        b.x += b.vx * dt;
        b.y += b.vy * dt;

        if (distance(b.x, b.y, state.player.x, state.player.y) < b.r + state.player.radius) {
          damagePlayer(1);
          state.enemyBullets.splice(i, 1);
        }
      }
    }

    function updateEnemies(dt) {
      if (state.mode === "hub" || state.mode === "boss") return;

      const targetCount = Math.min(4 + state.waveIndex * 2, 32);
      if (state.enemies.length < targetCount) {
        if (state.rng() < 0.08) spawnEnemy(randomEnemyType());
      }

      for (let i = state.enemies.length - 1; i >= 0; i--) {
        const e = state.enemies[i];
        const slow = state.player.slowActive > 0 ? 0.55 : 1;
        if (e.type === "chaser") {
          const dir = normalize(state.player.x - e.x, state.player.y - e.y);
          e.vx = dir.x * e.speed * slow;
          e.vy = dir.y * e.speed * slow;
        } else if (e.type === "shooter") {
          const dist = distance(state.player.x, state.player.y, e.x, e.y);
          const dir = normalize(state.player.x - e.x, state.player.y - e.y);
          if (dist < 220) {
            e.vx = -dir.x * e.speed * slow;
            e.vy = -dir.y * e.speed * slow;
          } else if (dist > 360) {
            e.vx = dir.x * e.speed * slow;
            e.vy = dir.y * e.speed * slow;
          } else {
            e.vx *= 0.8;
            e.vy *= 0.8;
          }
          e.shootCd -= dt;
          if (e.shootCd <= 0) {
            e.shootCd = 2.2;
            enemyShoot(e);
          }
        } else if (e.type === "charger") {
          if (!e.state) {
            e.state = "telegraph";
            e.stateTimer = 0.7;
          }
          if (e.state === "telegraph") {
            e.stateTimer -= dt;
            if (e.stateTimer <= 0) {
              e.state = "charge";
              e.stateTimer = 0.4;
              const dir = normalize(state.player.x - e.x, state.player.y - e.y);
              e.vx = dir.x * e.speed * 3.2;
              e.vy = dir.y * e.speed * 3.2;
            }
          } else if (e.state === "charge") {
            e.stateTimer -= dt;
            if (e.stateTimer <= 0) {
              e.state = "cool";
              e.stateTimer = 0.4;
              e.vx *= 0.4;
              e.vy *= 0.4;
            }
          } else if (e.state === "cool") {
            e.stateTimer -= dt;
            if (e.stateTimer <= 0) {
              e.state = null;
            }
          }
        }

        e.x += e.vx * dt;
        e.y += e.vy * dt;

        if (distance(e.x, e.y, state.player.x, state.player.y) < e.r + state.player.radius) {
          damagePlayer(1);
          e.vx *= -0.6;
          e.vy *= -0.6;
        }
      }
    }

    function updateBoss(dt) {
      if (state.mode !== "boss" || !state.boss) return;
      const boss = state.boss;
      const slow = state.player.slowActive > 0 ? 0.55 : 1;
      if (boss.vulnerable > 0) boss.vulnerable -= dt;
      boss.timer -= dt;
      boss.shootCd -= dt;
      boss.chargeCd -= dt;

      if (boss.timer <= 0) {
        boss.timer = 6 + state.rng() * 4;
        if (!state.gatePending) triggerGate();
      }

      if (boss.shootCd <= 0) {
        boss.shootCd = boss.pattern === 0 ? 1.8 : 1.2;
        bossShoot(boss);
      }

      if (boss.chargeCd <= 0) {
        boss.chargeCd = 5.5;
        boss.charge = 0.45;
        const dir = normalize(state.player.x - boss.x, state.player.y - boss.y);
        boss.vx = dir.x * boss.speed * 2.4;
        boss.vy = dir.y * boss.speed * 2.4;
      }

      if (boss.charge > 0) {
        boss.charge -= dt;
      } else {
        const dir = normalize(state.player.x - boss.x, state.player.y - boss.y);
        boss.vx = dir.x * boss.speed * slow;
        boss.vy = dir.y * boss.speed * slow;
      }

      boss.x += boss.vx * dt;
      boss.y += boss.vy * dt;

      if (distance(boss.x, boss.y, state.player.x, state.player.y) < boss.r + state.player.radius) {
        damagePlayer(1);
      }

      if (boss.hp <= 0) {
        const next = boss.stage + 1;
        if (next < 3) {
          spawnBoss(next);
        } else {
          endRun("Bosses defeated.");
        }
      }
    }

    function updateOrbs(dt) {
      const player = state.player;
      const magnet = player.magnet + player.combo * 20;
      for (let i = state.orbs.length - 1; i >= 0; i--) {
        const orb = state.orbs[i];
        const dist = distance(orb.x, orb.y, player.x, player.y);
        if (dist < magnet) {
          const dir = normalize(player.x - orb.x, player.y - orb.y);
          orb.vx += dir.x * 1200 * dt;
          orb.vy += dir.y * 1200 * dt;
        }
        orb.x += orb.vx * dt;
        orb.y += orb.vy * dt;
        if (dist < player.radius + 8) {
          player.xp += orb.value;
          if (player.orbBoom) {
            spawnExplosion(orb.x, orb.y, 80, 1);
          }
          state.orbs.splice(i, 1);
        }
      }
    }

    function updateHazards(dt) {
      for (let i = state.hazards.length - 1; i >= 0; i--) {
        const hz = state.hazards[i];
        if (hz.type === "laser") {
          hz.angle += dt * 0.8;
          const playerDist = distance(state.player.x, state.player.y, hz.x, hz.y);
          if (playerDist < hz.length) {
            const angleToPlayer = Math.atan2(state.player.y - hz.y, state.player.x - hz.x);
            const diff = Math.abs(normalizeAngle(hz.angle - angleToPlayer));
            if (diff < 0.15) {
              damagePlayer(1);
            }
          }
        } else if (hz.type === "spike") {
          if (
            Math.abs(state.player.x - hz.x) < hz.w / 2 &&
            Math.abs(state.player.y - hz.y) < hz.h / 2
          ) {
            damagePlayer(1);
          }
        } else if (hz.type === "barrel") {
          hz.timer -= dt;
          if (hz.timer <= 0) {
            spawnExplosion(hz.x, hz.y, 140, 1);
            state.hazards.splice(i, 1);
            continue;
          }
        }
      }
    }

    function updateParticles(dt) {
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          state.particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }
    }

    function updateDrones(dt) {
      const player = state.player;
      const count = player.drones;
      if (count <= 0) return;
      if (state.drones.length !== count) {
        state.drones = [];
        for (let i = 0; i < count; i++) {
          state.drones.push({ angle: (Math.PI * 2 * i) / count, radius: 48 });
        }
      }
      for (let i = 0; i < state.drones.length; i++) {
        const drone = state.drones[i];
        drone.angle += dt * 1.8;
        drone.x = player.x + Math.cos(drone.angle) * drone.radius;
        drone.y = player.y + Math.sin(drone.angle) * drone.radius;
        for (let j = state.enemies.length - 1; j >= 0; j--) {
          const enemy = state.enemies[j];
          if (distance(drone.x, drone.y, enemy.x, enemy.y) < enemy.r + 8) {
            enemy.hp -= 6;
            spawnHit(enemy.x, enemy.y);
            if (enemy.hp <= 0) killEnemy(enemy, j);
          }
        }
        if (state.mode === "boss" && state.boss) {
          const boss = state.boss;
          if (distance(drone.x, drone.y, boss.x, boss.y) < boss.r + 10) {
            const scale = boss.vulnerable > 0 ? 1 : 0.25;
            boss.hp -= 4 * scale;
            spawnHit(boss.x, boss.y);
          }
        }
      }
    }

    function updateCamera(dt) {
      const lag = 0.08;
      state.cam.x += (state.player.x - state.cam.x) * lag;
      state.cam.y += (state.player.y - state.cam.y) * lag;
      if (state.shake > 0) {
        state.shake = Math.max(0, state.shake - dt * 1.6);
      }
    }

    function endRun(reason) {
      const score = Math.floor(state.score);
      endOverlay(`${reason} Score: ${score}.`);
    }

    function damagePlayer(amount) {
      const player = state.player;
      if (player.invuln > 0) return;
      player.hp -= amount;
      player.invuln = 0.8;
      state.shake = Math.min(1, state.shake + 0.3);
      spawnHit(player.x, player.y);
      if (player.hp <= 0) {
        endRun("You fell in the arena.");
      }
    }

    function triggerGate() {
      if (state.paused) return;
      state.gatePending = QUESTIONS[Math.floor(state.rng() * QUESTIONS.length)];
      gateOverlay(state.gatePending);
    }

    function spawnEnemy(type) {
      const angle = state.rng() * Math.PI * 2;
      const dist = 720;
      const e = {
        type,
        x: state.player.x + Math.cos(angle) * dist,
        y: state.player.y + Math.sin(angle) * dist,
        vx: 0,
        vy: 0,
        r: type === "charger" ? 18 : 16,
        hp: type === "charger" ? 30 : type === "shooter" ? 22 : 18,
        speed: type === "charger" ? 180 : type === "shooter" ? 120 : 160,
        shootCd: 1.5,
        state: null,
        stateTimer: 0
      };
      state.enemies.push(e);
    }

    function randomEnemyType() {
      const roll = state.rng();
      if (roll < 0.45) return "chaser";
      if (roll < 0.75) return "shooter";
      return "charger";
    }

    function enemyShoot(enemy) {
      const dir = normalize(state.player.x - enemy.x, state.player.y - enemy.y);
      state.enemyBullets.push({
        x: enemy.x,
        y: enemy.y,
        vx: dir.x * 360,
        vy: dir.y * 360,
        life: 2.2,
        r: 4
      });
    }

    function spawnBoss(stage) {
      state.enemyBullets = [];
      state.boss = {
        stage,
        x: state.player.x + 420,
        y: state.player.y,
        vx: 0,
        vy: 0,
        r: 44,
        hp: 120 + stage * 50,
        maxHp: 120 + stage * 50,
        speed: 120 + stage * 15,
        vulnerable: 0,
        timer: 6,
        shootCd: 1.4,
        chargeCd: 3.8,
        charge: 0,
        pattern: stage % 2
      };
    }

    function bossShoot(boss) {
      const bursts = boss.pattern === 0 ? 6 : 10;
      for (let i = 0; i < bursts; i++) {
        const angle = (Math.PI * 2 * i) / bursts;
        state.enemyBullets.push({
          x: boss.x,
          y: boss.y,
          vx: Math.cos(angle) * 280,
          vy: Math.sin(angle) * 280,
          life: 2.4,
          r: 4
        });
      }
    }

    function killEnemy(enemy, index) {
      state.enemies.splice(index, 1);
      addScore(20 + state.waveIndex * 4);
      spawnOrb(enemy.x, enemy.y, 6);
      state.hitStop = 0.08;
      spawnExplosion(enemy.x, enemy.y, 60, 0.8);
    }

    function spawnOrb(x, y, value) {
      state.orbs.push({ x, y, vx: 0, vy: 0, value });
    }

    function spawnHit(x, y) {
      for (let i = 0; i < 6; i++) {
        spawnParticle(x, y, THEMES[state.theme].accent2, 1, 0.2, 14);
      }
    }

    function spawnExplosion(x, y, radius, power) {
      const player = state.player;
      if (distance(x, y, player.x, player.y) < radius) {
        damagePlayer(1);
      }
      for (let i = 0; i < 18; i++) {
        const angle = state.rng() * Math.PI * 2;
        const speed = 140 + state.rng() * 120;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.6,
          size: 6 + state.rng() * 4,
          color: THEMES[state.theme].danger
        });
      }
      state.shake = Math.min(1, state.shake + power * 0.4);
    }

    function spawnParticle(x, y, color, speedScale, life, size) {
      const angle = state.rng() * Math.PI * 2;
      const speed = (40 + state.rng() * 80) * speedScale;
      state.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life,
        size,
        color
      });
    }

    function spawnFireTrail(x, y) {
      for (let i = 0; i < 5; i++) {
        spawnParticle(x, y, THEMES[state.theme].danger, 1.4, 0.4, 10);
      }
    }

    function screenToWorld(sx, sy) {
      const cam = state.cam;
      const offsetX = viewW / 2;
      const offsetY = viewH / 2;
      return {
        x: cam.x + (sx - offsetX),
        y: cam.y + (sy - offsetY)
      };
    }

    function render() {
      const theme = THEMES[state.theme];
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, viewW, viewH);

      const shakeMag = state.shake * 8;
      const shakeX = (Math.random() - 0.5) * shakeMag;
      const shakeY = (Math.random() - 0.5) * shakeMag;

      ctx.translate(viewW / 2 + shakeX, viewH / 2 + shakeY);
      ctx.translate(-state.cam.x, -state.cam.y);

      drawBackground(theme);
      drawHazards(theme);
      drawOrbs(theme);
      drawEnemies(theme);
      drawBoss(theme);
      drawBullets(theme);
      drawEnemyBullets(theme);
      drawDrones(theme);
      drawPlayer(theme);
      drawParticles(theme);
      if (state.mode === "hub") drawHub(theme);
    }

    function drawBackground(theme) {
      ctx.save();
      for (const star of state.stars) {
        const px = star.x + state.cam.x * (1 - star.layer);
        const py = star.y + state.cam.y * (1 - star.layer);
        ctx.globalAlpha = 0.35 + star.layer * 0.4;
        ctx.fillStyle = theme.friendly;
        ctx.beginPath();
        ctx.arc(px, py, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      const gridSize = 80;
      ctx.strokeStyle = theme.grid;
      ctx.lineWidth = 1;
      const startX = Math.floor((state.cam.x - viewW / 2) / gridSize) * gridSize - gridSize;
      const endX = state.cam.x + viewW / 2 + gridSize;
      const startY = Math.floor((state.cam.y - viewH / 2) / gridSize) * gridSize - gridSize;
      const endY = state.cam.y + viewH / 2 + gridSize;
      for (let x = startX; x < endX; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
      }
      for (let y = startY; y < endY; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      }
    }

    function drawPlayer(theme) {
      const p = state.player;
      const pulse = p.invuln > 0 ? 0.6 + Math.sin(performance.now() * 0.02) * 0.2 : 1;
      ctx.save();
      ctx.translate(p.x, p.y);
      const stretch = p.dashActive > 0 ? 1.2 : 1;
      ctx.scale(stretch, 1 / stretch);
      ctx.fillStyle = theme.accent;
      ctx.shadowColor = theme.glow;
      ctx.shadowBlur = 18;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius * pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawBullets(theme) {
      ctx.shadowColor = theme.glow;
      ctx.shadowBlur = 10;
      for (const b of state.bullets) {
        ctx.fillStyle = b.crit ? theme.accent2 : theme.friendly;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    function drawEnemyBullets(theme) {
      ctx.fillStyle = theme.danger;
      for (const b of state.enemyBullets) {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawEnemies(theme) {
      for (const e of state.enemies) {
        ctx.fillStyle = e.type === "shooter" ? theme.accent2 : theme.danger;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawBoss(theme) {
      if (!state.boss) return;
      const b = state.boss;
      ctx.fillStyle = theme.danger;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = b.vulnerable > 0 ? theme.accent : theme.accent2;
      ctx.lineWidth = b.vulnerable > 0 ? 5 : 3;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r + 8, 0, Math.PI * 2);
      ctx.stroke();
    }

    function drawOrbs(theme) {
      ctx.fillStyle = theme.friendly;
      for (const orb of state.orbs) {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawHazards(theme) {
      for (const hz of state.hazards) {
        if (hz.type === "laser") {
          ctx.strokeStyle = theme.danger;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(hz.x, hz.y);
          ctx.lineTo(hz.x + Math.cos(hz.angle) * hz.length, hz.y + Math.sin(hz.angle) * hz.length);
          ctx.stroke();
        } else if (hz.type === "spike") {
          ctx.fillStyle = theme.danger;
          ctx.fillRect(hz.x - hz.w / 2, hz.y - hz.h / 2, hz.w, hz.h);
        } else if (hz.type === "barrel") {
          ctx.fillStyle = theme.accent2;
          ctx.beginPath();
          ctx.arc(hz.x, hz.y, 12, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function drawParticles(theme) {
      for (const p of state.particles) {
        ctx.globalAlpha = Math.max(0, p.life * 1.8);
        ctx.fillStyle = p.color || theme.particle;
        if (p.ring) {
          ctx.strokeStyle = p.color || theme.accent;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 - p.life), 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size || 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }

    function drawDrones(theme) {
      for (const d of state.drones) {
        ctx.fillStyle = theme.accent2;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawHub(theme) {
      const hubs = getHubPortals();
      for (const hub of hubs) {
        ctx.fillStyle = theme.panelAlt;
        ctx.fillRect(hub.x - hub.w / 2, hub.y - hub.h / 2, hub.w, hub.h);
        ctx.strokeStyle = theme.accent;
        ctx.strokeRect(hub.x - hub.w / 2, hub.y - hub.h / 2, hub.w, hub.h);
        ctx.fillStyle = theme.text;
        ctx.font = "14px Raleway";
        ctx.textAlign = "center";
        ctx.fillText(hub.label, hub.x, hub.y + 4);
      }
    }

    function getHubPortals() {
      return [
        { x: -260, y: -120, w: 120, h: 70, label: "Arcade" },
        { x: 260, y: -120, w: 120, h: 70, label: "Daily" },
        { x: -260, y: 140, w: 120, h: 70, label: "Boss" },
        { x: 260, y: 140, w: 120, h: 70, label: "Gallery" }
      ];
    }

    function checkHubInteractions() {
      if (state.mode !== "hub") return;
      if (state.paused) return;
      if (!keys["KeyF"]) return;
      const hubs = getHubPortals();
      for (const hub of hubs) {
        if (
          Math.abs(state.player.x - hub.x) < hub.w / 2 &&
          Math.abs(state.player.y - hub.y) < hub.h / 2
        ) {
          if (hub.label === "Arcade") startRun("arcade");
          if (hub.label === "Daily") startRun("daily");
          if (hub.label === "Boss") startRun("boss");
          if (hub.label === "Gallery") startRun("arcade");
        }
      }
    }

    function loop(timestamp) {
      const dt = Math.min(0.033, (timestamp - state.lastTime) / 1000);
      state.lastTime = timestamp;
      update(dt);
      checkHubInteractions();
      updateHud(dt);
      render();
      state.rafId = requestAnimationFrame(loop);
    }

    function findNearestEnemy(x, y) {
      let best = null;
      let bestDist = Infinity;
      for (const e of state.enemies) {
        const dist = distance(x, y, e.x, e.y);
        if (dist < bestDist) {
          bestDist = dist;
          best = e;
        }
      }
      return best;
    }

    function distance(x1, y1, x2, y2) {
      return Math.hypot(x2 - x1, y2 - y1);
    }

    function normalize(x, y) {
      const len = Math.hypot(x, y);
      if (!len) return { x: 0, y: 0 };
      return { x: x / len, y: y / len };
    }

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function normalizeAngle(a) {
      const twoPi = Math.PI * 2;
      return ((a + Math.PI) % twoPi) - Math.PI;
    }

    function createStars() {
      const stars = [];
      for (let i = 0; i < 70; i++) {
        stars.push({
          x: (Math.random() - 0.5) * 2600,
          y: (Math.random() - 0.5) * 2600,
          r: 1 + Math.random() * 2.2,
          layer: 0.2 + Math.random() * 0.6
        });
      }
      return stars;
    }

    function hashString(str) {
      let h = 1779033703 ^ str.length;
      for (let i = 0; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
      }
      return (h >>> 0) + 1;
    }

    function seededRng(seed) {
      let t = seed;
      return function () {
        t += 0x6d2b79f5;
        let r = Math.imul(t ^ (t >>> 15), t | 1);
        r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
      };
    }

    function seedHazards() {
      if (state.mode === "hub" || state.mode === "boss") return;
      if (state.paused) return;
      if (state.hazards.length >= 2) return;
      const pick = state.rng();
      if (pick < 0.33) {
        state.hazards.push({ type: "laser", x: 0, y: 0, angle: state.rng() * Math.PI * 2, length: 620 });
      } else if (pick < 0.66) {
        state.hazards.push({ type: "spike", x: state.rng() * 400 - 200, y: state.rng() * 400 - 200, w: 90, h: 60 });
      } else {
        state.hazards.push({ type: "barrel", x: state.rng() * 400 - 200, y: state.rng() * 400 - 200, timer: 6 + state.rng() * 4 });
      }
    }

    hazardTimer = setInterval(seedHazards, 8000);

    startMenu();
    state.lastTime = performance.now();
    state.rafId = requestAnimationFrame(loop);
  }

  function initButton() {
    if (document.getElementById("fr-btn")) return;
    ensureStyle();
    const btn = document.createElement("button");
    btn.id = "fr-btn";
    btn.textContent = "Play Familiar Runner";
    const meta = loadMeta();
    applyButtonTheme(btn, meta.theme || "neon");
    btn.addEventListener("click", openModal);
    document.body.appendChild(btn);
  }

  function applyButtonTheme(btn, theme) {
    if (theme === "cozy") {
      btn.style.background = "linear-gradient(90deg,#f2b179,#7bb08a)";
      btn.style.color = "#2f2a24";
      btn.style.boxShadow = "0 0 18px rgba(226,125,96,0.35)";
    } else {
      btn.style.background = "linear-gradient(90deg,#00f5d4,#ff4fd8)";
      btn.style.color = "#ffffff";
      btn.style.boxShadow = "0 0 18px rgba(0,245,212,0.5)";
    }
  }

  const SAE = (window.SummerAnnEnhancements = window.SummerAnnEnhancements || {});
  SAE.modules = SAE.modules || {};
  SAE.modules.familiarRunner = {
    init: initButton,
    open: openModal
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initButton);
  } else {
    initButton();
  }
})();
