
import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import QRCodeScreen from '../components/QRCodeScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import RegistrationScreen from '../components/RegistrationScreen';
import ProgramOutlineScreen from '../components/ProgramOutlineScreen';
import EditableProgramOutline from '../components/EditableProgramOutline';
import ResourcesScreen from '../components/ResourcesScreen';
import AdminLoginScreen from '../components/AdminLoginScreen';
import AdminDashboard from '../components/AdminDashboard';
import CodeVerificationScreen from '../components/CodeVerificationScreen';
import CheckedInScreen from '../components/CheckedInScreen';

export interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'qr' | 'welcome' | 'registration' | 'program' | 'resources' | 'adminLogin' | 'adminDashboard' | 'codeVerification' | 'checkedIn'>('qr');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
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
  ]);

  useEffect(() => {
    // Check if user came via QR code scan
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('join') === 'true') {
      setCurrentScreen('welcome');
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
    return newAttendee;
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
      setCurrentScreen('checkedIn');
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
      setCurrentScreen('checkedIn');
    }
  };

  const handleAdminLogin = (username: string, password: string) => {
    // Simple demo authentication - in a real app, this would be more secure
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      setCurrentUser('Administrator');
      setCurrentScreen('adminDashboard');
      return true;
    }
    return false;
  };

  const handleScheduleUpdate = (newSchedule: ScheduleItem[]) => {
    setSchedule(newSchedule);
  };

  const getCurrentUser = () => {
    return attendees.find(attendee => attendee.name === currentUser);
  };

  const handleQRCodeVerification = () => {
    setCurrentScreen('codeVerification');
  };

  // Admin functions for user management
  const handleAdminAddAttendee = (name: string) => {
    const newAttendee = addAttendee(name);
    // Don't redirect to checked-in screen for admin additions
    return newAttendee;
  };

  const handleRemoveAttendee = (id: string) => {
    setAttendees(attendees.filter(attendee => attendee.id !== id));
  };

  const handleRegenerateCode = (id: string) => {
    const newCode = generateAccessCode();
    setAttendees(attendees.map(attendee => 
      attendee.id === id 
        ? { ...attendee, accessCode: newCode }
        : attendee
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10">
        {currentScreen === 'qr' && (
          <QRCodeScreen 
            attendeeCount={attendees.length}
            onAdminLogin={() => setCurrentScreen('adminLogin')}
            onCodeVerification={handleQRCodeVerification}
          />
        )}
        
        {currentScreen === 'adminLogin' && (
          <AdminLoginScreen
            onLogin={handleAdminLogin}
            onBack={() => setCurrentScreen('qr')}
          />
        )}

        {currentScreen === 'adminDashboard' && (
          <AdminDashboard
            attendees={attendees}
            schedule={schedule}
            onScheduleUpdate={handleScheduleUpdate}
            onBack={() => setCurrentScreen('qr')}
            onAddAttendee={handleAdminAddAttendee}
            onRemoveAttendee={handleRemoveAttendee}
            onRegenerateCode={handleRegenerateCode}
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
        
        {currentScreen === 'checkedIn' && (
          <CheckedInScreen
            userName={currentUser}
            accessCode={getCurrentUser()?.accessCode || ''}
            onViewProgram={() => setCurrentScreen('program')}
            onViewResources={() => setCurrentScreen('resources')}
          />
        )}
        
        {currentScreen === 'program' && (
          isAdmin ? (
            <EditableProgramOutline 
              userName={currentUser} 
              schedule={schedule}
              onScheduleUpdate={handleScheduleUpdate}
              onViewResources={() => setCurrentScreen('resources')}
            />
          ) : (
            <ProgramOutlineScreen 
              userName={currentUser} 
              onViewResources={() => setCurrentScreen('resources')}
            />
          )
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
