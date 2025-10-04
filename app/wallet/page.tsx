'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Wallet, TrendingUp, TrendingDown, Trophy, Star, Crown } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export default function WalletPage() {
  const { user, transactions, redeemPoints } = useStore();
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState(500);

  const handleRedeem = () => {
    if (user.points >= redeemAmount) {
      redeemPoints(redeemAmount);
      setShowRedeemModal(false);
      const credit = redeemAmount / 10;
      
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD54F', '#FFC107', '#F9A825', '#002B5B'],
      });
      
      toast.success(`🎉 ${redeemAmount} Points redeemed for AED ${credit} credit!`);
    } else {
      toast.error('Insufficient points');
    }
  };

  const getTier = () => {
    if (user.points >= 2000) return { name: 'Champion', icon: Crown, color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (user.points >= 1000) return { name: 'Advocate', icon: Trophy, color: 'text-blue-600', bg: 'bg-blue-50' };
    return { name: 'Member', icon: Star, color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const tier = getTier();
  const TierIcon = tier.icon;
  const progressToNextTier = user.points >= 2000 ? 100 : user.points >= 1000 ? ((user.points - 1000) / 1000) * 100 : (user.points / 1000) * 100;
  const nextTierPoints = user.points >= 2000 ? 0 : user.points >= 1000 ? 2000 - user.points : 1000 - user.points;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-valeo-navy mb-2">Wellness Wallet</h1>
          <p className="text-gray-600">Track and redeem your Valeo Wellness Points</p>
        </div>

        <Card className="mb-6 bg-gradient-to-br from-yellow-400 to-yellow-500 border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-6 w-6 text-valeo-navy" />
                <span className="text-valeo-navy font-semibold">Total Balance</span>
              </div>
              <div className={`px-3 py-1 rounded-full ${tier.bg} flex items-center gap-1`}>
                <TierIcon className={`h-4 w-4 ${tier.color}`} />
                <span className={`text-xs font-semibold ${tier.color}`}>{tier.name}</span>
              </div>
            </div>
            <div className="text-5xl font-bold text-valeo-navy mb-2">
              {user.points.toLocaleString()}
            </div>
            <div className="text-valeo-navy text-sm">Valeo Wellness Points (VWP)</div>
          </CardContent>
        </Card>

        {nextTierPoints > 0 && (
          <Card className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-valeo-navy flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Progress to Next Tier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">{tier.name}</span>
                  <span className="text-gray-700">
                    {user.points >= 1000 ? 'Champion' : 'Advocate'}
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressToNextTier}%` }}
                  />
                </div>
                <p className="text-sm text-gray-700">
                  {nextTierPoints} more points to reach {user.points >= 1000 ? 'Champion' : 'Advocate'} tier!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button
            onClick={() => setShowRedeemModal(true)}
            disabled={user.points < 500}
            className="valeo-gradient text-valeo-navy font-semibold py-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <TrendingDown className="h-5 w-5 mr-2" />
            Redeem Points
          </Button>
          <Button
            variant="outline"
            className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50 py-6"
            onClick={() => window.location.href = '/referrals'}
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Earn More
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {transactions.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No transactions yet</p>
              ) : (
                transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.points > 0 ? 'bg-green-100' : 'bg-red-100'
                        }`}
                      >
                        {transaction.points > 0 ? (
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        ) : (
                          <TrendingDown className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-valeo-navy">
                          {transaction.description}
                        </div>
                        <div className="text-xs text-gray-500">{transaction.date}</div>
                      </div>
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        transaction.points > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.points > 0 ? '+' : ''}
                      {transaction.points}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-valeo-navy mb-2 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            How to Earn Points
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">+500</span>
              <span>Complete a referral conversion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">+200</span>
              <span>Complete a wellness session</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">+100</span>
              <span>Weekly check-in completed</span>
            </li>
          </ul>
        </div>

        <Dialog open={showRedeemModal} onOpenChange={setShowRedeemModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-valeo-navy">Redeem Points</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Available Points</span>
                  <span className="text-2xl font-bold text-valeo-navy">{user.points}</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-valeo-navy">
                  Select Amount to Redeem
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[500, 1000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setRedeemAmount(amount)}
                      disabled={user.points < amount}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        redeemAmount === amount
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${user.points < amount ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="font-bold text-valeo-navy text-lg">{amount} pts</div>
                      <div className="text-sm text-gray-600">= AED {amount / 10}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-valeo-navy">You'll Receive:</span>
                  <span className="text-2xl font-bold text-valeo-navy">
                    AED {redeemAmount / 10}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Credit will be added to your Valeo account
                </p>
              </div>

              <Button
                onClick={handleRedeem}
                disabled={user.points < redeemAmount}
                className="w-full valeo-gradient text-valeo-navy font-semibold py-6 text-lg"
              >
                Redeem {redeemAmount} Points
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
