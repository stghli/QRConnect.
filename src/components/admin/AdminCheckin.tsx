
import React, { useState, useMemo } from 'react';
import { Check, Search, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Attendee } from '../../types';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

interface AdminCheckinProps {
  attendees: Attendee[];
  onCheckIn: (id: string) => void;
  onUndoCheckIn: (id: string) => void;
  onBulkCheckIn: (ids: string[]) => void;
}

const AdminCheckin: React.FC<AdminCheckinProps> = ({ attendees, onCheckIn, onUndoCheckIn, onBulkCheckIn }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCheckIn = (id: string, name: string) => {
    onCheckIn(id);
    toast.success(`${name} checked in successfully.`);
  };

  const handleUndoCheckIn = (id: string, name: string) => {
    onUndoCheckIn(id);
    toast.info(`Check-in for ${name} has been undone.`);
  };

  const filteredAttendees = useMemo(() => attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name)), [attendees, searchTerm]);
  
  const checkedInCount = attendees.filter(a => a.checkedIn).length;

  const handleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };
  
  const handleSelectAll = () => {
    if (selectedIds.length === filteredAttendees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAttendees.map(a => a.id));
    }
  };
  
  const handleBulkCheckInClick = () => {
    const idsToCheckIn = selectedIds.filter(id => {
      const attendee = attendees.find(a => a.id === id);
      return attendee && !attendee.checkedIn;
    });

    if (idsToCheckIn.length > 0) {
      onBulkCheckIn(idsToCheckIn);
      toast.success(`Checked in ${idsToCheckIn.length} attendees.`);
    } else {
      toast.info("Selected attendees are already checked in or selection is empty.");
    }
    setSelectedIds([]);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-elegant-primary" />
              Attendee Check-in
            </CardTitle>
            <CardDescription>
              {checkedInCount} of {attendees.length} attendees checked in.
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
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-4 p-4 bg-elegant-surface-light/50 rounded-lg mb-4 border border-elegant-primary/20">
            <p className="text-sm font-medium text-elegant-primary flex-grow">
              {selectedIds.length} attendee(s) selected.
            </p>
            <Button onClick={handleBulkCheckInClick} size="sm">
              <Check className="mr-2 h-4 w-4" />
              Check In Selected
            </Button>
          </div>
        )}
        {filteredAttendees.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground">{searchTerm ? 'No attendees match your search.' : 'No attendees registered yet'}</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        filteredAttendees.length > 0 && selectedIds.length === filteredAttendees.length
                          ? true
                          : selectedIds.length > 0
                          ? 'indeterminate'
                          : false
                      }
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="text-elegant-primary">Name</TableHead>
                  <TableHead className="text-elegant-primary">Status</TableHead>
                  <TableHead className="text-elegant-primary">Check-in Time</TableHead>
                  <TableHead className="text-elegant-primary text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendees.map((attendee) => (
                  <TableRow key={attendee.id} data-state={selectedIds.includes(attendee.id) ? "selected" : undefined}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(attendee.id)}
                        onCheckedChange={() => handleSelect(attendee.id)}
                        aria-label={`Select ${attendee.name}`}
                      />
                    </TableCell>
                    <TableCell className="text-foreground font-medium">{attendee.name}</TableCell>
                    <TableCell>
                      {attendee.checkedIn ? (
                        <Badge variant="default">Checked In</Badge>
                      ) : (
                        <Badge variant="secondary">Not Here</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {attendee.checkedInAt ? attendee.checkedInAt.toLocaleTimeString() : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      {attendee.checkedIn ? (
                        <Button variant="outline" size="sm" onClick={() => handleUndoCheckIn(attendee.id, attendee.name)}>
                          Undo Check-in
                        </Button>
                      ) : (
                        <Button variant="default" size="sm" onClick={() => handleCheckIn(attendee.id, attendee.name)}>
                          <Check className="mr-2 h-4 w-4" />
                          Check In
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminCheckin;
