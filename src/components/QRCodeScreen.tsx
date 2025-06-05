
import React, { useEffect, useRef } from 'react';
import { Shield, Users, Eye, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';

interface QRCodeScreenProps {
  attendeeCount: number;
  onViewAttendees: () => void;
}

const QRCodeScreen: React.FC<QRCodeScreenProps> = ({ attendeeCount, onViewAttendees }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrUrl = `${window.location.origin}?join=true`;

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrUrl, {
        width: 280,
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
      <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
        <div className="text-center space-y-6">
          {/* Header with Shield Icon */}
          <div className="flex items-center justify-center space-x-3">
            <Shield className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold text-white">CyberSec</h1>
          </div>
          
          <h2 className="text-xl font-semibold text-blue-200">Workshop 2025</h2>
          
          {/* QR Code */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <canvas ref={canvasRef} className="mx-auto" />
          </div>
          
          <p className="text-sm text-blue-200 opacity-90">
            Scan to join our cybersecurity workshop
          </p>
          
          {/* Fallback Link */}
          <div className="bg-blue-600/20 rounded-xl p-4 backdrop-blur-sm border border-blue-300/20">
            <p className="text-blue-200 text-sm mb-2">QR code not working?</p>
            <a 
              href={qrUrl}
              className="inline-flex items-center text-blue-300 hover:text-white transition-colors text-sm underline"
            >
              <Link className="w-4 h-4 mr-1" />
              Click here to join
            </a>
          </div>
          
          {/* Attendance Counter */}
          <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl p-4 backdrop-blur-sm border border-blue-300/20">
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-white font-semibold">
                {attendeeCount} Registered
              </span>
            </div>
          </div>
          
          {/* View Attendees Button */}
          <Button 
            onClick={onViewAttendees}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Attendees
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScreen;
