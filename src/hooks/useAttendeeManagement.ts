
import { useState } from 'react';
import type { Attendee } from '../types';
import { generateAccessCode } from '../utils/codeGenerator';

export const useAttendeeManagement = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const addAttendee = (name: string): { success: boolean; attendee?: Attendee; existingUser?: Attendee } => {
    // Check if user already exists
    const existingUser = attendees.find(attendee => 
      attendee.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    
    if (existingUser) {
      return { success: false, existingUser };
    }

    const accessCode = generateAccessCode();
    const newAttendee: Attendee = {
      id: Date.now().toString(),
      name,
      registeredAt: new Date(),
      accessCode,
    };
    setAttendees([...attendees, newAttendee]);
    
    // Show the access code to the user
    alert(`Welcome ${name}! Your access code is: ${accessCode}. Please save this code for future access.`);
    return { success: true, attendee: newAttendee };
  };

  const checkExistingUser = (name: string): Attendee | undefined => {
    return attendees.find(attendee => 
      attendee.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
  };

  const verifyAccessCode = (code: string): Attendee | undefined => {
    return attendees.find(attendee => attendee.accessCode === code);
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
    return newCode;
  };

  const getCurrentUser = (currentUserName: string): Attendee | undefined => {
    return attendees.find(attendee => attendee.name === currentUserName);
  };

  return {
    attendees,
    addAttendee,
    checkExistingUser,
    verifyAccessCode,
    handleRemoveAttendee,
    handleRegenerateCode,
    getCurrentUser,
  };
};
