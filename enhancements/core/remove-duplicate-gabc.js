/**
 * Remove Duplicate GABC Buttons
 * Removes outdated/duplicate GABC theme switcher buttons
 */

(function() {
  'use strict';

  function removeDuplicateGABC() {
    // Find all GABC button containers
    const allContainers = document.querySelectorAll('[id*="gabc"], [class*="gabc"], [id*="theme-switcher"]');
    const gabcButtons = document.querySelectorAll('.gabc-btn, [data-theme]');
    
    // Group buttons by container
    const containers = new Map();
    
    allContainers.forEach(container => {
      const buttons = container.querySelectorAll('.gabc-btn, [data-theme]');
      if (buttons.length > 0) {
        containers.set(container, buttons.length);
      }
    });
    
    // Also check for loose buttons
    gabcButtons.forEach(btn => {
      const container = btn.closest('[id*="gabc"], [class*="gabc"], [id*="theme-switcher"]') || btn.parentElement;
      // Skip HTML/BODY elements
      if (container && container !== document.documentElement && container !== document.body &&
          container.tagName !== 'HTML' && container.tagName !== 'BODY' && !containers.has(container)) {
        containers.set(container, container.querySelectorAll('.gabc-btn, [data-theme]').length);
      }
    });
    
    // Keep only the one with id="gabc-theme-switcher" (the new one)
    let keptContainer = null;
    const officialContainer = document.getElementById('gabc-theme-switcher');
    
    containers.forEach((count, container) => {
      // NEVER remove HTML or BODY elements
      if (container === document.documentElement || container === document.body || 
          container.tagName === 'HTML' || container.tagName === 'BODY') {
        console.log('⚠️ Skipping HTML/BODY element (not a GABC container)');
        return;
      }
      
      // NEVER remove the official container or anything inside it
      if (container.id === 'gabc-theme-switcher' || 
          (officialContainer && officialContainer.contains(container))) {
        keptContainer = container;
        if (container.id === 'gabc-theme-switcher') {
          console.log('✅ Keeping official GABC switcher:', container);
        }
        return; // Don't remove anything inside the official container
      }
      
      // Only remove if it's actually a duplicate container/button OUTSIDE the official one
      if (container.tagName === 'BUTTON' || 
          (container.classList && Array.from(container.classList).some(c => c.includes('gabc') || c.includes('theme')))) {
        // Double-check it's not inside the official container
        if (!officialContainer || !officialContainer.contains(container)) {
          console.log('🗑️ Removing duplicate GABC container (outside official):', container);
          container.remove();
        }
      } else {
        console.log('⚠️ Skipping non-GABC element:', container);
      }
    });
    
    // If no official one exists, keep the first one and remove others
    if (!keptContainer && containers.size > 1) {
      let firstKept = false;
      containers.forEach((count, container) => {
        // Skip HTML/BODY elements
        if (container === document.documentElement || container === document.body ||
            container.tagName === 'HTML' || container.tagName === 'BODY') {
          return;
        }
        
        if (!firstKept) {
          container.id = 'gabc-theme-switcher';
          keptContainer = container;
          firstKept = true;
          console.log('✅ Keeping first GABC container and setting ID');
        } else {
          // Only remove if it's actually a button/container, not a major element
          if (container.tagName === 'BUTTON' || 
              (container.classList && Array.from(container.classList).some(c => c.includes('gabc') || c.includes('theme')))) {
            console.log('🗑️ Removing duplicate GABC container:', container);
            container.remove();
          }
        }
      });
    }
    
    // Remove any standalone duplicate buttons (ONLY if they're NOT inside the official container)
    const officialContainer = document.getElementById('gabc-theme-switcher');
    if (officialContainer) {
      const standaloneButtons = document.querySelectorAll('.gabc-btn, [data-theme]');
      standaloneButtons.forEach(btn => {
        // Only remove if button is NOT inside the official container
        if (!officialContainer.contains(btn)) {
          console.log('🗑️ Removing standalone duplicate button (outside official container)');
          btn.remove();
        }
      });
    }
  }

  function init() {
    // Remove duplicates after a delay to let everything render
    setTimeout(removeDuplicateGABC, 1000);
    setTimeout(removeDuplicateGABC, 2000);
    setTimeout(removeDuplicateGABC, 3000);

    // Watch for new GABC buttons being added
    const observer = new MutationObserver(function(mutations) {
      let shouldCheck = false;
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && (
            node.id && node.id.includes('gabc') ||
            node.classList && (node.classList.contains('gabc-btn') || Array.from(node.classList).some(c => c.includes('gabc')))
          )) {
            shouldCheck = true;
          }
        });
      });
      if (shouldCheck) {
        setTimeout(removeDuplicateGABC, 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
