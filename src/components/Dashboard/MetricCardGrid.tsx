import React from 'react';
import { cn } from '@/lib/utils';
import MetricCard, { MetricCardProps } from './MetricCard';
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';

const metricData: MetricCardProps[] = [
  {
    id: 'newAccounts',
    title: 'NEW ACCOUNTS',
    value: '234 %',
    trend: 'up' as const,
    icon: TrendingUp,
    badgeNumber: 58,
    badgeColor: 'bg-primary/20 text-primary',
    lineColor: 'bg-primary',
  },
  {
    id: 'totalExpenses',
    title: 'TOTAL EXPENSES',
    value: '71 %',
    trend: 'down' as const,
    icon: TrendingDown,
    badgeNumber: 62,
    badgeColor: 'bg-destructive/20 text-destructive',
    lineColor: 'bg-destructive',
  },
  {
    id: 'companyValue',
    title: 'COMPANY VALUE',
    valuePrefix: '$',
    value: '1,45M',
    icon: DollarSign,
    badgeNumber: 72,
    badgeColor: 'bg-accentYellow/20 text-accentYellow-foreground', // Assuming accentYellow-foreground for contrast
    lineColor: 'bg-accentYellow',
  },
  {
    id: 'newEmployees',
    title: 'NEW EMPLOYEES',
    valuePrefix: '+',
    value: '34 hires',
    icon: Users,
    badgeNumber: 81,
    badgeColor: 'bg-accentGreen/20 text-accentGreen-foreground', // Assuming accentGreen-foreground for contrast
    lineColor: 'bg-accentGreen',
  },
];

interface MetricCardGridProps {
  className?: string;
}

const MetricCardGrid: React.FC<MetricCardGridProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {metricData.map((metric) => (
        <MetricCard key={metric.id} {...metric} />
      ))}
    </div>
  );
};

export default MetricCardGrid;
