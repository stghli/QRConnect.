
import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md lg:max-w-lg w-full animate-fade-in">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Shield className="w-10 h-10 text-elegant-primary animate-pulse" />
            <CardTitle className="text-3xl">Welcome</CardTitle>
          </div>
          
          {/* Inspirational Quote */}
          <div className="elegant-card p-5 border border-elegant-primary/30">
            <blockquote className="text-sm md:text-base text-foreground/90 italic leading-relaxed">
              "In the digital realm, we are the guardians at the gates, the sentinels of cyberspace. 
              Every line of code we secure makes the digital world safer for all."
            </blockquote>
            <div className="mt-3 text-elegant-primary font-semibold text-sm">— CyberSec Workshop 2025</div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3 text-center">
            <h2 className="text-xl font-semibold text-foreground">Ready to Become a Cyber Guardian?</h2>
            <CardDescription className="leading-relaxed">
              Join us for an intensive cybersecurity workshop where you'll learn cutting-edge techniques, 
              hands-on penetration testing, and incident response strategies.
            </CardDescription>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "🛡️ Advanced Threat Detection",
              "🔍 Penetration Testing Skills",
              "⚡ Incident Response Training",
              "🏗️ Security Architecture Design"
            ].map((benefit, index) => (
              <div key={index} className="elegant-card p-3 border border-elegant-accent/20 hover:border-elegant-accent/40 transition-colors">
                <span className="text-foreground/90 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Get Started Button */}
          <Button 
            onClick={onGetStarted}
            className="w-full elegant-button text-white font-semibold py-4 rounded-xl text-base"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
