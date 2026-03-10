# 🎨 How to Add Your Own Paintings to the Gallery

## 📁 Step 1: Prepare Your Painting Images

1. **Create the img folder** (already done for you)
   - Place all your painting images in: `d:\Mickiboi\img\`

2. **Image Requirements:**
   - **Format:** JPG, PNG, or WebP
   - **Size:** Recommended 800x600px or larger
   - **Aspect Ratio:** Any ratio works, images will be cropped to fit
   - **File Size:** Keep under 2MB for faster loading

3. **Naming Convention:**
   ```
   painting1.jpg    (for your first painting)
   painting2.jpg    (for your second painting)
   painting3.jpg    (for your third painting)
   painting4.jpg    (for your fourth painting)
   painting5.jpg    (for your fifth painting)
   painting6.jpg    (for your sixth painting)
   ```

## 🖼️ Step 2: Add Your Painting Images

**Method A: Quick Setup (Recommended)**
1. Save your painting images with the names above in the `img` folder
2. The CSS is already set up to use these names!

**Method B: Custom Names**
If you want different filenames, update the CSS in `css/style.css`:
```css
.paintings-1 { 
    background: url('../img/YOUR-PAINTING-NAME.jpg') center center / cover no-repeat;
}
```

## ✏️ Step 3: Update Painting Information

Edit the artwork data in `js/script.js` around line 78:

```javascript
const artworkData = {
    'paintings-1': {
        title: 'Your Amazing Painting',           // ← Your painting title
        artist: 'Your Name',                      // ← Your name
        medium: 'Oil on Canvas, 24" x 36"',      // ← Medium and dimensions
        price: '$1,500',                          // ← Your price
        description: 'Tell the story of your painting here. What inspired you? What techniques did you use? What should viewers know about this piece?'
    },
    // Repeat for paintings-2 through paintings-6...
}
```

## 🎭 Step 4: Update Gallery Name and Info

In `index.html`, update the gallery name:
```html
<div class="nav-logo">
    <h1>Your Gallery Name</h1>                   <!-- ← Your gallery name -->
</div>
```

## 📧 Step 5: Update Contact Information

In `index.html`, update the contact section:
```html
<div class="contact-item">
    <h4>Contact</h4>
    <p>Phone: Your Phone<br>Email: your-email@example.com</p>  <!-- ← Your contact info -->
</div>
```

And in `js/script.js`, update the email for inquiries:
```javascript
window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
```

## 🎨 Step 6: Customize Gallery Name

In `index.html`, update the gallery name:
```html
<div class="nav-logo">
    <h1>Your Gallery Name</h1>                   <!-- ← Your gallery name -->
</div>
```

## 📱 Image Size Recommendations

- **Painting Thumbnails:** 400x300px minimum
- **Modal Display:** 800x600px recommended
- **Artist Photos:** 300x300px (square)

## 🔧 Pro Tips

1. **Optimize Images:** Use tools like TinyPNG to compress images
2. **Backup Originals:** Keep high-resolution copies separate
3. **Test Mobile:** Check how paintings look on phone screens
4. **SEO:** Use descriptive filenames like "sunset-landscape-2024.jpg"

## 🚀 Quick Start Checklist

- [ ] Add 6 painting images to `/img/` folder (painting1.jpg through painting6.jpg)
- [ ] Update painting titles, descriptions, and prices in `script.js`
- [ ] Update your name and bio in `index.html`
- [ ] Change contact information
- [ ] Test the gallery in your browser
- [ ] Share your amazing paintings with the world! 🎉

## 📞 Need Help?

If you run into any issues:
1. Check browser console for errors (F12)
2. Verify image file paths are correct
3. Make sure image files aren't corrupted
4. Test with one painting first, then add others

## 🚨 Common Issues & Solutions

### **Images Not Loading?**
1. **Check file names:** Ensure they are exactly `painting1.jpg`, `painting2.jpg`, etc. (case-sensitive)
2. **Check file location:** Images must be in `d:\Mickiboi\img\` folder
3. **File format:** Use `.jpg`, `.jpeg`, `.png`, or `.webp`
4. **Browser cache:** Hard refresh with `Ctrl+F5` or `Cmd+Shift+R`
5. **File size:** Very large files (>5MB) may not load well

### **Only Gradients Showing?**
This means your images aren't loading. Check the file paths and names again.

### **Images Too Big/Small?**
The CSS automatically crops and resizes images to fit. For best results:
- Use images at least 800x600px
- Keep aspect ratio around 4:3 or 16:9

### **Testing Your Gallery**
1. Open `index.html` in your browser
2. Press F12 to open developer tools
3. Check the Console tab for any error messages
4. Look for red error messages about failed image loads

Happy painting gallery building! 🎨✨
