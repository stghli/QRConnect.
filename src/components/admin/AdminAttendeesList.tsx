
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
      <Card className="bg-blue-900/30 border-blue-700/40">
        <CardHeader>
          <CardTitle className="text-white">Registered Attendees</CardTitle>
          <CardDescription className="text-blue-200">
            {attendees.length} people registered for the workshop
          </CardDescription>
        </CardHeader>
        <CardContent>
          {attendees.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-blue-300/50 mx-auto mb-4" />
              <p className="text-blue-200">No attendees registered yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-blue-700/40">
                  <TableHead className="text-blue-300">Name</TableHead>
                  <TableHead className="text-blue-300">Registration Time</TableHead>
                  <TableHead className="text-blue-300">Access Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.map((attendee) => (
                  <TableRow key={attendee.id} className="border-blue-700/40">
                    <TableCell className="text-white font-medium">{attendee.name}</TableCell>
                    <TableCell className="text-blue-200">
                      {attendee.registeredAt.toLocaleDateString()} {attendee.registeredAt.toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="text-blue-300 font-mono">
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
