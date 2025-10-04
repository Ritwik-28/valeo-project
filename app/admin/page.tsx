'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import { Users, TrendingUp, CreditCard, Coins, UserCheck, Activity } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function AdminDashboard() {
  const { stats, referrals, user } = useStore();

  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', users: 45 },
    { month: 'Feb', users: 65 },
    { month: 'Mar', users: 80 },
    { month: 'Apr', users: 95 },
    { month: 'May', users: 120 },
  ];

  const referralData = [
    { month: 'Jan', referrals: 12 },
    { month: 'Feb', referrals: 18 },
    { month: 'Mar', referrals: 24 },
    { month: 'Apr', referrals: 30 },
    { month: 'May', referrals: 38 },
  ];

  const subscriptionData = [
    { name: 'Free', value: 40, color: '#94a3b8' },
    { name: 'Premium', value: 80, color: '#FFD54F' },
  ];

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
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #FFD54F',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#002B5B"
                    strokeWidth={3}
                    dot={{ fill: '#FFD54F', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Referral Trends Chart */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-valeo-navy">Referral Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={referralData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #FFD54F',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="referrals" fill="#FFD54F" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
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
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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
