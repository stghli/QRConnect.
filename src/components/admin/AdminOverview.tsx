
import React from 'react';
import { Users, FileText, Shield } from 'lucide-react';
import StatCard from './StatCard';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface AdminOverviewProps {
  attendees: Attendee[];
}

const AdminOverview: React.FC<AdminOverviewProps> = ({ attendees }) => {
  const resources = [
    {
      category: 'Cheatsheets',
      items: [
        { name: 'Top 10 Password Tips', type: 'PDF', size: '245 KB' },
        { name: 'Network Security Basics', type: 'PDF', size: '1.2 MB' },
        { name: 'Incident Response Guide', type: 'PDF', size: '890 KB' }
      ]
    },
    {
      category: 'Toolkits',
      items: [
        { name: 'Kali Linux Setup Guide', type: 'PDF', size: '3.4 MB' },
        { name: 'Penetration Testing Toolkit', type: 'ZIP', size: '15.2 MB' },
        { name: 'Security Assessment Tools', type: 'ZIP', size: '8.7 MB' }
      ]
    },
    {
      category: 'Workshop Materials',
      items: [
        { name: 'Workshop Slides - Session 1', type: 'PPTX', size: '12.3 MB' },
        { name: 'Workshop Slides - Session 2', type: 'PPTX', size: '9.8 MB' },
        { name: 'Hands-on Lab Instructions', type: 'PDF', size: '2.1 MB' }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Attendees"
        value={attendees.length}
        description="Registered participants"
        icon={Users}
        bgColor="bg-blue-900/30"
        borderColor="border-blue-700/40"
        iconColor="text-blue-300"
        valueColor="text-blue-300"
        descriptionColor="text-blue-200"
      />

      <StatCard
        title="Resources"
        value={resources.reduce((total, category) => total + category.items.length, 0)}
        description="Available downloads"
        icon={FileText}
        bgColor="bg-purple-900/30"
        borderColor="border-purple-700/40"
        iconColor="text-purple-300"
        valueColor="text-purple-300"
        descriptionColor="text-purple-200"
      />

      <StatCard
        title="Workshop Status"
        value="Active"
        description="Registration open"
        icon={Shield}
        bgColor="bg-green-900/30"
        borderColor="border-green-700/40"
        iconColor="text-green-300"
        valueColor="text-green-300"
        descriptionColor="text-green-200"
      />
    </div>
  );
};

export default AdminOverview;
