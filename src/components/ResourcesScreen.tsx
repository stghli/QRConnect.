
import React, { useState } from 'react';
import { FileText, FolderOpen, Book, Wrench } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourceCard from './resources/ResourceCard';
import ResourcesHeader from './resources/ResourcesHeader';
import WelcomeMessage from './resources/WelcomeMessage';
import ResourcesFooter from './resources/ResourcesFooter';
import DocumentViewer from './resources/DocumentViewer';
import type { Resources } from '../hooks/useResourceManagement';

interface ResourcesScreenProps {
  userName: string;
  onBack: () => void;
  resources: Resources;
  trackDownload: (filename: string) => void;
  trackView: (filename: string) => void;
}

const ResourcesScreen: React.FC<ResourcesScreenProps> = ({ userName, onBack, resources, trackDownload, trackView }) => {
  const { cheatsheets, toolkits, slides } = resources;
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    filename: string;
    title: string;
  }>({
    isOpen: false,
    filename: '',
    title: ''
  });

  const handleDownload = (filename: string) => {
    trackDownload(filename);
    // In a real app, this would trigger an actual download
    console.log(`Downloading ${filename}`);
    // Simulate download with a blob URL for demonstration
    const blob = new Blob([`Sample content for ${filename}`], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleView = (filename: string, title: string) => {
    trackView(filename);
    console.log(`Viewing ${filename}`);
    setViewerState({
      isOpen: true,
      filename,
      title
    });
  };

  const handleCloseViewer = () => {
    setViewerState({
      isOpen: false,
      filename: '',
      title: ''
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
        <div className="max-w-7xl mx-auto">
          <ResourcesHeader onBack={onBack} />
          <WelcomeMessage userName={userName} />

          {/* Tabs Section */}
          <Tabs defaultValue="cheatsheets" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1.5 mb-8 gap-0.5 h-auto">
              <TabsTrigger 
                value="cheatsheets" 
                className="data-[state=active]:bg-blue-600/60 data-[state=active]:text-white text-blue-200 rounded-lg px-2 py-2.5 font-medium transition-all duration-300 text-xs sm:text-sm flex items-center justify-center min-w-0 flex-1"
              >
                <FolderOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 flex-shrink-0" />
                <span className="truncate hidden sm:inline">Quick Reference</span>
                <span className="truncate sm:hidden">Reference</span>
              </TabsTrigger>
              <TabsTrigger 
                value="toolkits" 
                className="data-[state=active]:bg-purple-600/60 data-[state=active]:text-white text-blue-200 rounded-lg px-2 py-2.5 font-medium transition-all duration-300 text-xs sm:text-sm flex items-center justify-center min-w-0 flex-1"
              >
                <Wrench className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 flex-shrink-0" />
                <span className="truncate hidden sm:inline">Tools & Kits</span>
                <span className="truncate sm:hidden">Tools</span>
              </TabsTrigger>
              <TabsTrigger 
                value="slides" 
                className="data-[state=active]:bg-indigo-600/60 data-[state=active]:text-white text-blue-200 rounded-lg px-2 py-2.5 font-medium transition-all duration-300 text-xs sm:text-sm flex items-center justify-center min-w-0 flex-1"
              >
                <Book className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 flex-shrink-0" />
                <span className="truncate hidden sm:inline">Presentations</span>
                <span className="truncate sm:hidden">Slides</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cheatsheets" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {cheatsheets.map((item) => (
                  <ResourceCard 
                    key={item.title} 
                    item={item} 
                    icon={FileText} 
                    color="bg-blue-500" 
                    onDownload={handleDownload}
                    onView={handleView}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="toolkits" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {toolkits.map((item) => (
                  <ResourceCard 
                    key={item.title} 
                    item={item} 
                    icon={Wrench} 
                    color="bg-purple-500" 
                    onDownload={handleDownload}
                    onView={handleView}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="slides" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {slides.map((item) => (
                  <ResourceCard 
                    key={item.title} 
                    item={item} 
                    icon={Book} 
                    color="bg-indigo-500" 
                    onDownload={handleDownload}
                    onView={handleView}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <ResourcesFooter />
        </div>
      </div>

      <DocumentViewer
        isOpen={viewerState.isOpen}
        onClose={handleCloseViewer}
        filename={viewerState.filename}
        title={viewerState.title}
        onDownload={handleDownload}
      />
    </>
  );
};

export default ResourcesScreen;
