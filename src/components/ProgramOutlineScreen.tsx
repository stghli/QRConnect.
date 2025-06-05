
import React from 'react';
import { Shield, Calendar, Clock, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProgramOutlineScreenProps {
  userName: string;
  onViewResources: () => void;
}

const ProgramOutlineScreen: React.FC<ProgramOutlineScreenProps> = ({ userName, onViewResources }) => {
  const schedule = [
    {
      time: '9:00 AM',
      title: 'Introduction & Welcome',
      description: 'Overview of the workshop and introductions'
    },
    {
      time: '10:30 AM',
      title: 'Threat Landscape',
      description: 'Current cyber threats and attack vectors'
    },
    {
      time: '12:00 PM',
      title: 'Lunch Break',
      description: 'Networking with peers and speakers'
    },
    {
      time: '1:30 PM',
      title: 'Hands-on Lab',
      description: 'Practical cybersecurity exercises'
    },
    {
      time: '3:30 PM',
      title: 'Panel Discussion',
      description: 'Q&A with industry experts'
    },
    {
      time: '4:30 PM',
      title: 'Closing Remarks',
      description: 'Workshop summary and next steps'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl backdrop-blur-lg bg-white/10 rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold text-white">Workshop Program</h1>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-white text-lg">
            Welcome, <span className="font-semibold">{userName}</span>!
          </p>
          <p className="text-blue-200 mt-2">
            Thank you for registering for our CyberSec 2025 Workshop. Below is the program for the day.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-purple-400" />
            <h2 className="text-xl font-semibold text-white">June 15, 2025</h2>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="text-purple-400" />
            <h2 className="text-xl font-semibold text-white">9:00 AM - 5:00 PM</h2>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <Users className="text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Limited to 50 Participants</h2>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Schedule</h2>
          
          {schedule.map((item, index) => (
            <Card key={index} className="bg-blue-900/30 border-blue-700/40">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">{item.title}</CardTitle>
                  <span className="text-blue-300 font-medium">{item.time}</span>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-blue-200">{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={onViewResources}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            Access Workshop Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramOutlineScreen;
