
import React, { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AccessCodeFormProps {
  onCodeSubmit: () => void;
  onBack: () => void;
}

const AccessCodeForm: React.FC<AccessCodeFormProps> = ({ onCodeSubmit, onBack }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onCodeSubmit();
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Code Required</h2>
          <p className="text-gray-600">Enter your 6-digit code to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            placeholder="000000"
            value={code}
            onChange={(e) => {
              const value = e.target.value.replace(/[^A-Za-z0-9]/g, '').slice(0, 6);
              setCode(value.toUpperCase());
            }}
            className="text-center text-xl font-mono tracking-widest h-14 border-2 border-gray-200 focus:border-blue-600"
            maxLength={6}
          />
          
          <div className="space-y-3">
            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
              disabled={code.length !== 6}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              type="button"
              onClick={() => {
                onBack();
                setCode('');
              }}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-12"
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccessCodeForm;
