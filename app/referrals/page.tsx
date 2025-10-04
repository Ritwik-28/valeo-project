'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Users, Gift, Copy, Check, Share2, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function ReferralsPage() {
  const { stats, referrals, addReferral, convertReferral } = useStore();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralLink = 'valeo.app/invite/abc123';
  const whatsappMessage = `I've been using Valeo Health for my wellness journey – get 40% off your first session with my link: ${referralLink}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
    addReferral();
    setShowInviteModal(false);
    toast.success('Invitation sent!');
  };

  const handleSimulateConversion = () => {
    const pendingReferral = referrals.find((r) => r.status === 'Pending');
    if (pendingReferral) {
      convertReferral(pendingReferral.id);
      
      // Trigger confetti animation
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD54F', '#FFC107', '#10B981'],
      });
      
      toast.success('🎉 Referral converted! +500 points earned');
    } else {
      toast.error('No pending referrals to convert');
    }
  };

  const progressToNextReward = (stats.successfulReferrals % 5) * 20;
  const nextRewardReferrals = 5 - (stats.successfulReferrals % 5);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-valeo-navy mb-2">Referrals</h1>
          <p className="text-gray-600">Share Valeo Health and earn rewards together</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-3 gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-2 border-blue-100">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-valeo-navy">{stats.invitesSent}</div>
              <div className="text-xs text-gray-600">Invites Sent</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-valeo-navy">{stats.successfulReferrals}</div>
              <div className="text-xs text-gray-600">Successful</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-100">
            <CardContent className="p-4 text-center">
              <Gift className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-valeo-navy">AED {stats.referralCredits}</div>
              <div className="text-xs text-gray-600">Credits</div>
            </CardContent>
          </Card>
        </motion.div>

        <Card className="mb-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg text-valeo-navy">Next Reward Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={progressToNextReward} className="h-3" />
              <p className="text-sm text-gray-700">
                {nextRewardReferrals} more {nextRewardReferrals === 1 ? 'referral' : 'referrals'} to unlock your next reward tier!
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3 mb-6">
          <Button
            onClick={() => setShowInviteModal(true)}
            className="w-full valeo-gradient text-valeo-navy font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Invite a Friend
          </Button>

          <Button
            onClick={handleSimulateConversion}
            variant="outline"
            className="w-full border-2 border-green-300 text-green-700 hover:bg-green-50 py-6"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Simulate Referral Conversion
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {referrals.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No referrals yet. Start inviting friends!</p>
              ) : (
                referrals.map((referral) => (
                  <div
                    key={referral.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          referral.status === 'Converted' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      />
                      <div>
                        <div className="font-medium text-valeo-navy">Referral #{referral.id}</div>
                        <div className="text-xs text-gray-500">{referral.date}</div>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        referral.status === 'Converted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {referral.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl text-valeo-navy">Invite a Friend</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {whatsappMessage}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-mono bg-white px-2 py-1 rounded">{referralLink}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-yellow-400 hover:bg-yellow-50"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleWhatsAppShare}
                  className="w-full bg-green-600 text-white hover:bg-green-700"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on WhatsApp
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
