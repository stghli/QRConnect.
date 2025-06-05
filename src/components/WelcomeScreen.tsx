
import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-4 md:p-6 max-w-md lg:max-w-lg w-full border border-white/20 shadow-2xl animate-fade-in">
        <div className="text-center space-y-4 md:space-y-6">
          {/* Header */}
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-8 h-8 md:w-10 md:h-10 text-blue-300" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome</h1>
          </div>
          
          {/* Inspirational Quote */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-4 md:p-5 backdrop-blur-sm border border-blue-300/20">
            <blockquote className="text-sm md:text-base text-blue-100 italic leading-relaxed">
              "In the digital realm, we are the guardians at the gates, the sentinels of cyberspace. 
              Every line of code we secure makes the digital world safer for all."
            </blockquote>
            <div className="mt-3 text-blue-300 font-semibold text-sm">— CyberSec Workshop 2025</div>
          </div>
          
          {/* Welcome Message */}
          <div className="space-y-3">
            <h2 className="text-lg md:text-xl font-semibold text-white">Ready to Become a Cyber Guardian?</h2>
            <p className="text-blue-200 leading-relaxed text-sm md:text-base">
              Join us for an intensive cybersecurity workshop where you'll learn cutting-edge techniques, 
              hands-on penetration testing, and incident response strategies.
            </p>
          </div>
          
          {/* Benefits List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {[
              "🛡️ Advanced Threat Detection",
              "🔍 Penetration Testing Skills",
              "⚡ Incident Response Training",
              "🏗️ Security Architecture Design"
            ].map((benefit, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-2 md:p-3 backdrop-blur-sm border border-white/10">
                <span className="text-blue-200 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Get Started Button */}
          <Button 
            onClick={onGetStarted}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 md:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm md:text-base"
          >
            Get Started
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
