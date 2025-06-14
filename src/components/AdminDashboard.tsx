import React, { useState } from 'react';
import { Shield, Users, FileText, Settings, ArrowLeft, BarChart, Calendar, Bell, UserCog, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminOverview from './admin/AdminOverview';
import AdminAttendeesList from './admin/AdminAttendeesList';
import AdminResourcesList from './admin/AdminResourcesList';
import AdminAnalytics from './admin/AdminAnalytics';
import AnalyticsView from './admin/AnalyticsView';
import AdminScheduleManager from './admin/AdminScheduleManager';
import AdminNotifications from './admin/AdminNotifications';
import AdminSettings from './admin/AdminSettings';
import AdminUserManagement from './admin/AdminUserManagement';
import AnimatedBackground from './AnimatedBackground';
import AdminFeedbackView from './admin/AdminFeedbackView';
import type { Attendee, ScheduleItem, Feedback } from '../types';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

interface AdminDashboardProps {
  attendees: Attendee[];
  schedule: ScheduleItem[];
  feedback: Feedback[];
  onScheduleUpdate: (newSchedule: ScheduleItem[]) => void;
  onBack: () => void;
  onAddAttendee: (name: string) => Attendee | undefined;
  onRemoveAttendee: (id: string) => void;
  onRegenerateCode: (id: string) => string;
  onSendNotification: (title: string, message: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  attendees, 
  schedule, 
  feedback,
  onScheduleUpdate, 
  onBack,
  onAddAttendee,
  onRemoveAttendee,
  onRegenerateCode,
  onSendNotification
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'attendees' | 'userManagement' | 'resources' | 'analytics' | 'schedule' | 'notifications' | 'settings' | 'feedback'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield, component: AdminOverview },
    { id: 'attendees', label: 'Attendees', icon: Users, component: AdminAttendeesList, count: attendees.length },
    { id: 'userManagement', label: 'User Management', icon: UserCog, component: AdminUserManagement },
    { id: 'resources', label: 'Resources', icon: FileText, component: AdminResourcesList },
    { id: 'analytics', label: 'Analytics', icon: BarChart, component: AdminAnalytics },
    { id: 'schedule', label: 'Schedule', icon: Calendar, component: AdminScheduleManager },
    { id: 'notifications', label: 'Notifications', icon: Bell, component: AdminNotifications },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare, component: AdminFeedbackView, count: feedback.length },
    { id: 'settings', label: 'Settings', icon: Settings, component: AdminSettings }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview attendees={attendees} />;
      case 'attendees':
        return <AdminAttendeesList attendees={attendees} />;
      case 'userManagement':
        return <AdminUserManagement 
          attendees={attendees} 
          onAddAttendee={onAddAttendee}
          onRemoveAttendee={onRemoveAttendee}
          onRegenerateCode={onRegenerateCode}
        />;
      case 'resources':
        return <AdminResourcesList />;
      case 'analytics':
        return <AnalyticsView attendees={attendees} />;
      case 'schedule':
        return <AdminScheduleManager schedule={schedule} onScheduleUpdate={onScheduleUpdate} />;
      case 'notifications':
        return <AdminNotifications attendees={attendees} onSendNotification={onSendNotification} />;
      case 'feedback':
        return <AdminFeedbackView feedback={feedback} />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview attendees={attendees} />;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 relative">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto elegant-card rounded-3xl shadow-2xl relative z-10">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-elegant-primary computer-pulse" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-elegant-primary to-elegant-secondary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <Button
              onClick={onBack}
              className="elegant-button text-white border-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to QR Code
            </Button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`${activeTab === tab.id 
                    ? 'elegant-button text-white border-0' 
                    : 'bg-elegant-surface-light/50 text-elegant-primary hover:bg-elegant-surface-light border border-elegant-primary/20'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="ml-1 bg-elegant-accent/30 text-elegant-accent px-2 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Content */}
          <div className="min-h-[500px]">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
