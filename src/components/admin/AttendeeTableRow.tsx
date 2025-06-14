
import React, { useState } from 'react';
import { UserCheck, Trash2, Copy, Eye, EyeOff, RefreshCw } from 'lucide-react';
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
  onRegenerateCode: (id: string) => string;
}

const AttendeeTableRow: React.FC<AttendeeTableRowProps> = ({ 
  attendee, 
  onRemoveAttendee, 
  onRegenerateCode 
}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentCode, setCurrentCode] = useState(attendee.accessCode);

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

  const handleRegenerateCode = () => {
    setIsRegenerating(true);
    const newCode = onRegenerateCode(attendee.id);
    setCurrentCode(newCode);
    
    // Show the new code to admin
    alert(`New access code for ${attendee.name}: ${newCode}`);
    
    setTimeout(() => setIsRegenerating(false), 1000);
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
            {isCodeVisible ? currentCode : '••••••'}
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
            onClick={() => copyToClipboard(currentCode)}
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
            onClick={handleRegenerateCode}
            disabled={isRegenerating}
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/20"
          >
            <RefreshCw className={`w-3 h-3 mr-1 ${isRegenerating ? 'animate-spin' : ''}`} />
            {isRegenerating ? 'Resetting...' : 'Reset Code'}
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
