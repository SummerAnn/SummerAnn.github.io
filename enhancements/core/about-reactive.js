/**
 * About/Profile Enhancements
 * Creates a clean, Medium-inspired layout with an interactive text sphere.
 */

(function() {
  'use strict';

  const SPHERE_WORDS = [
    // Creative & Performance (25 words)
    'Singer', 'Model', 'Actress', 'Performance', 'Stage', 'Studio', 
    'Voice', 'Melody', 'Chorus', 'Rhythm', 'Dance', 'Theater',
    'Portfolio', 'Gallery', 'Art', 'Aesthetic', 'Expression',
    'Acting', 'Fashion', 'Photography', 'Cinematography', 'Directing',
    'Music', 'Composition', 'Vocal', 'Rehearsal', 'Audition',
    
    // Technical & Engineering (30 words)
    'Research', 'LLMs', 'Health AI', 'Systems', 'Product', 'Builder',
    'Engineering', 'Code', 'Algorithm', 'Architecture', 'Full Stack',
    'Machine Learning', 'Data', 'Pipeline', 'Automation', 'Optimization',
    'Python', 'JavaScript', 'React', 'Node', 'TypeScript', 'SQL',
    'API', 'Database', 'Server', 'Client', 'Framework', 'Library',
    'Testing', 'Debugging', 'Deployment', 'Scaling',
    
    // Innovation & Leadership (20 words)
    'Founder', 'Creator', 'Innovator', 'Vision', 'Strategy', 'Leadership',
    'Startup', 'Design', 'UX', 'UI', 'Prototype', 'Wireframe',
    'Entrepreneur', 'Pioneer', 'Trailblazer', 'Mentor', 'Guide',
    'Influence', 'Impact', 'Change',
    
    // Personal Qualities (25 words)
    'Curiosity', 'Empathy', 'Trust', 'Clarity', 'Depth', 'Passion',
    'Dedication', 'Precision', 'Excellence', 'Growth', 'Learning',
    'Adaptability', 'Resilience', 'Integrity', 'Authenticity',
    'Confidence', 'Courage', 'Determination', 'Focus', 'Discipline',
    'Wisdom', 'Intuition', 'Insight', 'Awareness', 'Mindfulness',
    
    // Work & Process (25 words)
    'Storytelling', 'Communication', 'Collaboration', 'Execution',
    'Iteration', 'Refinement', 'Quality', 'Craft', 'Detail',
    'Innovation', 'Exploration', 'Discovery', 'Experiment',
    'Planning', 'Strategy', 'Analysis', 'Synthesis', 'Problem Solving',
    'Critical Thinking', 'Creativity', 'Imagination', 'Inspiration',
    'Motivation', 'Drive', 'Ambition',
    
    // Values & Philosophy (15 words)
    'Ethics', 'Responsibility', 'Impact', 'Meaning', 'Purpose',
    'Balance', 'Harmony', 'Flow', 'Energy', 'Vibrancy',
    'Truth', 'Beauty', 'Elegance', 'Simplicity', 'Complexity',
    
    // Skills & Domains (30 words)
    'Frontend', 'Backend', 'DevOps', 'Mobile', 'Web', 'Cloud',
    'Analytics', 'Visualization', 'Interface', 'Experience',
    'Genomics', 'Bioinformatics', 'Healthcare', 'Wellness',
    'NLP', 'Computer Vision', 'Deep Learning', 'Neural Networks',
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy',
    'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'CI/CD',
    
    // Creative Tech & Media (20 words)
    'Video', 'Editing', 'Post-Production', 'Color Grading', 'Sound Design',
    'Animation', 'Motion Graphics', 'Visual Effects', 'Cinema',
    'Documentary', 'Short Film', 'Music Video', 'Commercial',
    'Branding', 'Identity', 'Typography', 'Layout', 'Grid',
    'Composition', 'Narrative',
    
    // Academic & Research (15 words)
    'Thesis', 'Publication', 'Conference', 'Journal', 'Paper',
    'Methodology', 'Hypothesis', 'Experiment', 'Analysis', 'Results',
    'Peer Review', 'Citation', 'Scholarship', 'Academic', 'Research',
    
    // Languages & Communication (10 words)
    'English', 'Korean', 'German', 'French', 'Multilingual',
    'Translation', 'Interpretation', 'Linguistics', 'Grammar', 'Syntax',
    
    // Tools & Technologies (20 words)
    'Git', 'GitHub', 'VS Code', 'Terminal', 'Command Line',
    'Linux', 'Unix', 'Shell', 'Bash', 'Zsh',
    'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch',
    'GraphQL', 'REST', 'WebSocket', 'HTTP', 'HTTPS', 'SSL',
    
    // Soft Skills (15 words)
    'Teamwork', 'Networking', 'Presentation', 'Public Speaking',
    'Negotiation', 'Conflict Resolution', 'Time Management',
    'Organization', 'Prioritization', 'Delegation', 'Mentoring',
    'Coaching', 'Feedback', 'Review', 'Evaluation',
    
    // Additional Creative (20 words)
    'Poetry', 'Lyrics', 'Songwriting', 'Recording', 'Studio Session',
    'Photoshoot', 'Editorial', 'Runway', 'Commercial', 'Campaign',
    'Brand Ambassador', 'Influencer', 'Content Creator', 'Producer',
    'Director', 'Cinematographer', 'Editor', 'Colorist', 'Sound Engineer', 'Mix',
    
    // Additional Technical (25 words)
    'Microservices', 'Distributed Systems', 'Scalability', 'Performance',
    'Security', 'Encryption', 'Authentication', 'Authorization', 'OAuth',
    'JWT', 'GraphQL', 'WebSocket', 'Real-time', 'Streaming', 'Event-driven',
    'Message Queue', 'Kafka', 'RabbitMQ', 'Redis Cache', 'CDN', 'Load Balancing',
    'Monitoring', 'Logging', 'Metrics', 'Observability', 'APM',
    
    // Additional Personal (15 words)
    'Versatility', 'Multidisciplinary', 'Interdisciplinary', 'Cross-functional',
    'Holistic', 'Systematic', 'Methodical', 'Analytical', 'Strategic',
    'Tactical', 'Proactive', 'Initiative', 'Resourceful', 'Inventive', 'Original'
  ];

  function injectStyles() {
    if (document.getElementById('about-reactive-styles')) return;

    const style = document.createElement('style');
    style.id = 'about-reactive-styles';
    style.textContent = `
      #about.about-minimal {
        position: relative;
        overflow: hidden;
        --glow-x: 50%;
        --glow-y: 30%;
      }

      #about.about-minimal::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
          radial-gradient(520px 420px at var(--glow-x) var(--glow-y), rgba(99, 102, 241, 0.18), transparent 60%),
          radial-gradient(420px 320px at 80% 80%, rgba(34, 211, 238, 0.12), transparent 65%);
        pointer-events: none;
        opacity: 0.9;
      }

      #about.about-minimal > :not(.about-hero-layout) {
        display: none !important;
      }

      #about .about-hero-layout {
        max-width: 1100px;
        margin: 0 auto;
        padding: 40px 24px 60px;
        display: grid;
        grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
        gap: 32px;
        align-items: start;
        position: relative;
        z-index: 1;
      }

      #about .about-hero-copy {
        padding: 24px 26px;
        border-radius: 22px;
        background: 
          linear-gradient(135deg, rgba(15, 18, 24, 0.85), rgba(10, 12, 18, 0.82)),
          url('/images/myProfile.jpg');
        background-size: cover;
        background-position: center;
        background-blend-mode: overlay;
        border: 1px solid rgba(255, 255, 255, 0.14);
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      #about .about-hero-copy::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url('/images/myProfile.jpg');
        background-size: cover;
        background-position: center;
        opacity: 0.25;
        z-index: 0;
        pointer-events: none;
      }

      #about .about-hero-copy::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(99, 102, 241, 0.12), transparent 60%);
        opacity: 0.6;
        z-index: 1;
        pointer-events: none;
      }

      #about .about-hero-copy > * {
        position: relative;
        z-index: 2;
      }

      #about .about-hero-copy:hover {
        transform: translateY(-4px);
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
      }

      #about .about-hero-highlights {
        display: grid;
        gap: 12px;
        margin-top: 18px;
      }

      #about .about-highlight {
        padding: 12px 14px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.12);
        display: grid;
        gap: 6px;
        position: relative;
        overflow: hidden;
      }

      #about .about-highlight::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, rgba(99, 102, 241, 0.18), transparent 60%);
        opacity: 0.5;
        pointer-events: none;
      }

      #about .about-highlight span {
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.6);
      }

      #about .about-highlight strong {
        font-size: 14px;
        font-weight: 600;
        color: #f9fafb;
      }

      #about .about-quote {
        margin-top: 20px;
        padding: 14px 16px;
        border-radius: 16px;
        background: rgba(99, 102, 241, 0.12);
        border: 1px solid rgba(99, 102, 241, 0.35);
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
      }

      #about .about-hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 16px;
      }

      #about .about-action {
        padding: 8px 14px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 600;
        text-decoration: none;
        color: rgba(255, 255, 255, 0.85);
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.18);
        transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
      }

      #about .about-action:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.16);
        border-color: rgba(99, 102, 241, 0.45);
      }

      #about .about-hero-label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 5px 12px;
        border-radius: 999px;
        font-size: 10px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.15);
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 14px;
      }

      #about .about-hero-title {
        font-family: var(--font-display, 'Playfair Display', serif);
        font-weight: 600;
        font-size: clamp(1.8rem, 3vw, 2.2rem);
        color: #f8fafc;
        margin-bottom: 16px;
        line-height: 1.2;
      }

      #about .about-hero-quote {
        font-family: 'Fraunces', 'Charter', 'Georgia', serif;
        font-weight: 400;
        font-size: clamp(1.5rem, 2.5vw, 2rem);
        line-height: 1.3;
        color: #f8fafc;
        margin: 24px 0 20px;
        text-align: center;
        letter-spacing: -0.01em;
        font-style: italic;
        opacity: 0.95;
        position: relative;
      }

      #about .about-hero-quote::before,
      #about .about-hero-quote::after {
        content: '';
        position: absolute;
        width: 60px;
        height: 1px;
        background: rgba(255, 255, 255, 0.3);
        top: 50%;
      }

      #about .about-hero-quote::before {
        left: -80px;
      }

      #about .about-hero-quote::after {
        right: -80px;
      }

      @media (max-width: 768px) {
        #about .about-hero-quote::before,
        #about .about-hero-quote::after {
          display: none;
        }
      }

      #about .about-hero-text {
        font-size: 0.95rem;
        line-height: 1.7;
        color: rgba(255, 255, 255, 0.75);
        margin-bottom: 14px;
      }

      #about .about-hero-copy-expanded {
        display: none;
        margin-top: 0;
      }
      #about .about-hero-copy-expanded.is-expanded {
        display: block;
      }
      #about .about-read-more-btn {
        display: inline-block;
        margin-top: 8px;
        margin-bottom: 16px;
        padding: 8px 16px;
        background: rgba(99, 102, 241, 0.25);
        border: 1px solid rgba(99, 102, 241, 0.4);
        border-radius: 10px;
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
      }
      #about .about-read-more-btn:hover {
        background: rgba(99, 102, 241, 0.35);
        border-color: rgba(99, 102, 241, 0.6);
        transform: translateY(-1px);
      }

      #about .about-sphere-panel {
        background: rgba(15, 18, 24, 0.78);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
        display: grid;
        gap: 12px;
        align-items: center;
        justify-items: center;
        position: relative;
        overflow: hidden;
      }

      #about .about-viz-toggle {
        display: flex;
        gap: 8px;
        padding: 6px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        margin-bottom: 8px;
      }

      #about .about-viz-toggle button {
        flex: 1;
        padding: 6px 12px;
        background: transparent;
        border: none;
        border-radius: 8px;
        color: rgba(255, 255, 255, 0.6);
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      #about .about-viz-toggle button.active {
        background: rgba(99, 102, 241, 0.3);
        color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
      }

      #about .about-viz-toggle button:hover:not(.active) {
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.8);
      }

      #about .about-cloud-canvas,
      #about .about-graph-canvas {
        width: 100%;
        height: 260px;
        border-radius: 16px;
        background: radial-gradient(circle at 25% 20%, rgba(99, 102, 241, 0.18), transparent 60%),
          radial-gradient(circle at 70% 80%, rgba(34, 211, 238, 0.14), transparent 60%),
          rgba(6, 8, 12, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.08);
        display: block;
        cursor: grab;
        box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.4);
      }

      #about .about-cloud-canvas:active,
      #about .about-graph-canvas:active {
        cursor: grabbing;
      }

      #about .about-viz-container {
        position: relative;
        width: 100%;
      }

      #about .about-viz-container canvas {
        display: none;
      }

      #about .about-viz-container canvas.active {
        display: block;
      }

      #about .about-sphere-panel::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.22), transparent 55%);
        opacity: 0.8;
        pointer-events: none;
      }

      #about .about-sphere-title {
        font-family: var(--font-heading, 'Space Grotesk', system-ui, sans-serif);
        font-size: 0.85rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.75);
      }

      #about .about-sphere-hint {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.55);
      }

      #about .about-sphere-canvas {
        width: 100%;
        height: 260px;
        border-radius: 16px;
        background: radial-gradient(circle at 25% 20%, rgba(99, 102, 241, 0.18), transparent 60%),
          radial-gradient(circle at 70% 80%, rgba(34, 211, 238, 0.14), transparent 60%),
          rgba(6, 8, 12, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.08);
        display: block;
        cursor: grab;
        box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.4);
      }

      #about .about-sphere-canvas:active {
        cursor: grabbing;
      }

      #about .about-hero-stats {
        grid-column: 1 / -1;
        background: rgba(15, 18, 24, 0.78);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 22px;
        padding: 20px;
        display: grid;
        gap: 14px;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
      }

      #about .about-stat-title {
        font-family: var(--font-heading, 'Space Grotesk', system-ui, sans-serif);
        font-size: 0.75rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: rgba(255, 255, 255, 0.65);
      }

      #about .about-chip-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      #about .about-chip {
        padding: 5px 11px;
        border-radius: 999px;
        font-size: 11px;
        font-weight: 600;
        color: #e5e7eb;
        background: rgba(99, 102, 241, 0.16);
        border: 1px solid rgba(99, 102, 241, 0.35);
      }

      #about .about-stat-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 12px;
      }

      #about .about-stat {
        padding: 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
      }

      #about .about-stat:hover {
        transform: translateY(-3px);
        border-color: rgba(99, 102, 241, 0.4);
        background: rgba(99, 102, 241, 0.12);
      }

      #about .about-stat strong {
        display: block;
        font-size: 1.2rem;
        font-weight: 700;
        color: #f9fafb;
      }

      #about .about-stat span {
        display: block;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.65);
      }

      #about .about-visitor-count {
        grid-column: 1 / -1;
        margin-top: 24px;
        padding: 20px 24px;
        border-radius: 20px;
        background: rgba(12, 14, 20, 0.78);
        border: 1px solid rgba(255, 255, 255, 0.14);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }

      #about .about-visitor-count-label {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.22em;
        color: rgba(255, 255, 255, 0.6);
      }

      #about .about-visitor-count-value {
        font-size: 1.75rem;
        font-weight: 700;
        color: #f9fafb;
        letter-spacing: 0.02em;
      }

      #about .about-visitor-count-value.loading {
        opacity: 0.6;
      }

      @media (max-width: 900px) {
        #about .about-hero-layout {
          grid-template-columns: 1fr;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #about .about-sphere-canvas {
          cursor: default;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function extractAboutCopy(aboutSection) {
    const headingEl = aboutSection.querySelector('.section-title, h1, h2');
    const heading = headingEl ? headingEl.textContent.trim() : 'About';

    let paragraphs = Array.from(aboutSection.querySelectorAll('p'))
      .map((p) => p.textContent.trim())
      .filter(Boolean);

    if (paragraphs.length === 1) {
      const sentences = paragraphs[0].split(/(?<=[.!?])\s+/).filter(Boolean);
      const grouped = [];
      for (let i = 0; i < sentences.length; i += 2) {
        grouped.push(sentences.slice(i, i + 2).join(' '));
      }
      paragraphs = grouped;
    }

    if (!paragraphs.length) {
      paragraphs = [
        'I build across systems, research, and creative work—bridging rigorous engineering with storytelling and performance.',
        'My focus spans machine learning, computational medicine, and human-centered product design.',
        'Outside of tech, I perform, model, and write music, bringing taste and emotional intelligence into everything I ship.'
      ];
    }

    return { heading, paragraphs };
  }

  function buildLayout(aboutSection) {
    if (aboutSection.querySelector('.about-hero-layout')) return;

    const { heading, paragraphs } = extractAboutCopy(aboutSection);
    const shortCount = Math.min(3, Math.max(1, paragraphs.length));
    const shortParagraphs = paragraphs.slice(0, shortCount);
    const longParagraphs = paragraphs.slice(shortCount);
    const hasExpandable = longParagraphs.length > 0;

    const layout = document.createElement('div');
    layout.className = 'about-hero-layout';

    const shortHtml = shortParagraphs.map((text) => `<p class="about-hero-text">${text}</p>`).join('');
    const longHtml = hasExpandable
      ? longParagraphs.map((text) => `<p class="about-hero-text">${text}</p>`).join('')
      : '';

    layout.innerHTML = `
      <div class="about-hero-copy">
        <span class="about-hero-label">About</span>
        <h2 class="about-hero-title">${heading}</h2>
        <div class="about-hero-quote">Every big idea needs an enabler.</div>
        <div class="about-hero-copy-short">${shortHtml}</div>
        ${hasExpandable ? `<div class="about-hero-copy-expanded" id="about-expanded" aria-hidden="true">${longHtml}</div><button type="button" class="about-read-more-btn" id="about-read-more" aria-expanded="false">Read more</button>` : ''}
        <div class="about-hero-highlights">
          <div class="about-highlight">
            <span>Research</span>
            <strong>Machine learning, LLMs, computational medicine</strong>
          </div>
          <div class="about-highlight">
            <span>Builder</span>
            <strong>Systems → product → real-world impact</strong>
          </div>
          <div class="about-highlight">
            <span>Creative</span>
            <strong>Singer, actress, model, storyteller</strong>
          </div>
        </div>
        <div class="about-hero-actions">
          <a class="about-action" href="https://www.imdb.com/name/nm9520569/" target="_blank" rel="noopener">IMDb</a>
          <a class="about-action" href="https://music.apple.com/us/artist/s-u-m-m-e-r/1602559220" target="_blank" rel="noopener">Apple Music</a>
          <a class="about-action" href="https://open.spotify.com/artist/2LCLnET4J0BsEbwztWl7OL" target="_blank" rel="noopener">Spotify</a>
          <a class="about-action" href="https://www.linkedin.com/in/eunhyung-ann/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
      </div>
      <div class="about-sphere-panel">
        <div class="about-sphere-title">Creative Orbit</div>
        <div class="about-viz-toggle">
          <button class="active" data-viz="sphere">3D Sphere</button>
          <button data-viz="cloud">Word Cloud</button>
          <button data-viz="graph">Network</button>
        </div>
        <div class="about-viz-container">
          <canvas class="about-sphere-canvas active" id="sphereCanvas" aria-label="Interactive text sphere"></canvas>
          <canvas class="about-cloud-canvas" id="cloudCanvas" aria-label="Interactive word cloud"></canvas>
          <canvas class="about-graph-canvas" id="graphCanvas" aria-label="Interactive word network graph"></canvas>
        </div>
        <div class="about-sphere-hint">Drag to interact</div>
      </div>
      <div class="about-hero-stats">
        <div class="about-stat-title">Now Building</div>
        <div class="about-chip-row">
          <span class="about-chip">LLM Systems</span>
          <span class="about-chip">Health AI</span>
          <span class="about-chip">Creative Tech</span>
          <span class="about-chip">Product Design</span>
        </div>
        <div class="about-stat-grid">
          <div class="about-stat">
            <strong>6+</strong>
            <span>Research Threads</span>
          </div>
          <div class="about-stat">
            <strong>18</strong>
            <span>Live Builds</span>
          </div>
          <div class="about-stat">
            <strong>3</strong>
            <span>Creative Disciplines</span>
          </div>
          <div class="about-stat">
            <strong>∞</strong>
            <span>Ideas in Motion</span>
          </div>
        </div>
      </div>
      <div class="about-visitor-count" aria-label="Visitor count">
        <span class="about-visitor-count-label">Visitors</span>
        <span class="about-visitor-count-value loading" id="about-visitor-count" aria-live="polite">—</span>
      </div>
    `;

    aboutSection.prepend(layout);

    const sphereCanvas = layout.querySelector('#sphereCanvas');
    const cloudCanvas = layout.querySelector('#cloudCanvas');
    const graphCanvas = layout.querySelector('#graphCanvas');
    const toggleButtons = layout.querySelectorAll('.about-viz-toggle button');
    
    initSphereCanvas(sphereCanvas);
    initCloudCanvas(cloudCanvas);
    initGraphCanvas(graphCanvas);
    
    // Toggle between visualizations
    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const vizType = btn.dataset.viz;
        toggleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        sphereCanvas.classList.toggle('active', vizType === 'sphere');
        cloudCanvas.classList.toggle('active', vizType === 'cloud');
        graphCanvas.classList.toggle('active', vizType === 'graph');
      });
    });

    initVisitorCount(layout);

    const readMoreBtn = layout.querySelector('#about-read-more');
    const expandedBlock = layout.querySelector('#about-expanded');
    if (readMoreBtn && expandedBlock) {
      readMoreBtn.addEventListener('click', function() {
        const expanded = expandedBlock.classList.toggle('is-expanded');
        readMoreBtn.setAttribute('aria-expanded', expanded);
        readMoreBtn.textContent = expanded ? 'Read less' : 'Read more';
      });
    }
  }

  function initVisitorCount(layout) {
    const el = layout.querySelector('#about-visitor-count');
    if (!el) return;

    function setCount(value, isLoading) {
      el.textContent = typeof value === 'number' ? value.toLocaleString() : value;
      el.classList.toggle('loading', !!isLoading);
    }

    setCount('—', true);

    const VISITS_KEY = 'portfolioVisitCount';
    function getLocalVisits() {
      try {
        const n = parseInt(localStorage.getItem(VISITS_KEY), 10);
        return isNaN(n) ? 0 : n;
      } catch (e) {
        return 0;
      }
    }
    function setLocalVisits(n) {
      try {
        localStorage.setItem(VISITS_KEY, String(n));
      } catch (e) {}
    }

    const localVisits = getLocalVisits() + 1;
    setLocalVisits(localVisits);

    fetch('https://api.countapi.xyz/hit/summerann.github.io/visits')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.value === 'number') {
          setCount(data.value, false);
          return;
        }
        setCount(localVisits, false);
      })
      .catch(() => {
        setCount(localVisits, false);
      });
  }

  function initSphereCanvas(canvas) {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let radius = 0;
    const baseFont = 5;

    const points = SPHERE_WORDS.map((word, index) => {
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const y = 1 - (index / (SPHERE_WORDS.length - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * index;
      return {
        word,
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r
      };
    });

    let rotationX = 0.4;
    let rotationY = 0.6;
    let velocityX = 0.002;
    let velocityY = 0.0015;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      centerX = width / 2;
      centerY = height / 2;
      radius = Math.min(width, height) * 0.36;
    }

    function rotate(point, ax, ay) {
      let { x, y, z } = point;
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);

      let dy = y * cosX - z * sinX;
      let dz = y * sinX + z * cosX;
      let dx = x * cosY + dz * sinY;
      dz = -x * sinY + dz * cosY;

      return { x: dx, y: dy, z: dz, word: point.word };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const fov = radius * 2.2;
      const projected = points
        .map((point) => rotate(point, rotationX, rotationY))
        .map((rotated) => {
          const scale = fov / (fov + rotated.z * radius);
          return {
            word: rotated.word,
            x: rotated.x * radius * scale + centerX,
            y: rotated.y * radius * scale + centerY,
            scale,
            z: rotated.z
          };
        })
        .sort((a, b) => a.z - b.z);

      projected.forEach((p) => {
        if (p.scale < 0.5) return;
        const alpha = Math.min(1, Math.max(0.35, p.scale));
        const size = baseFont * (0.5 + p.scale * 0.8);
        ctx.font = `600 ${size}px 'Space Grotesk', system-ui, sans-serif`;
        ctx.fillStyle = `rgba(230, 235, 255, ${alpha})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.word, p.x, p.y);
      });
    }

    function tick() {
      rotationX += velocityX;
      rotationY += velocityY;
      velocityX *= 0.98;
      velocityY *= 0.98;

      if (!dragging && Math.abs(velocityX) < 0.0008 && Math.abs(velocityY) < 0.0008) {
        velocityX = 0.0014;
        velocityY = 0.0011;
      }

      draw();
      requestAnimationFrame(tick);
    }

    function onPointerDown(event) {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
    }

    function onPointerMove(event) {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      rotationY += dx * 0.005;
      rotationX += dy * 0.005;
      velocityY = dx * 0.0006;
      velocityX = dy * 0.0006;
    }

    function onPointerUp() {
      dragging = false;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    tick();

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerUp);
  }

  function initCloudCanvas(canvas) {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = null;
    const particles = [];
    const maxParticles = SPHERE_WORDS.length;
    const baseFont = 5;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function initParticles() {
      particles.length = 0;
      SPHERE_WORDS.forEach((word, index) => {
        const angle = (index / SPHERE_WORDS.length) * Math.PI * 2;
        const radius = Math.random() * Math.min(width, height) * 0.35;
        const x = width / 2 + Math.cos(angle) * radius;
        const y = height / 2 + Math.sin(angle) * radius;
        const vx = (Math.random() - 0.5) * 0.3;
        const vy = (Math.random() - 0.5) * 0.3;
        const size = baseFont * (0.8 + Math.random() * 0.6);
        
        particles.push({
          word,
          x,
          y,
          vx,
          vy,
          size,
          angle: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02
        });
      });
    }

    function update() {
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.rotationSpeed;

        // Bounce off edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.font = `600 ${p.size}px 'Space Grotesk', system-ui, sans-serif`;
        ctx.fillStyle = `rgba(230, 235, 255, ${0.4 + Math.random() * 0.4})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.word, 0, 0);
        ctx.restore();
      });
    }

    function animate() {
      if (!canvas.classList.contains('active')) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      update();
      draw();
      animationId = requestAnimationFrame(animate);
    }

    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    function onPointerDown(event) {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
    }

    function onPointerMove(event) {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      
      particles.forEach(p => {
        p.x += dx * 0.5;
        p.y += dy * 0.5;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      });
    }

    function onPointerUp() {
      dragging = false;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    animate();

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerUp);
  }

  // Word category mapping for network graph
  const WORD_CATEGORIES = {
    creative: ['Singer', 'Model', 'Actress', 'Performance', 'Stage', 'Studio', 'Voice', 'Melody', 'Chorus', 'Rhythm', 'Dance', 'Theater', 'Portfolio', 'Gallery', 'Art', 'Aesthetic', 'Expression', 'Acting', 'Fashion', 'Photography', 'Cinematography', 'Directing', 'Music', 'Composition', 'Vocal', 'Rehearsal', 'Audition', 'Poetry', 'Lyrics', 'Songwriting', 'Recording', 'Studio Session', 'Photoshoot', 'Editorial', 'Runway', 'Commercial', 'Campaign', 'Brand Ambassador', 'Influencer', 'Content Creator', 'Producer', 'Director', 'Cinematographer', 'Editor', 'Colorist', 'Sound Engineer', 'Mix', 'Video', 'Editing', 'Post-Production', 'Color Grading', 'Sound Design', 'Animation', 'Motion Graphics', 'Visual Effects', 'Cinema', 'Documentary', 'Short Film', 'Music Video', 'Branding', 'Identity', 'Typography', 'Layout', 'Grid', 'Composition', 'Narrative'],
    technical: ['Research', 'LLMs', 'Health AI', 'Systems', 'Product', 'Builder', 'Engineering', 'Code', 'Algorithm', 'Architecture', 'Full Stack', 'Machine Learning', 'Data', 'Pipeline', 'Automation', 'Optimization', 'Python', 'JavaScript', 'React', 'Node', 'TypeScript', 'SQL', 'API', 'Database', 'Server', 'Client', 'Framework', 'Library', 'Testing', 'Debugging', 'Deployment', 'Scaling', 'Frontend', 'Backend', 'DevOps', 'Mobile', 'Web', 'Cloud', 'Analytics', 'Visualization', 'Interface', 'Experience', 'NLP', 'Computer Vision', 'Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'CI/CD', 'Microservices', 'Distributed Systems', 'Scalability', 'Performance', 'Security', 'Encryption', 'Authentication', 'Authorization', 'OAuth', 'JWT', 'GraphQL', 'WebSocket', 'Real-time', 'Streaming', 'Event-driven', 'Message Queue', 'Kafka', 'RabbitMQ', 'Redis Cache', 'CDN', 'Load Balancing', 'Monitoring', 'Logging', 'Metrics', 'Observability', 'APM', 'Git', 'GitHub', 'VS Code', 'Terminal', 'Command Line', 'Linux', 'Unix', 'Shell', 'Bash', 'Zsh', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'REST', 'HTTP', 'HTTPS', 'SSL'],
    research: ['Research', 'LLMs', 'Health AI', 'Genomics', 'Bioinformatics', 'Healthcare', 'Wellness', 'Thesis', 'Publication', 'Conference', 'Journal', 'Paper', 'Methodology', 'Hypothesis', 'Experiment', 'Analysis', 'Results', 'Peer Review', 'Citation', 'Scholarship', 'Academic'],
    leadership: ['Founder', 'Creator', 'Innovator', 'Vision', 'Strategy', 'Leadership', 'Startup', 'Design', 'UX', 'UI', 'Prototype', 'Wireframe', 'Entrepreneur', 'Pioneer', 'Trailblazer', 'Mentor', 'Guide', 'Influence', 'Impact', 'Change'],
    personal: ['Curiosity', 'Empathy', 'Trust', 'Clarity', 'Depth', 'Passion', 'Dedication', 'Precision', 'Excellence', 'Growth', 'Learning', 'Adaptability', 'Resilience', 'Integrity', 'Authenticity', 'Confidence', 'Courage', 'Determination', 'Focus', 'Discipline', 'Wisdom', 'Intuition', 'Insight', 'Awareness', 'Mindfulness', 'Versatility', 'Multidisciplinary', 'Interdisciplinary', 'Cross-functional', 'Holistic', 'Systematic', 'Methodical', 'Analytical', 'Strategic', 'Tactical', 'Proactive', 'Initiative', 'Resourceful', 'Inventive', 'Original'],
    process: ['Storytelling', 'Communication', 'Collaboration', 'Execution', 'Iteration', 'Refinement', 'Quality', 'Craft', 'Detail', 'Innovation', 'Exploration', 'Discovery', 'Experiment', 'Planning', 'Strategy', 'Analysis', 'Synthesis', 'Problem Solving', 'Critical Thinking', 'Creativity', 'Imagination', 'Inspiration', 'Motivation', 'Drive', 'Ambition'],
    values: ['Ethics', 'Responsibility', 'Impact', 'Meaning', 'Purpose', 'Balance', 'Harmony', 'Flow', 'Energy', 'Vibrancy', 'Truth', 'Beauty', 'Elegance', 'Simplicity', 'Complexity'],
    communication: ['English', 'Korean', 'German', 'French', 'Multilingual', 'Translation', 'Interpretation', 'Linguistics', 'Grammar', 'Syntax', 'Storytelling', 'Communication', 'Presentation', 'Public Speaking'],
    skills: ['Teamwork', 'Networking', 'Presentation', 'Public Speaking', 'Negotiation', 'Conflict Resolution', 'Time Management', 'Organization', 'Prioritization', 'Delegation', 'Mentoring', 'Coaching', 'Feedback', 'Review', 'Evaluation']
  };

  function getWordCategory(word) {
    for (const [cat, words] of Object.entries(WORD_CATEGORIES)) {
      if (words.includes(word)) return cat;
    }
    return null;
  }

  function areWordsRelated(word1, word2) {
    const cat1 = getWordCategory(word1);
    const cat2 = getWordCategory(word2);
    
    if (!cat1 || !cat2) return false;
    
    // Same category = strong connection
    if (cat1 === cat2) return true;
    
    // Cross-category connections
    const relatedPairs = [
      ['creative', 'process'],
      ['technical', 'research'],
      ['technical', 'leadership'],
      ['leadership', 'personal'],
      ['personal', 'values'],
      ['process', 'skills'],
      ['communication', 'creative'],
      ['communication', 'skills']
    ];
    
    return relatedPairs.some(([a, b]) => 
      (cat1 === a && cat2 === b) || (cat1 === b && cat2 === a)
    );
  }

  function initGraphCanvas(canvas) {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = null;
    const nodes = [];
    const links = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initGraph();
    }

    function initGraph() {
      nodes.length = 0;
      links.length = 0;
      maxIterations = 0; // Reset iteration counter

      // Select key representative words from each category (fewer, more meaningful)
      const keyWords = [
        // Creative (8)
        'Singer', 'Actress', 'Music', 'Photography', 'Director', 'Video', 'Art', 'Performance',
        // Technical (10)
        'Research', 'LLMs', 'Machine Learning', 'Python', 'React', 'Systems', 'Architecture', 'Full Stack', 'Engineering', 'Code',
        // Leadership (6)
        'Founder', 'Innovator', 'Leadership', 'Design', 'Strategy', 'Vision',
        // Personal (6)
        'Curiosity', 'Passion', 'Excellence', 'Growth', 'Creativity', 'Adaptability',
        // Process (5)
        'Storytelling', 'Collaboration', 'Innovation', 'Problem Solving', 'Execution'
      ];
      
      // Better initial positioning - spread out more
      keyWords.forEach((word, index) => {
        const angle = (index / keyWords.length) * Math.PI * 2;
        const radius = Math.min(width, height) * 0.28;
        const x = width / 2 + Math.cos(angle) * radius;
        const y = height / 2 + Math.sin(angle) * radius;
        const size = 8 + (word.length < 10 ? 2 : 0); // Larger text, bigger for shorter words
        const category = getWordCategory(word);
        
        nodes.push({
          word,
          x,
          y,
          vx: 0,
          vy: 0,
          size,
          category,
          fixed: false
        });
      });

      // Create sparse links - connect each node to only 1-2 nearby nodes in same category
      // This prevents over-connection while maintaining visual clustering
      const categoryNodes = {};
      nodes.forEach(node => {
        if (node.category) {
          if (!categoryNodes[node.category]) categoryNodes[node.category] = [];
          categoryNodes[node.category].push(node);
        }
      });

      // Connect adjacent nodes within each category (chain, not full mesh)
      Object.values(categoryNodes).forEach(catNodes => {
        for (let i = 0; i < catNodes.length - 1; i++) {
          links.push({
            source: catNodes[i],
            target: catNodes[i + 1],
            strength: 1.0
          });
        }
        // Optional: close the loop for categories with 4+ nodes
        if (catNodes.length >= 4) {
          links.push({
            source: catNodes[catNodes.length - 1],
            target: catNodes[0],
            strength: 0.5
          });
        }
      });
    }

    function update() {
      const centerX = width / 2;
      const centerY = height / 2;
      const k = 0.03; // Softer spring to reduce oscillation
      const repulsion = 600; // Reduced repulsion for stability
      const damping = 0.85; // Stronger damping (lower = more friction)
      const minDistance = 70; // Minimum distance between nodes

      // Reset forces
      nodes.forEach(node => {
        if (!node.fixed) {
          node.vx *= damping;
          node.vy *= damping;
        }
      });

      // Apply spring forces from links
      links.forEach(link => {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = minDistance * link.strength;
        const force = (dist - targetDist) * k;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;

        if (!link.source.fixed) {
          link.source.vx += fx;
          link.source.vy += fy;
        }
        if (!link.target.fixed) {
          link.target.vx -= fx;
          link.target.vy -= fy;
        }
      });

      // Apply repulsion between all nodes (stronger)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = repulsion / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          if (!nodes[i].fixed) {
            nodes[i].vx -= fx;
            nodes[i].vy -= fy;
          }
          if (!nodes[j].fixed) {
            nodes[j].vx += fx;
            nodes[j].vy += fy;
          }
        }
      }

      // Apply center attraction (weaker)
      nodes.forEach(node => {
        if (!node.fixed) {
          const dx = centerX - node.x;
          const dy = centerY - node.y;
          node.vx += dx * 0.0005;
          node.vy += dy * 0.0005;
        }
      });

      // Update positions
      nodes.forEach(node => {
        if (!node.fixed) {
          node.x += node.vx;
          node.y += node.vy;
          
          // Keep within bounds with padding
          const padding = 30;
          node.x = Math.max(padding, Math.min(width - padding, node.x));
          node.y = Math.max(padding, Math.min(height - padding, node.y));
        }
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      
      // Draw links (more subtle)
      links.forEach(link => {
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.12})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Draw nodes with better visibility
      nodes.forEach(node => {
        ctx.save();
        
        // Add subtle glow/shadow for readability
        ctx.shadowBlur = 8;
        ctx.shadowColor = node.category === 'creative' 
          ? 'rgba(236, 72, 153, 0.5)'
          : node.category === 'technical'
          ? 'rgba(99, 102, 241, 0.5)'
          : node.category === 'research'
          ? 'rgba(34, 211, 238, 0.5)'
          : 'rgba(230, 235, 255, 0.4)';
        
        ctx.font = `600 ${node.size}px 'Space Grotesk', system-ui, sans-serif`;
        ctx.fillStyle = node.category === 'creative' 
          ? 'rgba(236, 72, 153, 0.95)'
          : node.category === 'technical'
          ? 'rgba(99, 102, 241, 0.95)'
          : node.category === 'research'
          ? 'rgba(34, 211, 238, 0.95)'
          : node.category === 'leadership'
          ? 'rgba(168, 85, 247, 0.95)'
          : 'rgba(230, 235, 255, 0.9)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.word, node.x, node.y);
        ctx.restore();
      });
    }

    let totalEnergy = 0;
    let settledFrames = 0;
    let maxIterations = 0;
    const SETTLE_THRESHOLD = 0.5; // Higher threshold = easier to settle
    const SETTLE_FRAMES = 8; // Fewer frames needed
    const MAX_ITERATIONS = 90; // Stop after ~1.5 seconds max

    function animate() {
      if (!canvas.classList.contains('active')) {
        animationId = null;
        return;
      }
      
      maxIterations++;
      
      // Hard stop after max iterations
      if (maxIterations > MAX_ITERATIONS) {
        // Force all nodes to stop
        nodes.forEach(node => {
          node.vx = 0;
          node.vy = 0;
        });
        draw();
        animationId = null;
        return;
      }
      
      update();
      
      // Calculate total energy (movement)
      totalEnergy = 0;
      nodes.forEach(node => {
        if (!node.fixed) {
          totalEnergy += Math.abs(node.vx) + Math.abs(node.vy);
        }
      });
      
      // If energy is low, count settled frames
      if (totalEnergy < SETTLE_THRESHOLD) {
        settledFrames++;
      } else {
        settledFrames = 0;
      }
      
      // Stop if settled or max iterations reached
      if (settledFrames >= SETTLE_FRAMES || maxIterations > MAX_ITERATIONS) {
        // Force stop all movement
        nodes.forEach(node => {
          node.vx = 0;
          node.vy = 0;
        });
        draw();
        animationId = null;
        hasSettled = true;
        return;
      }
      
      // Continue animating
      draw();
      animationId = requestAnimationFrame(animate);
    }

    let dragging = false;
    let draggedNode = null;
    let lastX = 0;
    let lastY = 0;

    function getNodeAt(x, y) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        const dx = x - node.x;
        const dy = y - node.y;
        // Larger hit area for easier interaction
        if (Math.sqrt(dx * dx + dy * dy) < 50) {
          return node;
        }
      }
      return null;
    }

    function onPointerDown(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      draggedNode = getNodeAt(x, y);
      if (draggedNode) {
        dragging = true;
        draggedNode.fixed = true;
        lastX = x;
        lastY = y;
      }
    }

    function onPointerMove(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      if (dragging && draggedNode) {
        draggedNode.x = x;
        draggedNode.y = y;
        draggedNode.vx = 0;
        draggedNode.vy = 0;
        // Restart animation when dragging
        settledFrames = 0;
        maxIterations = 0;
        if (!animationId) {
          animate();
        }
      }
      lastX = x;
      lastY = y;
    }

    function onPointerUp() {
      if (draggedNode) {
        draggedNode.fixed = false;
        draggedNode = null;
      }
      dragging = false;
    }

    let resizeTimeout = null;
    let hasSettled = false;

    const ro = new ResizeObserver(() => {
      // Debounce resize events to prevent rapid re-triggering
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const oldWidth = width;
        const oldHeight = height;
        resize();
        // Only restart animation if size actually changed significantly
        if (Math.abs(width - oldWidth) > 10 || Math.abs(height - oldHeight) > 10) {
          hasSettled = false;
          settledFrames = 0;
          maxIterations = 0;
          if (!animationId) {
            animate();
          }
        }
      }, 100);
    });
    ro.observe(canvas);
    resize();
    animate();

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerUp);
  }

  function init() {
    const about = document.getElementById('about');
    if (!about) return;
    if (about.querySelector('.about-hero-layout')) return;

    injectStyles();
    about.classList.add('about-minimal');

    buildLayout(about);

    about.addEventListener('pointermove', (event) => {
      const rect = about.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      about.style.setProperty('--glow-x', `${x.toFixed(1)}%`);
      about.style.setProperty('--glow-y', `${y.toFixed(1)}%`);
    });
  }

  function tryInitWithRetries() {
    const delays = [100, 400, 1000, 2000, 3500];
    delays.forEach((delay) => {
      setTimeout(init, delay);
    });

    const observer = new MutationObserver(() => init());
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInitWithRetries);
  } else {
    tryInitWithRetries();
  }
})();
