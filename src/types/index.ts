
export interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  sentAt: Date;
}

export type ScreenType = 'qr' | 'welcome' | 'registration' | 'program' | 'resources' | 'adminLogin' | 'adminDashboard' | 'codeVerification' | 'checkedIn';
