
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, Activity } from 'lucide-react';
import StatCard from './StatCard';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface AdminAnalyticsProps {
  attendees: Attendee[];
}

const AdminAnalytics: React.FC<AdminAnalyticsProps> = ({ attendees }) => {
  // Generate registration data by day
  const registrationData = React.useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const count = attendees.filter(attendee => 
        attendee.registeredAt.toISOString().split('T')[0] === date
      ).length;
      
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        registrations: count
      };
    });
  }, [attendees]);

  // Generate hourly registration data
  const hourlyData = React.useMemo(() => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    return hours.map(hour => {
      const count = attendees.filter(attendee => 
        attendee.registeredAt.getHours() === hour
      ).length;
      
      return {
        hour: `${hour}:00`,
        registrations: count
      };
    }).filter(item => item.registrations > 0);
  }, [attendees]);

  // Calculate statistics
  const today = new Date();
  const todayRegistrations = attendees.filter(attendee => 
    attendee.registeredAt.toDateString() === today.toDateString()
  ).length;

  const thisWeek = attendees.filter(attendee => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return attendee.registeredAt >= weekAgo;
  }).length;

  const avgPerDay = attendees.length > 0 ? 
    Math.round((attendees.length / Math.max(1, Math.ceil((Date.now() - Math.min(...attendees.map(a => a.registeredAt.getTime()))) / (1000 * 60 * 60 * 24)))) * 10) / 10 : 0;

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Today's Registrations"
          value={todayRegistrations}
          description="New attendees today"
          icon={Users}
          bgColor="bg-blue-900/30"
          borderColor="border-blue-700/40"
          iconColor="text-blue-300"
          valueColor="text-blue-300"
          descriptionColor="text-blue-200"
        />

        <StatCard
          title="This Week"
          value={thisWeek}
          description="Registrations in last 7 days"
          icon={Calendar}
          bgColor="bg-purple-900/30"
          borderColor="border-purple-700/40"
          iconColor="text-purple-300"
          valueColor="text-purple-300"
          descriptionColor="text-purple-200"
        />

        <StatCard
          title="Avg. Per Day"
          value={avgPerDay}
          description="Average daily registrations"
          icon={Activity}
          bgColor="bg-green-900/30"
          borderColor="border-green-700/40"
          iconColor="text-green-300"
          valueColor="text-green-300"
          descriptionColor="text-green-200"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Registrations */}
        <Card className="bg-blue-900/30 border-blue-700/40">
          <CardHeader>
            <CardTitle className="text-white">Daily Registrations (Last 7 Days)</CardTitle>
            <CardDescription className="text-blue-200">
              Registration trends over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={registrationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e40af" />
                <XAxis dataKey="date" stroke="#93c5fd" />
                <YAxis stroke="#93c5fd" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e3a8a', 
                    border: '1px solid #3b82f6',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="registrations" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Registration Times */}
        <Card className="bg-purple-900/30 border-purple-700/40">
          <CardHeader>
            <CardTitle className="text-white">Registration Times</CardTitle>
            <CardDescription className="text-purple-200">
              When people typically register
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b21a8" />
                <XAxis dataKey="hour" stroke="#c4b5fd" />
                <YAxis stroke="#c4b5fd" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#581c87', 
                    border: '1px solid #8b5cf6',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="registrations" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Registration Summary */}
      <Card className="bg-green-900/30 border-green-700/40">
        <CardHeader>
          <CardTitle className="text-white">Registration Summary</CardTitle>
          <CardDescription className="text-green-200">
            Key insights about workshop attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-300">{attendees.length}</div>
              <div className="text-green-200 text-sm">Total Attendees</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-300">{todayRegistrations}</div>
              <div className="text-green-200 text-sm">Today's New</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-300">{thisWeek}</div>
              <div className="text-green-200 text-sm">This Week</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-300">{avgPerDay}</div>
              <div className="text-green-200 text-sm">Daily Average</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
