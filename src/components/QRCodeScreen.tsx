
import React, { useEffect, useRef, useState } from 'react';
import { Shield, Users, LogIn, Link, Lock, ArrowRight, Zap, CheckCircle, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import QRCode from 'qrcode';
import AnimatedBackground from './AnimatedBackground';

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
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 animate-fade-in-down">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="h-7 w-7 text-blue-400" />
              <span className="text-xl font-bold text-white tracking-wide">EventFlow</span>
            </div>
            <Button 
              onClick={onAdminLogin}
              className="bg-white/10 text-white text-sm font-semibold py-2 px-4 rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Admin Login
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-center">
          <div className="w-full max-w-4xl">
            {!showCodeSection ? (
              <>
                {/* Hero Content */}
                <div className="mb-12">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <Shield className="w-12 h-12 md:w-16 md:h-16 text-blue-300" />
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white animate-fade-in-down [text-shadow:0_2px_20px_rgba(139,92,246,0.5)]">
                      CyberSec Workshop 2025
                    </h1>
                  </div>
                  <p className="text-lg sm:text-xl text-blue-200 opacity-0 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    Join us for an immersive cybersecurity experience. Scan the QR code below to get started.
                  </p>
                </div>

                {/* QR Code Section */}
                <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl opacity-0 animate-fade-in-up max-w-md mx-auto" style={{animationDelay: '0.5s'}}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                    <canvas ref={canvasRef} className="mx-auto" />
                  </div>
                  
                  <p className="text-sm text-blue-200 opacity-90 mb-4">
                    Scan to join our cybersecurity workshop
                  </p>
                  
                  {/* Features Preview */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-left">
                    <div className="flex items-center text-blue-200 text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      QR Check-in
                    </div>
                    <div className="flex items-center text-blue-200 text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      Live Schedule
                    </div>
                    <div className="flex items-center text-blue-200 text-sm">
                      <Download className="w-4 h-4 mr-2 text-purple-400" />
                      Resources
                    </div>
                    <div className="flex items-center text-blue-200 text-sm">
                      <Users className="w-4 h-4 mr-2 text-indigo-400" />
                      Networking
                    </div>
                  </div>

                  {/* Fallback Options */}
                  <div className="space-y-3">
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
                  </div>
                </div>
              </>
            ) : (
              <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl opacity-0 animate-fade-in-up max-w-md mx-auto" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <Lock className="w-6 h-6 text-blue-300" />
                  <h3 className="text-xl font-semibold text-white">Enter Access Code</h3>
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
            )}
          </div>
        </main>
        
        {/* Footer with Attendance Counter */}
        <footer className="py-6 px-4 text-center opacity-0 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl p-3 backdrop-blur-sm border border-blue-300/20 max-w-xs mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4 text-blue-300" />
              <span className="text-white font-semibold text-sm">
                {attendeeCount} Registered
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default QRCodeScreen;
