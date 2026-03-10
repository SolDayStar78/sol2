# 🎨 Artisan Gallery - Professional Art Portfolio Website

A professional, responsive art gallery website with dark theme, interactive features, and secure contact form.

## 📁 Project Structure

```
Mickiboi/
├── 📄 index.html              # Main homepage
├── 📄 gallery.html            # Complete paintings gallery
├── 📂 css/                    # Stylesheets
│   ├── style.css              # Main styles & responsive design
│   └── gallery-page.css       # Gallery-specific styles
├── 📂 js/                     # JavaScript files
│   ├── script.js              # Main interactive functionality
│   └── gallery-page.js        # Gallery-specific features
├── 📂 img/                    # Image assets
│   ├── README.md              # Image upload instructions
│   └── (your-paintings.jpg)   # Place your artwork here
├── 📂 backend/                # Server-side functionality
│   ├── contact.php            # Contact form handler
│   ├── config.php             # Configuration settings
│   └── logs/                  # Activity logs (auto-created)
├── 📂 tests/                  # Testing files
│   └── test-contact.html      # Contact form testing
└── 📂 docs/                   # Documentation
    └── SETUP-INSTRUCTIONS.md  # Complete setup guide
```

## ✨ Features

### 🎨 **Visual Design**
- ✅ Dark artistic theme with red accents (#ff6b6b)
- ✅ Professional typography (Playfair Display + Inter)
- ✅ Smooth animations and transitions
- ✅ Artistic SVG background elements
- ✅ Mobile-responsive design

### 🖼️ **Gallery Features**
- ✅ Interactive artwork cards with modal popups
- ✅ 6 paintings on homepage + 15 on gallery page
- ✅ Detailed artwork information display
- ✅ Professional grid layouts
- ✅ Touch-friendly mobile navigation

### 📧 **Contact System**
- ✅ Professional PHP backend
- ✅ Secure email delivery
- ✅ Spam protection & rate limiting
- ✅ Input validation & sanitization
- ✅ Activity logging & monitoring

### 🔒 **Security Features**
- ✅ XSS & injection protection
- ✅ Rate limiting (3 messages/5min per IP)
- ✅ CORS security headers
- ✅ Input validation & sanitization
- ✅ Suspicious content detection

### 📱 **Mobile Optimization**
- ✅ Responsive breakpoints (768px, 600px, 480px, 360px)
- ✅ Touch-friendly navigation
- ✅ Optimized layouts for all devices
- ✅ Mobile-specific interactions

## 🚀 Quick Start

### 1. **Setup Your Email**
```php
// Edit backend/config.php
define('CONTACT_EMAIL', 'your-email@example.com');
```

### 2. **Add Your Paintings**
- Place images in `img/` folder
- Name them: `painting1.jpg`, `painting2.jpg`, etc.
- Update artwork info in HTML files

### 3. **Test Everything**
- Open `tests/test-contact.html` 
- Test contact form functionality
- Verify email delivery

### 4. **Deploy to Web Host**
- Upload all files to PHP hosting
- Ensure PHP mail() function is enabled
- Monitor `backend/logs/` for activity

## 🛠️ Customization

### **Colors & Theme**
```css
/* Main accent color */
--accent-color: #ff6b6b;

/* Background colors */
--bg-primary: #0a0a0a;
--bg-secondary: #111111;
```

### **Contact Settings**
```php
// backend/config.php
define('MAX_SUBMISSIONS_PER_IP', 3);
define('RATE_LIMIT_DURATION', 300);
```

### **Artwork Information**
Update artwork details in `js/script.js` and `js/gallery-page.js`

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)  
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📋 Hosting Requirements

- ✅ PHP 7.0 or higher
- ✅ PHP mail() function enabled
- ✅ File write permissions
- ✅ HTTPS recommended

## 🎯 Perfect For

- Professional artists
- Art galleries
- Portfolio websites
- Creative professionals
- Art exhibitions

## 📧 Support

- Check `docs/SETUP-INSTRUCTIONS.md` for detailed setup
- Test with `tests/test-contact.html`
- Monitor `backend/logs/` for errors
- Verify hosting requirements

---

**Ready to showcase your art to the world!** 🎨✨

*Professional, secure, and mobile-optimized art gallery website.*