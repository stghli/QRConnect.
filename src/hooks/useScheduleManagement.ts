
import { useState } from 'react';
import type { ScheduleItem } from '../types';

const defaultSchedule: ScheduleItem[] = [
  {
    time: '9:00 AM',
    title: 'Introduction & Welcome',
    description: 'Overview of the workshop and introductions',
    speaker: 'Dr. Sarah Johnson'
  },
  {
    time: '10:30 AM',
    title: 'Threat Landscape',
    description: 'Current cyber threats and attack vectors',
    speaker: 'Michael Chen'
  },
  {
    time: '12:00 PM',
    title: 'Lunch Break',
    description: 'Networking with peers and speakers'
  },
  {
    time: '1:30 PM',
    title: 'Hands-on Lab',
    description: 'Practical cybersecurity exercises',
    speaker: 'Alex Rodriguez'
  },
  {
    time: '3:30 PM',
    title: 'Panel Discussion',
    description: 'Q&A with industry experts',
    speaker: 'Panel of Experts'
  },
  {
    time: '4:30 PM',
    title: 'Closing Remarks',
    description: 'Workshop summary and next steps',
    speaker: 'Dr. Sarah Johnson'
  }
];

export const useScheduleManagement = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(defaultSchedule);

  const handleScheduleUpdate = (newSchedule: ScheduleItem[]) => {
    setSchedule(newSchedule);
  };

  return {
    schedule,
    handleScheduleUpdate,
  };
};
