
import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
      <Card className="max-w-md w-full animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-8 h-8 text-elegant-primary animate-pulse" />
            <CardTitle>Welcome Back</CardTitle>
          </div>
          <CardDescription>
            You're already registered! Please enter your 6-digit access code to continue.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-elegant-primary" />
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 6);
                    setCode(value.toUpperCase());
                    if (error) setError('');
                  }}
                  className="pl-10 bg-elegant-surface-light/30 border-elegant-primary/30 text-foreground placeholder:text-muted-foreground focus:border-elegant-primary focus:ring-elegant-primary/30 rounded-xl h-12 text-center text-lg font-mono tracking-wider"
                  maxLength={6}
                />
              </div>
              
              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <Button 
                type="submit"
                className="w-full elegant-button text-white font-semibold py-3 rounded-xl"
              >
                Verify Code
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                type="button"
                onClick={onBack}
                variant="outline"
                className="w-full border-elegant-primary/30 text-elegant-primary hover:bg-elegant-primary/10 py-3 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to QR Code
              </Button>
            </div>
          </form>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            Your access code was provided when you first registered
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CodeVerificationScreen;
