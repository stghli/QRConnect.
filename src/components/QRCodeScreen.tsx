
import React, { useEffect, useRef, useState } from 'react';
import { Shield, Users, LogIn, Link, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import QRCode from 'qrcode';

interface QRCodeScreenProps {
  attendeeCount: number;
  onAdminLogin: () => void;
  onCodeVerification?: () => void;
}

const QRCodeScreen: React.FC<QRCodeScreenProps> = ({ 
  attendeeCount, 
  onAdminLogin, 
  onCodeVerification 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrUrl = `${window.location.origin}?join=true`;
  const [showCodeSection, setShowCodeSection] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#ffffff'
        }
      });
    }
  }, [qrUrl]);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() && onCodeVerification) {
      onCodeVerification();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Admin Login Button - Top Left */}
      <Button 
        onClick={onAdminLogin}
        className="absolute top-4 left-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/40 hover:to-blue-600/40 text-purple-300 border border-purple-300/30 text-xs"
        size="sm"
      >
        <LogIn className="w-3 h-3 mr-1" />
        Admin
      </Button>

      <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-4 md:p-6 max-w-xs sm:max-w-sm w-full border border-white/20 shadow-2xl">
        <div className="text-center space-y-4">
          {/* Header with Shield Icon */}
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-300" />
            <h1 className="text-xl md:text-2xl font-bold text-white">CyberSec</h1>
          </div>
          
          <h2 className="text-lg md:text-xl font-semibold text-blue-200">Workshop 2025</h2>
          
          {!showCodeSection ? (
            <>
              {/* QR Code */}
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <canvas ref={canvasRef} className="mx-auto" />
              </div>
              
              <p className="text-xs md:text-sm text-blue-200 opacity-90">
                Scan to join our cybersecurity workshop
              </p>
              
              {/* Fallback Link */}
              <div className="bg-blue-600/20 rounded-xl p-3 backdrop-blur-sm border border-blue-300/20">
                <p className="text-blue-200 text-xs mb-2">QR code not working?</p>
                <a 
                  href={qrUrl}
                  className="inline-flex items-center text-blue-300 hover:text-white transition-colors text-xs underline"
                >
                  <Link className="w-3 h-3 mr-1" />
                  Click here to join
                </a>
              </div>

              {/* Already Checked In Section */}
              <div className="bg-purple-600/20 rounded-xl p-3 backdrop-blur-sm border border-purple-300/20">
                <p className="text-purple-200 text-xs mb-2">Already checked in?</p>
                <Button
                  onClick={() => setShowCodeSection(true)}
                  className="w-full bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-300/30 text-xs"
                  size="sm"
                >
                  <Lock className="w-3 h-3 mr-1" />
                  Enter Access Code
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Code Entry Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Lock className="w-5 h-5 text-blue-300" />
                  <h3 className="text-lg font-semibold text-white">Enter Access Code</h3>
                </div>
                
                <form onSubmit={handleCodeSubmit} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="6-digit code"
                    value={code}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 6);
                      setCode(value.toUpperCase());
                    }}
                    className="bg-white/10 border-blue-300/30 text-white placeholder-blue-300/70 focus:border-blue-400 focus:ring-blue-400/30 rounded-xl text-center text-lg font-mono tracking-wider"
                    maxLength={6}
                  />
                  
                  <div className="space-y-2">
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl"
                      disabled={code.length !== 6}
                    >
                      Access Workshop
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <Button 
                      type="button"
                      onClick={() => {
                        setShowCodeSection(false);
                        setCode('');
                      }}
                      className="w-full bg-white/10 hover:bg-white/20 text-blue-300 border border-blue-300/30 rounded-xl text-xs"
                      size="sm"
                    >
                      Back to QR Code
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
          
          {/* Attendance Counter */}
          <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl p-3 backdrop-blur-sm border border-blue-300/20">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4 text-blue-300" />
              <span className="text-white font-semibold text-sm">
                {attendeeCount} Registered
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScreen;
