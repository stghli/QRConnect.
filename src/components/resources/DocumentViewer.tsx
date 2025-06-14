
import React from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  filename: string;
  title: string;
  description: string;
  onDownload: (filename: string) => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ 
  isOpen, 
  onClose, 
  filename, 
  title, 
  description,
  onDownload 
}) => {
  const [zoom, setZoom] = React.useState(100);
  const [rotation, setRotation] = React.useState(0);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-5xl h-full max-h-[95vh] bg-white/10 border-white/20 backdrop-blur-md flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-white/10 flex-shrink-0">
          <CardTitle className="text-white text-base sm:text-xl font-semibold truncate pr-2">
            {title}
          </CardTitle>
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end">
            <Button
              onClick={handleZoomOut}
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-2 h-auto"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-white text-sm min-w-[40px] sm:min-w-[60px] text-center">
              {zoom}%
            </span>
            <Button
              onClick={handleZoomIn}
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-2 h-auto"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleRotate}
              size="sm"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-2 h-auto"
            >
              <RotateCw className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => onDownload(filename)}
              size="sm"
              className="bg-blue-600/80 hover:bg-blue-600 text-white p-2 h-auto"
            >
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
            <Button
              onClick={onClose}
              size="sm"
              variant="outline"
              className="bg-red-500/20 border-red-500/50 text-red-200 hover:bg-red-500/30 p-2 h-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-4 md:p-6 flex-grow overflow-hidden">
          <div className="w-full h-full bg-white/5 rounded-lg border border-white/10 flex items-center justify-center overflow-auto p-2">
            <div 
              className="bg-white rounded-lg shadow-2xl transition-all duration-300 w-full max-w-4xl"
              style={{ 
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'center'
              }}
            >
              <div className="p-4 sm:p-8 text-gray-800">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center border-b-2 border-gray-300 pb-2 sm:pb-4">
                  {title}
                </h1>
                <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                  <p className="text-gray-600 italic">
                    Document: {filename}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="font-semibold mb-2">Document Preview</h2>
                    <p>{description}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-base sm:text-lg">Key Features:</h3>
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
