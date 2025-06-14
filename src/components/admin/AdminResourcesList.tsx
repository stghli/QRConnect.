
import React, { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ResourceForm from './ResourceForm';
import ResourceListItem from './ResourceListItem';
import type { Resource, Resources, ResourceType } from '../../hooks/useResourceManagement';

interface AdminResourcesListProps {
  resources: Resources;
  onAddResource: (resourceType: ResourceType, resource: Resource) => void;
  onUpdateResource: (resourceType: ResourceType, index: number, resource: Resource) => void;
  onDeleteResource: (resourceType: ResourceType, index: number) => void;
}

const AdminResourcesList: React.FC<AdminResourcesListProps> = ({
  resources: allResources,
  onAddResource,
  onUpdateResource,
  onDeleteResource
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingResource, setEditingResource] = useState<{ category: ResourceType; index: number } | null>(null);

  const handleAdd = () => {
    setIsAdding(true);
    setEditingResource(null);
  };

  const handleEdit = (category: string, index: number) => {
    setEditingResource({ category: category as ResourceType, index });
    setIsAdding(false);
  };

  const handleSave = (resource: Resource, resourceType: ResourceType) => {
    if (editingResource) {
      onUpdateResource(editingResource.category, editingResource.index, resource);
    } else {
      onAddResource(resourceType, resource);
    }
    handleCancel();
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingResource(null);
  };

  const handleDelete = (category: string, index: number) => {
    onDeleteResource(category as ResourceType, index);
  };

  const handleDownload = (fileName: string) => {
    const element = document.createElement('a');
    element.href = '#';
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const categoryLabels = {
    cheatsheets: 'Quick Reference',
    toolkits: 'Tools & Kits',
    slides: 'Presentations'
  };

  const isActionInProgress = isAdding || editingResource !== null;
  const resourceToEdit = editingResource ? allResources[editingResource.category][editingResource.index] : undefined;
  
  return (
    <div className="space-y-6">
      <Card className="bg-blue-900/30 border-blue-700/40">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-300" />
              Resource Management
            </div>
            <Button
              onClick={handleAdd}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={isActionInProgress}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isAdding && (
            <ResourceForm
              onSave={handleSave}
              onCancel={handleCancel}
              isAdding={true}
            />
          )}

          {Object.entries(allResources).map(([categoryKey, resources]) => (
            <div key={categoryKey} className="mb-6">
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-elegant-primary" />
                {categoryLabels[categoryKey as keyof typeof categoryLabels]}
              </h3>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index}>
                    {editingResource?.category === categoryKey && editingResource?.index === index ? (
                      <ResourceForm
                        initialData={resourceToEdit}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        isAdding={false}
                      />
                    ) : (
                      <ResourceListItem
                        resource={resource}
                        categoryKey={categoryKey}
                        index={index}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onDownload={handleDownload}
                        isActionDisabled={isActionInProgress}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminResourcesList;
