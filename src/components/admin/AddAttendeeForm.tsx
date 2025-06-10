
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface AddAttendeeFormProps {
  attendees: Attendee[];
  onAddAttendee: (name: string) => void;
}

const AddAttendeeForm: React.FC<AddAttendeeFormProps> = ({ attendees, onAddAttendee }) => {
  const [newAttendeeName, setNewAttendeeName] = useState('');
  const [error, setError] = useState('');

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

  return (
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
  );
};

export default AddAttendeeForm;
