# 📱 Mobile View Setup Guide

## ⚠️ CRITICAL: This prototype MUST be viewed in mobile mode!

The Valeo Health Prototype is **mobile-first** and optimized for smartphone screens. When viewing on a desktop computer, you **must** use browser developer tools to simulate a mobile device, or you will miss important features and the layout will not display correctly.

---

## 🖥️ Desktop Users: Follow These Steps

### Method 1: Chrome / Edge (Recommended) ⭐

#### Step-by-Step:

1. **Open the prototype** in Chrome or Edge
   ```
   http://localhost:3000
   ```

2. **Open DevTools** (choose one):
   - Press `F12` key
   - Press `Ctrl+Shift+I` (Windows/Linux)
   - Press `Cmd+Option+I` (Mac)
   - Right-click → "Inspect"

3. **Toggle Device Toolbar** (choose one):
   - Click the phone/tablet icon in DevTools toolbar
   - Press `Ctrl+Shift+M` (Windows/Linux)
   - Press `Cmd+Shift+M` (Mac)

4. **Select a mobile device**:
   - Click the dropdown at the top (default: "Dimensions: Responsive")
   - Select **"iPhone 14 Pro"** or **"Pixel 7"**
   - Or manually set dimensions: **390 x 844** (iPhone) or **412 x 915** (Pixel)

5. **Refresh the page**: Press `F5` or `Cmd+R`

6. **You should now see:**
   ✅ Yellow "Get the Valeo Health App" bar at top (mobile only)
   ✅ Bottom navigation bar with 4 icons
   ✅ Proper spacing and layout
   ✅ Touch-optimized buttons

