
import React from 'react';

const QRCodeFooter: React.FC = () => {
  return (
    <footer className="relative z-10 bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            © 2025 CyberSec Workshop. All rights reserved.
          </div>
          <div className="text-sm text-gray-500">
            Powered by EventFlow
          </div>
        </div>
      </div>
    </footer>
  );
};

export default QRCodeFooter;
