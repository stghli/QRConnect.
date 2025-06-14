
import React, { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';
import QRCodeHeader from './qr/QRCodeHeader';
import QRCodeHero from './qr/QRCodeHero';
import QRCodeSection from './qr/QRCodeSection';
import QRCodeFeatures from './qr/QRCodeFeatures';
import QRCodeFooter from './qr/QRCodeFooter';
import AccessCodeForm from './qr/AccessCodeForm';

interface QRCodeScreenProps {
  attendeeCount: number;
  onAdminLogin: () => void;
  onCodeVerification?: () => void;
}

const QRCodeScreen: React.FC<QRCodeScreenProps> = ({ 
  attendeeCount, 
  onAdminLogin, 
  onCodeVerification 
}) => {
  const [showCodeSection, setShowCodeSection] = useState(false);

  const handleCodeSubmit = () => {
    if (onCodeVerification) {
      onCodeVerification();
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <AnimatedBackground />
      
      <QRCodeHeader onAdminLogin={onAdminLogin} />

      <main className="relative z-10 px-6 py-16">
        {!showCodeSection ? (
          <div className="max-w-6xl mx-auto">
            <QRCodeHero attendeeCount={attendeeCount} />
            <QRCodeSection onCodeSectionToggle={() => setShowCodeSection(true)} />
            <QRCodeFeatures />
          </div>
        ) : (
          <AccessCodeForm 
            onCodeSubmit={handleCodeSubmit}
            onBack={() => setShowCodeSection(false)}
          />
        )}
      </main>
      
      <QRCodeFooter />
    </div>
  );
};

export default QRCodeScreen;
