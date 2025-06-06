
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  valueColor: string;
  descriptionColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  bgColor,
  borderColor,
  iconColor,
  valueColor,
  descriptionColor
}) => {
  return (
    <Card className={`${bgColor} ${borderColor}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Icon className={`w-5 h-5 mr-2 ${iconColor}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${valueColor}`}>{value}</div>
        <p className={`${descriptionColor} text-sm`}>{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
