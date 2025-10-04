'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Check, Star, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SubscriptionsPage() {
  const { user, subscribe } = useStore();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('free');

  const handleSubscribe = (plan: 'free' | 'premium') => {
    setSelectedPlan(plan);
    if (plan === 'premium') {
      setShowCheckoutModal(true);
    } else {
      subscribe('free');
      toast.success('Switched to Explorer Plan');
    }
  };

  const handleConfirmSubscription = () => {
    subscribe(selectedPlan);
    setShowCheckoutModal(false);
    toast.success('You are now subscribed to the Premium Plan!');
  };

  const plans = [
    {
      id: 'free',
      name: 'Explorer Plan',
      price: 'Free',
      description: 'Start your wellness journey',
      features: [
        'Access to Longevity Score',
        'Limited wellness content',
        'Basic health insights',
        'Community support',
      ],
      buttonText: user.subscription === 'free' ? 'Current Plan' : 'Switch to Free',
      buttonVariant: 'outline' as const,
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 'AED 499',
      priceDetail: '/month',
      description: 'Complete wellness experience',
      features: [
        '1 home session per month',
        'Personalized wellness plan',
        'Priority booking',
        'Advanced health analytics',
        '24/7 doctor on call access',
        'Exclusive member discounts',
      ],
      badge: 'Most Popular',
      buttonText: user.subscription === 'premium' ? 'Current Plan' : 'Subscribe Now',
      buttonVariant: 'default' as const,
      highlighted: true,
    },
  ];

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
                <div className="text-sm text-gray-600">You're enjoying all premium benefits</div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {plans.map((plan) => (
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
                    <span className="text-4xl font-bold text-valeo-navy">{plan.price}</span>
                    {plan.priceDetail && (
                      <span className="text-gray-600 text-sm">{plan.priceDetail}</span>
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
                  onClick={() => handleSubscribe(plan.id as 'free' | 'premium')}
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
                    <span className="text-xl font-bold text-valeo-navy">AED 499</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Billed monthly • Cancel anytime
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-valeo-navy">AED 499</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-valeo-navy">AED 0</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span className="text-valeo-navy">Total</span>
                      <span className="text-valeo-navy">AED 499</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-valeo-navy font-medium">
                  This is a mock checkout. No payment will be processed.
                </p>
              </div>

              <Button
                onClick={handleConfirmSubscription}
                className="w-full valeo-gradient text-valeo-navy font-semibold py-6 text-lg"
              >
                Confirm Subscription
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
