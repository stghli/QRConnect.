
import React, { useEffect, useRef } from 'react';
import { Shield, Users, Settings, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';

interface QRCodeScreenProps {
  attendeeCount: number;
  onViewAdmin: () => void;
}

const QRCodeScreen: React.FC<QRCodeScreenProps> = ({ attendeeCount, onViewAdmin }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrUrl = `${window.location.origin}?join=true`;

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1e293b',
          light: '#ffffff'
        }
      });
    }
  }, [qrUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-4 md:p-6 max-w-xs sm:max-w-sm w-full border border-white/20 shadow-2xl">
        <div className="text-center space-y-4">
          {/* Header with Shield Icon */}
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-blue-300" />
            <h1 className="text-xl md:text-2xl font-bold text-white">CyberSec</h1>
          </div>
          
          <h2 className="text-lg md:text-xl font-semibold text-blue-200">Workshop 2025</h2>
          
          {/* QR Code */}
          <div className="bg-white rounded-2xl p-4 shadow-lg">
            <canvas ref={canvasRef} className="mx-auto" />
          </div>
          
          <p className="text-xs md:text-sm text-blue-200 opacity-90">
            Scan to join our cybersecurity workshop
          </p>
          
          {/* Fallback Link */}
          <div className="bg-blue-600/20 rounded-xl p-3 backdrop-blur-sm border border-blue-300/20">
            <p className="text-blue-200 text-xs mb-2">QR code not working?</p>
            <a 
              href={qrUrl}
              className="inline-flex items-center text-blue-300 hover:text-white transition-colors text-xs underline"
            >
              <Link className="w-3 h-3 mr-1" />
              Click here to join
            </a>
          </div>
          
          {/* Attendance Counter */}
          <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl p-3 backdrop-blur-sm border border-blue-300/20">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4 text-blue-300" />
              <span className="text-white font-semibold text-sm">
                {attendeeCount} Registered
              </span>
            </div>
          </div>
          
          {/* Admin Dashboard Button */}
          <Button 
            onClick={onViewAdmin}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 md:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm"
          >
            <Settings className="w-4 h-4 mr-2" />
            Admin Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScreen;
