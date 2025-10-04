import { create } from 'zustand';

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
}

interface AppState {
  user: {
    name: string;
    subscription: 'free' | 'premium';
    points: number;
  };
  referrals: Referral[];
  transactions: Transaction[];
  stats: {
    invitesSent: number;
    successfulReferrals: number;
    referralCredits: number;
  };
  addReferral: () => void;
  convertReferral: (id: number) => void;
  subscribe: (plan: 'free' | 'premium') => void;
  redeemPoints: (points: number) => void;
}

export const useStore = create<AppState>((set) => ({
  user: {
    name: 'Sara',
    subscription: 'free',
    points: 1200,
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
    referralCredits: 500,
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
  subscribe: (plan: 'free' | 'premium') =>
    set((state) => ({
      user: {
        ...state.user,
        subscription: plan,
      },
    })),
  redeemPoints: (points: number) =>
    set((state) => {
      if (state.user.points < points) return state;

      const newTransaction: Transaction = {
        id: state.transactions.length + 1,
        description: 'Points Redeemed',
        points: -points,
        date: new Date().toISOString().split('T')[0],
      };

      return {
        user: {
          ...state.user,
          points: state.user.points - points,
        },
        transactions: [newTransaction, ...state.transactions],
      };
    }),
}));
