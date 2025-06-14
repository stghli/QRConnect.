
import React from 'react';

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  if (!userName) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 mb-8 border border-blue-500/20 backdrop-blur-sm">
      <p className="text-blue-100 text-lg">
        Welcome back, <span className="font-semibold text-white">{userName}</span>! 
        Download the resources you need for the cybersecurity workshop.
      </p>
    </div>
  );
};

export default WelcomeMessage;
