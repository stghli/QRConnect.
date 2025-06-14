
import React from 'react';
import { Sparkles, Users, CheckCircle, Zap } from 'lucide-react';

interface QRCodeHeroProps {
  attendeeCount: number;
}

const QRCodeHero: React.FC<QRCodeHeroProps> = ({ attendeeCount }) => {
  return (
    <div className="text-center mb-20">
      <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-8">
        <Sparkles className="w-4 h-4 mr-2" />
        Premium Cybersecurity Workshop
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Master Modern
        <br />
        <span className="text-blue-600">Cybersecurity</span>
      </h1>
      
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
        Join industry experts for hands-on training, networking, and cutting-edge security insights.
      </p>
      
      <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2 text-blue-600" />
          {attendeeCount} Registered
        </div>
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
          Live Event
        </div>
        <div className="flex items-center">
          <Zap className="w-4 h-4 mr-2 text-yellow-600" />
          Instant Access
        </div>
      </div>
    </div>
  );
};

export default QRCodeHero;
