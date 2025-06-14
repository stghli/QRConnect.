
import React from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import { useAppController } from '../hooks/useAppController';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import ScreenManager from '../components/ScreenManager';

const Index = () => {
  const {
    currentUser,
    isAdmin,
    currentScreen,
    attendees,
    schedule,
    feedback,
    resources,
    handleAdminLogin,
    setCurrentScreen,
    handleRegistration,
    handleExistingUserFound,
    handleCodeVerification,
    handleQRCodeVerification,
    getCurrentUser,
    handleScheduleUpdate,
    handleAdminAddAttendee,
    handleRemoveAttendee,
    handleRegenerateCode,
    handleAdminSendNotification,
    handleFeedbackSubmit,
    handleAddResource,
    handleUpdateResource,
    handleDeleteResource,
  } = useAppController();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative">
      <AnimatedBackground />
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 z-5"></div>
      
      <div className="relative z-10">
        <ScreenManager
          currentScreen={currentScreen}
          attendees={attendees}
          schedule={schedule}
          feedback={feedback}
          currentUser={currentUser}
          isAdmin={isAdmin}
          onAdminLogin={handleAdminLogin}
          setCurrentScreen={setCurrentScreen}
          onGoToCodeVerification={handleQRCodeVerification}
          onRegister={handleRegistration}
          onExistingUserFound={handleExistingUserFound}
          onVerifyCode={handleCodeVerification}
          getCurrentUser={getCurrentUser}
          onScheduleUpdate={handleScheduleUpdate}
          onAdminAddAttendee={handleAdminAddAttendee}
          onRemoveAttendee={handleRemoveAttendee}
          onRegenerateCode={handleRegenerateCode}
          onAdminSendNotification={handleAdminSendNotification}
          onFeedbackSubmit={handleFeedbackSubmit}
          resources={resources}
          onAddResource={handleAddResource}
          onUpdateResource={handleUpdateResource}
          onDeleteResource={handleDeleteResource}
        />
      </div>

      {/* Floating Feedback Button */}
      {(currentScreen === 'checkedIn' || currentScreen === 'program' || currentScreen === 'resources') && !isAdmin && (
        <Button
          onClick={() => setCurrentScreen('feedback')}
          className="fixed bottom-6 right-6 elegant-button text-white border-0 z-50 rounded-full h-14 w-14 p-0 shadow-lg hover-scale"
          aria-label="Leave Feedback"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default Index;
