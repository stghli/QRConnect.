
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import QRCodeScreen from '../components/QRCodeScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import ProgramOutlineScreen from '../components/ProgramOutlineScreen';
import AttendeeListScreen from '../components/AttendeeListScreen';

export interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'qr' | 'welcome' | 'registration' | 'program' | 'attendees'>('qr');
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
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
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
          <ProgramOutlineScreen userName={currentUser} />
        )}
        
        {currentScreen === 'attendees' && (
          <AttendeeListScreen 
            attendees={attendees}
            onBack={() => setCurrentScreen('qr')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
