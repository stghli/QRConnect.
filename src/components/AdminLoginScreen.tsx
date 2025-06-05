
import React, { useState } from 'react';
import { Shield, Lock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AdminLoginScreenProps {
  onLogin: (username: string, password: string) => boolean;
  onBack: () => void;
}

const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/10 rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-blue-300" />
              <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            </div>
            <p className="text-blue-200">Sign in to manage the workshop</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-blue-200">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-200">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-3">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
            >
              Sign In
            </Button>
          </form>

          {/* Back Button */}
          <Button
            onClick={onBack}
            className="w-full bg-white/10 hover:bg-white/20 text-blue-300 border border-blue-300/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to QR Code
          </Button>

          {/* Demo Credentials */}
          <div className="bg-blue-600/20 rounded-xl p-3 backdrop-blur-sm border border-blue-300/20">
            <p className="text-blue-200 text-xs mb-1">Demo credentials:</p>
            <p className="text-blue-300 text-xs">Username: admin | Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginScreen;
