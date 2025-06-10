
import React, { useState } from 'react';
import { Shield, Lock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

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
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-8 h-8 text-elegant-primary animate-pulse" />
            <CardTitle>Admin Access</CardTitle>
          </div>
          <CardDescription>Sign in to manage the workshop</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-elegant-primary" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-elegant-surface-light/30 border-elegant-primary/30 text-foreground placeholder:text-muted-foreground rounded-xl"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-elegant-primary" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-elegant-surface-light/30 border-elegant-primary/30 text-foreground placeholder:text-muted-foreground rounded-xl"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="elegant-card border-destructive/40 p-3">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <Button 
              type="submit"
              className="w-full elegant-button text-white font-semibold py-3 rounded-xl"
            >
              Sign In
            </Button>
          </form>

          <Button
            onClick={onBack}
            variant="outline"
            className="w-full mt-4 border-elegant-primary/30 text-elegant-primary hover:bg-elegant-primary/10 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to QR Code
          </Button>

          {/* Demo Credentials */}
          <div className="elegant-card border-elegant-accent/30 p-3 mt-4">
            <p className="text-muted-foreground text-xs mb-1">Demo credentials:</p>
            <p className="text-elegant-accent text-xs">Username: admin | Password: admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginScreen;
