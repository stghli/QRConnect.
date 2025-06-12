
import React from 'react';
import { Shield, Calendar, Clock, Users, FileText, MapPin } from 'lucide-react';
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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-400 mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              CyberSec 2025
            </h1>
          </div>
          <h2 className="text-xl sm:text-2xl text-blue-200 font-semibold mb-2">
            Professional Cybersecurity Workshop
          </h2>
          <p className="text-blue-300 max-w-2xl mx-auto">
            Welcome, <span className="font-semibold text-white">{userName}</span>! 
            Join us for an intensive day of cybersecurity training and networking.
          </p>
        </div>

        {/* Event Details Card */}
        <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-700/40 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">Event Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-lg">Date</h3>
                <p className="text-blue-200">June 15, 2025</p>
              </div>
              
              <div className="text-center">
                <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-lg">Duration</h3>
                <p className="text-blue-200">9:00 AM - 5:00 PM</p>
              </div>
              
              <div className="text-center">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-lg">Attendees</h3>
                <p className="text-blue-200">50 Professionals</p>
              </div>
              
              <div className="text-center">
                <MapPin className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold text-lg">Format</h3>
                <p className="text-blue-200">Virtual & Interactive</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Section */}
        <Card className="bg-white/5 border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white text-2xl flex items-center">
              <Clock className="w-6 h-6 mr-3 text-blue-400" />
              Workshop Schedule
            </CardTitle>
            <CardDescription className="text-blue-200 text-lg">
              A comprehensive day of cybersecurity education and hands-on learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-blue-900/30 to-purple-900/20 rounded-xl p-6 border border-blue-700/30 hover:border-blue-600/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-sm font-mono font-medium mr-4">
                          {item.time}
                        </div>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="text-blue-200 ml-0 sm:ml-20">{item.description}</p>
                    </div>
                    
                    {/* Session indicator */}
                    <div className="mt-3 sm:mt-0 sm:ml-4">
                      <div className="w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Section */}
        <div className="text-center">
          <Button 
            onClick={onViewResources}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
          >
            <FileText className="mr-3 h-5 w-5" />
            Access Workshop Resources
          </Button>
          <p className="text-blue-300 mt-3 text-sm">
            Get access to presentation slides, lab materials, and additional resources
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramOutlineScreen;
