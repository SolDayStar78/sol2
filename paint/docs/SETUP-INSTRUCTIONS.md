# Contact Form Setup Instructions

## 🚀 Complete Backend Solution for Your Art Gallery

Your website now has a professional contact form with PHP backend that will send emails directly to your inbox!

## 📁 Files Created:

1. **`backend/contact.php`** - Main backend script that handles form submissions
2. **`backend/config.php`** - Configuration file (EDIT THIS FIRST!)
3. **`tests/test-contact.html`** - Test page to verify your setup
4. **Updated `js/script.js`** - Frontend now connects to backend

## ⚙️ Setup Instructions:

### 1. **Configure Your Email (REQUIRED)**
Edit `backend/config.php` and change:
```php
define('CONTACT_EMAIL', 'your-email@example.com'); // Replace with YOUR email
```

### 2. **Upload Files to Your Web Host**
Upload all files to your web hosting server that supports PHP (most hosting providers do).

### 3. **Test the Setup**
- Visit `your-website.com/tests/test-contact.html`
- Fill out the test form
- Check if you receive the email

### 4. **Hosting Requirements**
- ✅ PHP 7.0+ (most hosts have this)
- ✅ PHP `mail()` function enabled
- ✅ File write permissions for logs

## 🔒 Security Features Included:

- ✅ **Rate Limiting** - Prevents spam (max 3 messages per 5 minutes per IP)
- ✅ **Input Validation** - Checks all form fields
- ✅ **XSS Protection** - Prevents malicious code injection
- ✅ **Email Header Injection Protection** - Stops email spam attempts
- ✅ **Logging** - Tracks all submissions and errors
- ✅ **CORS Protection** - Secure cross-origin requests

## 📧 What Happens When Someone Contacts You:

1. **User fills out form** on your website
2. **JavaScript validates** the input client-side
3. **PHP script processes** the submission server-side
4. **Email is sent** directly to your inbox
5. **User sees confirmation** message
6. **Activity is logged** for your records

## 📊 Monitoring:

- **Success Log**: `backend/logs/contact_log.txt` - All successful submissions
- **Error Log**: `backend/logs/contact_errors.txt` - Any errors or spam attempts
- **Rate Limit Files**: `backend/logs/rate_limit_*.txt` - Spam prevention tracking

## 🔧 Customization Options:

Edit `backend/config.php` to modify:
- Your email address
- Website name
- Rate limiting settings
- Validation rules
- Log file locations

## 🌐 Popular Hosting Providers That Support This:

- ✅ **Bluehost** - PHP enabled by default
- ✅ **SiteGround** - Full PHP support
- ✅ **HostGator** - PHP mail() function available
- ✅ **GoDaddy** - PHP hosting plans
- ✅ **Namecheap** - Shared hosting with PHP
- ✅ **cPanel Hosting** - Most providers with cPanel

## 🚨 Important Notes:

1. **CHANGE THE EMAIL** in `backend/config.php` before going live!
2. **Test thoroughly** using `tests/test-contact.html`
3. **Check spam folder** - first emails might go there
4. **Monitor logs** regularly for any issues
5. **Backup your files** before making changes

## 📱 Mobile Optimized:

The contact form works perfectly on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones
- ✅ All modern browsers

## 🎨 Your Art Gallery is Now Complete!

With this backend solution, your art gallery website is production-ready with:
- Professional contact form
- Secure email delivery
- Spam protection
- Mobile responsiveness
- Dark artistic theme
- Working navigation

Ready to showcase your art to the world! 🎨✨

---

**Need Help?** 
- Test with `tests/test-contact.html` first
- Check the logs for any errors
- Ensure your hosting provider supports PHP mail()