
import React, { useState } from 'react';
import { Shield, Calendar, Clock, Users, FileText, Edit, Save, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ScheduleItem {
  time: string;
  title: string;
  description: string;
}

interface EditableProgramOutlineProps {
  userName: string;
  schedule: ScheduleItem[];
  onScheduleUpdate: (schedule: ScheduleItem[]) => void;
  onViewResources: () => void;
}

const EditableProgramOutline: React.FC<EditableProgramOutlineProps> = ({ 
  userName, 
  schedule, 
  onScheduleUpdate, 
  onViewResources 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableSchedule, setEditableSchedule] = useState<ScheduleItem[]>(schedule);

  const handleSave = () => {
    onScheduleUpdate(editableSchedule);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditableSchedule(schedule);
    setIsEditing(false);
  };

  const addNewItem = () => {
    const newItem: ScheduleItem = {
      time: '12:00 PM',
      title: 'New Session',
      description: 'Description for new session'
    };
    setEditableSchedule([...editableSchedule, newItem]);
  };

  const removeItem = (index: number) => {
    setEditableSchedule(editableSchedule.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof ScheduleItem, value: string) => {
    const updated = [...editableSchedule];
    updated[index] = { ...updated[index], [field]: value };
    setEditableSchedule(updated);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl backdrop-blur-lg bg-white/10 rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold text-white">Workshop Program</h1>
          </div>
          
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Program
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <p className="text-white text-lg">
            Welcome, <span className="font-semibold">{userName}</span>!
          </p>
          <p className="text-blue-200 mt-2">
            Thank you for registering for our CyberSec 2025 Workshop. Below is the program for the day.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="text-purple-400" />
            <h2 className="text-xl font-semibold text-white">June 15, 2025</h2>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="text-purple-400" />
            <h2 className="text-xl font-semibold text-white">9:00 AM - 5:00 PM</h2>
          </div>
          
          <div className="flex items-center space-x-2 mb-4">
            <Users className="text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Limited to 50 Participants</h2>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Schedule</h2>
            {isEditing && (
              <Button
                onClick={addNewItem}
                className="bg-purple-600 hover:bg-purple-700 text-white"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Session
              </Button>
            )}
          </div>
          
          {editableSchedule.map((item, index) => (
            <Card key={index} className="bg-blue-900/30 border-blue-700/40">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  {isEditing ? (
                    <div className="flex-1 flex space-x-4">
                      <Input
                        value={item.title}
                        onChange={(e) => updateItem(index, 'title', e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="Session title"
                      />
                      <Input
                        value={item.time}
                        onChange={(e) => updateItem(index, 'time', e.target.value)}
                        className="bg-white/10 border-white/20 text-white w-32"
                        placeholder="Time"
                      />
                      <Button
                        onClick={() => removeItem(index)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                        size="sm"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <CardTitle className="text-white">{item.title}</CardTitle>
                      <span className="text-blue-300 font-medium">{item.time}</span>
                    </>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Session description"
                  />
                ) : (
                  <CardDescription className="text-blue-200">{item.description}</CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={onViewResources}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            Access Workshop Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditableProgramOutline;
