# Yammoing Website

A comprehensive, modern website for the Yammoing iOS health scanning application.

## Overview

This website showcases Yammoing - a sophisticated health and nutrition scanning app that analyzes food, beverages, supplements, personal care products, home goods, and water quality. Built with clean HTML, CSS, and JavaScript for optimal performance and maintainability.

## Files Structure

```
YammoWebsite/
├── index.html                 # Main homepage
├── features-detailed.html     # Comprehensive features breakdown
├── styles.css                 # Global styles and components
├── features-detailed.css      # Styles specific to detailed features page
├── script.js                  # Global JavaScript functionality
├── features-detailed.js       # Features page specific scripts
└── README.md                  # This file
```

## Pages

### 1. Homepage (index.html)
**Sections:**
- **Hero Section**: Eye-catching introduction with app value proposition
- **What It Scans**: 5 main categories (Food, Supplements, Personal Care, Home Goods, Water)
- **Features Overview**: 8 key feature cards highlighting main capabilities
- **How It Works**: 4-step process explanation
- **Health Score System**: Visual breakdown of 1-100 scoring ranges
- **9 Health Domains**: Grid overview of analysis dimensions
- **Data Sources**: Trusted scientific sources
- **Privacy**: Privacy-first approach highlights
- **Download CTA**: App Store download section
- **Footer**: Navigation and company info

### 2. Detailed Features Page (features-detailed.html)
**Sections:**
- **Multi-Modal Scanning**: Complete breakdown of 4 scanning methods
  - Barcode Scanner (10 features)
  - Photo Recognition (9 features)
  - Live Food Detection (11 features)
  - Manual Entry (10 features)

- **Science-Based Health Scoring**: Methodology explanation
  - Food Compass 2.0
  - Nutri-Score Integration
  - NOVA Classification
  - 4-step scoring process visualization

- **9 Health Domains - Deep Dive**: Expandable accordion sections
  - Nutrient Density Scorer (30+ micronutrients, ratios, beneficial compounds)
  - Metabolic Load Scorer (sugar, fat, protein, fiber analysis)
  - Processing Level Scorer (NOVA Groups 1-4 detailed)
  - Additives Scorer (E-numbers, risk categories, notable additives)
  - Microbiome Scorer (beneficial/harmful components, disease links)
  - Personal Risk Scorer (allergens, dietary restrictions, health conditions)
  - Plus 3 more domains

- **Meal Tracking**: Comprehensive logging and analytics features

## Features

### Design
- **Color Scheme**:
  - Primary: `#00B894` (Fresh green)
  - Excellent Score: Green gradient
  - Moderate Score: `#F2994A` (Orange)
  - Poor Score: `#EB5757` (Red)

- **Typography**: Manrope font family (Google Fonts)
- **Responsive**: Fully responsive design for mobile, tablet, and desktop
- **Modern UI**: Clean, card-based layout with smooth animations

### Interactive Elements
- Smooth scrolling navigation
- Animated score counter
- Statistics counter animation
- Intersection Observer animations for scroll reveals
- Accordion sections for detailed content
- Mobile-responsive hamburger menu
- Hover effects and transitions

### Technical Highlights
- **Pure HTML/CSS/JS**: No frameworks required
- **Performance Optimized**: Minimal dependencies
- **SEO Ready**: Semantic HTML with proper meta tags
- **Accessibility**: ARIA labels and keyboard navigation support
- **Cross-Browser Compatible**: Works on all modern browsers

## Color-Coded Health Scores

The website prominently features Yammoing's scoring system:

| Range | Color | Label | Meaning |
|-------|-------|-------|---------|
| 70-100 | Green | Encourage | Excellent/Good choices |
| 31-69 | Amber | Moderate | Fair, consume mindfully |
| 1-30 | Red | Minimize | Poor/Bad for health |

## Customization Guide

### Changing Colors
Edit `styles.css` CSS variables in the `:root` selector:
```css
:root {
    --primary-color: #00B894;  /* Change main brand color */
    --primary-dark: #00896B;
    --primary-light: #55EFC4;
}
```

### Adding Screenshots
When you have app screenshots, add them to the hero section:
```html
<div class="hero-visual">
    <img src="path/to/screenshot.png" alt="Yammoing App Screenshot">
</div>
```

### Updating Download Links
Replace `#` in download buttons with actual App Store URL:
```html
<a href="https://apps.apple.com/..." class="btn btn-download">
```

### Adding Analytics
In `script.js`, uncomment and configure tracking:
```javascript
// Google Analytics example
gtag('event', 'download_button_click', { location: button.textContent });
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

Consider adding:
1. **Science Page**: Detailed explanation of Food Compass 2.0 and research
2. **Water Analysis Page**: Deep dive into tap water and bottled water features
3. **Blog**: Health tips, ingredient spotlights, product reviews
4. **FAQ Page**: Common questions and answers
5. **Contact Form**: User inquiries and support
6. **Press Kit**: Media assets and company information
7. **Video Demos**: Screen recordings of app features
8. **User Testimonials**: Real user experiences and success stories
9. **Comparison Chart**: Yammoing vs competitors
10. **API Documentation**: If you offer developer API access

## Additional Pages to Create

Based on the comprehensive feature set, you could expand with:

- **Water Quality Analysis Page**: Detailed breakdown of tap water testing (50+ contaminants), bottled water database, filter recommendations
- **Cosmetic Safety Page**: Personal care product analysis, EWG integration, ingredient safety database
- **Meal Tracker Page**: Showcase meal logging, nutrition tracking, and progress analytics
- **Alternative Recommendations Page**: How the smart recommendation engine works
- **For Developers**: Technical architecture, data sources, API documentation
- **Science & Research**: Deep dive into scoring methodologies, studies, validations
- **Privacy & Security**: Detailed privacy policy, data handling, security measures

## Launching the Website

### Local Development
Simply open `index.html` in a web browser:
```bash
open index.html
# or
python3 -m http.server 8000  # Then visit http://localhost:8000
```

### Deployment Options

1. **GitHub Pages** (Free)
   - Push to GitHub repository
   - Enable GitHub Pages in Settings
   - Your site: `https://yourusername.github.io/yammowebsite`

2. **Netlify** (Free)
   - Drag and drop folder to Netlify
   - Automatic HTTPS and CDN
   - Custom domain support

3. **Vercel** (Free)
   - `npm i -g vercel`
   - `vercel deploy`

4. **Custom Hosting**
   - Upload files via FTP to any web host
   - Configure domain and SSL

## Performance Tips

- Add actual app screenshots (compress with TinyPNG)
- Implement lazy loading for images
- Minify CSS/JS for production
- Add service worker for offline support
- Optimize Google Fonts loading

## Contact

For questions about Yammoing:
- Email: hello@yammoing.com (update with actual email)
- Support: support@yammoing.com

---

## App Store Requirements

When ready to launch, ensure you have:
- [ ] App Store listing ready
- [ ] App screenshots (6.5" and 5.5" iPhone displays)
- [ ] App icon (1024x1024px)
- [ ] Privacy policy URL
- [ ] Terms of service URL
- [ ] Support URL
- [ ] Update website download links with App Store URL

## Marketing Checklist

- [ ] Social media accounts (Instagram, Twitter, TikTok)
- [ ] Email newsletter signup form
- [ ] Press release
- [ ] Product Hunt launch
- [ ] App Store optimization (ASO)
- [ ] Blog content plan
- [ ] Influencer outreach
- [ ] User testimonials and reviews

---

Built with ❤️ for healthier choices.
