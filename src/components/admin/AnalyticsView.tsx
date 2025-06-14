
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart as BarChartIcon, Calendar, Users, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import type { Attendee } from '../../types';
import StatCard from './StatCard';

interface AnalyticsViewProps {
  attendees: Attendee[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ attendees }) => {
  if (attendees.length === 0) {
    return (
      <Card className="bg-gray-800/20 border-gray-700/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChartIcon className="w-5 h-5 mr-2 text-blue-300" />
            Registration Analytics
          </CardTitle>
          <CardDescription className="text-gray-400">
            No attendees have registered yet. Analytics will be shown here once data is available.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
            <BarChartIcon className="w-16 h-16 mx-auto text-gray-500/50 mb-4" />
            <p className="text-gray-400">Waiting for data...</p>
        </CardContent>
      </Card>
    );
  }

  const registrationByDate = attendees.reduce((acc, attendee) => {
    const date = format(new Date(attendee.registeredAt), 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(registrationByDate)
    .map(([date, registrations]) => ({
      date: format(new Date(date), 'MMM d'),
      Registrations: registrations,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const peakDay = chartData.length > 0 ? chartData.reduce((max, day) => day.Registrations > max.Registrations ? day : max, chartData[0]) : { date: "N/A", Registrations: 0 };

  const totalDays = Object.keys(registrationByDate).length;
  const averageRegistrations = totalDays > 0 ? (attendees.length / totalDays).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Attendees"
          value={attendees.length}
          icon={Users}
          description="Total registered users"
          bgColor="bg-blue-900/30" borderColor="border-blue-700/40" iconColor="text-blue-300" valueColor="text-blue-300" descriptionColor="text-blue-200"
        />
        <StatCard
          title="Peak Day"
          value={peakDay.Registrations}
          icon={TrendingUp}
          description={`On ${peakDay.date}`}
          bgColor="bg-purple-900/30" borderColor="border-purple-700/40" iconColor="text-purple-300" valueColor="text-purple-300" descriptionColor="text-purple-200"
        />
        <StatCard
          title="Avg. Daily Reg."
          value={averageRegistrations}
          icon={Calendar}
          description={totalDays > 0 ? `Over ${totalDays} day(s)` : 'No registrations yet'}
          bgColor="bg-green-900/30" borderColor="border-green-700/40" iconColor="text-green-300" valueColor="text-green-300" descriptionColor="text-green-200"
        />
      </div>

      <Card className="bg-gray-800/20 border-gray-700/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChartIcon className="w-5 h-5 mr-2 text-blue-300" />
            Registrations Over Time
          </CardTitle>
          <CardDescription className="text-gray-400">
            Number of attendees registering each day.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="date" stroke="rgba(255, 255, 255, 0.7)" />
                <YAxis stroke="rgba(255, 255, 255, 0.7)" allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.2)' }}
                  labelStyle={{ color: '#fff' }}
                  cursor={{fill: 'rgba(96, 165, 250, 0.2)'}}
                />
                <Legend wrapperStyle={{ color: '#fff' }} />
                <Bar dataKey="Registrations" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsView;
