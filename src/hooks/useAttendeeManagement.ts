import { useState, useEffect } from 'react';
import type { Attendee } from '../types';
import { generateAccessCode } from '../utils/codeGenerator';

export const useAttendeeManagement = () => {
  const [attendees, setAttendees] = useState<Attendee[]>(() => {
    try {
      const storedAttendees = window.localStorage.getItem('attendees');
      if (storedAttendees) {
        // Need to parse date strings back into Date objects and add new fields for old data
        return JSON.parse(storedAttendees).map((attendee: any) => ({
          ...attendee,
          registeredAt: new Date(attendee.registeredAt),
          checkedIn: attendee.checkedIn || false,
          checkedInAt: attendee.checkedInAt ? new Date(attendee.checkedInAt) : null,
        }));
      }
      return [];
    } catch (error) {
      console.error("Failed to read attendees from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('attendees', JSON.stringify(attendees));
    } catch (error) {
      console.error("Failed to write attendees to localStorage", error);
    }
  }, [attendees]);

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
      checkedIn: false,
      checkedInAt: null,
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

  const handleCheckIn = (id: string) => {
    setAttendees(currentAttendees => currentAttendees.map(attendee => 
      attendee.id === id && !attendee.checkedIn
        ? { ...attendee, checkedIn: true, checkedInAt: new Date() }
        : attendee
    ));
  };

  const handleUndoCheckIn = (id: string) => {
    setAttendees(currentAttendees => currentAttendees.map(attendee =>
      attendee.id === id && attendee.checkedIn
        ? { ...attendee, checkedIn: false, checkedInAt: null }
        : attendee
    ));
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
    handleCheckIn,
    handleUndoCheckIn,
  };
};
