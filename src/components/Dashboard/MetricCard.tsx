import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

export interface MetricCardProps {
  id: string;
  title: string;
  value: string;
  valuePrefix?: string;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  badgeNumber: number;
  badgeColor: string; // Tailwind classes for background and text color e.g. "bg-blue-100 text-blue-700"
  lineColor: string; // Tailwind class for background color e.g. "bg-blue-500"
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  valuePrefix,
  trend,
  icon: Icon,
  badgeNumber,
  badgeColor,
  lineColor,
  className,
}) => {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : null;

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="pb-2">
        <div className={cn('h-1 w-12 rounded-full mb-2', lineColor)} /> 
        <CardTitle className="text-sm font-medium text-muted-foreground tracking-wider uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-card-foreground flex items-center">
            {TrendIcon && (
              <TrendIcon 
                className={cn(
                  'mr-2 h-6 w-6',
                  trend === 'up' ? 'text-accentGreen' : 'text-destructive'
                )}
              />
            )}
            {valuePrefix && <span className="mr-1">{valuePrefix}</span>}
            {value}
          </div>
          <div 
            className={cn(
              'flex items-center justify-center h-10 w-10 rounded-full text-sm font-semibold',
              badgeColor
            )}
          >
            {badgeNumber}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
