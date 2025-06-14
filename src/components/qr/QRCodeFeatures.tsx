
import React from 'react';
import { Shield, Users, Zap } from 'lucide-react';

const QRCodeFeatures: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto mt-20">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert-Led Sessions</h3>
          <p className="text-gray-600">Learn from industry professionals with real-world experience</p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Network & Connect</h3>
          <p className="text-gray-600">Build valuable connections with cybersecurity professionals</p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Hands-On Practice</h3>
          <p className="text-gray-600">Apply what you learn with interactive workshops and labs</p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeFeatures;
