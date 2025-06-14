import React, { useState } from 'react';
import { FileText, Download, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  const [editingResource, setEditingResource] = useState<{ category: string; index: number } | null>(null);
  const [formData, setFormData] = useState<Resource & { resourceCategory: string }>({
    title: '',
    description: '',
    filename: '',
    size: '',
    category: '',
    resourceCategory: 'cheatsheets'
  });

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      title: '',
      description: '',
      filename: '',
      size: '',
      category: '',
      resourceCategory: 'cheatsheets'
    });
  };

  const handleEdit = (category: string, index: number) => {
    const resource = allResources[category as ResourceType][index];
    setEditingResource({ category, index });
    setFormData({
      ...resource,
      resourceCategory: category
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.filename || !formData.size || !formData.category) {
      return;
    }

    const newResource: Resource = {
      title: formData.title,
      description: formData.description,
      filename: formData.filename,
      size: formData.size,
      category: formData.category
    };

    if (editingResource) {
      onUpdateResource(editingResource.category as ResourceType, editingResource.index, newResource);
      setEditingResource(null);
    } else {
      onAddResource(formData.resourceCategory as ResourceType, newResource);
      setIsAdding(false);
    }

    setFormData({
      title: '',
      description: '',
      filename: '',
      size: '',
      category: '',
      resourceCategory: 'cheatsheets'
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingResource(null);
    setFormData({
      title: '',
      description: '',
      filename: '',
      size: '',
      category: '',
      resourceCategory: 'cheatsheets'
    });
  };

  const handleDelete = (category: string, index: number) => {
    onDeleteResource(category as ResourceType, index);
  };

  const handleDownload = (fileName: string) => {
    const element = document.createElement('a');
    element.href = '#';
    element.download = fileName;
    element.click();
  };

  const categoryLabels = {
    cheatsheets: 'Quick Reference',
    toolkits: 'Tools & Kits',
    slides: 'Presentations'
  };

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
              disabled={isAdding || editingResource !== null}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add New Resource Form */}
          {isAdding && (
            <div className="bg-white/5 rounded-lg p-4 border border-green-300/20 mb-6">
              <h3 className="text-white font-semibold mb-4">Add New Resource</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="resource-category" className="text-blue-200">Resource Type</Label>
                  <Select value={formData.resourceCategory} onValueChange={(value) => setFormData({ ...formData, resourceCategory: value })}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cheatsheets">Quick Reference</SelectItem>
                      <SelectItem value="toolkits">Tools & Kits</SelectItem>
                      <SelectItem value="slides">Presentations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="title" className="text-blue-200">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Resource title"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description" className="text-blue-200">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Resource description"
                  />
                </div>
                <div>
                  <Label htmlFor="filename" className="text-blue-200">Filename</Label>
                  <Input
                    id="filename"
                    value={formData.filename}
                    onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="example-file.pdf"
                  />
                </div>
                <div>
                  <Label htmlFor="size" className="text-blue-200">File Size</Label>
                  <Input
                    id="size"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="2.1 MB"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-blue-200">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Security Fundamentals"
                  />
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Resources List */}
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
                      <div className="bg-white/5 rounded-lg p-4 border border-blue-300/20">
                        <h4 className="text-white font-semibold mb-4">Edit Resource</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`edit-title-${index}`} className="text-blue-200">Title</Label>
                            <Input
                              id={`edit-title-${index}`}
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-category-${index}`} className="text-blue-200">Category</Label>
                            <Input
                              id={`edit-category-${index}`}
                              value={formData.category}
                              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor={`edit-description-${index}`} className="text-blue-200">Description</Label>
                            <Input
                              id={`edit-description-${index}`}
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-filename-${index}`} className="text-blue-200">Filename</Label>
                            <Input
                              id={`edit-filename-${index}`}
                              value={formData.filename}
                              onChange={(e) => setFormData({ ...formData, filename: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-size-${index}`} className="text-blue-200">File Size</Label>
                            <Input
                              id={`edit-size-${index}`}
                              value={formData.size}
                              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                          <Button onClick={handleCancel} variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
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
                            onClick={() => handleEdit(categoryKey, index)}
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={editingResource !== null || isAdding}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDelete(categoryKey, index)}
                            className="bg-red-600 hover:bg-red-700"
                            disabled={editingResource !== null || isAdding}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDownload(resource.filename)}
                            className="bg-elegant-primary hover:bg-elegant-secondary text-white"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
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
