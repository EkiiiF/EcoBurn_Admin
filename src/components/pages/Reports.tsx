import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, FileText, TrendingUp, Trash2, DollarSign } from 'lucide-react';

const monthlyReportData = [
  { month: 'Jan', waste: 1180, revenue: 10200 },
  { month: 'Feb', waste: 1250, revenue: 10850 },
  { month: 'Mar', waste: 1320, revenue: 11400 },
  { month: 'Apr', waste: 1280, revenue: 11100 },
  { month: 'May', waste: 1420, revenue: 12300 },
  { month: 'Jun', waste: 1380, revenue: 11950 },
  { month: 'Jul', waste: 1450, revenue: 12550 },
  { month: 'Aug', waste: 1520, revenue: 13180 },
  { month: 'Sep', waste: 1480, revenue: 12820 },
  { month: 'Oct', waste: 1600, revenue: 13850 },
  { month: 'Nov', waste: 1550, revenue: 13420 },
];

export default function Reports() {
  const handleExport = (format: 'pdf' | 'excel') => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const summaryStats = [
    {
      title: 'Total Waste Processed',
      value: '16,430 kg',
      change: '+12.5%',
      icon: Trash2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Revenue Generated',
      value: '$142,570',
      change: '+15.3%',
      icon: DollarSign,
      color: 'text-[#3BAA5C]',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Average Monthly Waste',
      value: '1,494 kg',
      change: '+8.7%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 bg-[#41BB65]/20 rounded-xl p-4">
        <h1 className="text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">Generate and export comprehensive system reports</p>
      </div>

      {/* Export Buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-gray-900 mb-1">Export Report</h2>
            <p className="text-sm text-gray-600">Download complete system report in your preferred format</p>
          </div>
          <FileText className="w-8 h-8 text-[#3BAA5C]" />
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleExport('pdf')}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export as PDF
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="flex items-center gap-2 bg-[#3BAA5C] text-white px-6 py-3 rounded-lg hover:bg-[#339448] transition-colors"
          >
            <Download className="w-5 h-5" />
            Export as Excel
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summaryStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1 text-[#3BAA5C]">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{stat.change}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
            <p className="text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Monthly Waste Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-gray-900 mb-1">Monthly Waste Processing</h2>
          <p className="text-sm text-gray-600">Waste volume processed per month (in kg)</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyReportData}>
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
            <Bar dataKey="waste" fill="#3BAA5C" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="text-gray-900 mb-1">Monthly Revenue</h2>
          <p className="text-sm text-gray-600">Revenue generated per month (in USD)</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyReportData}>
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
            <Bar dataKey="revenue" fill="#22c55e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Report Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-gray-900 mb-1">Monthly Breakdown</h2>
          <p className="text-sm text-gray-600">Detailed monthly performance data</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#41BB65]/20 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Month</th>
                <th className="px-6 py-3 text-left text-gray-700">Waste Processed (kg)</th>
                <th className="px-6 py-3 text-left text-gray-700">Revenue ($)</th>
                <th className="px-6 py-3 text-left text-gray-700">Avg Price/kg</th>
                <th className="px-6 py-3 text-left text-gray-700">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthlyReportData.map((data, index) => {
                const avgPrice = (data.revenue / data.waste).toFixed(2);
                const growth = index > 0 
                  ? (((data.waste - monthlyReportData[index - 1].waste) / monthlyReportData[index - 1].waste) * 100).toFixed(1)
                  : '0.0';
                
                return (
                  <tr key={data.month} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{data.month} 2024</td>
                    <td className="px-6 py-4 text-gray-900">{data.waste.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-900">${data.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-600">${avgPrice}</td>
                    <td className="px-6 py-4">
                      <span className={`${parseFloat(growth) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(growth) >= 0 ? '+' : ''}{growth}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
