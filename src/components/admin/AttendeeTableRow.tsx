
import React, { useState } from 'react';
import { UserCheck, Trash2, Copy, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface AttendeeTableRowProps {
  attendee: Attendee;
  onRemoveAttendee: (id: string) => void;
  onRegenerateCode: (id: string) => void;
}

const AttendeeTableRow: React.FC<AttendeeTableRowProps> = ({ 
  attendee, 
  onRemoveAttendee, 
  onRegenerateCode 
}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const toggleCodeVisibility = () => {
    setIsCodeVisible(!isCodeVisible);
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <TableRow className="border-elegant-primary/20">
      <TableCell className="text-foreground font-medium">{attendee.name}</TableCell>
      <TableCell className="text-muted-foreground">
        {attendee.registeredAt.toLocaleDateString()} {attendee.registeredAt.toLocaleTimeString()}
      </TableCell>
      <TableCell className="text-elegant-accent font-mono">
        <div className="flex items-center space-x-2">
          <span>
            {isCodeVisible ? attendee.accessCode : '••••••'}
          </span>
          <Button
            size="sm"
            onClick={toggleCodeVisibility}
            className="bg-elegant-primary/20 hover:bg-elegant-primary/30 text-elegant-primary p-1 h-6 w-6"
          >
            {isCodeVisible ? 
              <EyeOff className="w-3 h-3" /> : 
              <Eye className="w-3 h-3" />
            }
          </Button>
          <Button
            size="sm"
            onClick={() => copyToClipboard(attendee.accessCode)}
            className="bg-elegant-accent/20 hover:bg-elegant-accent/30 text-elegant-accent p-1 h-6 w-6"
          >
            {isCopied ? 
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
  );
};

export default AttendeeTableRow;
