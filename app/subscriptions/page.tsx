'use client';

import { useState, ReactNode } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Check, Star, Sparkles, Users, Award } from 'lucide-react';
import toast from 'react-hot-toast';

// Types
type SubscriptionTier = 'free' | 'premium' | 'elite' | 'elite-family' | 'corporate';
type PlanType = 'individual' | 'family' | 'corporate';
type SubscriptionPlan = 'monthly' | 'annual';

interface PlanFeature {
  id: string;
  name: string;
  price: string;
  priceDetail: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'default' | 'outline';
  badge?: string;
  highlighted?: boolean;
  icon?: ReactNode;
}

type PlansByType = Record<PlanType, PlanFeature[]>;

export default function SubscriptionsPage() {
  const { user, subscribe } = useStore();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier>('premium');
  const [planType, setPlanType] = useState<PlanType>('individual');
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<SubscriptionPlan>('monthly');
  const [showPauseModal, setShowPauseModal] = useState(false);

  const handleSubscribe = (planId: SubscriptionTier) => {
    setSelectedPlan(planId);
    if (planId !== 'free') {
      setShowCheckoutModal(true);
    } else {
      subscribe('free');
      toast.success('Switched to Explorer Plan');
    }
  };

  const handleConfirmSubscription = () => {
    subscribe(selectedPlan as SubscriptionTier);
    setShowCheckoutModal(false);
    toast.success(`You are now subscribed to the ${selectedPlan} Plan!`);
  };

  const handlePauseSubscription = () => {
    // Implementation for pausing subscription
    setShowPauseModal(false);
    toast.success('Your subscription has been paused for 2 months');
  };

  const plans: PlansByType = {
    individual: [
      {
        id: 'free',
        name: 'Explorer Plan',
        price: '0',
        priceDetail: '/month',
        description: 'Start your wellness journey',
        features: [
          'Basic Longevity Score',
          'Limited educational content',
          'Community support',
          'Email support',
        ],
        buttonText: user.subscription === 'free' ? 'Current Plan' : 'Get Started',
        buttonVariant: 'outline' as const,
      },
      {
        id: 'premium',
        name: 'Premium Plan',
        price: subscriptionPeriod === 'annual' ? '4,990' : '499',
        priceDetail: subscriptionPeriod === 'annual' ? '/year (2 months free)' : '/month',
        description: 'Complete wellness experience',
        features: [
          'Therapy sessions',
          'Personalized supplement plans',
          'Expert-led webinars',
          'Advanced health analytics',
          '24/7 doctor on call',
          'Exclusive member discounts',
        ],
        badge: 'Most Popular',
        buttonText: user.subscription === 'premium' ? 'Current Plan' : 'Subscribe Now',
        buttonVariant: 'default' as const,
        highlighted: true,
      },
      {
        id: 'elite',
        name: 'Elite Plan',
        price: subscriptionPeriod === 'annual' ? '8,990' : '899',
        priceDetail: subscriptionPeriod === 'annual' ? '/year (2 months free)' : '/month',
        description: 'Premium wellness experience',
        features: [
          'Everything in Premium',
          'Wellness concierge',
          'Advanced biomarker tracking',
          'Quarterly health assessments',
          'Priority scheduling',
          'Dedicated health coach',
        ],
        buttonText: user.subscription === 'elite' ? 'Current Plan' : 'Upgrade Now',
        buttonVariant: 'default' as const,
      },
    ],
    family: [
      {
        id: 'elite-family',
        name: 'Elite Family Plan',
        price: subscriptionPeriod === 'annual' ? '12,990' : '1,299',
        priceDetail: subscriptionPeriod === 'annual' ? '/year (2 months free)' : '/month',
        description: 'Wellness for the whole family',
        features: [
          '2 adults + 2 children under 18',
          'Unified family dashboard',
          'Shared benefits',
          'Family health tracking',
          'Priority support',
        ],
        buttonText: user.subscription === 'elite-family' ? 'Current Plan' : 'Choose Family Plan',
        buttonVariant: 'default' as const,
        icon: <Users className="w-6 h-6 text-valeo-navy" />,
      },
    ],
    corporate: [
      {
        id: 'corporate',
        name: 'Corporate Wellness',
        price: 'Custom',
        priceDetail: 'pricing',
        description: 'Employee wellness solutions',
        features: [
          'Tailored wellness programs',
          'Team health challenges',
          'Executive health assessments',
          'On-site wellness events',
          'Dedicated account manager',
        ],
        buttonText: 'Contact Sales',
        buttonVariant: 'outline' as const,
        icon: <Award className="w-6 h-6 text-valeo-navy" />,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-valeo-navy mb-2">Choose Your Plan</h1>
          <p className="text-gray-600">Select the perfect wellness plan for your needs</p>
        </div>

        {user.subscription === 'premium' && (
          <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-valeo-navy">Active Premium Member</div>
                <div className="text-sm text-gray-600">You&apos;re enjoying all premium benefits</div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {plans[planType].map((plan) => (
            <Card
              key={plan.id}
              className={`relative overflow-hidden transition-all ${
                plan.highlighted
                  ? 'border-3 border-yellow-400 shadow-xl'
                  : 'border-2 border-gray-200'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-valeo-navy px-4 py-1 text-xs font-bold rounded-bl-lg flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  {plan.badge}
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-valeo-navy mb-1">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {plan.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-valeo-navy flex items-center">
                      {plan.price}
                    </span>
                    {plan.priceDetail && (
                      <span className="text-gray-600 text-sm">
                        {plan.price !== 'Custom' ? 'AED' : ''} {plan.priceDetail}
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => handleSubscribe(plan.id as SubscriptionTier)}
                  variant={plan.buttonVariant}
                  disabled={user.subscription === plan.id}
                  className={`w-full py-6 font-semibold ${
                    plan.highlighted
                      ? 'valeo-gradient text-valeo-navy hover:opacity-90'
                      : 'border-2'
                  }`}
                >
                  {plan.highlighted && <Sparkles className="h-5 w-5 mr-2" />}
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            All plans include access to our mobile app and web platform
          </p>
        </div>

        <Dialog open={showCheckoutModal} onOpenChange={setShowCheckoutModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-valeo-navy">Confirm Subscription</DialogTitle>
              <DialogDescription>
                Review your premium plan details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Card className="bg-gray-50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-valeo-navy">Premium Plan</span>
                    <span className="text-xl font-bold text-valeo-navy">499 AED</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Billed monthly • Cancel anytime
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-valeo-navy">499 AED</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-valeo-navy">0 AED</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span className="text-valeo-navy">Total</span>
                      <span className="text-valeo-navy">499 AED</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-valeo-navy font-medium">
                  This is a mock checkout. No payment will be processed.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleConfirmSubscription}
                  className="w-full valeo-gradient text-valeo-navy font-semibold py-6 text-lg"
                >
                  {selectedPlan === 'free' ? 'Continue with Free Plan' : 'Subscribe Now'}
                </Button>
                <p className="text-xs text-center text-gray-500">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Pause Subscription Modal */}
        <Dialog open={showPauseModal} onOpenChange={setShowPauseModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Pause Your Subscription</DialogTitle>
              <DialogDescription>
                You can pause your subscription for up to 2 months per year.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Your subscription will be put on hold, and you won&apos;t be charged during the pause period.
                You can resume anytime before the 2 months are over.
              </p>
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPauseModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-valeo-navy hover:bg-valeo-navy/90"
                  onClick={handlePauseSubscription}
                >
                  Confirm Pause
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
