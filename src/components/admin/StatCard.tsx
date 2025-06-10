
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  bgColor?: string;
  borderColor?: string;
  iconColor?: string;
  valueColor?: string;
  descriptionColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon
}) => {
  return (
    <Card className="hover:scale-105 transition-transform duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-foreground flex items-center text-lg">
          <Icon className="w-5 h-5 mr-2 text-elegant-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold bg-gradient-to-r from-elegant-primary to-elegant-secondary bg-clip-text text-transparent">
          {value}
        </div>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
