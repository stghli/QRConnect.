import { useEffect, useState } from 'react';
import { useUserSession } from './useUserSession';
import { useAttendeeManagement } from './useAttendeeManagement';
import { useScheduleManagement } from './useScheduleManagement';
import { useNotificationSystem } from './useNotificationSystem';
import { useFeedbackManagement } from './useFeedbackManagement';
import { useResourceManagement } from './useResourceManagement';
import { toast } from 'sonner';
import type { Attendee } from '../types';

export const useAppController = () => {
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
    verifyAccessCode,
    handleRemoveAttendee,
    handleRegenerateCode,
    getCurrentUser,
  } = useAttendeeManagement();

  const { schedule, handleScheduleUpdate } = useScheduleManagement();
  const { notifications, addNotification } = useNotificationSystem();
  const { feedback, addFeedback } = useFeedbackManagement();
  const { resources, handleAddResource, handleUpdateResource, handleDeleteResource } = useResourceManagement();
  const [lastNotifiedId, setLastNotifiedId] = useState<string | null>(null);

  useEffect(() => {
    // Check if user came via QR code scan
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('join') === 'true') {
      setCurrentScreen('welcome');
    }
  }, [setCurrentScreen]);

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      if (latestNotification.id !== lastNotifiedId && !isAdmin) {
        toast.info(latestNotification.title, {
          description: latestNotification.message,
          duration: 10000,
          position: 'top-right',
        });
        setLastNotifiedId(latestNotification.id);
      }
    }
  }, [notifications, lastNotifiedId, isAdmin]);

  const handleRegistration = (name: string) => {
    const result = addAttendee(name);
    
    if (!result.success && result.existingUser) {
      // User already exists, redirect to code verification
      setIsReturningUser(true);
      return result;
    } else if (result.success && result.attendee) {
      // New user registered successfully
      setCurrentUser(name);
      setCurrentScreen('checkedIn');
      return result;
    }
    
    return result;
  };

  const handleExistingUserFound = () => {
    setCurrentScreen('codeVerification');
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
  const handleAdminAddAttendee = (name: string): Attendee | undefined => {
    const result = addAttendee(name);
    return result.attendee;
  };

  const handleAdminSendNotification = (title: string, message: string) => {
    addNotification(title, message);
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    addFeedback(rating, comment);
    setCurrentScreen('program');
  };

  return {
    currentUser,
    isAdmin,
    currentScreen,
    attendees,
    schedule,
    feedback,
    resources,
    isReturningUser,
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
  };
};
