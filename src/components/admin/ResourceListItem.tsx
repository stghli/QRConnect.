
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Edit, Trash2, Download } from 'lucide-react';
import type { Resource } from '../../hooks/useResourceManagement';

interface ResourceListItemProps {
  resource: Resource;
  categoryKey: string;
  index: number;
  onEdit: (category: string, index: number) => void;
  onDelete: (category: string, index: number) => void;
  onDownload: (filename: string) => void;
  isActionDisabled: boolean;
}

const ResourceListItem: React.FC<ResourceListItemProps> = ({
  resource,
  categoryKey,
  index,
  onEdit,
  onDelete,
  onDownload,
  isActionDisabled,
}) => {
  return (
    <div className="flex items-center justify-between p-3 elegant-card border border-elegant-primary/20 rounded-lg hover:border-elegant-primary/40 transition-colors">
      <div className="flex items-center space-x-3">
        <FileText className="w-5 h-5 text-elegant-accent" />
        <div>
          <p className="text-foreground font-medium">{resource.title}</p>
          <p className="text-muted-foreground text-sm">{resource.category} • {resource.size}</p>
          <p className="text-muted-foreground text-xs">{resource.description}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          size="sm"
          onClick={() => onEdit(categoryKey, index)}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={isActionDisabled}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => onDelete(categoryKey, index)}
          className="bg-red-600 hover:bg-red-700"
          disabled={isActionDisabled}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => onDownload(resource.filename)}
          className="bg-elegant-primary hover:bg-elegant-secondary text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default ResourceListItem;
