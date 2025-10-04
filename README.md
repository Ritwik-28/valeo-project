# Valeo Health Prototype

A mobile-first React (Next.js) + Tailwind CSS web app prototype demonstrating Valeo Health's customer acquisition MVP with referral, subscription, and loyalty flows.

## 🎯 Overview

This prototype showcases Valeo Health's brand experience with:
- Mobile-first responsive design
- Real Valeo branding and assets
- Mock referral, subscription, and loyalty flows
- Frontend-only implementation (no backend required)
- Smooth animations and interactive feedback

## 🚀 Tech Stack

- **Framework**: Next.js 15 (React 18+)
- **Styling**: Tailwind CSS (utility-first, mobile-first)
- **State Management**: Zustand (for mock state)
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Confetti Effects**: Canvas Confetti

## 📱 Features

### 1. Home Page
- Valeo logo and brand tagline
- Grid of service cards (Blood Testing, Weight Loss, IV Therapy, etc.)
- "Invite friends & earn rewards" CTA banner
- Smooth fade-in animations

### 2. Referrals Page
- Dashboard showing:
  - Invites sent
  - Successful referrals
  - Credits earned
- "Invite a Friend" modal with WhatsApp sharing
- "Simulate Referral Conversion" button
- Progress bar toward next reward tier
- Confetti animation on successful conversion

### 3. Subscriptions Page
- Free Explorer Plan card
- Premium Plan card (marked as "Most Popular")
- Mock checkout modal
- Subscription confirmation with toast notification

### 4. Loyalty Wallet Page
- Total Valeo Wellness Points (VWP) display
- Transaction history
- Points redemption modal
- Tier progression system (Member → Advocate → Champion)
- Confetti animation on redemption
- "How to Earn Points" guide

### 5. Internal Referral Page (Therapist QR)
- Hidden route at `/internal-referral`
- Therapist information card with mock data
- Mock QR code with visual placeholder pattern
- "Scan QR Code" button with scanning animation
- Confetti celebration on successful scan
- Increments referral count in real-time
- Referral stats display
- "How It Works" step-by-step guide

### 6. Admin Dashboard
- Hidden route at `/admin`
- KPI cards (New Users, Referral Rate, Subscriptions, Avg Points/User)
- Charts:
  - User Growth (Line Chart)
  - Referral Trends (Bar Chart)
  - Subscription Distribution (Pie Chart)
- Recent Activity feed

### 7. App Redirect Bar
- Sticky top bar on mobile devices only (<768px)
- Conditional redirection:
  - iOS → App Store
  - Android → Play Store
- Dismissible with session storage

### 8. Bottom Navigation
- Fixed bottom navigation bar with 4 tabs:
  - Home
  - Referrals
  - Subscriptions (Plans)
  - Wallet
- Active state highlighting

## 🎨 Brand Theme

### Colors
- **Primary**: `#FFD54F` (Valeo Yellow)
- **Secondary**: `#002B5B` (Navy for headings)
- **Accent**: `#F3F4F6` (Background sections)
- **Text**: `#1F2937` (Dark gray)
- **CTA Buttons**: Gradient from `#F9A825` → `#FFC107`

### Typography
- **Font**: Inter (Google Fonts)
- Rounded buttons, high contrast CTA sections
- Clean wellness aesthetic

### Assets
- **Favicon**: https://d25uasl7utydze.cloudfront.net/assets/favicon/favicon.ico
- **Wordmark**: https://d25uasl7utydze.cloudfront.net/b9fbcbbb0df89f64c2d5.webp

## 🗂️ Mock Data Structure

The app uses Zustand for state management with the following structure:

```typescript
{
  user: {
    name: "Sara",
    subscription: "free" | "premium",
    points: 1200
  },
  referrals: [
    { id: 1, status: "Pending" | "Converted", date: "2025-10-01" }
  ],
  transactions: [
    { id: 1, description: "Referral Reward", points: 500, date: "2025-09-28" }
  ],
  stats: {
    invitesSent: 4,
    successfulReferrals: 2,
    referralCredits: 500
  }
}
```

