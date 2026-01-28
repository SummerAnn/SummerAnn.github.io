# Today's Work Summary - Summer Ann Portfolio Website

## Website Overview
- **Type**: React-based portfolio website (compiled/built React app)
- **Hosting**: GitHub Pages
- **Architecture**: Pre-compiled React app served as static files, with client-side JavaScript "enhancements" injected via `enhancement-loader.js` in `index.html`
- **Challenge**: Cannot modify React source code directly - must use DOM manipulation and monkey-patching after React renders

---

## Main Goals Attempted Today

### 1. **Image Path Fixes** ❌ PARTIALLY WORKING
**Problem**: Multiple image path issues:
- `p3.jpg` and `p4.jpg` requested from root instead of `/images/portfolio/App/p3.jpg`
- `myProfile.jpg` showing as `images//images/myProfile.jpg` (double path)
- Images not showing for correct projects

**Attempted Solutions**:
- Created aggressive inline script in `index.html` that intercepts:
  - `window.Image` constructor
  - `HTMLImageElement.prototype.src` setter
  - `window.fetch` requests
  - `Element.prototype.setAttribute` for 'src'
  - `MutationObserver` for DOM changes
- Created `image-loader-fix.js` for general path corrections
- Created `image-lock.js` to lock specific images to projects
- Created `avatar-fix.js` specifically for profile image

**Current Status**: 
- Still seeing `GET /images//images/myProfile.jpg 404` errors
- Some images work, but `myProfile.jpg` path issue persists

---

### 2. **Modeling Profile Carousel** ❌ NOT WORKING
**Problem**: Need auto-rotating image carousel for "Modeling & Fashion" project card showing:
- `/images/portfolio/actingprofile.jpeg` (first)
- `/images/portfolio/summer.JPG` (second)

**Attempted Solutions**:
- Created `model-profile-carousel.js` to:
  - Find modeling images by source/alt text
  - Traverse DOM to find parent project card
  - Insert carousel HTML next to existing image
  - Auto-rotate between images
- Created `carousel-debug.js` to force carousel creation
- Added CSS with `!important` to force visibility
- Tried forcing parent card `opacity: 1` (parent has `opacity: 0`)

**Current Status**:
- Carousel is created (`✅ Carousel initialized and visible` in console)
- But carousel doesn't appear visually
- Parent card has `opacity: 0` which may be hiding it
- `carousel-debug.js` keeps finding images inside carousel slides instead of the project card

**Key Issue**: The parent card element (`.foto`) has inline style `opacity: 0` which hides everything inside it, including the carousel.

---

### 3. **GABC Theme Switcher (YouTube ↔ MP4 Video)** ❌ NOT WORKING
**Problem**: Need 4 UI themes with different background videos:
- **G** button = `youtube-1` (YouTube video)
- **A** button = `youtube-2` (YouTube video)  
- **B** button = `saved-1` (Local `Intro.mp4`)
- **C** button = `saved-2` (Local `Intro.mp4`)

**Attempted Solutions**:
- Created `ui-theme-manager.js` to:
  - Detect video container
  - Remove existing video/iframe
  - Create YouTube iframe or local `<video>` element
  - Handle URL parameters (`?theme=youtube-1`, etc.)
- Created `gabc-theme-switcher.js` to create G/A/B/C buttons
- Added `switchPortfolioTheme()` global function
- Tried removing all MP4 videos when switching to YouTube
- Tried removing all YouTube iframes when switching to MP4

**Current Status**:
- Buttons are created and visible
- Clicking G or A buttons doesn't switch to YouTube - always shows MP4
- `switchPortfolioTheme()` function exists but theme switching doesn't work
- Video container detection may be failing
- React may be re-rendering the video element after our script removes/adds it

**Key Issue**: When clicking G/A buttons, the theme switches in URL/localStorage but the video doesn't actually change from MP4 to YouTube.

---

### 4. **Demo Links** ❌ NOT WORKING
**Problem**: Demo links in navigation menu don't work/navigate

**Attempted Solutions**:
- Created `demo-fix.js` to:
  - Find all demo links
  - Set `target="_self"` instead of `_blank`
  - Add click handlers
  - Force navigation if React router doesn't handle it
- Modified `enhanced-nav.js` to include demo links

**Current Status**:
- Demo links are detected (`✅ Found 6 demo links` in console)
- But clicking them doesn't navigate
- May be React router issue or links pointing to non-existent pages

---

### 5. **Project Image Organization** ✅ PARTIALLY WORKING
**Problem**: Need to connect new images to correct projects and ensure consistent sizing

**Attempted Solutions**:
- Updated `res_primaryLanguage.json` to link images to projects
- Created `project-sorter.js` to:
  - Sort projects by date (newest first)
  - Apply consistent image sizing CSS (`height: 230px`, `object-fit: cover`)
- Created `image-lock.js` to prevent images from being changed

**Current Status**: 
- Projects are sorted
- Images are linked in JSON
- But some images still not showing (path issues)

---

### 6. **Text Contrast Fixes** ✅ WORKING
**Problem**: Text invisible (black on black, white on white)

