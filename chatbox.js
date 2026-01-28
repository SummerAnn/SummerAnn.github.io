// Chatbox widget for Summer Ann's website
(function() {
  // Create chatbox HTML with glassmorphism
  const chatboxHTML = `
    <div id="sa-chatbox" style="position:fixed;bottom:24px;right:24px;width:360px;max-width:95vw;z-index:9998;font-family:var(--font-body,system-ui,sans-serif);backdrop-filter:blur(18px) saturate(180%);background:var(--glass-bg);box-shadow:var(--glass-shadow);border-radius:24px 24px 0 0;border:1px solid var(--line);transition:box-shadow 0.3s,background 0.3s;overflow:hidden;">
      <div class="sa-chatbox-header" style="display:flex;align-items:center;justify-content:space-between;background:var(--accent-gradient);padding:18px 22px 16px 18px;border-radius:24px 24px 0 0;box-shadow:var(--neon-glow-subtle);position:relative;border-bottom:1px solid var(--line);">
        <span style="font-size:2em;filter:drop-shadow(0 0 4px rgba(255,255,255,0.35));margin-right:10px;">🤓</span>
        <span style="font-size:1.05em;font-weight:700;letter-spacing:0.5px;color:var(--text-on-neon);flex:1;">Ask Summer Ann's Nerdy AI</span>
        <span id="sa-chatbox-close" style="font-size:1.2em;cursor:pointer;color:var(--text-on-neon);transition:color 0.2s;">✖</span>
      </div>
      <div id="sa-chat-messages" style="background:var(--surface);min-height:220px;max-height:340px;overflow-y:auto;padding:18px 14px 12px 14px;border:none;"></div>
      <form id="sa-chat-form" style="display:flex;border-top:1px solid var(--line);background:var(--surface-2);border-radius:0 0 24px 24px;backdrop-filter:blur(8px);">
        <input id="sa-chat-input" type="text" placeholder="Ask me anything about Summer Ann!" style="flex:1;padding:14px 12px;border:none;border-radius:0 0 0 24px;font-size:1em;outline:none;background:rgba(255,255,255,0.04);color:var(--text-primary);font-family:var(--font-body,system-ui,sans-serif);" required />
        <button type="submit" style="background:var(--accent-gradient);color:var(--text-on-neon);border:none;padding:0 22px;font-size:1.05em;border-radius:0 0 24px 0;cursor:pointer;box-shadow:var(--neon-glow-subtle);transition:box-shadow 0.2s;">Send</button>
      </form>
      <div id="sa-chat-email" style="display:none;padding:14px 10px 10px 10px;background:var(--surface-2);border-radius:0 0 24px 24px;border-top:1px solid var(--line);color:var(--text-primary);">
        <div style="margin-bottom:8px;">Couldn't answer? Send your question to Summer Ann!</div>
        <input id="sa-email-input" type="email" placeholder="Your email" style="width:100%;padding:8px;margin-bottom:8px;border:1px solid var(--line);border-radius:8px;background:rgba(255,255,255,0.04);color:var(--text-primary);font-family:var(--font-body,system-ui,sans-serif);" required />
        <button id="sa-email-send" style="background:var(--accent-gradient);color:var(--text-on-neon);border:none;padding:8px 16px;border-radius:8px;cursor:pointer;width:100%;box-shadow:var(--neon-glow-subtle);transition:box-shadow 0.2s;">Send Email</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', chatboxHTML);

  const chatMessages = document.getElementById('sa-chat-messages');
  const chatForm = document.getElementById('sa-chat-form');
  const chatInput = document.getElementById('sa-chat-input');
  const emailDiv = document.getElementById('sa-chat-email');
  const emailInput = document.getElementById('sa-email-input');
  const emailSend = document.getElementById('sa-email-send');

  // Add toggle button and state
  let isOpen = true;
  const chatbox = document.getElementById('sa-chatbox');
  const toggleBtn = document.createElement('div');
  toggleBtn.id = 'sa-chatbox-toggle';
  toggleBtn.style.position = 'fixed';
  toggleBtn.style.bottom = '24px';
  toggleBtn.style.right = '24px';
  toggleBtn.style.width = '60px';
  toggleBtn.style.height = '60px';
  toggleBtn.style.background = 'var(--accent-gradient)';
  toggleBtn.style.color = 'var(--text-on-neon)';
  toggleBtn.style.borderRadius = '50%';
  toggleBtn.style.display = 'none';
  toggleBtn.style.justifyContent = 'center';
  toggleBtn.style.alignItems = 'center';
  toggleBtn.style.fontSize = '2em';
  toggleBtn.style.zIndex = '10000';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.boxShadow = 'var(--neon-glow-subtle)';
  toggleBtn.innerText = '💬';
  document.body.appendChild(toggleBtn);

  // Add click handler to shrink/expand chatbox
  chatbox.onclick = function(e) {
    // Only shrink if clicking outside the form or email input
    if (e.target === chatbox || e.target.className === 'sa-chatbox-header') {
      chatbox.style.opacity = '0';
      setTimeout(() => {
        chatbox.style.display = 'none';
        toggleBtn.style.display = 'flex';
      }, 300);
      isOpen = false;
    }
  };
  // Prevent form/email clicks from closing
  chatForm.onclick = e => e.stopPropagation();
  emailDiv.onclick = e => e.stopPropagation();

  // Toggle button to open chatbox
  toggleBtn.onclick = function() {
    chatbox.style.display = 'block';
    setTimeout(() => { chatbox.style.opacity = '1'; }, 10);
    toggleBtn.style.display = 'none';
    isOpen = true;
  };

  // Smooth open/close transitions
  chatbox.style.transition = 'box-shadow 0.3s,background 0.3s,opacity 0.3s';
  chatbox.style.opacity = '1';
  const oldShrink = chatbox.onclick;
  chatbox.onclick = function(e) {
    if (e.target === chatbox || e.target.className === 'sa-chatbox-header') {
      chatbox.style.opacity = '0';
      setTimeout(() => {
        chatbox.style.display = 'none';
        toggleBtn.style.display = 'flex';
      }, 300);
      isOpen = false;
    }
  };
  toggleBtn.onclick = function() {
    chatbox.style.display = 'block';
    setTimeout(() => { chatbox.style.opacity = '1'; }, 10);
    toggleBtn.style.display = 'none';
    isOpen = true;
  };

  // Update toggle button for glass look
  toggleBtn.style.background = 'var(--accent-gradient)';
  toggleBtn.style.boxShadow = 'var(--neon-glow)';
  toggleBtn.style.border = '1px solid var(--line)';
  toggleBtn.style.transition = 'box-shadow 0.2s,background 0.2s;';
  toggleBtn.onmouseenter = () => {
    toggleBtn.style.boxShadow = 'var(--neon-glow-hover)';
  };
  toggleBtn.onmouseleave = () => {
    toggleBtn.style.boxShadow = 'var(--neon-glow)';
  };

  // Update close icon for neon hover
  const header = chatbox.querySelector('.sa-chatbox-header');
  const closeIcon = document.getElementById('sa-chatbox-close');
  closeIcon.onmouseenter = () => { closeIcon.style.color = 'var(--text-primary)'; };
  closeIcon.onmouseleave = () => { closeIcon.style.color = 'var(--text-on-neon)'; };
  closeIcon.onclick = function(e) {
    e.stopPropagation();
    chatbox.style.opacity = '0';
    setTimeout(() => {
      chatbox.style.display = 'none';
      toggleBtn.style.display = 'flex';
    }, 300);
    isOpen = false;
  };

  // Fun facts for the bot
  const funFacts = [
    "Did you know? The first computer bug was an actual moth stuck in a Harvard Mark II computer! 🦋",
    "Fun fact: The human brain has about 86 billion neurons. That's a lot of parallel processing! 🧠",
    "Nerd alert! The Turing Award is like the Nobel Prize of computer science.",
    "Did you know? DNA is basically nature's data storage system!",
    "The word 'algorithm' comes from the name of a Persian mathematician, al-Khwarizmi!",
    "Fun fact: The first programmer was Ada Lovelace, a woman who worked with Charles Babbage in the 1800s!"
  ];

  // Map of hardcoded Q&A
  const hardcodedQA = {
    'what projects has she worked on?': "This project is basically the Avengers of software development! 🦸‍♀️ Let me tell you about one of Summer's awesome projects! 🚀 'ZON: AI-Powered Smart Calendar Assistant' - Developed an intelligent scheduling assistant for global team coordination using AWS Bedrock, LangGraph, and Google Calendar API. Features conversational workflows and timezone-aware scheduling! From a technical perspective, this is absolutely fascinating! 🔬 She used AWS, Python, JavaScript and more! Talk about impressive! 👏 ",
    'about summer': "I'm so excited you asked about this! 🎉 Summer is absolutely amazing! 🌟 She's a Full-Stack Software Engineer, Machine Learning Researcher, Bioinformatics Researcher, Mobile App Developer based in Ann Arbor, Michigan. She's an inspired young entrepreneur, software engineer and UX/UI designer, machine learning, bioinformatics and computational medicine researcher. She's also an actress, singer, and model! She's basically a real-life superhero who codes, researches, sings, acts, AND models! How cool is that? 🦸‍♀️✨",
    'skills': "Skills? Oh, she's got plenty! Python, C++, React, JavaScript, AWS, Machine Learning, Deep Learning, Bioinformatics, Django, Flask, LangChain, LLMs, SQL, Git, Docker... and more! 🧠💻",
    'contact': "Want to get in touch with Summer? Just type your question and click the email button below, or ask me anything and I'll help you send her a message! 💌"
  };

  // Helper to add a message
  function addMessage(text, fromBot = false) {
    const msg = document.createElement('div');
    msg.style.margin = '12px 0';
    msg.style.padding = '12px 18px';
    msg.style.borderRadius = '18px';
    msg.style.maxWidth = '85%';
    msg.style.fontFamily = "var(--font-body,system-ui,sans-serif)";
    msg.style.fontSize = '1.05em';
    msg.style.wordBreak = 'break-word';
    msg.style.boxShadow = fromBot
      ? 'var(--neon-glow-subtle)'
      : '0 10px 22px rgba(0,0,0,0.25)';
    msg.style.background = fromBot
      ? 'var(--accent-gradient)'
      : 'rgba(255,255,255,0.06)';
    msg.style.border = '1px solid var(--line)';
    msg.style.color = fromBot ? 'var(--text-on-neon)' : 'var(--text-primary)';
    msg.style.alignSelf = fromBot ? 'flex-start' : 'flex-end';
    if (fromBot) {
      msg.innerHTML = `<span style='font-size:1.2em;margin-right:6px;'>🤓</span>` + text;
    } else {
      msg.innerText = text;
    }
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Helper to get resume data
  async function getResumeData() {
    const res = await fetch('res_primaryLanguage.json');
    return await res.json();
  }

  // Ollama API call
  async function askOllama(question, resumeData) {
    const context = JSON.stringify(resumeData);
    const prompt = `You are a goofy, funny, nerdy girl AI assistant for Summer Ann's website. Answer the user's question about Summer Ann's resume using the following data. If you don't know, say so and offer to send the question to Summer Ann. Always include a fun fact about computer science or medicine in your answer.\n\nResume Data: ${context}\n\nUser: ${question}\nAI:`;
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral',
        prompt: prompt,
        stream: false
      })
    });
    const data = await response.json();
    return data.response;
  }

  // Show a friendly welcome message and options
  function showWelcome() {
    chatMessages.innerHTML = '';
    addMessage("Hey there! 👋 I'm Summer's AI assistant - a total tech nerd who loves talking about code, projects, and all things awesome! 🚀 What would you like to know about Summer or her work? I can tell you about her projects, skills, or even help you send her an email! 💌", true);
    // Options
    const optionsDiv = document.createElement('div');
    optionsDiv.style.display = 'flex';
    optionsDiv.style.flexWrap = 'wrap';
    optionsDiv.style.gap = '8px';
    optionsDiv.style.margin = '12px 0';
    // Option buttons
    const opts = [
      { label: 'About Summer', value: 'about' },
      { label: 'Projects', value: 'projects' },
      { label: 'Skills', value: 'skills' },
      { label: 'Contact', value: 'contact' },
      { label: 'Fun Fact 🎲', value: 'funfact' }
    ];
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.innerText = opt.label;
      btn.style.background = '#6c63ff';
      btn.style.color = '#fff';
      btn.style.border = 'none';
      btn.style.borderRadius = '8px';
      btn.style.padding = '8px 14px';
      btn.style.fontSize = '1em';
      btn.style.cursor = 'pointer';
      btn.onclick = () => handleOption(opt.value);
      optionsDiv.appendChild(btn);
    });
    chatMessages.appendChild(optionsDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Handle option clicks
  function handleOption(option) {
    if (option === 'about') {
      addMessage("I'm so excited you asked about this! 🎉 Summer is absolutely amazing! 🌟 She's a Full-Stack Software Engineer, Machine Learning Researcher, Bioinformatics Researcher, Mobile App Developer based in Ann Arbor, Michigan. She's an inspired young entrepreneur, software engineer and UX/UI designer, machine learning, bioinformatics and computational medicine researcher. She's also an actress, singer, and model! She's basically a real-life superhero who codes, researches, sings, acts, AND models! How cool is that? 🦸‍♀️✨", true);
    } else if (option === 'projects') {
      addMessage("Summer's projects are next-level! 🚀 She has built web apps, mobile apps, and even worked on generative AI for music and trading systems. Want to know about a specific project? Just ask! 💡", true);
    } else if (option === 'skills') {
      addMessage("Skills? Oh, she's got plenty! Python, C++, React, JavaScript, AWS, Machine Learning, Deep Learning, Bioinformatics, Django, Flask, LangChain, LLMs, SQL, Git, Docker... and more! 🧠💻", true);
    } else if (option === 'contact') {
      addMessage("Want to get in touch with Summer? Just type your question and click the email button below, or ask me anything and I'll help you send her a message! 💌", true);
      emailDiv.style.display = 'block';
    } else if (option === 'funfact') {
      const funFact = funFacts[Math.floor(Math.random() * funFacts.length)];
      addMessage(`Fun fact: ${funFact}`, true);
    }
  }

  // Show welcome on load
  showWelcome();

  // Handle chat form submit
  chatForm.onsubmit = async (e) => {
    e.preventDefault();
    const question = chatInput.value.trim();
    if (!question) return;
    addMessage(question, false);
    chatInput.value = '';
    // Check for hardcoded Q&A (case-insensitive)
    const lowerQ = question.toLowerCase();
    if (hardcodedQA[lowerQ]) {
      addMessage(hardcodedQA[lowerQ], true);
      if (lowerQ === 'contact') emailDiv.style.display = 'block';
      return;
    }
    addMessage('Thinking... 🤔', true);
    const resumeData = await getResumeData();
    let answer = await askOllama(question, resumeData);
    // If model can't answer, or says it doesn't know, offer email
    if (!answer || /don't know|not sure|can't answer|no information|unsure|unknown/i.test(answer)) {
      chatMessages.lastChild.innerText = "Oops! I couldn't answer that. Want to send your question to Summer Ann?";
      emailDiv.style.display = 'block';
    } else {
      // Add a random fun fact if not already present
      const funFact = funFacts[Math.floor(Math.random() * funFacts.length)];
      if (!answer.includes('Fun fact')) answer += `\n\nFun fact: ${funFact}`;
      chatMessages.lastChild.innerText = answer;
      emailDiv.style.display = 'block'; // Always offer email option
    }
  };

  // Handle email send
  emailSend.onclick = async () => {
    const userEmail = emailInput.value.trim();
    const lastQuestion = Array.from(chatMessages.children).reverse().find(m => m.style.color === 'rgb(51, 51, 51)')?.innerText;
    if (!userEmail || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(userEmail)) {
      alert('Please enter a valid email address!');
      return;
    }
    if (!lastQuestion) {
      alert('No question to send!');
      return;
    }
    // Placeholder: send email via backend or email API
    await fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        message: lastQuestion,
        to: 'summereunann@uchicago.edu'
      })
    });
    addMessage('Your question was sent to Summer Ann! She’ll get back to you soon. 💌', true);
    emailDiv.style.display = 'none';
    emailInput.value = '';
  };
})(); 
