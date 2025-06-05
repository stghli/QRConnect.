
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import QRCodeScreen from '../components/QRCodeScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import ProgramOutlineScreen from '../components/ProgramOutlineScreen';
import AttendeeListScreen from '../components/AttendeeListScreen';
import ResourcesScreen from '../components/ResourcesScreen';

export interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'qr' | 'welcome' | 'registration' | 'program' | 'attendees' | 'resources'>('qr');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('');

  useEffect(() => {
    // Check if user came via QR code scan
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('join') === 'true') {
      setCurrentScreen('welcome');
    }
  }, []);

  const addAttendee = (name: string) => {
    const newAttendee: Attendee = {
      id: Date.now().toString(),
      name,
      registeredAt: new Date(),
    };
    setAttendees([...attendees, newAttendee]);
    setCurrentUser(name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10">
        {currentScreen === 'qr' && (
          <QRCodeScreen 
            attendeeCount={attendees.length}
            onViewAttendees={() => setCurrentScreen('attendees')}
          />
        )}
        
        {currentScreen === 'welcome' && (
          <WelcomeScreen onGetStarted={() => setCurrentScreen('registration')} />
        )}
        
        {currentScreen === 'registration' && (
          <RegistrationScreen 
            onRegister={(name) => {
              addAttendee(name);
              setCurrentScreen('program');
            }}
          />
        )}
        
        {currentScreen === 'program' && (
          <ProgramOutlineScreen 
            userName={currentUser} 
            onViewResources={() => setCurrentScreen('resources')}
          />
        )}
        
        {currentScreen === 'attendees' && (
          <AttendeeListScreen 
            attendees={attendees}
            onBack={() => setCurrentScreen('qr')}
          />
        )}

        {currentScreen === 'resources' && (
          <ResourcesScreen 
            userName={currentUser}
            onBack={() => setCurrentScreen('program')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
