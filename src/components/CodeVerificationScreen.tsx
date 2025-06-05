
import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CodeVerificationScreenProps {
  onVerify: (code: string) => boolean;
  onBack: () => void;
}

const CodeVerificationScreen: React.FC<CodeVerificationScreenProps> = ({ onVerify, onBack }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter your access code');
      return;
    }
    
    if (code.trim().length !== 6) {
      setError('Access code must be 6 characters');
      return;
    }
    
    const isValid = onVerify(code.trim().toUpperCase());
    if (!isValid) {
      setError('Invalid access code. Please check and try again.');
      return;
    }
    
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-6 md:p-8 max-w-md w-full border border-white/20 shadow-2xl animate-fade-in">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-8 h-8 text-blue-300" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome Back</h1>
          </div>
          
          <p className="text-blue-200 text-sm md:text-base">
            You're already registered! Please enter your 6-digit access code to continue.
          </p>
          
          {/* Code Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 6);
                    setCode(value.toUpperCase());
                    if (error) setError('');
                  }}
                  className="pl-10 bg-white/10 border-blue-300/30 text-white placeholder-blue-300/70 focus:border-blue-400 focus:ring-blue-400/30 rounded-xl h-12 text-center text-lg font-mono tracking-wider"
                  maxLength={6}
                />
              </div>
              
              {error && (
                <p className="text-red-300 text-sm text-left">{error}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Verify Code
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                type="button"
                onClick={onBack}
                className="w-full bg-white/10 hover:bg-white/20 text-blue-300 border border-blue-300/30 py-3 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to QR Code
              </Button>
            </div>
          </form>
          
          <p className="text-xs text-blue-300/70">
            Your access code was provided when you first registered
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeVerificationScreen;
