# Valeo Health Prototype - Demo Guide

## 🎬 Quick Start

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to: [http://localhost:3000](http://localhost:3000)

3. **CRITICAL: Switch to Mobile View** (on desktop)
   - Open Chrome DevTools: `F12` or `Ctrl+Shift+M` (Windows) / `Cmd+Shift+M` (Mac)
   - Click the **Device Toggle Toolbar** button
   - Select **iPhone 14 Pro** or similar mobile device
   - Or set dimensions to **390 x 844** manually
   - **Refresh the page** to see mobile-optimized layout

   **Why?** This prototype is mobile-first. Desktop view will look stretched and miss key features like the app redirect bar and proper bottom navigation.

---

## 📱 Demo Flow (Recommended Order)

### 1. Home Page (`/`)
**What to show:**
- Clean, professional Valeo branding with logo
- Tagline: "At-home testing, supplements & wellness programs — made simple"
- 6 service cards with icons (Blood Testing, Weight Loss, IV Therapy, etc.)
- Yellow gradient CTA banner: "Earn Rewards with Valeo"
- Smooth fade-in animations on page load

**Actions:**
- Scroll through services
- Hover over service cards (border changes to yellow)
- Click "Start Referring" button → navigates to Referrals page

---

### 2. Referrals Page (`/referrals`)
**What to show:**
- Dashboard metrics:
  - 4 Invites Sent
  - 2 Successful Referrals  
  - AED 500 Credits Earned
- Progress bar toward next reward tier
- Recent referrals list with status badges

**Demo Actions:**

#### A. Invite a Friend
1. Click "Invite a Friend" button
2. Modal opens showing:
   - WhatsApp message preview
   - Referral link: `valeo.app/invite/abc123`
   - "Copy Link" button
   - "Share on WhatsApp" button
3. Click "Copy Link" → Toast notification: "Link copied to clipboard!"
4. Click "Share on WhatsApp" → Opens WhatsApp (or web.whatsapp.com)
5. Notice: Invite count increases in the dashboard

#### B. Simulate Referral Conversion
1. Click "Simulate Referral Conversion" button
2. Watch for:
   - **Confetti animation** 🎉
   - Toast notification: "Referral converted! +500 points earned"
   - Successful referrals count increases
   - Credits earned updates
   - Progress bar advances
3. Navigate to Wallet to see points added

---

### 3. Subscriptions Page (`/subscriptions`)
**What to show:**
- Two plan cards side-by-side:
  - **Free Explorer Plan**: Basic access
  - **Premium Plan** (marked "Most Popular"): AED 499/month
- Premium features highlighted with checkmarks
- If already subscribed, green banner shows at top

**Demo Actions:**

#### Subscribe to Premium
1. Click "Subscribe Now" on Premium Plan
2. Checkout modal appears with:
   - Plan details
   - Price breakdown (Subtotal, Tax, Total)
   - Mock checkout warning (yellow banner)
3. Click "Confirm Subscription"
4. Toast notification: "You are now subscribed to the Premium Plan!"
5. Page updates to show active subscription banner
6. User state changes from "free" → "premium"

---

### 4. Wallet Page (`/wallet`)
**What to show:**
- Large yellow card showing:
  - Total balance: **1,200 VWP** (Valeo Wellness Points)
  - Current tier badge (Member/Advocate/Champion)
- Progress bar toward next tier
- Transaction history with icons
- "How to Earn Points" guide

**Demo Actions:**

#### Redeem Points
1. Click "Redeem Points" button
2. Modal shows:
   - Available points: 1,200
   - Two redemption options:
     - 500 pts = AED 50
     - 1,000 pts = AED 100
3. Select an amount (e.g., 500 points)
4. Click "Redeem 500 Points"
5. Watch for:
   - **Confetti animation** 🎉
   - Toast notification: "🎉 500 Points redeemed for AED 50 credit!"
   - Balance updates (1,200 → 700)
   - New transaction appears in history
6. Tier progress bar may update if crossing threshold

---

### 5. Internal Referral Page (`/internal-referral`)
**What to show:**
- Therapist information card:
  - Mock therapist: Dr. Sarah Ahmed
  - Specialty: Wellness Consultant
  - Therapist ID and location
- Large QR code placeholder with pattern
- Referral stats display
- "How It Works" step-by-step guide

**Demo Actions:**

#### Scan QR Code
1. Click "Scan QR Code" button
2. Watch for:
   - Button text changes to "Scanning..." with pulse animation
   - 1.5 second scanning simulation
   - QR code transforms to green checkmark
   - **Confetti animation** 🎉
   - Toast notification: "🎉 QR Code scanned! Referral recorded successfully"
3. Notice:
   - Referral count increments by 1
   - Stats cards update in real-time
   - Button changes to "Scanned Successfully!" briefly
4. After 3 seconds, button resets for next scan

---

### 6. Admin Dashboard (`/admin`)
**What to show:**
- **Note**: This is a hidden route (no navigation link)
- Type `/admin` in the URL bar manually
- Professional dashboard with:
  - 4 KPI cards with metrics
  - Line chart: User Growth over 5 months
  - Bar chart: Referral Trends
  - Pie chart: Subscription Distribution (Free vs Premium)
  - Recent Activity feed
- Shows mock analytics data

**Key Features:**
- Charts use real Valeo colors (#FFD54F, #002B5B)
- Responsive layout (switches to column on mobile)
- "Back to App" link at bottom

---

## 🎯 Key Features to Highlight

### Mobile App Redirect Bar
**Only visible on mobile viewports (<768px)**
1. Sticky yellow bar at top of screen
2. Shows: "Get the Valeo Health App for faster access →"
3. Detects device:
   - iOS → Redirects to App Store
   - Android → Redirects to Play Store
4. Dismissible with "X" button
5. Uses sessionStorage (won't show again until session ends)

### Bottom Navigation
**Always visible (except on /admin page)**
- Fixed bottom bar with 4 tabs
- Icons: Home, Referrals, Plans, Wallet
- Active tab highlighted in navy blue (#002B5B)
- Inactive tabs in gray
- Smooth transitions

### Animations & Feedback
- **Framer Motion**: Page load animations, card hover effects
- **Canvas Confetti**: Referral conversions, points redemption
- **React Hot Toast**: All success/error notifications
- **Smooth Transitions**: Border colors, scales, fades

---

## 🎨 Design Elements to Point Out

1. **Valeo Branding**:
   - Real Valeo logo and favicon
   - Consistent yellow (#FFD54F) and navy (#002B5B) colors
   - Professional, clean wellness aesthetic

2. **Mobile-First**:
   - All layouts optimized for 375-480px screens
   - Large, touch-friendly buttons
   - Readable fonts (16px+ body text)

3. **Visual Hierarchy**:
   - Bold navy headings
   - Yellow for CTAs and rewards
   - Gray for secondary info
   - Green for success states
   - Consistent spacing and padding

---

## 🔄 State Changes to Demonstrate

### Referral Flow
- **Before**: 4 invites, 2 successful, 500 credits
- **After invite**: 5 invites
- **After conversion**: 3 successful, 1,000 credits, +500 points in wallet

### Subscription Flow
- **Before**: "free" plan, no banner
- **After**: "premium" plan, green success banner appears

### Wallet Flow
- **Before**: 1,200 points, Member tier
- **After redeeming 500**: 700 points, transaction added
- **After redeeming 1,000**: Might cross into Advocate tier (1,000+ points)

---

## 💡 Talking Points

### For Product Teams
- "This demonstrates the complete user journey from referral to rewards"
- "All interactions are instant with visual feedback"
- "Mock data allows for easy testing of different scenarios"

### For Design Teams
- "Mobile-first approach with responsive breakpoints"
- "Consistent use of Valeo brand colors and typography"
- "Animations add polish without being distracting"

### For Development Teams
- "Built with Next.js 15 and modern React patterns"
- "Zustand for lightweight state management"
- "Reusable UI components with Radix UI primitives"
- "Easy to extend with real API integration"

---

## 🐛 Known Limitations (By Design)

1. **No persistence**: Data resets on page reload
2. **No authentication**: Open access to all pages
3. **Mock payments**: No real payment processing
4. **Single user**: No multi-user support
5. **Static content**: Service cards don't navigate anywhere

These are **intentional** for a frontend prototype.

---

## 🎥 Screen Recording Tips

If recording a demo video:

1. **Use mobile viewport**: 375x812 (iPhone 13 Pro)
2. **Show app redirect bar**: Toggle device toolbar
3. **Record at 60fps**: For smooth animations
4. **Show all interactions**: Click slowly to capture each animation
5. **Demonstrate state changes**: Show before/after in wallet
6. **End with admin dashboard**: Show the analytics view

---

## 📊 Demo Script (6 Minutes)

**0:00-0:30** - Home page, scroll through services, explain value prop  
**0:30-1:15** - Referrals: invite friend, simulate conversion, show confetti  
**1:15-2:00** - Subscriptions: explain plans, subscribe to premium  
**2:00-2:45** - Wallet: check balance, redeem points, show confetti  
**2:45-3:30** - Internal Referral: show therapist card, scan QR, show confetti  
**3:30-4:00** - Navigate between pages using bottom nav  
**4:00-4:45** - Admin dashboard: show charts and metrics  
**4:45-6:00** - Mobile app redirect bar, recap features, wrap up

---

## 🚀 Quick Fixes During Demo

If something breaks:
1. Refresh the page (Cmd+R / Ctrl+R)
2. All state resets to defaults
3. Server must be running (`npm run dev`)

If animations don't show:
1. Make sure viewport is mobile size
2. Check browser DevTools for errors
3. Framer Motion requires JavaScript enabled

---

## 📞 Support

For questions during demo:
- All data is mocked (see `/lib/store.ts`)
- All pages are in `/app` directory
- Components in `/components` directory
- Check README.md for full documentation

---

**Ready to demo?** Start at the Home page and follow the flow above! 🎉
