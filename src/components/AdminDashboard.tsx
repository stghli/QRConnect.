
import React, { useState } from 'react';
import { Shield, Users, FileText, Settings, Eye, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

  const handleDownload = (fileName: string) => {
    // Simulate download
    const element = document.createElement('a');
    element.href = '#';
    element.download = fileName;
    element.click();
  };

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
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-blue-900/30 border-blue-700/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-300" />
                    Total Attendees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-300">{attendees.length}</div>
                  <p className="text-blue-200 text-sm">Registered participants</p>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/30 border-purple-700/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-purple-300" />
                    Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-300">
                    {resources.reduce((total, category) => total + category.items.length, 0)}
                  </div>
                  <p className="text-purple-200 text-sm">Available downloads</p>
                </CardContent>
              </Card>

              <Card className="bg-green-900/30 border-green-700/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-300" />
                    Workshop Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold text-green-300">Active</div>
                  <p className="text-green-200 text-sm">Registration open</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'attendees' && (
            <div>
              <Card className="bg-blue-900/30 border-blue-700/40">
                <CardHeader>
                  <CardTitle className="text-white">Registered Attendees</CardTitle>
                  <CardDescription className="text-blue-200">
                    {attendees.length} people registered for the workshop
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {attendees.length === 0 ? (
                    <div className="text-center py-8">
                      <Users className="w-12 h-12 text-blue-300/50 mx-auto mb-4" />
                      <p className="text-blue-200">No attendees registered yet</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-blue-700/40">
                          <TableHead className="text-blue-300">Name</TableHead>
                          <TableHead className="text-blue-300">Registration Time</TableHead>
                          <TableHead className="text-blue-300">Access Code</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendees.map((attendee) => (
                          <TableRow key={attendee.id} className="border-blue-700/40">
                            <TableCell className="text-white font-medium">{attendee.name}</TableCell>
                            <TableCell className="text-blue-200">
                              {attendee.registeredAt.toLocaleDateString()} {attendee.registeredAt.toLocaleTimeString()}
                            </TableCell>
                            <TableCell className="text-blue-300 font-mono">
                              {attendee.id.slice(-6).toUpperCase()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              {resources.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="bg-blue-900/30 border-blue-700/40">
                  <CardHeader>
                    <CardTitle className="text-white">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-300" />
                            <div>
                              <p className="text-white font-medium">{item.name}</p>
                              <p className="text-blue-200 text-sm">{item.type} • {item.size}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleDownload(item.name)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
