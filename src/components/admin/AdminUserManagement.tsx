
import React from 'react';
import AddAttendeeForm from './AddAttendeeForm';
import AttendeeTable from './AttendeeTable';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface AdminUserManagementProps {
  attendees: Attendee[];
  onAddAttendee: (name: string) => void;
  onRemoveAttendee: (id: string) => void;
  onRegenerateCode: (id: string) => void;
}

const AdminUserManagement: React.FC<AdminUserManagementProps> = ({ 
  attendees, 
  onAddAttendee, 
  onRemoveAttendee, 
  onRegenerateCode 
}) => {
  return (
    <div className="space-y-6">
      <AddAttendeeForm 
        attendees={attendees} 
        onAddAttendee={onAddAttendee} 
      />
      <AttendeeTable 
        attendees={attendees} 
        onRemoveAttendee={onRemoveAttendee} 
        onRegenerateCode={onRegenerateCode} 
      />
    </div>
  );
};

export default AdminUserManagement;
