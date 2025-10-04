'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, UserCheck, Award, Scan, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function InternalReferralPage() {
  const { addReferral, stats } = useStore();
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  // Mock therapist data
  const therapist = {
    name: 'Dr. Sarah Ahmed',
    specialty: 'Wellness Consultant',
    id: 'VLO-TH-2847',
    location: 'Dubai Healthcare City',
  };

  const handleScanQR = () => {
    setScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      addReferral();
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD54F', '#FFC107', '#F9A825', '#10B981'],
      });
      
      toast.success('🎉 QR Code scanned! Referral recorded successfully');
      
      // Reset scanned state after 3 seconds
      setTimeout(() => setScanned(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="h-7 w-7 text-valeo-navy" />
            <h1 className="text-3xl font-bold text-valeo-navy">Internal Referral</h1>
          </div>
          <p className="text-gray-600">Scan therapist QR code to record referral</p>
        </motion.div>

        {/* Therapist Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="mb-6 border-2 border-gray-200 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-valeo-yellow to-yellow-400">
              <CardTitle className="text-xl text-valeo-navy flex items-center gap-2">
                <UserCheck className="h-6 w-6" />
                Therapist Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">
                    {therapist.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-valeo-navy mb-1">
                    {therapist.name}
                  </h2>
                  <p className="text-gray-600 mb-2">{therapist.specialty}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span>ID: {therapist.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="text-gray-500">📍</span>
                      <span>{therapist.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* QR Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mb-6 border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-valeo-navy flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                Referral QR Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-xl border-2 border-gray-200 flex flex-col items-center">
                {/* Placeholder QR Code */}
                <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                  {scanned ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-full h-full bg-green-500 flex items-center justify-center"
                    >
                      <Check className="h-24 w-24 text-white" />
                    </motion.div>
                  ) : (
                    <>
                      {/* Mock QR Code Pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="grid grid-cols-8 grid-rows-8 gap-1 p-4 h-full">
                          {[...Array(64)].map((_, i) => (
                            <div
                              key={i}
                              className={`${
                                Math.random() > 0.5 ? 'bg-valeo-navy' : 'bg-transparent'
                              } rounded-sm`}
                            />
                          ))}
                        </div>
                      </div>
                      <QrCode className="h-32 w-32 text-valeo-navy relative z-10" />
                    </>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 text-center mb-2">
                  Scan to record patient referral
                </p>
                <p className="text-xs text-gray-500 font-mono">
                  REF-{therapist.id}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Scan Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <Button
            onClick={handleScanQR}
            disabled={scanning || scanned}
            className="w-full valeo-gradient text-valeo-navy font-semibold py-8 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            {scanning ? (
              <>
                <Scan className="h-6 w-6 mr-2 animate-pulse" />
                Scanning...
              </>
            ) : scanned ? (
              <>
                <Check className="h-6 w-6 mr-2" />
                Scanned Successfully!
              </>
            ) : (
              <>
                <Scan className="h-6 w-6 mr-2" />
                Scan QR Code
              </>
            )}
          </Button>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-lg text-valeo-navy">Your Referral Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-valeo-navy mb-1">
                    {stats.invitesSent}
                  </div>
                  <div className="text-sm text-gray-600">Total Referrals</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {stats.successfulReferrals}
                  </div>
                  <div className="text-sm text-gray-600">Successful</div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                <p className="text-sm text-valeo-navy font-medium flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-600" />
                  Earn rewards for every successful referral!
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6"
        >
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-base text-valeo-navy">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-valeo-yellow flex items-center justify-center flex-shrink-0 text-valeo-navy font-bold text-xs">
                    1
                  </div>
                  <span>Patient shows interest in Valeo Health services</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-valeo-yellow flex items-center justify-center flex-shrink-0 text-valeo-navy font-bold text-xs">
                    2
                  </div>
                  <span>Scan your unique therapist QR code to record the referral</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-valeo-yellow flex items-center justify-center flex-shrink-0 text-valeo-navy font-bold text-xs">
                    3
                  </div>
                  <span>Patient receives personalized onboarding link</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-valeo-yellow flex items-center justify-center flex-shrink-0 text-valeo-navy font-bold text-xs">
                    4
                  </div>
                  <span>Earn rewards when the patient completes their first session</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-valeo-navy font-medium hover:text-yellow-600 transition-colors text-sm"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
