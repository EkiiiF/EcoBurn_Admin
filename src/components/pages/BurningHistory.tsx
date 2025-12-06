import { useState } from 'react';
import { Calendar, Filter } from 'lucide-react';

interface BurningRecord {
  id: number;
  date: string;
  time: string;
  location: string;
  wasteType: string;
  volume: number;
  status: 'completed' | 'in-progress' | 'cancelled';
  operator: string;
}

const burningRecords: BurningRecord[] = [
  {
    id: 1,
    date: '2024-11-25',
    time: '08:30 AM',
    location: 'Site A - Zone 1',
    wasteType: 'Organic Waste',
    volume: 150,
    status: 'completed',
    operator: 'Ahmad Hidayat',
  },
  {
    id: 2,
    date: '2024-11-25',
    time: '10:15 AM',
    location: 'Site B - Zone 2',
    wasteType: 'Mixed Waste',
    volume: 220,
    status: 'completed',
    operator: 'Siti Nurhaliza',
  },
  {
    id: 3,
    date: '2024-11-26',
    time: '09:00 AM',
    location: 'Site A - Zone 3',
    wasteType: 'Paper & Cardboard',
    volume: 180,
    status: 'in-progress',
    operator: 'Budi Santoso',
  },
  {
    id: 4,
    date: '2024-11-26',
    time: '11:30 AM',
    location: 'Site C - Zone 1',
    wasteType: 'Plastic Waste',
    volume: 95,
    status: 'completed',
    operator: 'Dewi Lestari',
  },
  {
    id: 5,
    date: '2024-11-24',
    time: '02:00 PM',
    location: 'Site B - Zone 1',
    wasteType: 'Organic Waste',
    volume: 140,
    status: 'cancelled',
    operator: 'Ahmad Hidayat',
  },
  {
    id: 6,
    date: '2024-11-23',
    time: '08:45 AM',
    location: 'Site A - Zone 2',
    wasteType: 'Garden Waste',
    volume: 200,
    status: 'completed',
    operator: 'Siti Nurhaliza',
  },
];

export default function BurningHistory() {
  const [records] = useState<BurningRecord[]>(burningRecords);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredRecords = records.filter((record) => {
    const statusMatch = statusFilter === 'all' || record.status === statusFilter;
    const startDateMatch = !startDate || record.date >= startDate;
    const endDateMatch = !endDate || record.date <= endDate;
    return statusMatch && startDateMatch && endDateMatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 bg-[#41BB65]/20 rounded-xl p-4">
        <h1 className="text-gray-900 mb-2">Burning History</h1>
        <p className="text-gray-600">Track all waste burning activities and their status</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAA5C] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 flex-1">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAA5C] focus:border-transparent"
                placeholder="Start Date"
              />
            </div>
            
            <div className="flex items-center gap-2 flex-1">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAA5C] focus:border-transparent"
                placeholder="End Date"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#41BB65]/20 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700">Date & Time</th>
                <th className="px-6 py-3 text-left text-gray-700">Location</th>
                <th className="px-6 py-3 text-left text-gray-700">Waste Type</th>
                <th className="px-6 py-3 text-left text-gray-700">Volume (kg)</th>
                <th className="px-6 py-3 text-left text-gray-700">Operator</th>
                <th className="px-6 py-3 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{record.date}</div>
                    <div className="text-sm text-gray-500">{record.time}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-900">{record.location}</td>
                  <td className="px-6 py-4 text-gray-600">{record.wasteType}</td>
                  <td className="px-6 py-4 text-gray-900">{record.volume} kg</td>
                  <td className="px-6 py-4 text-gray-600">{record.operator}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm ${getStatusBadge(record.status)}`}>
                      {getStatusText(record.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            No burning records found for the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
