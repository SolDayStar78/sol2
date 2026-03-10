# 🚀 PHP Testing Setup Guide

## Method 1: XAMPP (Recommended - Easiest) ⭐

### Step 1: Download & Install XAMPP
1. Go to: https://www.apachefriends.org/
2. Download XAMPP for Windows
3. Install it (default location: `C:\xampp\`)

### Step 2: Start Apache Server
1. Open **XAMPP Control Panel**
2. Click **"Start"** next to **Apache**
3. You should see Apache running (green highlight)

### Step 3: Copy Your Project
1. Copy your entire `Mickiboi` folder
2. Paste it into: `C:\xampp\htdocs\`
3. So you have: `C:\xampp\htdocs\Mickiboi\`

### Step 4: Test Your Contact Form
1. Open browser
2. Go to: `http://localhost/Mickiboi/tests/test-contact.html`
3. Fill the form and test - it will work with PHP now! ✅

---

## Method 2: VS Code PHP Server Extension

### Step 1: Install Extension
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search: "PHP Server"
4. Install the extension by "brapifra"

### Step 2: Use the Extension
1. Right-click on your `index.html` or `test-contact.html`
2. Select "PHP Server: Serve project"
3. It will open in browser with PHP support

---

## Method 3: Portable PHP (No Installation)

### Step 1: Download Portable PHP
1. Go to: https://windows.php.net/download/
2. Download "Thread Safe" ZIP version
3. Extract to: `C:\php\`

### Step 2: Run PHP Server
1. Open PowerShell in your project folder
2. Run: `C:\php\php.exe -S localhost:8000`
3. Visit: `http://localhost:8000/tests/test-contact.html`

---

## 🎯 Quick Start (XAMPP Method)

1. **Download XAMPP**: https://www.apachefriends.org/
2. **Install & Start Apache**
3. **Copy project to**: `C:\xampp\htdocs\Mickiboi\`
4. **Test at**: `http://localhost/Mickiboi/tests/test-contact.html`

## ⚡ What This Solves

- ❌ **Before**: "Unexpected JSON input" error
- ✅ **After**: PHP executes properly, returns real JSON
- ✅ **Result**: Contact form works perfectly!

## 📧 Don't Forget

Update your email in `backend/config.php`:
```php
'to_email' => 'your-email@gmail.com'  // Change this!
```

---

**Choose XAMPP if you want the easiest setup! 🚀**