
import React from 'react';
import { Shield, Download, ArrowLeft, FileText, FolderOpen, Book, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  const cheatsheets = [
    {
      title: 'Password Security Best Practices',
      description: 'Comprehensive guide to creating and managing secure passwords',
      filename: 'password-security-guide.pdf',
      size: '2.1 MB',
      category: 'Security Fundamentals'
    },
    {
      title: 'Phishing Detection & Prevention',
      description: 'Identify and avoid sophisticated phishing attempts',
      filename: 'phishing-prevention-guide.pdf',
      size: '1.8 MB',
      category: 'Threat Awareness'
    },
    {
      title: 'Social Engineering Defense',
      description: 'Recognize and counter social engineering tactics',
      filename: 'social-engineering-defense.pdf',
      size: '2.4 MB',
      category: 'Human Security'
    },
    {
      title: 'Network Security Essentials',
      description: 'Core principles for securing network infrastructure',
      filename: 'network-security-essentials.pdf',
      size: '1.5 MB',
      category: 'Infrastructure'
    }
  ];

  const toolkits = [
    {
      title: 'Kali Linux Complete Setup Guide',
      description: 'Step-by-step installation and configuration of Kali Linux',
      filename: 'kali-linux-setup-guide.pdf',
      size: '4.2 MB',
      category: 'Penetration Testing'
    },
    {
      title: 'Wireshark Network Analysis',
      description: 'Master network traffic analysis with Wireshark',
      filename: 'wireshark-analysis-tutorial.pdf',
      size: '3.7 MB',
      category: 'Network Analysis'
    },
    {
      title: 'Ethical Hacking Framework',
      description: 'Structured approach to penetration testing',
      filename: 'ethical-hacking-framework.pdf',
      size: '5.1 MB',
      category: 'Methodology'
    }
  ];

  const slides = [
    {
      title: 'Cybersecurity Fundamentals',
      description: 'Introduction to core cybersecurity concepts and principles',
      filename: 'cybersecurity-fundamentals.pdf',
      size: '8.6 MB',
      category: 'Session 1'
    },
    {
      title: 'Advanced Threat Modeling',
      description: 'Comprehensive threat analysis and risk assessment',
      filename: 'threat-modeling-advanced.pdf',
      size: '7.2 MB',
      category: 'Session 2'
    },
    {
      title: 'Hands-on Security Lab',
      description: 'Practical exercises and real-world scenarios',
      filename: 'security-lab-exercises.pdf',
      size: '9.1 MB',
      category: 'Session 3'
    }
  ];

  const ResourceCard = ({ item, icon: Icon, color }: { item: any, icon: any, color: string }) => (
    <Card className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
              <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-white text-lg font-semibold group-hover:text-blue-200 transition-colors">
                {item.title}
              </CardTitle>
              <p className="text-xs text-blue-300 font-medium mt-1">{item.category}</p>
            </div>
          </div>
        </div>
        <CardDescription className="text-blue-200/80 text-sm leading-relaxed mt-2">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="text-xs text-blue-300/70 font-medium">
            {item.size}
          </div>
          <Button 
            onClick={() => handleDownload(item.filename)}
            size="sm"
            className="bg-blue-600/80 hover:bg-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
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
        
        {/* Welcome Message */}
        {userName && (
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 mb-8 border border-blue-500/20 backdrop-blur-sm">
            <p className="text-blue-100 text-lg">
              Welcome back, <span className="font-semibold text-white">{userName}</span>! 
              Download the resources you need for the cybersecurity workshop.
            </p>
          </div>
        )}

        {/* Tabs Section */}
        <Tabs defaultValue="cheatsheets" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1 mb-8">
            <TabsTrigger 
              value="cheatsheets" 
              className="data-[state=active]:bg-blue-600/50 data-[state=active]:text-white text-blue-200 rounded-lg px-6 py-3 font-medium transition-all duration-300"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Quick Reference
            </TabsTrigger>
            <TabsTrigger 
              value="toolkits" 
              className="data-[state=active]:bg-purple-600/50 data-[state=active]:text-white text-blue-200 rounded-lg px-6 py-3 font-medium transition-all duration-300"
            >
              <Wrench className="w-4 h-4 mr-2" />
              Tools & Kits
            </TabsTrigger>
            <TabsTrigger 
              value="slides" 
              className="data-[state=active]:bg-indigo-600/50 data-[state=active]:text-white text-blue-200 rounded-lg px-6 py-3 font-medium transition-all duration-300"
            >
              <Book className="w-4 h-4 mr-2" />
              Presentations
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
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
            <p className="text-blue-200/80 text-sm">
              Need help with any of these resources? Contact our support team or refer to the workshop documentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesScreen;
