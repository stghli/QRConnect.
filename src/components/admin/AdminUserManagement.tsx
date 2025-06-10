
import React, { useState } from 'react';
import { Users, UserPlus, UserCheck, Trash2, Copy, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  const [newAttendeeName, setNewAttendeeName] = useState('');
  const [error, setError] = useState('');
  const [visibleCodes, setVisibleCodes] = useState<Set<string>>(new Set());
  const [copiedCode, setCopiedCode] = useState<string>('');

  const handleAddAttendee = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAttendeeName.trim()) {
      setError('Please enter a name');
      return;
    }
    
    // Check for duplicate names
    const existingUser = attendees.find(attendee => 
      attendee.name.toLowerCase().trim() === newAttendeeName.toLowerCase().trim()
    );
    
    if (existingUser) {
      setError('This name is already registered');
      return;
    }
    
    onAddAttendee(newAttendeeName.trim());
    setNewAttendeeName('');
    setError('');
  };

  const toggleCodeVisibility = (attendeeId: string) => {
    const newVisibleCodes = new Set(visibleCodes);
    if (newVisibleCodes.has(attendeeId)) {
      newVisibleCodes.delete(attendeeId);
    } else {
      newVisibleCodes.add(attendeeId);
    }
    setVisibleCodes(newVisibleCodes);
  };

  const copyToClipboard = async (code: string, attendeeId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(attendeeId);
      setTimeout(() => setCopiedCode(''), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Attendee */}
      <Card className="elegant-card">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <UserPlus className="w-5 h-5 mr-2 text-elegant-primary" />
            Add New Attendee
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Manually register a new workshop attendee
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddAttendee} className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter attendee name"
                value={newAttendeeName}
                onChange={(e) => {
                  setNewAttendeeName(e.target.value);
                  if (error) setError('');
                }}
                className="bg-elegant-surface-light/50 border-elegant-primary/30 text-foreground placeholder:text-muted-foreground"
              />
              {error && <p className="text-destructive text-sm mt-1">{error}</p>}
            </div>
            <Button 
              type="submit"
              className="elegant-button text-white border-0"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Attendee
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Attendees Management */}
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
                  <TableRow key={attendee.id} className="border-elegant-primary/20">
                    <TableCell className="text-foreground font-medium">{attendee.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {attendee.registeredAt.toLocaleDateString()} {attendee.registeredAt.toLocaleTimeString()}
                    </TableCell>
                    <TableCell className="text-elegant-accent font-mono">
                      <div className="flex items-center space-x-2">
                        <span>
                          {visibleCodes.has(attendee.id) ? attendee.accessCode : '••••••'}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => toggleCodeVisibility(attendee.id)}
                          className="bg-elegant-primary/20 hover:bg-elegant-primary/30 text-elegant-primary p-1 h-6 w-6"
                        >
                          {visibleCodes.has(attendee.id) ? 
                            <EyeOff className="w-3 h-3" /> : 
                            <Eye className="w-3 h-3" />
                          }
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => copyToClipboard(attendee.accessCode, attendee.id)}
                          className="bg-elegant-accent/20 hover:bg-elegant-accent/30 text-elegant-accent p-1 h-6 w-6"
                        >
                          {copiedCode === attendee.id ? 
                            <UserCheck className="w-3 h-3" /> : 
                            <Copy className="w-3 h-3" />
                          }
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => onRegenerateCode(attendee.id)}
                          className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400"
                        >
                          Regenerate Code
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => onRemoveAttendee(attendee.id)}
                          className="bg-destructive/20 hover:bg-destructive/30 text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
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

export default AdminUserManagement;