**Attempted Solutions**:
- Created `text-contrast-fix.js` to:
  - Detect text color vs background
  - Force white text on dark, black on light
  - Add padding and text shadows

**Current Status**: Working

---

### 7. **Duplicate GABC Button Removal** ✅ WORKING
**Problem**: Multiple sets of GABC buttons appearing

**Attempted Solutions**:
- Created `remove-duplicate-gabc.js` to:
  - Find all GABC button containers
  - Keep only the official `#gabc-theme-switcher` container
  - Remove duplicates

**Current Status**: Working (but had to fix to not remove HTML/BODY elements)

---

## Technical Architecture

### Enhancement System
All enhancements are loaded via `/enhancements/core/enhancement-loader.js` which:
1. Waits for React to render
2. Dynamically loads enhancement scripts in order
3. Scripts use DOM manipulation and monkey-patching

### Key Files Modified:
- `index.html` - Added aggressive image path interception script
- `enhancements/core/enhancement-loader.js` - Loads all modules
- `enhancements/core/ui-theme-manager.js` - Manages video themes
- `enhancements/core/gabc-theme-switcher.js` - Creates theme buttons
- `enhancements/core/model-profile-carousel.js` - Creates carousel
- `enhancements/core/carousel-debug.js` - Forces carousel display
- `enhancements/core/demo-fix.js` - Fixes demo links
- `enhancements/core/image-loader-fix.js` - Fixes image paths
- `enhancements/core/avatar-fix.js` - Fixes profile image
- `enhancements/core/project-sorter.js` - Sorts projects and adds CSS
- `res_primaryLanguage.json` - Project data with images
- `portfolio_shared_data.json` - Profile data

---

## Current Issues Summary

### Critical Issues (Not Working):
1. **GABC Theme Switching**: Buttons G/A don't switch to YouTube video - always shows MP4
2. **Modeling Carousel**: Created but not visible (parent card has `opacity: 0`)
3. **Demo Links**: Detected but don't navigate
4. **myProfile.jpg**: Still getting `images//images/myProfile.jpg` 404 errors

### Partially Working:
1. **Image Paths**: Most images work, but `myProfile.jpg` still broken
2. **Project Images**: Linked in JSON but some not displaying

### Working:
1. Text contrast fixes
2. Duplicate button removal
3. Project sorting

---

## Root Causes Identified

1. **React Re-rendering**: React may be re-rendering elements after our scripts modify them, overwriting our changes
2. **Timing Issues**: Scripts may run before React fully renders, or React may render after our scripts
3. **CSS Specificity**: React's inline styles may override our CSS fixes
4. **Service Worker Caching**: Old JavaScript may be cached, preventing fixes from loading
5. **Parent Element Opacity**: Parent cards with `opacity: 0` hide all children, including our injected carousel

---

## Recommendations for Next Attempt

1. **Use React DevTools** to inspect actual DOM structure and React component hierarchy
2. **Check React Router** configuration for demo link navigation
3. **Use `MutationObserver`** more aggressively to catch React re-renders
4. **Inject CSS earlier** (in `<head>`) with higher specificity
5. **Check if React is using CSS-in-JS** that might override our styles
6. **Consider using React's `useEffect` hooks** if source code is accessible
7. **Clear service worker cache** completely before testing
8. **Check browser console** for React warnings/errors that might indicate issues

---

## File Locations

- Main HTML: `/index.html`
- Enhancement scripts: `/enhancements/core/*.js`
- Project data: `/res_primaryLanguage.json`
- Profile data: `/portfolio_shared_data.json`
- Images: `/images/portfolio/` and `/images/`
- Video: `/static/images/Intro.mp4` or `/images/Intro.mp4`

---

## Testing URLs

- Base: `http://localhost:8000/`
- Themes: 
  - `?theme=youtube-1` (should show YouTube)
  - `?theme=youtube-2` (should show YouTube)
  - `?theme=saved-1` (should show Intro.mp4)
  - `?theme=saved-2` (should show Intro.mp4)

---

## Console Logs to Watch

- `🎨 GABC button clicked:` - Button click detection
- `🎨 switchPortfolioTheme called with:` - Theme switching
- `🎠 Found modeling image:` - Carousel image detection
- `✅ Carousel initialized and visible` - Carousel creation
- `GET /images//images/myProfile.jpg 404` - Image path error
- `✅ Found 6 demo links` - Demo link detection

---

## WebCam Lab Enhancements

- Tightened the Blink Morse Code detector (smoothed eyelid ratio, clearer dot/dash thresholds) and hooked both it and the Truth Scanner to dedicated webcam preview canvases so the UI mirrors the live feed.
- Removed the Mystic Tarot spread per request, keeping the focus on the camera-driven games, while the inline script now only manages Morse and Truth state alongside the existing gesture/eye/racing features.
- Added a manual scroll-trigger fallback for `/demos/intro-cinematic/index.html` so the video scrub experience still moves even when GSAP/ScrollTrigger are blocked, restoring the interactive chapter behavior.

---

## Notes

- Service worker is caching old JavaScript - may need to clear cache
- React app is compiled/built - cannot modify source directly
- All fixes must work via DOM manipulation after React renders
- Multiple interception layers needed due to React's rendering lifecycle
