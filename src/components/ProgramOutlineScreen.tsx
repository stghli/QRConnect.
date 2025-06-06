
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
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-3xl backdrop-blur-lg bg-white/10 rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Workshop Program</h1>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-white text-sm sm:text-base lg:text-lg">
            Welcome, <span className="font-semibold">{userName}</span>!
          </p>
          <p className="text-blue-200 mt-1 text-xs sm:text-sm">
            Thank you for registering for our CyberSec 2025 Workshop.
          </p>
        </div>
        
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="text-purple-400 w-4 h-4" />
              <span className="text-white font-semibold">June 15, 2025</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="text-purple-400 w-4 h-4" />
              <span className="text-white font-semibold">9:00 AM - 5:00 PM</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="text-purple-400 w-4 h-4" />
              <span className="text-white font-semibold">50 Participants</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">Schedule</h2>
          
          <div className="max-h-60 overflow-y-auto space-y-2">
            {schedule.map((item, index) => (
              <Card key={index} className="bg-blue-900/30 border-blue-700/40">
                <CardHeader className="pb-1 pt-3 px-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-white text-sm sm:text-base">{item.title}</CardTitle>
                    <span className="text-blue-300 font-medium text-xs sm:text-sm">{item.time}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-3 pb-3">
                  <CardDescription className="text-blue-200 text-xs sm:text-sm">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={onViewResources}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm"
          >
            <FileText className="mr-2 h-4 w-4" />
            Access Workshop Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgramOutlineScreen;
