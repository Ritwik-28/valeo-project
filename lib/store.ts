import { create } from 'zustand';
import toast from 'react-hot-toast';

export interface Referral {
  id: number;
  status: 'Pending' | 'Converted';
  date: string;
}

export interface Transaction {
  id: number;
  description: string;
  points: number;
  date: string;
  type?: 'earning' | 'redemption' | 'bonus';
  status?: 'pending' | 'completed' | 'failed';
}

interface AppState {
  user: {
    name: string;
    subscription: 'free' | 'premium' | 'elite' | 'elite-family' | 'corporate';
    points: number;
    totalEarned: number;
    totalRedeemed: number;
  };
  referrals: Referral[];
  transactions: Transaction[];
  stats: {
    invitesSent: number;
    successfulReferrals: number;
    referralCredits: number;
    totalSpent: number;
    challengesCompleted: number;
  };
  addReferral: () => void;
  convertReferral: (id: number) => void;
  subscribe: (plan: 'free' | 'premium' | 'elite' | 'elite-family' | 'corporate') => void;
  redeemPoints: (points: number, redemptionType: 'credit' | 'session' | 'retreat') => void;
  addPoints: (points: number, description: string, type?: 'earning' | 'bonus') => void;
  recordPurchase: (amount: number, description: string) => void;
  completeChallenge: (challengeName: string, points: number) => void;
  submitReview: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    name: 'Sara',
    subscription: 'free',
    points: 1200,
    totalEarned: 3200,
    totalRedeemed: 2000,
  },
  referrals: [
    { id: 1, status: 'Pending', date: '2025-10-01' },
    { id: 2, status: 'Converted', date: '2025-09-28' },
    { id: 3, status: 'Pending', date: '2025-09-25' },
    { id: 4, status: 'Converted', date: '2025-09-20' },
  ],
  transactions: [
    { id: 1, description: 'Referral Reward', points: 500, date: '2025-09-28' },
    { id: 2, description: 'Session Completed', points: 200, date: '2025-09-15' },
    { id: 3, description: 'Referral Conversion', points: 500, date: '2025-09-20' },
  ],
  stats: {
    invitesSent: 4,
    successfulReferrals: 2,
    referralCredits: 1000,
    totalSpent: 2500,
    challengesCompleted: 3,
  },
  addReferral: () =>
    set((state) => {
      const newReferral: Referral = {
        id: state.referrals.length + 1,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
      };
      return {
        referrals: [...state.referrals, newReferral],
        stats: {
          ...state.stats,
          invitesSent: state.stats.invitesSent + 1,
        },
      };
    }),
  convertReferral: (id: number) =>
    set((state) => {
      const referral = state.referrals.find((r) => r.id === id);
      if (!referral || referral.status === 'Converted') return state;

      const newTransaction: Transaction = {
        id: state.transactions.length + 1,
        description: 'Referral Conversion',
        points: 500,
        date: new Date().toISOString().split('T')[0],
      };

      return {
        referrals: state.referrals.map((r) =>
          r.id === id ? { ...r, status: 'Converted' as const } : r
        ),
        transactions: [newTransaction, ...state.transactions],
        user: {
          ...state.user,
          points: state.user.points + 500,
        },
        stats: {
          ...state.stats,
          successfulReferrals: state.stats.successfulReferrals + 1,
          referralCredits: state.stats.referralCredits + 500,
        },
      };
    }),
  subscribe: (plan: 'free' | 'premium' | 'elite' | 'elite-family' | 'corporate') =>
    set((state) => {
      toast.success(`Successfully subscribed to ${plan} plan!`);
      return {
        user: {
          ...state.user,
          subscription: plan,
        },
      };
    }),
  redeemPoints: (points: number, redemptionType: 'credit' | 'session' | 'retreat') =>
    set((state) => {
      if (state.user.points < points) {
        toast.error('Insufficient points for redemption');
        return state;
      }

      let description = '';
      let creditAmount = 0;
      
      switch(redemptionType) {
        case 'credit':
          creditAmount = points / 10; // 1,000 VWP = 100 AED
          description = `Redeemed ${points} VWP for AED ${creditAmount} credit`;
          break;
        case 'session':
          description = 'Redeemed 5,000 VWP for 1 Premium Therapy Session';
          break;
        case 'retreat':
          description = 'Redeemed 10,000 VWP for Exclusive Wellness Retreat';
          break;
      }

      const newTransaction: Transaction = {
        id: state.transactions.length + 1,
        description,
        points: -points,
        date: new Date().toISOString().split('T')[0],
        type: 'redemption',
        status: 'completed'
      };

      return {
        user: {
          ...state.user,
          points: state.user.points - points,
          totalRedeemed: state.user.totalRedeemed + points
        },
        transactions: [newTransaction, ...state.transactions],
      };
    }),
    
  addPoints: (points: number, description: string, type: 'earning' | 'bonus' = 'earning') =>
    set((state) => {
      const newTransaction: Transaction = {
        id: state.transactions.length + 1,
        description,
        points,
        date: new Date().toISOString().split('T')[0],
        type,
        status: 'completed'
      };

      return {
        user: {
          ...state.user,
          points: state.user.points + points,
          totalEarned: state.user.totalEarned + points
        },
        transactions: [newTransaction, ...state.transactions],
      };
    }),
    
  recordPurchase: (amount: number, description: string) =>
    set((state) => {
      const pointsEarned = amount * 10; // 10 VWP per 1 AED spent
      
      const transaction: Transaction = {
        id: state.transactions.length + 1,
        description: `Purchase: ${description}`,
        points: pointsEarned,
        date: new Date().toISOString().split('T')[0],
        type: 'earning',
        status: 'completed'
      };

      const pointsTransaction: Transaction = {
        id: state.transactions.length + 2,
        description: `Earned ${pointsEarned} VWP for purchase`,
        points: pointsEarned,
        date: new Date().toISOString().split('T')[0],
        type: 'earning',
        status: 'completed'
      };

      return {
        user: {
          ...state.user,
          points: state.user.points + pointsEarned,
          totalEarned: state.user.totalEarned + pointsEarned
        },
        stats: {
          ...state.stats,
          totalSpent: state.stats.totalSpent + amount
        },
        transactions: [pointsTransaction, transaction, ...state.transactions],
      };
    }),
    
  completeChallenge: (challengeName: string, points: number) =>
    set((state) => {
      const transaction: Transaction = {
        id: state.transactions.length + 1,
        description: `Completed Challenge: ${challengeName}`,
        points,
        date: new Date().toISOString().split('T')[0],
        type: 'bonus',
        status: 'completed'
      };

      return {
        user: {
          ...state.user,
          points: state.user.points + points,
          totalEarned: state.user.totalEarned + points
        },
        stats: {
          ...state.stats,
          challengesCompleted: state.stats.challengesCompleted + 1
        },
        transactions: [transaction, ...state.transactions],
      };
    }),
    
  submitReview: () =>
    set((state) => {
      const points = 500; // 500 VWP for submitting a review
      const transaction: Transaction = {
        id: state.transactions.length + 1,
        description: 'Submitted Review/Testimonial',
        points,
        date: new Date().toISOString().split('T')[0],
        type: 'bonus',
        status: 'completed'
      };

      return {
        user: {
          ...state.user,
          points: state.user.points + points,
          totalEarned: state.user.totalEarned + points
        },
        transactions: [transaction, ...state.transactions],
      };
    }),
}));
