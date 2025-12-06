import { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { AiOutlineFire } from "react-icons/ai";
import { LuTriangleAlert } from "react-icons/lu";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import axios from "axios";

const dailyData = [
  { date: 'Mon', volume: 45 },
  { date: 'Tue', volume: 52 },
  { date: 'Wed', volume: 48 },
  { date: 'Thu', volume: 61 },
  { date: 'Fri', volume: 55 },
  { date: 'Sat', volume: 38 },
  { date: 'Sun', volume: 42 },
];

const weeklyData = [
  { week: 'Week 1', volume: 320 },
  { week: 'Week 2', volume: 380 },
  { week: 'Week 3', volume: 350 },
  { week: 'Week 4', volume: 420 },
];

const monthlyData = [
  { month: 'Jul', volume: 1250 },
  { month: 'Aug', volume: 1420 },
  { month: 'Sep', volume: 1380 },
  { month: 'Oct', volume: 1520 },
  { month: 'Nov', volume: 1470 },
  { month: 'Dec', volume: 1600 },
];

const subscriberPrediction = [
  { month: 'Jul', subscribers: 145 },
  { month: 'Aug', subscribers: 168 },
  { month: 'Sep', subscribers: 192 },
  { month: 'Oct', subscribers: 215 },
  { month: 'Nov', subscribers: 238 },
  { month: 'Dec', subscribers: 265 },
  { month: 'Jan', subscribers: 290, predicted: true },
];

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(res => setUser(res.data))
    .catch(() => console.log("Failed fetch user"));
  }, []);

  const userName = localStorage.getItem("username") || "User";

  const [timeFilter, setTimeFilter] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const getChartData = () => {
    switch (timeFilter) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
    }
  };

  const getXAxisKey = () => {
    switch (timeFilter) {
      case 'daily':
        return 'date';
      case 'weekly':
        return 'week';
      case 'monthly':
        return 'month';
    }
  };

  const summaryCards = [
    {
      title: 'Total Waste',
      value: '1,470 kg',
      change: '+12.5%',
      icon: AiOutlineFire,
      bgColor: 'bg-orange-500',
      iconColor: 'text-white',
    },
    {
      title: 'Total Revenue',
      value: '$12,450',
      change: '+8.2%',
      icon: LuTriangleAlert,
      bgColor: 'bg-red-500',
      iconColor: 'text-white',
    },
    {
      title: 'Active Subscribers',
      value: '265',
      change: '+15.3%',
      icon: FaRegCircleCheck,
      bgColor: 'bg-green-500',
      iconColor: 'text-white',
    },
    {
      title: 'Active Subscribers',
      value: '265',
      change: '+15.3%',
      icon: MdOutlineAccessTime,
      bgColor: 'bg-yellow-500',
      iconColor: 'text-white',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        {/* <h1 className="text-gray-900 mb-2">Welcome Back{user ? `, ${user.name}` : `...`}</h1> */}
        <h1 className="text-gray-900 mb-2">Welcome Back, {userName}</h1>
        <h1 className="text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your waste monitoring system.</p>
      </div>

      {/* Summary Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"> */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <div className="flex items-center gap-1 text-[#3BAA5C]">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{card.change}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">{card.title}</p>
            <p className="text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Waste Volume Statistics */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-gray-900 mb-1">Waste Volume Statistics</h2>
            <p className="text-sm text-gray-600">Track waste burning volume over time</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTimeFilter('daily')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeFilter === 'daily'
                  ? 'bg-[#3BAA5C] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setTimeFilter('weekly')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeFilter === 'weekly'
                  ? 'bg-[#3BAA5C] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeFilter('monthly')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                timeFilter === 'monthly'
                  ? 'bg-[#3BAA5C] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getChartData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey={getXAxisKey()} stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="volume" fill="#3BAA5C" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Subscriber Prediction Chart */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="mb-6">
          <h2 className="text-gray-900 mb-1">Subscriber Prediction</h2>
          <p className="text-sm text-gray-600">Projected subscriber growth for next month</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={subscriberPrediction}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="subscribers"
              stroke="#3BAA5C"
              strokeWidth={3}
              dot={(props: any) => {
                const isPredicted = subscriberPrediction[props.index]?.predicted;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={5}
                    fill={isPredicted ? '#FFA500' : '#3BAA5C'}
                    stroke="white"
                    strokeWidth={2}
                  />
                );
              }}
              strokeDasharray={(props: any) => {
                return props.index >= subscriberPrediction.length - 2 ? '5 5' : '0';
              }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#3BAA5C] rounded-full"></div>
            <span className="text-sm text-gray-600">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#FFA500] rounded-full"></div>
            <span className="text-sm text-gray-600">Predicted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
