import { type } from "os";

export interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
  checkedIn: boolean;
  checkedInAt: Date | null;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

export interface Feedback {
  id: string;
  rating: number;
  comment: string;
  submittedAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  sentAt: Date;
}

export type ScreenType = 'qr' | 'welcome' | 'registration' | 'program' | 'resources' | 'adminLogin' | 'adminDashboard' | 'codeVerification' | 'checkedIn' | 'feedback';
