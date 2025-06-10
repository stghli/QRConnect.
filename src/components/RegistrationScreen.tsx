
import React, { useState } from 'react';
import { Shield, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface RegistrationScreenProps {
  onRegister: (name: string) => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    
    setError('');
    onRegister(name.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-8 h-8 text-elegant-primary animate-pulse" />
            <CardTitle>Join Workshop</CardTitle>
          </div>
          <CardDescription>
            Register for CyberSec Workshop 2025 and begin your journey to becoming a digital guardian.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-elegant-primary" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  className="pl-10 bg-elegant-surface-light/30 border-elegant-primary/30 text-foreground placeholder:text-muted-foreground focus:border-elegant-primary focus:ring-elegant-primary/30 rounded-xl h-12"
                />
              </div>
              
              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full elegant-button text-white font-semibold py-3 rounded-xl"
            >
              Register Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            By registering, you agree to participate in our cybersecurity workshop
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationScreen;
