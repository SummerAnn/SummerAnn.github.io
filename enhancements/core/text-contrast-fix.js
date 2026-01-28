/**
 * Text Contrast Fix
 * Ensures text is never white on white - fixes visibility issues
 */

(function() {
  'use strict';

  let fixedElements = new Set(); // Track fixed elements to avoid spam
  
  function fixTextContrast() {
    // Find all text elements that might have contrast issues
    const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, li, td, th');
    
    textElements.forEach(function(el) {
      // Skip if already fixed
      if (fixedElements.has(el)) return;
      
      // Skip empty elements
      if (!el.textContent || el.textContent.trim().length === 0) return;
      const style = window.getComputedStyle(el);
      const bgColor = style.backgroundColor;
      const textColor = style.color;
      
      // Check if text is white or very light
      const isLightText = textColor.includes('rgb(255') || 
                         textColor.includes('rgb(254') ||
                         textColor.includes('#fff') ||
                         textColor.includes('#ffffff');
      
      // Check if background is white or very light
      const isLightBg = bgColor.includes('rgb(255') ||
                        bgColor.includes('rgb(254') ||
                        bgColor.includes('#fff') ||
                        bgColor.includes('#ffffff') ||
                        bgColor === 'rgba(0, 0, 0, 0)' ||
                        bgColor === 'transparent';
      
      // If white text on white/light background, fix it
      if (isLightText && (isLightBg || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)')) {
        // Check parent background
        const parent = el.parentElement;
        if (parent) {
          const parentStyle = window.getComputedStyle(parent);
          const parentBg = parentStyle.backgroundColor;
          const isParentLight = parentBg.includes('rgb(255') || 
                               parentBg.includes('#fff') ||
                               parentBg === 'transparent' ||
                               parentBg === 'rgba(0, 0, 0, 0)';
          
          if (isParentLight) {
            // Force dark text
            el.style.color = '#1a1a1a';
            el.style.textShadow = '0 1px 2px rgba(255, 255, 255, 0.8)';
            fixedElements.add(el);
            // Only log first time
            if (fixedElements.size <= 10) {
              console.log('Fixed text contrast for:', el.textContent.substring(0, 30));
            }
          }
        }
      }
    });

    // Also add global CSS rule for common problematic areas
    if (!document.head) {
      console.warn('document.head not available yet');
      return;
    }
    
    const style = document.createElement('style');
    style.id = 'text-contrast-fix';
    style.textContent = `
      /* Fix black on black intro text - force white on black or black on white */
      /* About Me section - ensure contrast */
      [class*="about"] p,
      [class*="About"] p,
      [id*="about"] p,
      [id*="About"] p,
      .font-trebuchet,
      [class*="intro"] p,
      [class*="Intro"] p,
      [class*="bio"] p,
      [class*="Bio"] p {
        color: #ffffff !important;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8) !important;
        background: rgba(0, 0, 0, 0.3) !important;
        padding: 8px 12px !important;
        border-radius: 4px !important;
      }
      
      /* If background is dark, use white text */
      [style*="background"][style*="black"],
      [style*="background"][style*="#000"],
      [style*="background-color"][style*="black"],
      [style*="background-color"][style*="#000"] {
        color: #ffffff !important;
      }
      
      /* If background is light/white, use black text */
      [style*="background: white"],
      [style*="background: #fff"],
      [style*="background-color: white"],
      [style*="background-color: #fff"],
      body[data-theme="light"] p,
      body[data-theme="light"] span,
      body[data-theme="light"] div,
      body[data-theme="light"] h1,
      body[data-theme="light"] h2,
      body[data-theme="light"] h3,
      body[data-theme="light"] h4,
      body[data-theme="light"] h5,
      body[data-theme="light"] h6,
      body[data-theme="light"] a,
      body[data-theme="light"] li {
        color: #1a1a1a !important;
      }
      
      /* White backgrounds should have dark text */
      .card-body,
      .section-inner,
      [class*="card"][style*="white"],
      [class*="Card"][style*="white"] {
        color: #1a1a1a !important;
      }
      
      /* Dark backgrounds should have white text */
      [class*="card"][style*="black"],
      [class*="Card"][style*="black"],
      [style*="background: #000"],
      [style*="background: black"] {
        color: #ffffff !important;
      }
      
      /* Ensure about section text is visible - white on dark */
      #about .card-body,
      #about .font-trebuchet,
      #about p,
      #about span,
      #about div {
        color: #ffffff !important;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9) !important;
      }
    `;
    
    // Remove existing if present
    const existing = document.getElementById('text-contrast-fix');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(style);
  }

  function init() {
    // Wait for DOM to be ready
    function runWhenReady() {
      if (document.head && document.body) {
        fixTextContrast();
        
        // Watch for dynamically added content
        const observer = new MutationObserver(function(mutations) {
          let shouldFix = false;
          mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
              if (node.nodeType === 1) {
                shouldFix = true;
              }
            });
          });
          if (shouldFix) {
            setTimeout(fixTextContrast, 100);
          }
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        
        // Also fix after React renders
        setTimeout(fixTextContrast, 1000);
        setTimeout(fixTextContrast, 2000);
        setTimeout(fixTextContrast, 3000);
      } else {
        setTimeout(runWhenReady, 100);
      }
    }
    runWhenReady();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
