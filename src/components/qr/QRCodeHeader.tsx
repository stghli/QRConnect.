
import React from 'react';
import { Shield, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QRCodeHeaderProps {
  onAdminLogin: () => void;
}

const QRCodeHeader: React.FC<QRCodeHeaderProps> = ({ onAdminLogin }) => {
  return (
    <header className="relative z-20 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">CyberSec 2025</span>
        </div>
        
        <Button 
          onClick={onAdminLogin}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </div>
    </header>
  );
};

export default QRCodeHeader;
