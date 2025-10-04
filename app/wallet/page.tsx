'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Trophy, 
  Star, 
  Crown, 
  Gift, 
  Award, 
  CalendarCheck, 
  ShoppingCart,
  Zap,
  Sparkles,
  Users,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

// Redemption options with their point values and descriptions
const REDEMPTION_OPTIONS = [
  {
    id: 'credit',
    points: 1000,
    title: 'Account Credit',
    description: 'Redeem for account credit',
    value: '100 AED',
    icon: ShoppingCart,
    buttonText: 'Redeem for 100 AED'
  },
  {
    id: 'session',
    points: 5000,
    title: 'Premium Session',
    description: '1 Premium Therapy Session',
    value: '700 AED value',
    icon: Sparkles,
    buttonText: 'Redeem 5,000 VWP'
  },
  {
    id: 'retreat',
    points: 10000,
    title: 'Wellness Retreat',
    description: 'Exclusive Wellness Retreat Weekend',
    value: '2,500 AED+ value',
    icon: Award,
    buttonText: 'Redeem 10,000 VWP',
    featured: true
  }
];

export default function WalletPage() {
  const { 
    user, 
    transactions, 
    redeemPoints, 
    addPoints, 
    recordPurchase, 
    completeChallenge,
    submitReview 
  } = useStore();
  
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedRedemption, setSelectedRedemption] = useState(REDEMPTION_OPTIONS[0]);

  const handleRedeem = () => {
    if (user.points >= selectedRedemption.points) {
      redeemPoints(selectedRedemption.points, selectedRedemption.id as 'credit' | 'session' | 'retreat');
      setShowRedeemModal(false);
      
      // Trigger confetti animation
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD54F', '#FFC107', '#F9A825', '#002B5B'],
      });
      
      toast.success(`🎉 Success! ${selectedRedemption.points.toLocaleString()} VWP redeemed for ${selectedRedemption.title}!`);
    } else {
      toast.error(`You need ${selectedRedemption.points - user.points} more VWP to redeem this reward`);
    }
  };

  const getTier = () => {
    if (user.points >= 10000) return { name: 'Elite', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-50' };
    if (user.points >= 5000) return { name: 'Champion', icon: Crown, color: 'text-yellow-600', bg: 'bg-yellow-50' };
    if (user.points >= 1000) return { name: 'Advocate', icon: Trophy, color: 'text-blue-600', bg: 'bg-blue-50' };
    return { name: 'Member', icon: Star, color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const tier = getTier();
  const TierIcon = tier.icon;
  
  // Calculate progress to next tier
  const getTierProgress = () => {
    if (user.points >= 10000) return { progress: 100, nextTier: null, nextTierPoints: 0 };
    if (user.points >= 5000) return { 
      progress: ((user.points - 5000) / 5000) * 100, 
      nextTier: 'Elite', 
      nextTierPoints: 10000 - user.points 
    };
    if (user.points >= 1000) return { 
      progress: ((user.points - 1000) / 4000) * 100, 
      nextTier: 'Champion', 
      nextTierPoints: 5000 - user.points 
    };
    return { 
      progress: (user.points / 1000) * 100, 
      nextTier: 'Advocate', 
      nextTierPoints: 1000 - user.points 
    };
  };
  
  const { progress, nextTier, nextTierPoints } = getTierProgress();

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

        {nextTier && (
          <Card className="mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg text-valeo-navy flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Progress to {nextTier} Tier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">{tier.name}</span>
                  <span className="text-gray-700">
                    {nextTier}
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-sm text-gray-700">
                  {nextTierPoints.toLocaleString()} more points to reach {nextTier} tier!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <div className="space-y-3">
            <Button
              onClick={() => setShowRedeemModal(true)}
              disabled={user.points < 1000}
              className="w-full valeo-gradient text-valeo-navy font-semibold py-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <Gift className="h-5 w-5 mr-2" />
              Redeem Rewards
            </Button>
            <Button
              variant="outline"
              className="w-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50 py-6"
              onClick={() => window.location.href = '/referrals'}
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Earn More Points
            </Button>
          </div>
          
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-valeo-navy mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-600" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left text-sm h-auto py-2"
                  onClick={() => completeChallenge('30-Day Consistency', 1000)}
                >
                  <CalendarCheck className="h-4 w-4 mr-2 text-green-600" />
                  30-Day Challenge (+1,000 VWP)
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left text-sm h-auto py-2"
                  onClick={submitReview}
                >
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  Submit Review (+500 VWP)
                </Button>
              </div>
            </CardContent>
          </Card>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card className="border-2 border-blue-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                How to Earn Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                    <ShoppingCart className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">10 VWP per 1 AED spent</p>
                    <p className="text-sm text-gray-600">On therapy sessions or supplement orders</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">1,000 VWP per referral</p>
                    <p className="text-sm text-gray-600">When your referral becomes a paying customer</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                    <Award className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">500 VWP per review</p>
                    <p className="text-sm text-gray-600">For verified reviews or testimonials</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-1.5 rounded-full mt-0.5">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">Bonus Challenges</p>
                    <p className="text-sm text-gray-600">Complete special challenges for extra points</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="h-5 w-5 text-green-600" />
                Redeem Your Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {REDEMPTION_OPTIONS.map((option) => (
                  <div 
                    key={option.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      option.featured 
                        ? 'border-yellow-300 bg-yellow-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-valeo-navy">{option.title}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-valeo-navy">{option.points.toLocaleString()} VWP</div>
                        <div className="text-sm text-gray-600">{option.value}</div>
                      </div>
                    </div>
                    <Button 
                      variant={option.featured ? 'default' : 'outline'}
                      className={`w-full mt-3 ${
                        option.featured ? 'valeo-gradient text-valeo-navy' : ''
                      }`}
                      disabled={user.points < option.points}
                      onClick={() => {
                        setSelectedRedemption(option);
                        setShowRedeemModal(true);
                      }}
                    >
                      {option.buttonText}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showRedeemModal} onOpenChange={setShowRedeemModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-valeo-navy">
                {selectedRedemption.title}
              </DialogTitle>
              <DialogDescription>
                {selectedRedemption.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">Required Points</p>
                    <p className="text-2xl font-bold text-valeo-navy">
                      {selectedRedemption.points.toLocaleString()} VWP
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 text-sm">Your Points</p>
                    <p className={`text-2xl font-bold ${
                      user.points >= selectedRedemption.points 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {user.points.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {user.points < selectedRedemption.points && (
                  <div className="mt-2 bg-red-50 text-red-700 text-sm p-2 rounded-md">
                    You need {selectedRedemption.points - user.points} more VWP to redeem this reward
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-valeo-navy mb-2">Reward Details</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{selectedRedemption.description}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Value: {selectedRedemption.value}</span>
                  </li>
                  {selectedRedemption.id === 'credit' && (
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Credit never expires</span>
                    </li>
                  )}
                  {selectedRedemption.id === 'session' && (
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Session valid for 6 months</span>
                    </li>
                  )}
                  {selectedRedemption.id === 'retreat' && (
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Includes accommodation and meals</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleRedeem}
                  disabled={user.points < selectedRedemption.points}
                  className="w-full valeo-gradient text-valeo-navy font-semibold py-6 text-lg"
                >
                  {selectedRedemption.buttonText}
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  By redeeming, you agree to our Terms of Service. All redemptions are final.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
