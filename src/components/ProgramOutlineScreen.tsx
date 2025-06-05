
import React from 'react';
import { Shield, Clock, Coffee, Utensils } from 'lucide-react';

interface ProgramOutlineScreenProps {
  userName: string;
}

interface Session {
  time: string;
  title: string;
  description: string;
  type: 'session' | 'break' | 'lunch';
  icon?: React.ReactNode;
}

const ProgramOutlineScreen: React.FC<ProgramOutlineScreenProps> = ({ userName }) => {
  const schedule: Session[] = [
    {
      time: "9:00 AM",
      title: "Workshop Introduction & Welcome",
      description: "Meet the team, overview of cybersecurity landscape, and workshop objectives",
      type: "session"
    },
    {
      time: "10:30 AM",
      title: "Coffee Break",
      description: "Networking and refreshments",
      type: "break",
      icon: <Coffee className="w-4 h-4" />
    },
    {
      time: "10:45 AM",
      title: "Threat Analysis & Intelligence",
      description: "Understanding modern cyber threats, attack vectors, and threat intelligence gathering",
      type: "session"
    },
    {
      time: "12:00 PM",
      title: "Lunch Break",
      description: "Catered lunch and informal discussions",
      type: "lunch",
      icon: <Utensils className="w-4 h-4" />
    },
    {
      time: "1:00 PM",
      title: "Hands-on Penetration Testing",
      description: "Live demonstration and practical exercises in ethical hacking techniques",
      type: "session"
    },
    {
      time: "2:30 PM",
      title: "Incident Response & Crisis Management",
      description: "Real-world scenarios, incident handling, and emergency response protocols",
      type: "session"
    },
    {
      time: "3:45 PM",
      title: "Security Architecture & Best Practices",
      description: "Design principles, secure coding practices, and infrastructure protection",
      type: "session"
    }
  ];

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold text-white">Workshop Program</h1>
          </div>
          <p className="text-xl text-blue-200">
            Welcome, <span className="font-semibold text-blue-100">{userName}</span>! 🛡️
          </p>
          <p className="text-blue-300 mt-2">Here's your complete workshop schedule</p>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {schedule.map((session, index) => (
            <div 
              key={index} 
              className="relative backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300"
            >
              {/* Left border accent */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
                session.type === 'break' ? 'bg-orange-400' :
                session.type === 'lunch' ? 'bg-green-400' :
                'bg-gradient-to-b from-blue-400 to-purple-400'
              }`} />
              
              <div className="ml-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      session.type === 'break' ? 'bg-orange-400/20' :
                      session.type === 'lunch' ? 'bg-green-400/20' :
                      'bg-blue-400/20'
                    }`}>
                      {session.icon || <Clock className="w-4 h-4 text-blue-300" />}
                    </div>
                    <span className="text-blue-200 font-semibold">{session.time}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{session.title}</h3>
                <p className="text-blue-200 leading-relaxed">{session.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 p-6 backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20">
          <p className="text-blue-200">
            🎯 <strong>Workshop Duration:</strong> 7 hours | <strong>Format:</strong> Interactive & Hands-on
          </p>
          <p className="text-blue-300 mt-2 text-sm">
            All materials and refreshments included. Certificate of completion provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramOutlineScreen;
