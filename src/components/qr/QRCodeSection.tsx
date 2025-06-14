
import React, { useEffect, useRef } from 'react';
import { Link, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';

interface QRCodeSectionProps {
  onCodeSectionToggle: () => void;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({ onCodeSectionToggle }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrUrl = `${window.location.origin}?join=true`;

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, qrUrl, {
        width: 200,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    }
  }, [qrUrl]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-50 rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Join?
        </h2>
        <p className="text-gray-600 mb-8">
          Scan the QR code with your phone to get instant access
        </p>
        
        <div className="inline-block bg-white p-6 rounded-2xl shadow-sm mb-8">
          <canvas ref={canvasRef} className="mx-auto" />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={qrUrl}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Link className="w-4 h-4 mr-2" />
            Open Direct Link
          </a>
          
          <Button
            onClick={onCodeSectionToggle}
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Lock className="w-4 h-4 mr-2" />
            Have an Access Code?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;
