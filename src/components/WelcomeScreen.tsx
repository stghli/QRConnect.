
import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl animate-fade-in">
        <div className="text-center space-y-8">
          {/* Header */}
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-10 h-10 text-blue-300" />
            <h1 className="text-4xl font-bold text-white">Welcome</h1>
          </div>
          
          {/* Inspirational Quote */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 backdrop-blur-sm border border-blue-300/20">
            <blockquote className="text-lg text-blue-100 italic leading-relaxed">
              "In the digital realm, we are the guardians at the gates, the sentinels of cyberspace. 
              Every line of code we secure, every vulnerability we patch, and every threat we neutralize 
              makes the digital world safer for all."
            </blockquote>
            <div className="mt-4 text-blue-300 font-semibold">— CyberSec Workshop 2025</div>
          </div>
          
          {/* Welcome Message */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Ready to Become a Cyber Guardian?</h2>
            <p className="text-blue-200 leading-relaxed">
              Join us for an intensive cybersecurity workshop where you'll learn cutting-edge techniques, 
              hands-on penetration testing, threat analysis, and incident response strategies. 
              Transform your understanding of digital security and emerge as a defender of the digital frontier.
            </p>
          </div>
          
          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {[
              "🛡️ Advanced Threat Detection",
              "🔍 Penetration Testing Skills",
              "⚡ Incident Response Training",
              "🏗️ Security Architecture Design"
            ].map((benefit, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                <span className="text-blue-200">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Get Started Button */}
          <Button 
            onClick={onGetStarted}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
