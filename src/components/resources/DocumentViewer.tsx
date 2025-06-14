
import React from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  filename: string;
  title: string;
  onDownload: (filename: string) => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  isOpen, 
  onClose, 
  filename, 
  title, 
  onDownload 
}) => {
  const [zoom, setZoom] = React.useState(100);
  const [rotation, setRotation] = React.useState(0);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl h-[90vh] bg-white/10 border-white/20 backdrop-blur-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-white/10">
          <CardTitle className="text-white text-xl font-semibold">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleZoomOut}
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-white text-sm min-w-[60px] text-center">
              {zoom}%
            </span>
            <Button
              onClick={handleZoomIn}
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleRotate}
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onDownload(filename)}
              size="sm"
              className="bg-blue-600/80 hover:bg-blue-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={onClose}
              size="sm"
              variant="outline"
              className="bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 h-full overflow-hidden">
          <div className="w-full h-full bg-white/5 rounded-lg border border-white/10 flex items-center justify-center overflow-auto">
            <div 
              className="bg-white rounded-lg shadow-2xl transition-all duration-300 min-h-[600px] max-w-full"
              style={{ 
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'center'
              }}
            >
              <div className="p-8 text-gray-800">
                <h1 className="text-2xl font-bold mb-6 text-center border-b-2 border-gray-300 pb-4">
                  {title}
                </h1>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p className="text-gray-600 italic">
                    Document: {filename}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="font-semibold mb-2">Document Preview</h2>
                    <p>This is a simulated document preview. In a real application, this would display the actual document content using a PDF viewer or document rendering library.</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">Key Features:</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Comprehensive coverage of security topics</li>
                      <li>Practical examples and case studies</li>
                      <li>Step-by-step implementation guides</li>
                      <li>Best practices and recommendations</li>
                      <li>Real-world scenarios and solutions</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Learning Objectives</h3>
                    <p className="text-blue-700">After reviewing this document, you will have a better understanding of the core concepts and be able to apply them in practical scenarios.</p>
                  </div>
                  <div className="text-center pt-6">
                    <p className="text-gray-500 text-xs">
                      This is a sample document preview. Actual content would be loaded from the document file.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentViewer;
