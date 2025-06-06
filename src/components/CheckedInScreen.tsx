
import React, { useState } from 'react';
import { Shield, CheckCircle, Calendar, Clock, Users, FileText, QrCode, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CheckedInScreenProps {
  userName: string;
  accessCode: string;
  onViewProgram: () => void;
  onViewResources: () => void;
}

const CheckedInScreen: React.FC<CheckedInScreenProps> = ({ 
  userName, 
  accessCode, 
  onViewProgram, 
  onViewResources 
}) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-8 h-8 text-blue-300" />
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          </div>
          
          {/* Check-in Status */}
          <div className="bg-green-600/20 rounded-xl p-4 border border-green-400/30">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-green-300 font-semibold">Checked In</span>
            </div>
            <p className="text-white text-lg font-semibold">{userName}</p>
          </div>
          
          {/* Access Code Section */}
          <div className="bg-blue-600/20 rounded-xl p-4 border border-blue-300/20">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <QrCode className="w-5 h-5 text-blue-300" />
              <span className="text-blue-200 text-sm">Your Access Code</span>
            </div>
            
            {showCode ? (
              <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                <p className="text-white font-mono text-lg tracking-wider">{accessCode}</p>
              </div>
            ) : (
              <Button
                onClick={() => setShowCode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                size="sm"
              >
                Show Code
              </Button>
            )}
          </div>
          
          {/* Workshop Info */}
          <div className="bg-purple-600/20 rounded-xl p-4 border border-purple-300/20">
            <h3 className="text-white font-semibold mb-3">CyberSec Workshop 2025</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="text-purple-400 w-4 h-4" />
                <span className="text-purple-200">June 15, 2025</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <Clock className="text-purple-400 w-4 h-4" />
                <span className="text-purple-200">9:00 AM - 5:00 PM</span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <Users className="text-purple-400 w-4 h-4" />
                <span className="text-purple-200">Limited to 50 Participants</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={onViewProgram}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              View Program
            </Button>
            
            <Button 
              onClick={onViewResources}
              className="w-full bg-white/10 hover:bg-white/20 text-blue-300 border border-blue-300/30 py-3 rounded-xl transition-all duration-300"
            >
              <FileText className="mr-2 h-4 w-4" />
              Access Resources
            </Button>
          </div>
          
          <p className="text-xs text-blue-300/70">
            Keep your access code safe for future sessions
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckedInScreen;
