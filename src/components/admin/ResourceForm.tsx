
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, X } from 'lucide-react';
import type { Resource, ResourceType } from '../../hooks/useResourceManagement';

interface ResourceFormProps {
  initialData?: Partial<Resource> & { resourceCategory?: ResourceType | string };
  onSave: (resource: Resource, resourceType: ResourceType) => void;
  onCancel: () => void;
  isAdding: boolean;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ initialData, onSave, onCancel, isAdding }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    filename: '',
    size: '',
    category: '',
    resourceCategory: 'cheatsheets' as ResourceType | string,
    ...initialData,
  });

  useEffect(() => {
    setFormData({
      title: '',
      description: '',
      filename: '',
      size: '',
      category: '',
      resourceCategory: 'cheatsheets',
      ...initialData,
    });
  }, [initialData]);

  const handleSaveClick = () => {
    if (!formData.title || !formData.description || !formData.filename || !formData.size || !formData.category) {
      return;
    }

    const resource: Resource = {
      title: formData.title,
      description: formData.description,
      filename: formData.filename,
      size: formData.size,
      category: formData.category,
    };

    onSave(resource, formData.resourceCategory as ResourceType);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, resourceCategory: value }));
  };
  
  const title = isAdding ? 'Add New Resource' : 'Edit Resource';

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-blue-300/20 mb-6">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isAdding && (
          <div>
            <Label htmlFor="resource-category" className="text-blue-200">Resource Type</Label>
            <Select value={formData.resourceCategory as string} onValueChange={handleSelectChange}>
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
        )}
        <div>
          <Label htmlFor="title" className="text-blue-200">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Resource title"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description" className="text-blue-200">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Resource description"
          />
        </div>
        <div>
          <Label htmlFor="filename" className="text-blue-200">Filename</Label>
          <Input
            id="filename"
            value={formData.filename}
            onChange={handleChange}
            className="bg-white/10 border-white/20 text-white"
            placeholder="example-file.pdf"
          />
        </div>
        <div>
          <Label htmlFor="size" className="text-blue-200">File Size</Label>
          <Input
            id="size"
            value={formData.size}
            onChange={handleChange}
            className="bg-white/10 border-white/20 text-white"
            placeholder="2.1 MB"
          />
        </div>
        <div>
          <Label htmlFor="category" className="text-blue-200">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-white/10 border-white/20 text-white"
            placeholder="Security Fundamentals"
          />
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <Button onClick={handleSaveClick} className="bg-green-600 hover:bg-green-700">
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
        <Button onClick={onCancel} variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ResourceForm;
