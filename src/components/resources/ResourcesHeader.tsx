
import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourcesHeaderProps {
  onBack: () => void;
}

const ResourcesHeader: React.FC<ResourcesHeaderProps> = ({ onBack }) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-blue-600/20 rounded-xl backdrop-blur-sm">
        <Shield className="w-8 h-8 text-blue-300" />
      </div>
      <div>
        <h1 className="text-4xl font-bold text-white">Workshop Resources</h1>
        <p className="text-blue-200/80 mt-1">Access all materials and documentation</p>
      </div>
    </div>
    <Button 
      variant="ghost" 
      className="text-blue-200 hover:text-white hover:bg-white/10 px-6 py-3 rounded-xl"
      onClick={onBack}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Program
    </Button>
  </div>
);

export default ResourcesHeader;
