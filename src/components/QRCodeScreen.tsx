
import React, { useEffect, useRef, useState } from 'react';
import { Shield, Users, LogIn, Link, Lock, ArrowRight, Zap, CheckCircle, Calendar, Download, Sparkles, Star } from 'lucide-react';
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
        width: 240,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Modern Header */}
      <header className="relative z-20 border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CyberSec Workshop</h1>
              <p className="text-xs text-cyan-400">2025 Edition</p>
            </div>
          </div>
          
          <Button 
            onClick={onAdminLogin}
            className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white border border-slate-600 transition-all duration-300 hover:scale-105"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Admin
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        {!showCodeSection ? (
          <div className="max-w-6xl mx-auto text-center">
            {/* Hero Content */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8 space-x-4">
                <div className="flex space-x-2">
                  <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
                  <Star className="w-6 h-6 text-yellow-400 animate-pulse" style={{animationDelay: '0.2s'}} />
                  <Star className="w-6 h-6 text-yellow-400 animate-pulse" style={{animationDelay: '0.4s'}} />
                </div>
                <span className="text-sm font-medium text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                  Premium Workshop Experience
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-6 leading-tight">
                Next-Gen
                <br />
                <span className="relative">
                  CyberSecurity
                  <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-cyan-400 animate-bounce" />
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Join the most advanced cybersecurity workshop of 2025. Learn from industry experts, 
                network with professionals, and secure your digital future.
              </p>
            </div>

            {/* Main CTA Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              {/* QR Code Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                  <div className="bg-white rounded-2xl p-8 mb-6 shadow-xl">
                    <canvas ref={canvasRef} className="mx-auto" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Instant Access</h3>
                  <p className="text-slate-300 mb-6">
                    Scan the QR code with your phone to join the workshop instantly
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                      Secure
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                      Instant
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-blue-400" />
                      Verified
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="order-1 lg:order-2 space-y-6">
                <div className="text-left">
                  <h3 className="text-3xl font-bold text-white mb-8">What You'll Get</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                      <Calendar className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Live Interactive Sessions</h4>
                        <p className="text-slate-300 text-sm">Real-time workshops with industry experts and hands-on activities</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <Download className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Exclusive Resources</h4>
                        <p className="text-slate-300 text-sm">Premium tools, guides, and materials worth $500+</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                      <Users className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-1">Elite Network</h4>
                        <p className="text-slate-300 text-sm">Connect with top cybersecurity professionals and peers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alternative Options */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-600/30">
                  <h4 className="font-semibold text-white mb-2">Can't scan QR?</h4>
                  <a 
                    href={qrUrl}
                    className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
                  >
                    <Link className="w-4 h-4 mr-2" />
                    Join via direct link
                  </a>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-800/50 to-purple-800/50 backdrop-blur-xl rounded-2xl p-6 border border-indigo-600/30">
                  <h4 className="font-semibold text-white mb-2">Already registered?</h4>
                  <Button
                    onClick={() => setShowCodeSection(true)}
                    className="bg-transparent hover:bg-white/10 text-indigo-300 border border-indigo-400/30 text-sm p-2 h-auto"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Enter access code
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
                <p className="text-slate-300">Enter your 6-digit access code to continue</p>
              </div>
              
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <Input
                  type="text"
                  placeholder="Enter code"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 6);
                    setCode(value.toUpperCase());
                  }}
                  className="bg-white/5 border-white/20 text-white placeholder-slate-400 focus:border-cyan-400 focus:ring-cyan-400/30 rounded-xl text-center text-xl font-mono tracking-widest h-14"
                  maxLength={6}
                />
                
                <div className="space-y-3">
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-xl h-12"
                    disabled={code.length !== 6}
                  >
                    Access Workshop
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={() => {
                      setShowCodeSection(false);
                      setCode('');
                    }}
                    className="w-full bg-transparent hover:bg-white/5 text-slate-300 border border-slate-600 rounded-xl h-12"
                  >
                    Back to main page
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-semibold">{attendeeCount}</span>
                <span className="text-slate-300">registered</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>Powered by EventFlow</span>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Live Event</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QRCodeScreen;