## 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd valeo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **⚠️ IMPORTANT: Switch to Mobile View (Desktop Users)**

   This is a **mobile-first prototype**. On desktop, you MUST use developer tools to view it properly:

   **Chrome/Edge:**
   - Press `F12` or `Ctrl+Shift+I` / `Cmd+Option+I`
   - Click **Device Toggle** or press `Ctrl+Shift+M` / `Cmd+Shift+M`
   - Select **iPhone 14 Pro** from dropdown
   - Refresh the page

   **Firefox:**
   - Press `F12`, then `Ctrl+Shift+M` / `Cmd+Option+M`
   - Select mobile device preset

   **Safari:**
   - `Cmd+Option+I` → `Develop` → `Responsive Design Mode`

   **Without mobile view:**
   - ❌ App redirect bar won't show
   - ❌ Bottom navigation may look incorrect
   - ❌ Layout will be stretched
   - ❌ You'll miss the intended experience

## 📂 Project Structure

```
valeo/
├── app/
│   ├── layout.tsx              # Root layout with navigation
│   ├── page.tsx                # Home page
│   ├── referrals/
│   │   └── page.tsx            # Referrals page
│   ├── subscriptions/
│   │   └── page.tsx            # Subscriptions page
│   ├── wallet/
│   │   └── page.tsx            # Wallet page
│   ├── internal-referral/
│   │   └── page.tsx            # Internal referral (therapist QR)
│   ├── admin/
│   │   └── page.tsx            # Admin dashboard (hidden)
│   └── globals.css             # Global styles with Valeo colors
├── components/
│   ├── ui/                  # Reusable UI components (shadcn/ui)
│   ├── AppRedirectBar.tsx   # Mobile app redirect banner
│   └── BottomNav.tsx        # Bottom navigation bar
├── lib/
│   ├── store.ts             # Zustand state management
│   └── utils.ts             # Utility functions
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## 🎭 Key Interactions

### Referral Flow
1. Click "Invite a Friend" button
2. View WhatsApp message preview
3. Copy link or share on WhatsApp
4. Click "Simulate Referral Conversion" to see points added
5. Confetti animation on successful conversion

### Subscription Flow
1. Browse Free and Premium plans
2. Click "Subscribe Now" on Premium plan
3. View mock checkout modal
4. Confirm subscription
5. Toast notification confirms success

### Wallet Flow
1. View total points and tier status
2. Click "Redeem Points"
3. Select redemption amount (500 or 1000 points)
4. Confirm redemption
5. Confetti animation + toast notification

## 🔑 Special Routes

- **Home**: `/`
- **Referrals**: `/referrals`
- **Subscriptions**: `/subscriptions`
- **Wallet**: `/wallet`
- **Internal Referral**: `/internal-referral` (therapist QR code scanning)
- **Admin Dashboard**: `/admin` (hidden, no navigation link)

## 📱 Responsive Design

The prototype is optimized for:
- **Mobile**: 375-480px (primary focus)
- **Tablet**: 768-1024px
- **Desktop**: 1024px+

Key responsive features:
- App redirect bar appears only on mobile (<768px)
- Bottom navigation always visible (except on /admin)
- Service cards stack on mobile, grid on larger screens
- Touch-friendly tap targets (minimum 44x44px)

## 🎨 Animations

- **Page load**: Fade-in and slide-up animations
- **Service cards**: Staggered entrance
- **Hover effects**: Scale and border color transitions
- **Confetti**: On referral conversion and points redemption
- **Toast notifications**: Smooth slide-in from top

## 🧪 Testing the Prototype

1. **Home Page**: Check service cards and CTA banner
2. **Referrals**: 
   - Invite a friend (opens modal)
   - Simulate conversion (adds points with confetti)
3. **Subscriptions**: 
   - Subscribe to Premium (shows checkout modal)
4. **Wallet**: 
   - Redeem points (triggers confetti)
   - View transaction history
5. **Admin**: 
   - Navigate to `/admin` manually
   - View charts and metrics

## 🔐 No Backend Required

All data is:
- Stored in Zustand state (in-memory)
- Persists only during the session
- No API calls or database connections
- Perfect for demonstration and prototyping

## 📝 Notes

- This is a prototype for demonstration purposes
- No real payments are processed
- All data is mocked and resets on page reload
- Links to app stores are placeholder URLs
- Designed to showcase UX/UI flows

## 📄 License

This prototype is for demonstration purposes only.