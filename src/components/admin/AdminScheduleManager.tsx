
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Save, X, Clock, User } from 'lucide-react';

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  speaker?: string;
}

interface AdminScheduleManagerProps {
  schedule: ScheduleItem[];
  onScheduleUpdate: (newSchedule: ScheduleItem[]) => void;
}

const AdminScheduleManager: React.FC<AdminScheduleManagerProps> = ({ schedule, onScheduleUpdate }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<ScheduleItem>({ time: '', title: '', description: '', speaker: '' });

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setFormData(schedule[index]);
  };

  const handleSave = () => {
    if (!formData.time || !formData.title || !formData.description) return;

    const newSchedule = [...schedule];
    if (editingIndex !== null) {
      newSchedule[editingIndex] = formData;
    } else if (isAdding) {
      newSchedule.push(formData);
    }
    
    // Sort by time
    newSchedule.sort((a, b) => {
      const timeA = new Date(`1970/01/01 ${a.time}`);
      const timeB = new Date(`1970/01/01 ${b.time}`);
      return timeA.getTime() - timeB.getTime();
    });

    onScheduleUpdate(newSchedule);
    setEditingIndex(null);
    setIsAdding(false);
    setFormData({ time: '', title: '', description: '', speaker: '' });
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setIsAdding(false);
    setFormData({ time: '', title: '', description: '', speaker: '' });
  };

  const handleDelete = (index: number) => {
    const newSchedule = schedule.filter((_, i) => i !== index);
    onScheduleUpdate(newSchedule);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({ time: '', title: '', description: '', speaker: '' });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-blue-900/30 border-blue-700/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-300" />
              Workshop Schedule Manager
            </div>
            <Button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={isAdding || editingIndex !== null}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Session
            </Button>
          </CardTitle>
          <CardDescription className="text-blue-200">
            Manage the workshop schedule and sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add New Session Form */}
            {isAdding && (
              <div className="bg-white/5 rounded-lg p-4 border border-green-300/20">
                <h3 className="text-white font-semibold mb-4">Add New Session</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="time" className="text-blue-200">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title" className="text-blue-200">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Session title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="speaker" className="text-blue-200">Speaker (Optional)</Label>
                    <Input
                      id="speaker"
                      value={formData.speaker || ''}
                      onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Speaker name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-blue-200">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Session description"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Schedule Items */}
            {schedule.map((item, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                {editingIndex === index ? (
                  <div>
                    <h3 className="text-white font-semibold mb-4">Edit Session</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`edit-time-${index}`} className="text-blue-200">Time</Label>
                        <Input
                          id={`edit-time-${index}`}
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`edit-title-${index}`} className="text-blue-200">Title</Label>
                        <Input
                          id={`edit-title-${index}`}
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`edit-speaker-${index}`} className="text-blue-200">Speaker (Optional)</Label>
                        <Input
                          id={`edit-speaker-${index}`}
                          value={formData.speaker || ''}
                          onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`edit-description-${index}`} className="text-blue-200">Description</Label>
                        <Input
                          id={`edit-description-${index}`}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancel} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-blue-300 font-mono text-sm bg-blue-600/20 px-2 py-1 rounded">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-blue-200 text-sm">{item.description}</p>
                        {item.speaker && (
                          <div className="flex items-center mt-1">
                            <User className="w-3 h-3 text-blue-300 mr-1" />
                            <span className="text-blue-300 text-xs">{item.speaker}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(index)}
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={editingIndex !== null || isAdding}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(index)}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={editingIndex !== null || isAdding}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {schedule.length === 0 && !isAdding && (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-blue-300/50 mx-auto mb-4" />
                <p className="text-blue-200">No sessions scheduled yet</p>
                <p className="text-blue-300/70 text-sm">Click "Add Session" to create your first session</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminScheduleManager;
