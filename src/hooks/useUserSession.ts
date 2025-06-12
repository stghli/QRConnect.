
import { useState } from 'react';
import type { ScreenType } from '../types';

export const useUserSession = () => {
  const [currentUser, setCurrentUser] = useState<string>('');
  const [isReturningUser, setIsReturningUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('qr');

  const handleAdminLogin = (username: string, password: string): boolean => {
    // Simple demo authentication - in a real app, this would be more secure
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      setCurrentUser('Administrator');
      setCurrentScreen('adminDashboard');
      return true;
    }
    return false;
  };

  return {
    currentUser,
    setCurrentUser,
    isReturningUser,
    setIsReturningUser,
    isAdmin,
    setIsAdmin,
    currentScreen,
    setCurrentScreen,
    handleAdminLogin,
  };
};
