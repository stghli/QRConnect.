
import React from 'react';
import { FileText, FolderOpen, Book, Wrench } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourceCard from './resources/ResourceCard';
import ResourcesHeader from './resources/ResourcesHeader';
import WelcomeMessage from './resources/WelcomeMessage';
import ResourcesFooter from './resources/ResourcesFooter';
import { cheatsheets, toolkits, slides } from './resources/ResourcesData';

interface ResourcesScreenProps {
  userName: string;
  onBack: () => void;
}

const ResourcesScreen: React.FC<ResourcesScreenProps> = ({ userName, onBack }) => {
  const handleDownload = (filename: string) => {
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

  const handleView = (filename: string) => {
    // In a real app, this would open the file in a new tab or modal
    console.log(`Viewing ${filename}`);
    // Simulate viewing with a blob URL for demonstration
    const blob = new Blob([`Sample content for ${filename}`], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    // Clean up the URL after a delay to allow the browser to load it
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <ResourcesHeader onBack={onBack} />
        <WelcomeMessage userName={userName} />

        {/* Tabs Section */}
        <Tabs defaultValue="cheatsheets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 mb-8 gap-1">
            <TabsTrigger 
              value="cheatsheets" 
              className="data-[state=active]:bg-blue-600/60 data-[state=active]:text-white text-blue-200 rounded-lg px-4 py-3 font-medium transition-all duration-300 text-sm flex items-center justify-center min-w-0"
            >
              <FolderOpen className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span className="truncate">Quick Reference</span>
            </TabsTrigger>
            <TabsTrigger 
              value="toolkits" 
              className="data-[state=active]:bg-purple-600/60 data-[state=active]:text-white text-blue-200 rounded-lg px-4 py-3 font-medium transition-all duration-300 text-sm flex items-center justify-center min-w-0"
            >
              <Wrench className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span className="truncate">Tools & Kits</span>
            </TabsTrigger>
            <TabsTrigger 
              value="slides" 
              className="data-[state=active]:bg-indigo-600/60 data-[state=active]:text-white text-blue-200 rounded-lg px-4 py-3 font-medium transition-all duration-300 text-sm flex items-center justify-center min-w-0"
            >
              <Book className="w-4 h-4 mr-1.5 flex-shrink-0" />
              <span className="truncate">Presentations</span>
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
  );
};

export default ResourcesScreen;
