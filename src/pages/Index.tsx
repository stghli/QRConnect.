
import React, { useEffect } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
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
import { useUserSession } from '../hooks/useUserSession';
import { useAttendeeManagement } from '../hooks/useAttendeeManagement';
import { useScheduleManagement } from '../hooks/useScheduleManagement';

const Index = () => {
  const {
    currentUser,
    setCurrentUser,
    isReturningUser,
    setIsReturningUser,
    isAdmin,
    currentScreen,
    setCurrentScreen,
    handleAdminLogin,
  } = useUserSession();

  const {
    attendees,
    addAttendee,
    checkExistingUser,
    verifyAccessCode,
    handleRemoveAttendee,
    handleRegenerateCode,
    getCurrentUser,
  } = useAttendeeManagement();

  const { schedule, handleScheduleUpdate } = useScheduleManagement();

  useEffect(() => {
    // Check if user came via QR code scan
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('join') === 'true') {
      setCurrentScreen('welcome');
    }
  }, [setCurrentScreen]);

  const handleRegistration = (name: string) => {
    const existingUser = checkExistingUser(name);
    
    if (existingUser) {
      setIsReturningUser(true);
      setCurrentScreen('codeVerification');
    } else {
      addAttendee(name);
      setCurrentUser(name);
      setCurrentScreen('checkedIn');
    }
  };

  const handleCodeVerification = (code: string): boolean => {
    const user = verifyAccessCode(code);
    if (user) {
      setCurrentUser(user.name);
      setCurrentScreen('checkedIn');
      return true;
    }
    return false;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative">
      {/* Enhanced Animated Background */}
      <AnimatedBackground />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 z-5"></div>
      
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
            onVerify={handleCodeVerification}
            onBack={() => setCurrentScreen('qr')}
          />
        )}
        
        {currentScreen === 'checkedIn' && (
          <CheckedInScreen
            userName={currentUser}
            accessCode={getCurrentUser(currentUser)?.accessCode || ''}
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
