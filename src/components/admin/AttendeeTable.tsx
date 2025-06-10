
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AttendeeTableRow from './AttendeeTableRow';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface AttendeeTableProps {
  attendees: Attendee[];
  onRemoveAttendee: (id: string) => void;
  onRegenerateCode: (id: string) => void;
}

const AttendeeTable: React.FC<AttendeeTableProps> = ({ 
  attendees, 
  onRemoveAttendee, 
  onRegenerateCode 
}) => {
  return (
    <Card className="elegant-card">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center">
          <Users className="w-5 h-5 mr-2 text-elegant-primary" />
          Attendee Management
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Manage registered attendees and their access codes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {attendees.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-elegant-primary/50 mx-auto mb-4" />
            <p className="text-muted-foreground">No attendees registered yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-elegant-primary/20">
                <TableHead className="text-elegant-primary">Name</TableHead>
                <TableHead className="text-elegant-primary">Registration Time</TableHead>
                <TableHead className="text-elegant-primary">Access Code</TableHead>
                <TableHead className="text-elegant-primary">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendees.map((attendee) => (
                <AttendeeTableRow
                  key={attendee.id}
                  attendee={attendee}
                  onRemoveAttendee={onRemoveAttendee}
                  onRegenerateCode={onRegenerateCode}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AttendeeTable;
