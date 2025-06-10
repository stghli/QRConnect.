
import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminResourcesList: React.FC = () => {
  const resources = [
    {
      category: 'Cheatsheets',
      items: [
        { name: 'Top 10 Password Tips', type: 'PDF', size: '245 KB' },
        { name: 'Network Security Basics', type: 'PDF', size: '1.2 MB' },
        { name: 'Incident Response Guide', type: 'PDF', size: '890 KB' }
      ]
    },
    {
      category: 'Toolkits',
      items: [
        { name: 'Kali Linux Setup Guide', type: 'PDF', size: '3.4 MB' },
        { name: 'Penetration Testing Toolkit', type: 'ZIP', size: '15.2 MB' },
        { name: 'Security Assessment Tools', type: 'ZIP', size: '8.7 MB' }
      ]
    },
    {
      category: 'Workshop Materials',
      items: [
        { name: 'Workshop Slides - Session 1', type: 'PPTX', size: '12.3 MB' },
        { name: 'Workshop Slides - Session 2', type: 'PPTX', size: '9.8 MB' },
        { name: 'Hands-on Lab Instructions', type: 'PDF', size: '2.1 MB' }
      ]
    }
  ];

  const handleDownload = (fileName: string) => {
    // Simulate download
    const element = document.createElement('a');
    element.href = '#';
    element.download = fileName;
    element.click();
  };

  return (
    <div className="space-y-6">
      {resources.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-elegant-primary" />
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 elegant-card border border-elegant-primary/20 rounded-lg hover:border-elegant-primary/40 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-elegant-accent" />
                    <div>
                      <p className="text-foreground font-medium">{item.name}</p>
                      <p className="text-muted-foreground text-sm">{item.type} • {item.size}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(item.name)}
                    className="bg-elegant-primary hover:bg-elegant-secondary text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminResourcesList;
