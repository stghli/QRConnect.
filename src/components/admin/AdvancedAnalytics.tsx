
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AnalyticsData } from '../../hooks/useAnalytics';
import type { Resources } from '../../hooks/useResourceManagement';

interface AdvancedAnalyticsProps {
  analytics: AnalyticsData;
  resources: Resources;
}

const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ analytics, resources }) => {
  const allResources = [
    ...resources.cheatsheets,
    ...resources.toolkits,
    ...resources.slides,
  ];

  const getChartData = (dataType: 'downloads' | 'views') => {
    const data = analytics[dataType];
    if (!data) return [];
    return Object.entries(data)
      .map(([filename, count]) => {
        const resource = allResources.find(r => r.filename === filename);
        return {
          name: resource ? resource.title : filename,
          count: count,
        };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Show top 10
  };

  const downloadData = getChartData('downloads');
  const viewData = getChartData('views');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-white/5 border-blue-300/20">
        <CardHeader>
          <CardTitle className="text-white">Most Downloaded Resources</CardTitle>
        </CardHeader>
        <CardContent>
          {downloadData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={downloadData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.7)" allowDecimals={false} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.7)" width={150} tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.7)' }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Legend />
                <Bar dataKey="count" name="Downloads" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center p-8">No download data yet.</p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-blue-300/20">
        <CardHeader>
          <CardTitle className="text-white">Most Viewed Resources</CardTitle>
        </CardHeader>
        <CardContent>
          {viewData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={viewData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.7)" allowDecimals={false} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.7)" width={150} tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.7)' }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Legend />
                <Bar dataKey="count" name="Views" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center p-8">No view data yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalytics;
