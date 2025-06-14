
import React from 'react';
import { CheckCircle, Users, Calendar, Download, Bell, MessageSquare, BarChart2, Zap } from 'lucide-react';
import AnimatedBackground from './AnimatedBackground';

const features = [
  { icon: CheckCircle, title: "QR Code Check-in", description: "Seamless and fast attendee check-in using QR codes." },
  { icon: Users, title: "Attendee Management", description: "Manage attendees, track registration, and view details in real-time." },
  { icon: Calendar, title: "Dynamic Schedule", description: "Update and display the event program dynamically for all users." },
  { icon: Download, title: "Resource Sharing", description: "Easily distribute documents, slides, and links to attendees." },
  { icon: Bell, title: "Live Notifications", description: "Send instant announcements and updates to all participants." },
  { icon: MessageSquare, title: "Feedback System", description: "Collect valuable feedback from attendees to improve future events." },
  { icon: BarChart2, title: "Event Analytics", description: "Gain insights with data on attendance, resource engagement, and more." },
];

const PostEventLandingPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <AnimatedBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        
        <header className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 animate-fade-in-down">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="h-7 w-7 text-blue-400" />
              <span className="text-xl font-bold text-white tracking-wide">EventFlow</span>
            </div>
            <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="bg-white/10 text-white text-sm font-semibold py-2 px-4 rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 flex items-center gap-2">
              Built with Lovable <Zap className="w-4 h-4" />
            </a>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-center">
          <div className="w-full max-w-4xl">
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-down [text-shadow:0_2px_20px_rgba(139,92,246,0.5)]">
                The Event is Over
              </h1>
              <p className="text-lg sm:text-xl text-blue-200 opacity-0 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                Thank you for attending the CyberSec Workshop 2025.
              </p>
            </div>
            
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl opacity-0 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Powered by an Advanced Event Management System
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                {features.map((feature, index) => (
                  <div key={index} className="elegant-card p-4 rounded-xl transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center mb-2">
                      <feature.icon className="w-6 h-6 mr-3 text-elegant-accent" />
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                    </div>
                    <p className="text-sm text-blue-200 opacity-80">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        <footer className="py-6 px-4 text-center text-sm text-blue-200/60 opacity-0 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
          <p>This application was built with Lovable, an AI software engineer.</p>
        </footer>
      </div>
    </div>
  );
};

export default PostEventLandingPage;
