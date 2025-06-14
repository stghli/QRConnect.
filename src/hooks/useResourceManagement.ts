
import { useState } from 'react';
import { cheatsheets as initialCheatsheets, toolkits as initialToolkits, slides as initialSlides } from '../components/resources/ResourcesData';

export interface Resource {
  title: string;
  description: string;
  filename: string;
  size: string;
  category: string;
}

export type ResourceType = 'cheatsheets' | 'toolkits' | 'slides';

export interface Resources {
  cheatsheets: Resource[];
  toolkits: Resource[];
  slides: Resource[];
}

export const useResourceManagement = () => {
  const [resources, setResources] = useState<Resources>({
    cheatsheets: [...initialCheatsheets],
    toolkits: [...initialToolkits],
    slides: [...initialSlides]
  });

  const handleAddResource = (resourceType: ResourceType, resource: Resource) => {
    setResources(prev => ({
      ...prev,
      [resourceType]: [...prev[resourceType], resource]
    }));
  };

  const handleUpdateResource = (resourceType: ResourceType, index: number, resource: Resource) => {
    setResources(prev => {
      const newResources = [...prev[resourceType]];
      newResources[index] = resource;
      return { ...prev, [resourceType]: newResources };
    });
  };

  const handleDeleteResource = (resourceType: ResourceType, index: number) => {
    setResources(prev => {
      const newResources = [...prev[resourceType]];
      newResources.splice(index, 1);
      return { ...prev, [resourceType]: newResources };
    });
  };

  return {
    resources,
    handleAddResource,
    handleUpdateResource,
    handleDeleteResource,
  };
};
