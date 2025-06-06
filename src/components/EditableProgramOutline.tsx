
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
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl backdrop-blur-lg bg-white/10 rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-300" />
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Workshop Program</h1>
          </div>
          
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
              size="sm"
            >
              <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
                size="sm"
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Save
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm"
                size="sm"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <p className="text-white text-sm sm:text-base lg:text-lg">
            Welcome, <span className="font-semibold">{userName}</span>!
          </p>
          <p className="text-blue-200 mt-1 text-xs sm:text-sm">
            Admin view - You can edit the program schedule below.
          </p>
        </div>
        
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="text-purple-400 w-4 h-4" />
              <span className="text-white font-semibold">June 15, 2025</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="text-purple-400 w-4 h-4" />
              <span className="text-white font-semibold">9:00 AM - 5:00 PM</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="text-purple-400 w-4 h-4" />
              <span className="text-white font-semibold">50 Participants</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Schedule</h2>
            {isEditing && (
              <Button
                onClick={addNewItem}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm"
                size="sm"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Add
              </Button>
            )}
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-2">
            {editableSchedule.map((item, index) => (
              <Card key={index} className="bg-blue-900/30 border-blue-700/40">
                <CardHeader className="pb-1 pt-3 px-3">
                  <div className="flex justify-between items-center">
                    {isEditing ? (
                      <div className="flex-1 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Input
                          value={item.title}
                          onChange={(e) => updateItem(index, 'title', e.target.value)}
                          className="bg-white/10 border-white/20 text-white text-xs sm:text-sm"
                          placeholder="Session title"
                        />
                        <div className="flex space-x-2">
                          <Input
                            value={item.time}
                            onChange={(e) => updateItem(index, 'time', e.target.value)}
                            className="bg-white/10 border-white/20 text-white text-xs sm:text-sm w-24 sm:w-32"
                            placeholder="Time"
                          />
                          <Button
                            onClick={() => removeItem(index)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                            size="sm"
                          >
                            <X className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <CardTitle className="text-white text-sm sm:text-base">{item.title}</CardTitle>
                        <span className="text-blue-300 font-medium text-xs sm:text-sm">{item.time}</span>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-3 pb-3">
                  {isEditing ? (
                    <Input
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      className="bg-white/10 border-white/20 text-white text-xs sm:text-sm"
                      placeholder="Session description"
                    />
                  ) : (
                    <CardDescription className="text-blue-200 text-xs sm:text-sm">{item.description}</CardDescription>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={onViewResources}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-xs sm:text-sm"
          >
            <FileText className="mr-2 h-4 w-4" />
            Access Workshop Resources
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditableProgramOutline;
