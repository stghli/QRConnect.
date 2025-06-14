
import React from 'react';
import { Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ResourceItem {
  title: string;
  description: string;
  filename: string;
  size: string;
  category: string;
}

interface ResourceCardProps {
  item: ResourceItem;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  onDownload: (filename: string) => void;
  onView: (filename: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ item, icon: Icon, color, onDownload, onView }) => (
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
        <div className="flex gap-2">
          <Button 
            onClick={() => onView(item.filename)}
            size="sm"
            variant="outline"
            className="bg-transparent border-blue-500/50 text-blue-200 hover:bg-blue-600/20 hover:border-blue-400 transition-all duration-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button 
            onClick={() => onDownload(item.filename)}
            size="sm"
            className="bg-blue-600/80 hover:bg-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ResourceCard;
