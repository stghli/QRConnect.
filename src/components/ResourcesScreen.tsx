
import React from 'react';
import { Shield, Download, ArrowLeft, FileText } from 'lucide-react';
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
      title: 'Top 10 Password Tips',
      description: 'Essential password security best practices for everyone',
      filename: 'password-tips-cheatsheet.pdf',
      size: '2.1 MB'
    },
    {
      title: 'Phishing Detection Guide',
      description: 'How to identify and avoid phishing attempts',
      filename: 'phishing-detection-guide.pdf',
      size: '1.8 MB'
    },
    {
      title: 'Social Engineering Awareness',
      description: 'Recognize and prevent social engineering attacks',
      filename: 'social-engineering-awareness.pdf',
      size: '2.4 MB'
    },
    {
      title: 'Network Security Checklist',
      description: 'Quick reference for securing your network',
      filename: 'network-security-checklist.pdf',
      size: '1.5 MB'
    }
  ];

  const toolkits = [
    {
      title: 'Kali Linux Getting Started',
      description: 'Complete guide to setting up and using Kali Linux',
      filename: 'kali-linux-guide.pdf',
      size: '4.2 MB'
    },
    {
      title: 'Wireshark Tutorial',
      description: 'Learn to analyze network traffic with Wireshark',
      filename: 'wireshark-tutorial.pdf',
      size: '3.7 MB'
    },
    {
      title: 'Penetration Testing Framework',
      description: 'Methodology and tools for ethical hacking',
      filename: 'penetration-testing-framework.pdf',
      size: '5.1 MB'
    }
  ];

  const slides = [
    {
      title: 'Workshop Day 1: Introduction',
      description: 'Introduction to cybersecurity fundamentals',
      filename: 'workshop-day1-slides.pdf',
      size: '8.6 MB'
    },
    {
      title: 'Workshop Day 2: Threat Modeling',
      description: 'Understanding and analyzing potential threats',
      filename: 'workshop-day2-slides.pdf',
      size: '7.2 MB'
    },
    {
      title: 'Workshop Day 3: Hands-on Lab',
      description: 'Practical exercises and demonstrations',
      filename: 'workshop-day3-slides.pdf',
      size: '9.1 MB'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl backdrop-blur-lg bg-white/10 rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-300" />
            <h1 className="text-3xl font-bold text-white">Resources</h1>
          </div>
          <Button 
            variant="ghost" 
            className="text-blue-200 hover:text-white hover:bg-blue-800/50"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        
        {userName && (
          <p className="text-blue-200 mb-6">
            Welcome, <span className="font-semibold">{userName}</span>! Here are all workshop resources for your reference.
          </p>
        )}

        <Tabs defaultValue="cheatsheets" className="w-full">
          <TabsList className="w-full bg-blue-900/50 border border-blue-800 mb-6">
            <TabsTrigger 
              value="cheatsheets" 
              className="text-blue-200 data-[state=active]:bg-blue-700/50 data-[state=active]:text-white flex-1"
            >
              Cheatsheets
            </TabsTrigger>
            <TabsTrigger 
              value="toolkits" 
              className="text-blue-200 data-[state=active]:bg-blue-700/50 data-[state=active]:text-white flex-1"
            >
              Toolkits
            </TabsTrigger>
            <TabsTrigger 
              value="slides" 
              className="text-blue-200 data-[state=active]:bg-blue-700/50 data-[state=active]:text-white flex-1"
            >
              Workshop Slides
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cheatsheets" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {cheatsheets.map((item) => (
                <Card key={item.title} className="bg-blue-800/20 border-blue-700/50 backdrop-blur-sm hover:bg-blue-800/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-300" />
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-blue-200">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <span className="text-sm text-blue-300">{item.size}</span>
                    <Button 
                      onClick={() => handleDownload(item.filename)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="toolkits" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {toolkits.map((item) => (
                <Card key={item.title} className="bg-purple-800/20 border-purple-700/50 backdrop-blur-sm hover:bg-purple-800/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-purple-300" />
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-blue-200">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <span className="text-sm text-blue-300">{item.size}</span>
                    <Button 
                      onClick={() => handleDownload(item.filename)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="slides" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {slides.map((item) => (
                <Card key={item.title} className="bg-indigo-800/20 border-indigo-700/50 backdrop-blur-sm hover:bg-indigo-800/30 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-indigo-300" />
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-blue-200">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between items-center">
                    <span className="text-sm text-blue-300">{item.size}</span>
                    <Button 
                      onClick={() => handleDownload(item.filename)}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourcesScreen;
