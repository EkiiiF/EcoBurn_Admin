import { useState } from 'react';
import { Plus, Wrench, X, Calendar, Clock } from 'lucide-react';

interface MaintenanceRecord {
  id: number;
  date: string;
  time: string;
  equipment: string;
  type: string;
  description: string;
  technician: string;
  status: 'completed' | 'scheduled' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
}

const initialRecords: MaintenanceRecord[] = [
  {
    id: 1,
    date: '2024-11-25',
    time: '09:00 AM',
    equipment: 'Incinerator Unit A',
    type: 'Preventive Maintenance',
    description: 'Regular inspection and cleaning of combustion chamber',
    technician: 'Rudi Hartono',
    status: 'completed',
    priority: 'medium',
  },
  {
    id: 2,
    date: '2024-11-26',
    time: '10:30 AM',
    equipment: 'Smoke Filter System',
    type: 'Repair',
    description: 'Replace damaged filter elements',
    technician: 'Andi Wijaya',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 3,
    date: '2024-11-27',
    time: '02:00 PM',
    equipment: 'Waste Conveyor Belt',
    type: 'Inspection',
    description: 'Check belt tension and lubrication',
    technician: 'Budi Santoso',
    status: 'scheduled',
    priority: 'low',
  },
  {
    id: 4,
    date: '2024-11-24',
    time: '08:30 AM',
    equipment: 'Temperature Sensors',
    type: 'Calibration',
    description: 'Calibrate all temperature monitoring sensors',
    technician: 'Dewi Lestari',
    status: 'completed',
    priority: 'high',
  },
];

export default function MaintenanceLog() {
  const [records, setRecords] = useState<MaintenanceRecord[]>(initialRecords);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    equipment: '',
    type: 'Preventive Maintenance',
    description: '',
    technician: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: MaintenanceRecord = {
      id: records.length + 1,
      ...formData,
      status: 'scheduled',
    };
    setRecords([newRecord, ...records]);
    setShowModal(false);
    setFormData({
      date: '',
      time: '',
      equipment: '',
      type: 'Preventive Maintenance',
      description: '',
      technician: '',
      priority: 'medium',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-orange-100 text-orange-700';
      case 'low':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 bg-[#41BB65]/20 rounded-xl p-4">
        <h1 className="text-gray-900 mb-2">Maintenance Log</h1>
        <p className="text-gray-600">Track equipment maintenance and repairs</p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#3BAA5C] text-white px-4 py-2 rounded-lg hover:bg-[#339448] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Maintenance Record
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {records.map((record) => (
          <div key={record.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#3BAA5C] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-[#3BAA5C]" />
                </div>
                <div>
                  <h3 className="text-gray-900">{record.equipment}</h3>
                  <p className="text-sm text-gray-600">{record.type}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getPriorityBadge(record.priority)}`}>
                {record.priority.charAt(0).toUpperCase() + record.priority.slice(1)}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{record.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{record.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{record.time}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500">Technician</p>
                <p className="text-sm text-gray-900">{record.technician}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(record.status)}`}>
                {record.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Maintenance Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md backdrop-saturate-150 flex items-center justify-center p-4 z-50 transition-all">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-gray-900">Add Maintenance Record</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAA5C] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAA5C] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="equipment" className="block text-gray-700 mb-2">
                  Equipment
                </label>
                <input
                  id="equipment"
                  type="text"
                  value={formData.equipment}
                  onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAA5C] focus:border-transparent"
                  placeholder="e.g., Incinerator Unit A"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-gray-700 mb-2">
                    Maintenance Type
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAA5C] focus:border-transparent"
                  >
                    <option value="Preventive Maintenance">Preventive Maintenance</option>
                    <option value="Repair">Repair</option>
                    <option value="Inspection">Inspection</option>
                    <option value="Calibration">Calibration</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="priority" className="block text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAA5C] focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAA5C] focus:border-transparent"
                  rows={3}
                  placeholder="Describe the maintenance work..."
                  required
                />
              </div>

              <div>
                <label htmlFor="technician" className="block text-gray-700 mb-2">
                  Technician
                </label>
                <input
                  id="technician"
                  type="text"
                  value={formData.technician}
                  onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BAA5C] focus:border-transparent"
                  placeholder="Technician name"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#3BAA5C] text-white rounded-lg hover:bg-[#339448] transition-colors"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
