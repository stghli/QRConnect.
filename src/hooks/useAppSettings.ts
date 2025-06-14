
import { useState, useEffect } from 'react';

export interface AppSettings {
  isEventActive: boolean;
}

export const useAppSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const storedSettings = window.localStorage.getItem('appSettings');
      if (storedSettings) {
        return JSON.parse(storedSettings);
      }
      // Defaulting to inactive to show the new landing page.
      // You can change this in your browser's localStorage if needed.
      return { isEventActive: false }; 
    } catch (error) {
      console.error("Failed to read app settings from localStorage", error);
      return { isEventActive: true };
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('appSettings', JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to write app settings to localStorage", error);
    }
  }, [settings]);

  const setEventStatus = (isActive: boolean) => {
    setSettings({ ...settings, isEventActive: isActive });
  };

  return {
    settings,
    setEventStatus,
  };
};
