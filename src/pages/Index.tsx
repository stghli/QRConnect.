
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import QRCodeScreen from '../components/QRCodeScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import ProgramOutlineScreen from '../components/ProgramOutlineScreen';
import ResourcesScreen from '../components/ResourcesScreen';
import AdminDashboard from '../components/AdminDashboard';
import CodeVerificationScreen from '../components/CodeVerificationScreen';

export interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'qr' | 'welcome' | 'registration' | 'program' | 'resources' | 'admin' | 'codeVerification'>('qr');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    // Check if user came via QR code scan
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('join') === 'true') {
      setCurrentScreen('welcome');
    }
    if (urlParams.get('admin') === 'true') {
      setCurrentScreen('admin');
    }
  }, []);

  const generateAccessCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const addAttendee = (name: string) => {
    const accessCode = generateAccessCode();
    const newAttendee: Attendee = {
      id: Date.now().toString(),
      name,
      registeredAt: new Date(),
      accessCode,
    };
    setAttendees([...attendees, newAttendee]);
    setCurrentUser(name);
    
    // Show the access code to the user (in a real app, this would be done differently)
    alert(`Welcome ${name}! Your access code is: ${accessCode}. Please save this code for future access.`);
  };

  const checkExistingUser = (name: string) => {
    return attendees.find(attendee => 
      attendee.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
  };

  const verifyAccessCode = (code: string) => {
    const user = attendees.find(attendee => attendee.accessCode === code);
    if (user) {
      setCurrentUser(user.name);
      setCurrentScreen('program');
      return true;
    }
    return false;
  };

  const handleRegistration = (name: string) => {
    const existingUser = checkExistingUser(name);
    
    if (existingUser) {
      setIsReturningUser(true);
      setCurrentScreen('codeVerification');
    } else {
      addAttendee(name);
      setCurrentScreen('program');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10">
        {currentScreen === 'qr' && (
          <QRCodeScreen 
            attendeeCount={attendees.length}
            onViewAdmin={() => setCurrentScreen('admin')}
          />
        )}
        
        {currentScreen === 'welcome' && (
          <WelcomeScreen onGetStarted={() => setCurrentScreen('registration')} />
        )}
        
        {currentScreen === 'registration' && (
          <RegistrationScreen 
            onRegister={handleRegistration}
          />
        )}
        
        {currentScreen === 'codeVerification' && (
          <CodeVerificationScreen
            onVerify={verifyAccessCode}
            onBack={() => setCurrentScreen('qr')}
          />
        )}
        
        {currentScreen === 'program' && (
          <ProgramOutlineScreen 
            userName={currentUser} 
            onViewResources={() => setCurrentScreen('resources')}
          />
        )}

        {currentScreen === 'resources' && (
          <ResourcesScreen 
            userName={currentUser}
            onBack={() => setCurrentScreen('program')}
          />
        )}

        {currentScreen === 'admin' && (
          <AdminDashboard
            attendees={attendees}
            onBack={() => setCurrentScreen('qr')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
