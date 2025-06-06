
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Send, Users, AlertCircle, CheckCircle } from 'lucide-react';

interface Attendee {
  id: string;
  name: string;
  registeredAt: Date;
  accessCode: string;
}

interface AdminNotificationsProps {
  attendees: Attendee[];
}

const AdminNotifications: React.FC<AdminNotificationsProps> = ({ attendees }) => {
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [sentNotifications, setSentNotifications] = useState<Array<{
    id: string;
    title: string;
    message: string;
    sentAt: Date;
    recipients: number;
  }>>([]);

  const handleSendNotification = () => {
    if (!title || !message) return;

    const notification = {
      id: Date.now().toString(),
      title,
      message,
      sentAt: new Date(),
      recipients: attendees.length
    };

    setSentNotifications([notification, ...sentNotifications]);
    setTitle('');
    setMessage('');

    // In a real app, this would send actual notifications
    console.log('Sending notification to', attendees.length, 'attendees:', { title, message });
  };

  const predefinedMessages = [
    {
      title: "Workshop Starting Soon",
      message: "The cybersecurity workshop will begin in 15 minutes. Please take your seats."
    },
    {
      title: "Break Time",
      message: "We're taking a 15-minute break. Please return promptly for the next session."
    },
    {
      title: "Important Update",
      message: "Please check your materials for the latest security guidelines and updates."
    },
    {
      title: "Session Change",
      message: "There has been a slight change to today's schedule. Please check the updated agenda."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Send Notification */}
      <Card className="bg-blue-900/30 border-blue-700/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-300" />
            Send Notification
          </CardTitle>
          <CardDescription className="text-blue-200">
            Send notifications to all {attendees.length} registered attendees
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-blue-200">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              placeholder="Notification title"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-blue-200">Message</Label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white placeholder:text-blue-200/50 rounded-md p-3 min-h-[100px] resize-none"
              placeholder="Enter your message here..."
            />
          </div>
          <Button
            onClick={handleSendNotification}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!title || !message || attendees.length === 0}
          >
            <Send className="w-4 h-4 mr-2" />
            Send to {attendees.length} Attendees
          </Button>
        </CardContent>
      </Card>

      {/* Quick Messages */}
      <Card className="bg-purple-900/30 border-purple-700/40">
        <CardHeader>
          <CardTitle className="text-white">Quick Messages</CardTitle>
          <CardDescription className="text-purple-200">
            Pre-written messages for common scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predefinedMessages.map((msg, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">{msg.title}</h3>
                <p className="text-purple-200 text-sm mb-3">{msg.message}</p>
                <Button
                  size="sm"
                  onClick={() => {
                    setTitle(msg.title);
                    setMessage(msg.message);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Use This Message
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification History */}
      <Card className="bg-green-900/30 border-green-700/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
            Notification History
          </CardTitle>
          <CardDescription className="text-green-200">
            Previously sent notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sentNotifications.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-green-300/50 mx-auto mb-4" />
              <p className="text-green-200">No notifications sent yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sentNotifications.map((notification) => (
                <div key={notification.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{notification.title}</h3>
                      <p className="text-green-200 text-sm mt-1">{notification.message}</p>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-green-300 font-medium">
                        <Users className="w-4 h-4 inline mr-1" />
                        {notification.recipients}
                      </div>
                      <div className="text-green-200/70">
                        {notification.sentAt.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotifications;
