
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings, Save, Users, Shield, Calendar, FileText } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    workshopTitle: 'Cybersecurity Workshop 2024',
    maxAttendees: 100,
    registrationOpen: true,
    requireAccessCode: true,
    allowLateRegistration: false,
    workshopDate: '2024-06-15',
    workshopLocation: 'Main Conference Hall',
    contactEmail: 'admin@workshop.com'
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Saving settings:', settings);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        workshopTitle: 'Cybersecurity Workshop 2024',
        maxAttendees: 100,
        registrationOpen: true,
        requireAccessCode: true,
        allowLateRegistration: false,
        workshopDate: '2024-06-15',
        workshopLocation: 'Main Conference Hall',
        contactEmail: 'admin@workshop.com'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card className="bg-blue-900/30 border-blue-700/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Settings className="w-5 h-5 mr-2 text-blue-300" />
            General Settings
          </CardTitle>
          <CardDescription className="text-blue-200">
            Basic workshop configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="workshopTitle" className="text-blue-200">Workshop Title</Label>
              <Input
                id="workshopTitle"
                value={settings.workshopTitle}
                onChange={(e) => setSettings({ ...settings, workshopTitle: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="maxAttendees" className="text-blue-200">Max Attendees</Label>
              <Input
                id="maxAttendees"
                type="number"
                value={settings.maxAttendees}
                onChange={(e) => setSettings({ ...settings, maxAttendees: parseInt(e.target.value) })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="workshopDate" className="text-blue-200">Workshop Date</Label>
              <Input
                id="workshopDate"
                type="date"
                value={settings.workshopDate}
                onChange={(e) => setSettings({ ...settings, workshopDate: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="contactEmail" className="text-blue-200">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="workshopLocation" className="text-blue-200">Workshop Location</Label>
            <Input
              id="workshopLocation"
              value={settings.workshopLocation}
              onChange={(e) => setSettings({ ...settings, workshopLocation: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* Registration Settings */}
      <Card className="bg-purple-900/30 border-purple-700/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-300" />
            Registration Settings
          </CardTitle>
          <CardDescription className="text-purple-200">
            Control how users can register for the workshop
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Registration Open</h3>
                <p className="text-purple-200 text-sm">Allow new attendees to register</p>
              </div>
              <Button
                onClick={() => setSettings({ ...settings, registrationOpen: !settings.registrationOpen })}
                className={`${settings.registrationOpen 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {settings.registrationOpen ? 'Open' : 'Closed'}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Require Access Code</h3>
                <p className="text-purple-200 text-sm">Generate access codes for returning users</p>
              </div>
              <Button
                onClick={() => setSettings({ ...settings, requireAccessCode: !settings.requireAccessCode })}
                className={`${settings.requireAccessCode 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {settings.requireAccessCode ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <h3 className="text-white font-medium">Allow Late Registration</h3>
                <p className="text-purple-200 text-sm">Permit registration after workshop starts</p>
              </div>
              <Button
                onClick={() => setSettings({ ...settings, allowLateRegistration: !settings.allowLateRegistration })}
                className={`${settings.allowLateRegistration 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {settings.allowLateRegistration ? 'Allowed' : 'Not Allowed'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Actions */}
      <Card className="bg-green-900/30 border-green-700/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-300" />
            System Actions
          </CardTitle>
          <CardDescription className="text-green-200">
            Save or reset system configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-red-300/20 text-red-300 hover:bg-red-600/20"
            >
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