#### Quick Visual Guide:
```
┌─────────────────────────────────────┐
│  [Devices] iPhone 14 Pro ▼   100%  │ ← Select device here
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │  Get Valeo App for faster... [X]│ │ ← Mobile app bar (mobile only)
│ │                                 │ │
│ │    [Valeo Logo]                 │ │
│ │    Welcome to Valeo Health      │ │
│ │                                 │ │
│ │    [Service Cards Grid]         │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ [Home] [Referrals] [Plans] [💰] │ │ ← Bottom nav (always visible)
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

### Method 2: Firefox

1. **Open the prototype** in Firefox
2. **Open DevTools**: Press `F12` or `Ctrl+Shift+I` / `Cmd+Option+I`
3. **Toggle Responsive Mode**: 
   - Press `Ctrl+Shift+M` (Windows/Linux)
   - Press `Cmd+Option+M` (Mac)
   - Or click the phone/tablet icon in toolbar
4. **Select device**: Choose from preset dropdown or set custom size
5. **Set dimensions**: 390 x 844 (iPhone) or 412 x 915 (Pixel)
6. **Refresh the page**

---

### Method 3: Safari (Mac Only)

1. **Enable Developer Menu** (first time only):
   - Safari → Preferences → Advanced
   - Check "Show Develop menu in menu bar"

2. **Open the prototype** in Safari
3. **Open Web Inspector**: Press `Cmd+Option+I`
4. **Enter Responsive Mode**:
   - Menu: Develop → Enter Responsive Design Mode
   - Or press `Cmd+Ctrl+R`
5. **Select device**: Choose "iPhone 14 Pro" or set custom
6. **Refresh the page**

---

## 🎯 Recommended Device Settings

### iPhone 14 Pro (Best Option) ⭐
- **Dimensions**: 390 x 844
- **Pixel Ratio**: 3x
- **User Agent**: iOS 16

### Google Pixel 7
- **Dimensions**: 412 x 915
- **Pixel Ratio**: 2.625x
- **User Agent**: Android 13

### Generic Mobile
- **Min Width**: 375px (iPhone SE)
- **Max Width**: 428px (iPhone 14 Pro Max)
- **Height**: 667px - 926px

---

## ✅ Verification Checklist

After switching to mobile view, verify you can see:

- [ ] **Top App Bar**: Yellow banner "Get the Valeo Health App for faster access →"
- [ ] **Valeo Logo**: Centered wordmark logo
- [ ] **Service Cards**: 6 service cards in single column (mobile) or 2 columns (larger)
- [ ] **Bottom Navigation**: Fixed bar with Home, Referrals, Plans, Wallet icons
- [ ] **Proper Spacing**: Content doesn't look stretched or cramped
- [ ] **Large Buttons**: All buttons are easy to tap (minimum 44x44px)

---

## ❌ Common Issues & Solutions

### Issue 1: "I don't see the app bar at the top"
**Solution**: 
- Make sure viewport width is **< 768px**
- Refresh the page after switching to mobile view
- The app bar only shows on mobile devices

### Issue 2: "Bottom navigation looks weird"
**Solution**:
- Ensure you've selected a mobile device preset
- Width should be between 375px - 428px
- Refresh the page

### Issue 3: "Layout looks stretched horizontally"
**Solution**:
- You're viewing in desktop mode
- Follow the steps above to enable device toolbar
- Select iPhone 14 Pro from the dropdown

### Issue 4: "Can't click the device toggle button"
**Solution**:
- Make sure DevTools is open (F12)
- Look for phone/tablet icon in top-left of DevTools
- Or use keyboard shortcut: Ctrl+Shift+M / Cmd+Shift+M

### Issue 5: "Text is too small to read"
**Solution**:
- Use the zoom controls in DevTools
- Set to 100% or 125% for comfortable viewing
- Don't zoom the browser itself, use DevTools zoom

---

## 🎨 What You'll Miss Without Mobile View

### Features Only Visible in Mobile Mode:
1. **App Redirect Bar** (<768px only)
   - Yellow bar at top
   - Detects iOS/Android
   - Links to app stores
   - Dismissible with sessionStorage

2. **Optimized Bottom Navigation**
   - Fixed at bottom
   - Perfect spacing for thumb reach
   - Active state highlighting
   - Icon + label layout

3. **Touch-Optimized Buttons**
   - Large tap targets (min 44x44px)
   - Comfortable spacing
   - Easy one-handed use

4. **Mobile-First Layouts**
   - Single column card grids
   - Stacked content sections
   - Thumb-friendly forms
   - Proper text sizes (16px+)

### How It Looks Wrong in Desktop Mode:
- ❌ No app redirect bar
- ❌ Navigation stretched horizontally
- ❌ Cards side-by-side when should be stacked
- ❌ Excessive white space
- ❌ Not representative of actual user experience

---

## 💡 Pro Tips

### During Development
1. **Keep DevTools Open**: Leave it docked to the side
2. **Use iPhone 14 Pro**: Most common target device
3. **Test Interactions**: Click buttons, scroll, navigate
4. **Check All Pages**: Each page is mobile-optimized

### During Demo
1. **Pre-Setup**: Have mobile view ready before presenting
2. **Zoom Level**: Set DevTools to 100% for clarity
3. **Screen Share**: Ensure mobile view is visible
4. **Explain**: Mention it's a mobile-first prototype

### For Testing
1. **Test Multiple Devices**: Try iPhone, Pixel, iPad
2. **Rotate**: Test portrait and landscape
3. **Touch Events**: Use mouse to simulate taps
4. **Slow Network**: Throttle in DevTools to test loading

---

## 📊 Recommended Setup for Different Use Cases

### For Demos/Presentations
```
Device: iPhone 14 Pro (390 x 844)
Zoom: 125% (for visibility on screen share)
DevTools: Docked to right side
Browser: Chrome (best DevTools)
```

### For Development
```
Device: iPhone 14 Pro or Pixel 7
Zoom: 100%
DevTools: Docked to bottom
Browser: Chrome or Edge
Console: Open for debugging
```

### For User Testing
```
Device: Actual mobile device (preferred)
OR
Device: Responsive mode with touch simulation
Zoom: 100%
Browser: Chrome on mobile or DevTools
```

### For Screenshots/Recording
```
Device: iPhone 14 Pro (390 x 844)
Zoom: 100%
DevTools: Hidden (toggle off with F12)
Browser: Chrome
Background: White for clean captures
```

---

## 🎬 Quick Reference Card

### Chrome Keyboard Shortcuts
| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Open DevTools | `F12` or `Ctrl+Shift+I` | `Cmd+Option+I` |
| Toggle Device Mode | `Ctrl+Shift+M` | `Cmd+Shift+M` |
| Refresh Page | `F5` or `Ctrl+R` | `Cmd+R` |
| Hard Refresh | `Ctrl+Shift+R` | `Cmd+Shift+R` |
| Zoom In | `Ctrl+Plus` | `Cmd+Plus` |
| Zoom Out | `Ctrl+Minus` | `Cmd+Minus` |
| Reset Zoom | `Ctrl+0` | `Cmd+0` |

### Device Presets Available
- iPhone SE (375 x 667)
- iPhone 14 Pro (390 x 844) ⭐ **Recommended**
- iPhone 14 Pro Max (428 x 926)
- Google Pixel 7 (412 x 915)
- Samsung Galaxy S20 Ultra (412 x 915)
- iPad Air (820 x 1180)

---

## 🔗 Additional Resources

### Chrome DevTools Guide
https://developer.chrome.com/docs/devtools/device-mode/

### Firefox Responsive Design Mode
https://firefox-source-docs.mozilla.org/devtools-user/responsive_design_mode/

### Safari Web Inspector
https://developer.apple.com/safari/tools/

---

## ✅ Final Setup Checklist

Before starting your demo or development:

- [ ] Dev server running (`npm run dev`)
- [ ] Browser open to `http://localhost:3000`
- [ ] DevTools open (`F12`)
- [ ] Device mode enabled (`Ctrl+Shift+M` / `Cmd+Shift+M`)
- [ ] iPhone 14 Pro selected (390 x 844)
- [ ] Page refreshed (`F5`)
- [ ] App redirect bar visible at top
- [ ] Bottom navigation visible at bottom
- [ ] Zoom set to 100% or 125%
- [ ] Ready to demo! 🎉

---

## 🆘 Still Having Issues?

1. **Close and reopen browser**
2. **Clear browser cache**: `Ctrl+Shift+Delete` / `Cmd+Shift+Delete`
3. **Restart dev server**: Stop with `Ctrl+C`, run `npm run dev` again
4. **Try a different browser**: Chrome usually works best
5. **Check console for errors**: Look in DevTools Console tab
6. **Verify Node version**: Run `node --version` (should be 18+)

---

## 🎉 You're Ready!

Once you see:
- ✅ Yellow app bar at top
- ✅ Mobile-optimized layout
- ✅ Bottom navigation
- ✅ Proper spacing

**You're all set to explore the Valeo Health Prototype!**

Navigate through:
1. Home → View services
2. Referrals → Invite friends, simulate conversion
3. Subscriptions → Subscribe to Premium
4. Wallet → Redeem points
5. Internal Referral → Scan QR code
6. Admin (type `/admin`) → View analytics

Enjoy exploring the mobile-first Valeo Health experience! 📱✨

---

**Remember**: This is a mobile-first prototype. Always use mobile view on desktop for the best experience!
