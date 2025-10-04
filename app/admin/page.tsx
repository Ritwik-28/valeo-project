'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { Users, TrendingUp, CreditCard, Coins, UserCheck, Activity, ArrowUp } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ChartTooltip,
  Legend
);

export default function AdminDashboard() {
  const { stats, referrals, user } = useStore();

  // Chart data
  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Users',
        data: [45, 65, 80, 95, 120],
        borderColor: '#002B5B',
        backgroundColor: 'rgba(0, 43, 91, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const referralData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Referrals',
        data: [12, 18, 24, 30, 38],
        backgroundColor: '#FFD54F',
        borderRadius: 4,
      },
    ],
  };

  const subscriptionData = {
    labels: ['Free', 'Premium'],
    datasets: [
      {
        data: [40, 80],
        backgroundColor: ['#94a3b8', '#FFD54F'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const kpiCards = [
    {
      title: 'New Users',
      value: '120',
      change: '+12% from last month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Referral Rate',
      value: '38%',
      change: '+5% from last month',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Subscriptions',
      value: '80',
      change: '+8 new this month',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Avg Points/User',
      value: '1,150',
      change: '+200 from last month',
      icon: Coins,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-valeo-navy mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor Valeo Health platform metrics and performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={index} className="border-2 border-gray-200 hover:border-yellow-400 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${kpi.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                    <Activity className="h-5 w-5 text-gray-400" />
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
                  <div className="text-3xl font-bold text-valeo-navy mb-1">{kpi.value}</div>
                  <p className="text-xs text-green-600">{kpi.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Growth Chart */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-valeo-navy">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <Line 
                  data={userGrowthData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Referral Trends Chart */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-valeo-navy">Referral Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <Bar 
                  data={referralData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }} 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Subscription Distribution */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-valeo-navy">Subscription Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <Pie 
                  data={subscriptionData} 
                  options={{
                    ...chartOptions,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                    },
                  }} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-2 border-gray-200 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg text-valeo-navy">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'New user signup', user: 'Ahmed K.', time: '5 minutes ago', type: 'user' },
                  { action: 'Referral conversion', user: 'Sara M.', time: '12 minutes ago', type: 'referral' },
                  { action: 'Premium subscription', user: 'Fatima A.', time: '1 hour ago', type: 'subscription' },
                  { action: 'Points redeemed', user: 'Mohammed R.', time: '2 hours ago', type: 'points' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'user'
                          ? 'bg-blue-100'
                          : activity.type === 'referral'
                          ? 'bg-green-100'
                          : activity.type === 'subscription'
                          ? 'bg-purple-100'
                          : 'bg-yellow-100'
                      }`}
                    >
                      {activity.type === 'user' && <Users className="h-5 w-5 text-blue-600" />}
                      {activity.type === 'referral' && <UserCheck className="h-5 w-5 text-green-600" />}
                      {activity.type === 'subscription' && <CreditCard className="h-5 w-5 text-purple-600" />}
                      {activity.type === 'points' && <Coins className="h-5 w-5 text-yellow-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-valeo-navy">{activity.action}</div>
                      <div className="text-sm text-gray-600">{activity.user}</div>
                    </div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Back to App Link */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-valeo-navy font-medium hover:text-yellow-600 transition-colors"
          >
            ← Back to App
          </a>
        </div>
      </div>
    </div>
  );
}
