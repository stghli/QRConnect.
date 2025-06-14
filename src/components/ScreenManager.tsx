
import React from 'react';
import WelcomeScreen from './WelcomeScreen';
import RegistrationScreen from './RegistrationScreen';
import ProgramOutlineScreen from './ProgramOutlineScreen';
import EditableProgramOutline from './EditableProgramOutline';
import ResourcesScreen from './ResourcesScreen';
import AdminLoginScreen from './AdminLoginScreen';
import AdminDashboard from './AdminDashboard';
import CodeVerificationScreen from './CodeVerificationScreen';
import CheckedInScreen from './CheckedInScreen';
import FeedbackScreen from './FeedbackScreen';
import PostEventLandingPage from './PostEventLandingPage';
import type { ScreenType, Attendee, ScheduleItem, Feedback } from '../types';
import type { Resource, Resources, ResourceType } from '../hooks/useResourceManagement';
import type { AnalyticsData } from '../hooks/useAnalytics';
import type { AppSettings } from '../hooks/useAppSettings';

interface ScreenManagerProps {
  currentScreen: ScreenType;
  attendees: Attendee[];
  schedule: ScheduleItem[];
  feedback: Feedback[];
  currentUser: string;
  isAdmin: boolean;
  resources: Resources;
  onAdminLogin: (username: string, password: string) => boolean;
  setCurrentScreen: (screen: ScreenType) => void;
  onGoToCodeVerification: () => void;
  onRegister: (name: string) => { success: boolean; attendee?: Attendee; existingUser?: Attendee };
  onExistingUserFound: () => void;
  onVerifyCode: (code: string) => boolean;
  getCurrentUser: (name: string) => Attendee | undefined;
  onScheduleUpdate: (newSchedule: ScheduleItem[]) => void;
  onAdminAddAttendee: (name: string) => Attendee | undefined;
  onRemoveAttendee: (id: string) => void;
  onRegenerateCode: (id: string) => string;
  onAdminSendNotification: (title: string, message: string) => void;
  onFeedbackSubmit: (rating: number, comment: string) => void;
  onAddResource: (resourceType: ResourceType, resource: Resource) => void;
  onUpdateResource: (resourceType: ResourceType, index: number, resource: Resource) => void;
  onDeleteResource: (resourceType: ResourceType, index: number) => void;
  analytics: AnalyticsData;
  trackDownload: (filename: string) => void;
  trackView: (filename: string) => void;
  onCheckIn: (id: string) => void;
  onUndoCheckIn: (id: string) => void;
  onBulkCheckIn: (ids: string[]) => void;
  settings: AppSettings;
  setEventStatus: (isActive: boolean) => void;
}

const ScreenManager: React.FC<ScreenManagerProps> = ({
  currentScreen,
  attendees,
  schedule,
  feedback,
  currentUser,
  isAdmin,
  resources,
  settings,
  onAdminLogin,
  setCurrentScreen,
  onGoToCodeVerification,
  onRegister,
  onExistingUserFound,
  onVerifyCode,
  getCurrentUser,
  onScheduleUpdate,
  onAdminAddAttendee,
  onRemoveAttendee,
  onRegenerateCode,
  onAdminSendNotification,
  onFeedbackSubmit,
  onAddResource,
  onUpdateResource,
  onDeleteResource,
  analytics,
  trackDownload,
  trackView,
  onCheckIn,
  onUndoCheckIn,
  onBulkCheckIn,
  setEventStatus,
}) => {
  // Show post-event landing page when event is inactive (unless admin is logged in)
  if (!settings.isEventActive && !isAdmin) {
    return <PostEventLandingPage />;
  }

  switch (currentScreen) {
    case 'qr':
      // Redirect QR screen to welcome screen since landing page is removed
      return <WelcomeScreen onGetStarted={() => setCurrentScreen('registration')} />;
    case 'adminLogin':
      return (
        <AdminLoginScreen
          onLogin={onAdminLogin}
          onBack={() => setCurrentScreen('welcome')}
        />
      );
    case 'adminDashboard':
      return (
        <AdminDashboard
          attendees={attendees}
          schedule={schedule}
          feedback={feedback}
          onScheduleUpdate={onScheduleUpdate}
          onBack={() => setCurrentScreen('welcome')}
          onAddAttendee={onAdminAddAttendee}
          onRemoveAttendee={onRemoveAttendee}
          onRegenerateCode={onRegenerateCode}
          onSendNotification={onAdminSendNotification}
          resources={resources}
          onAddResource={onAddResource}
          onUpdateResource={onUpdateResource}
          onDeleteResource={onDeleteResource}
          analytics={analytics}
          onCheckIn={onCheckIn}
          onUndoCheckIn={onUndoCheckIn}
          onBulkCheckIn={onBulkCheckIn}
        />
      );
    case 'welcome':
      return <WelcomeScreen onGetStarted={() => setCurrentScreen('registration')} />;
    case 'registration':
      return (
        <RegistrationScreen
          onRegister={onRegister}
          onExistingUserFound={onExistingUserFound}
        />
      );
    case 'codeVerification':
      return (
        <CodeVerificationScreen
          onVerify={onVerifyCode}
          onBack={() => setCurrentScreen('welcome')}
        />
      );
    case 'checkedIn':
      return (
        <CheckedInScreen
          userName={currentUser}
          accessCode={getCurrentUser(currentUser)?.accessCode || ''}
          onViewProgram={() => setCurrentScreen('program')}
          onViewResources={() => setCurrentScreen('resources')}
        />
      );
    case 'feedback':
      return (
        <FeedbackScreen
          onSubmit={onFeedbackSubmit}
          onBack={() => setCurrentScreen('program')}
        />
      );
    case 'program':
      return isAdmin ? (
        <EditableProgramOutline
          userName={currentUser}
          schedule={schedule}
          onScheduleUpdate={onScheduleUpdate}
          onViewResources={() => setCurrentScreen('resources')}
        />
      ) : (
        <ProgramOutlineScreen
          userName={currentUser}
          onViewResources={() => setCurrentScreen('resources')}
        />
      );
    case 'resources':
      return (
        <ResourcesScreen
          userName={currentUser}
          onBack={() => setCurrentScreen('program')}
          resources={resources}
          trackDownload={trackDownload}
          trackView={trackView}
        />
      );
    default:
      // Default to welcome screen instead of QR screen
      return <WelcomeScreen onGetStarted={() => setCurrentScreen('registration')} />;
  }
};

export default ScreenManager;
