'use client';

import Image from 'next/image';
import { TestTube, Scale, Droplets, Stethoscope, Apple, Syringe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    title: 'At-Home Blood Testing',
    description: 'Comprehensive blood work from the comfort of your home',
    icon: TestTube,
    color: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    id: 2,
    title: 'Weight Loss Program',
    description: 'Personalized plans with medical supervision',
    icon: Scale,
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    id: 3,
    title: 'At-Home IV Therapy',
    description: 'Vitamin infusions delivered to your door',
    icon: Droplets,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 4,
    title: 'Doctor on Call',
    description: '24/7 access to certified medical professionals',
    icon: Stethoscope,
    color: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: 5,
    title: 'Food Intolerance Test',
    description: 'Identify sensitivities with precision testing',
    icon: Apple,
    color: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    id: 6,
    title: 'Flu Vaccine',
    description: 'Stay protected with at-home vaccinations',
    icon: Syringe,
    color: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
  },
];

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex justify-center">
            <Image
              src="https://d25uasl7utydze.cloudfront.net/b9fbcbbb0df89f64c2d5.webp"
              alt="Valeo Health"
              width={180}
              height={60}
              className="h-auto"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-valeo-navy mb-3">
            Welcome to Valeo Health
          </h1>
          <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
            At-home testing, supplements & wellness programs — made simple.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="border-2 border-gray-100 hover:border-yellow-400 transition-all duration-200 h-full">
                  <CardContent className="p-5">
                    <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${service.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-valeo-navy mb-2 text-base">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-gray-300 hover:border-yellow-400 hover:bg-yellow-50"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6 text-center shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-bold text-valeo-navy mb-2">
            Earn Rewards with Valeo
          </h2>
          <p className="text-valeo-navy mb-4 text-sm">
            Invite friends and earn wellness credits for every successful referral!
          </p>
          <Button
            className="bg-valeo-navy text-white hover:bg-blue-900 font-semibold px-6"
            onClick={() => window.location.href = '/referrals'}
          >
            Start Referring
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
