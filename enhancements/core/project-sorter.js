/**
 * Project Sorter
 * Sorts projects by date (recent -> old) and ensures consistent image sizing
 */

(function() {
  'use strict';

  // Parse date string to comparable format
  function parseDate(dateStr) {
    if (!dateStr) return { year: 0, month: 0 };
    
    // Handle formats like "2025 - Present", "Jan 2025 - Mar 2025", "Sep 2024 - Present"
    const parts = dateStr.split(' - ');
    const startDate = parts[0].trim();
    
    // Extract year and month
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = 0;
    let month = 0;
    
    // Check if it's just a year
    if (/^\d{4}$/.test(startDate)) {
      year = parseInt(startDate);
      month = 12; // Put year-only dates at end of year
    } else {
      // Parse "Jan 2025" format
      const match = startDate.match(/(\w+)\s+(\d{4})/);
      if (match) {
        month = monthNames.indexOf(match[1]) + 1;
        year = parseInt(match[2]);
      } else {
        // Try to extract just year
        const yearMatch = startDate.match(/(\d{4})/);
        if (yearMatch) {
          year = parseInt(yearMatch[1]);
          month = 12;
        }
      }
    }
    
    return { year, month, original: dateStr };
  }

  // Sort projects by date (recent -> old)
  function sortProjectsByDate(projects) {
    return projects.sort((a, b) => {
      const dateA = parseDate(a.startDate);
      const dateB = parseDate(b.startDate);
      
      // Compare by year first
      if (dateB.year !== dateA.year) {
        return dateB.year - dateA.year; // Descending (recent first)
      }
      
      // Then by month
      return dateB.month - dateA.month; // Descending (recent first)
    });
  }

  // Apply consistent image sizing
  function applyConsistentImageSizing() {
    const style = document.createElement('style');
    style.id = 'project-image-sizing';
    style.textContent = `
      /* Consistent project image sizing */
      .portfolio-item img,
      .foto img,
      [alt="projectImages"] {
        width: 100% !important;
        height: 230px !important;
        object-fit: cover !important;
        object-position: center !important;
      }
      
      /* Ensure project cards have consistent dimensions */
      .portfolio-item,
      .foto {
        overflow: hidden;
      }
    `;
    
    // Remove existing style if present
    const existing = document.getElementById('project-image-sizing');
    if (existing) {
      existing.remove();
    }
    
    // Also add CSS to force carousel visibility
    const carouselStyle = document.createElement('style');
    carouselStyle.id = 'model-carousel-force-visible';
    carouselStyle.textContent = `
      .model-carousel, #modeling-profile-carousel {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: relative !important;
        z-index: 10 !important;
      }
      .foto:has(.model-carousel), 
      [class*="portfolio"]:has(.model-carousel),
      [class*="project"]:has(.model-carousel),
      [class*="card"]:has(.model-carousel) {
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
      }
    `;
    
    if (document.head) {
      document.head.appendChild(style);
      // Add carousel visibility CSS if not already added
      if (!document.getElementById('model-carousel-force-visible')) {
        document.head.appendChild(carouselStyle);
      }
    } else {
      console.warn('document.head not available for project-sorter');
    }
  }

  function init() {
    // Wait for DOM to be ready
    function runWhenReady() {
      if (document.head && document.body) {
        applyConsistentImageSizing();
      } else {
        setTimeout(runWhenReady, 100);
      }
    }
    runWhenReady();
    
    // Re-apply after React renders
    setTimeout(applyConsistentImageSizing, 1000);
    setTimeout(applyConsistentImageSizing, 2000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
