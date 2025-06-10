
import React from 'react';
import { Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface AdminAttendeesListProps {
  attendees: Attendee[];
}

const AdminAttendeesList: React.FC<AdminAttendeesListProps> = ({ attendees }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-elegant-primary" />
            Registered Attendees
          </CardTitle>
          <CardDescription>
            {attendees.length} people registered for the workshop
          </CardDescription>
        </CardHeader>
        <CardContent>
          {attendees.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">No attendees registered yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-elegant-primary">Name</TableHead>
                  <TableHead className="text-elegant-primary">Registration Time</TableHead>
                  <TableHead className="text-elegant-primary">Access Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.map((attendee) => (
                  <TableRow key={attendee.id}>
                    <TableCell className="text-foreground font-medium">{attendee.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {attendee.registeredAt.toLocaleDateString()} {attendee.registeredAt.toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="text-elegant-accent font-mono">
                      {attendee.id.slice(-6).toUpperCase()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAttendeesList;
