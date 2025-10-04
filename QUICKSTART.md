# 🚀 Quick Start Guide

Get the Valeo Health Prototype running in 60 seconds!

## ⚡ Fast Setup

```bash
# 1. Navigate to the project
cd valeo

# 2. Install dependencies (first time only)
npm install

# 3. Start the development server
npm run dev
```

Open your browser to: **http://localhost:3000**

---

## 📱 **IMPORTANT: View in Mobile Mode**

This prototype is **mobile-first** and optimized for mobile devices. When viewing on desktop, you **must** use browser developer tools to simulate a mobile device.

### Chrome / Edge (Recommended)
1. Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
2. Click the **Device Toggle** button or press `Ctrl+Shift+M` / `Cmd+Shift+M`
3. Select **iPhone 14 Pro** or **Pixel 7** from the dropdown
4. Set dimensions to **390 x 844** (iPhone) or **412 x 915** (Pixel)
5. Refresh the page (`F5`)

### Firefox
1. Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
2. Click the **Responsive Design Mode** button or press `Ctrl+Shift+M` / `Cmd+Option+M`
3. Select a mobile device preset or set to **375 x 812**
4. Refresh the page

### Safari (Mac)
1. Enable Developer menu: `Preferences > Advanced > Show Develop menu`
2. Press `Cmd+Option+I` to open Web Inspector
3. Select `Develop > Enter Responsive Design Mode`
4. Choose **iPhone 14 Pro** or set custom dimensions
5. Refresh the page

### Why Mobile View?
- ✅ Bottom navigation appears correctly
- ✅ App redirect bar shows on top (mobile only)
- ✅ Proper touch target sizes
- ✅ Optimized layouts and spacing
- ✅ True mobile experience

**Without mobile view, you'll miss key features and the layout may look stretched!**

---

## 📱 Best Viewing Experience

1. Open Chrome DevTools (`F12` or `Cmd+Option+I`)
2. Toggle Device Toolbar (`Ctrl+Shift+M` or `Cmd+Shift+M`)
3. Select **iPhone 14 Pro** or similar mobile device
4. Refresh the page

---

## 🎯 6-Minute Demo Path

1. **Home** (`/`) - View services, click "Start Referring"
2. **Referrals** (`/referrals`) - Invite friend, simulate conversion (watch confetti!)
3. **Subscriptions** (`/subscriptions`) - Subscribe to Premium plan
4. **Wallet** (`/wallet`) - Redeem points (more confetti!)
5. **Internal Referral** (`/internal-referral`) - Scan therapist QR code (more confetti!)
6. **Admin** (`/admin`) - View analytics dashboard

---

## 📝 Quick Reference

### Key Features
- ✅ Mobile-first responsive design
- ✅ Real Valeo branding & colors
- ✅ Referral tracking with confetti
- ✅ Subscription management
- ✅ Points & rewards system
- ✅ Admin analytics dashboard

### Tech Stack
- Next.js 15 + React 18
- Tailwind CSS
- Zustand (state)
- Framer Motion (animations)
- Recharts (admin charts)

### Routes
- `/` - Home page
- `/referrals` - Referral dashboard
- `/subscriptions` - Plans page
- `/wallet` - Points & rewards
- `/internal-referral` - Therapist QR scanning
- `/admin` - Analytics (hidden)

---

## 🔧 Commands

```bash
# Development
npm run dev          # Start dev server on :3000

# Build
npm run build        # Create production build
npm start            # Run production server

# Other
npm run lint         # Run linting
npm run typecheck    # Check TypeScript types
```

---

## 🎨 Color Reference

```css
--valeo-yellow: #FFD54F      /* Primary */
--valeo-navy: #002B5B        /* Secondary */
--valeo-text: #1F2937        /* Text */
--valeo-bg: #F3F4F6          /* Background */
```

Gradient: `#F9A825` → `#FFC107`

---

## 📦 Project Structure

```
valeo/
├── app/              # Pages (Next.js App Router)
├── components/       # Reusable components
├── lib/             # State management (Zustand)
├── types/           # TypeScript definitions
└── public/          # Static assets
```

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
pkill -9 -f "next dev"
npm run dev
```

**Build fails?**
```bash
rm -rf .next
npm run build
```

**Styles not loading?**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

---

## 📖 Documentation

- **README.md** - Full technical documentation
- **DEMO_GUIDE.md** - Detailed demo instructions
- **SUMMARY.md** - Implementation overview

---

## 💡 Pro Tips

1. **Enable confetti**: Click "Simulate Referral Conversion" or "Redeem Points"
2. **View mobile app bar**: Resize browser to < 768px width
3. **Access admin**: Manually type `/admin` in the URL
4. **Reset state**: Refresh the page (all data is in-memory)
5. **Check network**: All Valeo images load from CloudFront CDN

---

## ✨ Key Interactions to Demo

### Referral Flow
1. Click "Invite a Friend" → Modal opens
2. Click "Copy Link" → Toast notification
3. Click "Share on WhatsApp" → Opens WhatsApp
4. Click "Simulate Referral Conversion" → Confetti! 🎉

### Subscription Flow
1. Click "Subscribe Now" on Premium → Checkout modal
2. Click "Confirm Subscription" → Success toast
3. Green banner appears → "Active Premium Member"

### Wallet Flow
1. Click "Redeem Points" → Select amount
2. Click "Redeem 500 Points" → Confetti! 🎉
3. Balance updates → New transaction appears

---

## 🎯 Performance

- **Build time**: ~1.5s
- **Bundle size**: 155 KB (home page)
- **All pages**: Static (pre-rendered)
- **Load time**: < 1s on localhost

---

## 🚀 You're Ready!

The Valeo Health Prototype is running. Follow the demo path above for the best experience.

**Need help?** Check the full documentation in README.md

---

**Happy demoing!** 🎉
