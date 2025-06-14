
import { useState, useEffect } from 'react';
import type { Notification } from '../types';

export const useNotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const storedNotifications = window.localStorage.getItem('notifications');
      if (storedNotifications) {
        return JSON.parse(storedNotifications).map((n: Omit<Notification, 'sentAt'> & { sentAt: string }) => ({
          ...n,
          sentAt: new Date(n.sentAt),
        }));
      }
      return [];
    } catch (error) {
      console.error("Failed to read notifications from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error("Failed to write notifications to localStorage", error);
    }
  }, [notifications]);

  const addNotification = (title: string, message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      sentAt: new Date(),
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  return { notifications, addNotification };
};
