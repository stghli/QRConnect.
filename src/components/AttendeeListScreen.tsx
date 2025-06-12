import React from 'react';
import { Shield, ArrowLeft, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Attendee } from '../types';

interface AttendeeListScreenProps {
  attendees: Attendee[];
  onBack: () => void;
}

const AttendeeListScreen: React.FC<AttendeeListScreenProps> = ({ attendees, onBack }) => {
  const formatRegistrationTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            onClick={onBack}
            variant="ghost"
            className="text-blue-300 hover:text-white hover:bg-white/10 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to QR Code
          </Button>
          
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold text-white">Registered Attendees</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-blue-300" />
              <div>
                <p className="text-blue-200 text-sm">Total Registered</p>
                <p className="text-2xl font-bold text-white">{attendees.length}</p>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-purple-300" />
              <div>
                <p className="text-blue-200 text-sm">Workshop Date</p>
                <p className="text-lg font-semibold text-white">Jan 15, 2025</p>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-green-300" />
              <div>
                <p className="text-blue-200 text-sm">Status</p>
                <p className="text-lg font-semibold text-green-300">Registration Open</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendee List */}
        {attendees.length === 0 ? (
          <div className="text-center py-12">
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
              <Users className="w-16 h-16 text-blue-300 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">No Attendees Yet</h3>
              <p className="text-blue-200">
                Share the QR code to start collecting registrations for your cybersecurity workshop.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {attendees.map((attendee, index) => (
              <div 
                key={attendee.id} 
                className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                      {attendee.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{attendee.name}</h3>
                      <p className="text-blue-300 text-sm">
                        Attendee #{index + 1}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-blue-200 text-sm">Registered</p>
                    <p className="text-blue-300 text-sm font-medium">
                      {formatRegistrationTime(attendee.registeredAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeListScreen;
