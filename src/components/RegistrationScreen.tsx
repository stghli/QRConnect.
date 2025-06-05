
import React, { useState } from 'react';
import { Shield, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl animate-fade-in">
        <div className="text-center space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold text-white">Join Workshop</h1>
          </div>
          
          <p className="text-blue-200">
            Register for CyberSec Workshop 2025 and begin your journey to becoming a digital guardian.
          </p>
          
          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  className="pl-10 bg-white/10 border-blue-300/30 text-white placeholder-blue-300/70 focus:border-blue-400 focus:ring-blue-400/30 rounded-xl h-12"
                />
              </div>
              
              {error && (
                <p className="text-red-300 text-sm text-left">{error}</p>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Register Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
          
          <p className="text-xs text-blue-300/70">
            By registering, you agree to participate in our cybersecurity workshop
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;
