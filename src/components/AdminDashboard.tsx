
import React, { useState } from 'react';
import { Shield, Users, FileText, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminOverview from './admin/AdminOverview';
import AdminAttendeesList from './admin/AdminAttendeesList';
import AdminResourcesList from './admin/AdminResourcesList';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface AdminDashboardProps {
  attendees: Attendee[];
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ attendees, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'attendees' | 'resources'>('overview');

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto backdrop-blur-lg bg-white/10 rounded-3xl border border-white/20 shadow-2xl">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-300" />
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <Button
              onClick={onBack}
              className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-300/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to QR Code
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8">
            <Button
              onClick={() => setActiveTab('overview')}
              className={`${activeTab === 'overview' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-blue-300 hover:bg-white/20'
              }`}
            >
              <Settings className="w-4 h-4 mr-2" />
              Overview
            </Button>
            <Button
              onClick={() => setActiveTab('attendees')}
              className={`${activeTab === 'attendees' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-blue-300 hover:bg-white/20'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              Attendees ({attendees.length})
            </Button>
            <Button
              onClick={() => setActiveTab('resources')}
              className={`${activeTab === 'resources' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white/10 text-blue-300 hover:bg-white/20'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Resources
            </Button>
          </div>

          {/* Content */}
          {activeTab === 'overview' && <AdminOverview attendees={attendees} />}
          {activeTab === 'attendees' && <AdminAttendeesList attendees={attendees} />}
          {activeTab === 'resources' && <AdminResourcesList />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
