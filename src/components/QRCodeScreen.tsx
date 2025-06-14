
import React, { useEffect, useRef, useState } from 'react';
import { Shield, Users, LogIn, Link, Lock, ArrowRight, Zap, CheckCircle, Sparkles, ChevronRight } from 'lucide-react';
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
        margin: 1,
        color: {
          dark: '#000000',
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Simple Header */}
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

      {/* Main Content */}
      <main className="relative z-10 px-6 py-16">
        {!showCodeSection ? (
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
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

            {/* QR Code Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-3xl p-12 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Join?
                </h2>
                <p className="text-gray-600 mb-8">
                  Scan the QR code with your phone to get instant access
                </p>
                
                <div className="inline-block bg-white p-6 rounded-2xl shadow-sm mb-8">
                  <canvas ref={canvasRef} className="mx-auto" />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href={qrUrl}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    Open Direct Link
                  </a>
                  
                  <Button
                    onClick={() => setShowCodeSection(true)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Have an Access Code?
                  </Button>
                </div>
              </div>
            </div>

            {/* Features Grid */}
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
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Code Required</h2>
                <p className="text-gray-600">Enter your 6-digit code to continue</p>
              </div>
              
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <Input
                  type="text"
                  placeholder="000000"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 6);
                    setCode(value.toUpperCase());
                  }}
                  className="text-center text-xl font-mono tracking-widest h-14 border-2 border-gray-200 focus:border-blue-600"
                  maxLength={6}
                />
                
                <div className="space-y-3">
                  <Button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
                    disabled={code.length !== 6}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={() => {
                      setShowCodeSection(false);
                      setCode('');
                    }}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
                  >
                    Back
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      
      {/* Simple Footer */}
      <footer className="relative z-10 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              © 2025 CyberSec Workshop. All rights reserved.
            </div>
            <div className="text-sm text-gray-500">
              Powered by EventFlow
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QRCodeScreen;
