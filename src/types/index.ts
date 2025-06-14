
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

export type ScreenType = 'qr' | 'welcome' | 'registration' | 'program' | 'resources' | 'adminLogin' | 'adminDashboard' | 'codeVerification' | 'checkedIn';
