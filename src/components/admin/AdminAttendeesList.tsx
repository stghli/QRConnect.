
import React, { useState } from 'react';
import { Users, Search, MoreHorizontal, Trash2, KeyRound, UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface AdminAttendeesListProps {
  attendees: Attendee[];
  onAddAttendee: (name: string) => Attendee | undefined;
  onRemoveAttendee: (id: string) => void;
  onRegenerateCode: (id: string) => string;
}

const AdminAttendeesList: React.FC<AdminAttendeesListProps> = ({ attendees, onAddAttendee, onRemoveAttendee, onRegenerateCode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newAttendeeName, setNewAttendeeName] = useState('');

  const handleAddAttendee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAttendeeName.trim()) {
      toast.error('Attendee name cannot be empty.');
      return;
    }
    const result = onAddAttendee(newAttendeeName.trim());
    if (result) {
      toast.success(`Attendee "${result.name}" added successfully.`);
      setNewAttendeeName('');
    } else {
      toast.error(`An attendee with the name "${newAttendeeName.trim()}" already exists.`);
    }
  };

  const handleRemove = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name}? This action cannot be undone.`)) {
      onRemoveAttendee(id);
      toast.success(`Attendee "${name}" has been removed.`);
    }
  };

  const handleRegenerate = (id: string, name: string) => {
    const newCode = onRegenerateCode(id);
    toast.success(`New access code generated for ${name}: ${newCode}`);
  };

  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><UserPlus className="mr-2 h-5 w-5 text-elegant-primary" />Add New Attendee</CardTitle>
          <CardDescription>Manually add a new attendee to the event.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddAttendee} className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="Enter full name"
              value={newAttendeeName}
              onChange={(e) => setNewAttendeeName(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" className="w-full sm:w-auto">Add Attendee</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-elegant-primary" />
                Registered Attendees
              </CardTitle>
              <CardDescription>
                Showing {filteredAttendees.length} of {attendees.length} attendees.
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-auto sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAttendees.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">{searchTerm ? 'No attendees match your search.' : 'No attendees registered yet'}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-elegant-primary">Name</TableHead>
                  <TableHead className="text-elegant-primary">Registration Time</TableHead>
                  <TableHead className="text-elegant-primary">Access Code</TableHead>
                  <TableHead className="text-elegant-primary text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendees.map((attendee) => (
                  <TableRow key={attendee.id}>
                    <TableCell className="text-foreground font-medium">{attendee.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {attendee.registeredAt.toLocaleDateString()} {attendee.registeredAt.toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="text-elegant-accent font-mono">
                      {attendee.accessCode}
                    </TableCell>
                    <TableCell className="text-right">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRegenerate(attendee.id, attendee.name)}>
                            <KeyRound className="mr-2 h-4 w-4" />
                            <span>Regenerate Code</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleRemove(attendee.id, attendee.name)} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                             <Trash2 className="mr-2 h-4 w-4" />
                            <span>Remove</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
