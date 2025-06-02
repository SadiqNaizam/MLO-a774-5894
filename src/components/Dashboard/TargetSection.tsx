import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Settings, TrendingUp, TrendingDown } from 'lucide-react';

interface TargetItem {
  id: string;
  title: string;
  value: number;
  targetLabel: string;
  colorClass: string; // Tailwind color class for progress bar e.g. "bg-primary"
}

interface TargetStat {
  id: string;
  label: string;
  value: string;
  percentageChange: string;
  trend: 'up' | 'down' | 'neutral';
}

const targetStatsData: TargetStat[] = [
  { id: 'income', label: 'Income', value: '$5,456', percentageChange: '+14%', trend: 'up' as const },
  { id: 'expenses', label: 'Expenses', value: '$4,764', percentageChange: '-8%', trend: 'down' as const }, // 'down' trend for expenses means positive
  { id: 'spendings', label: 'Spendings', value: '$1.5M', percentageChange: '+15%', trend: 'up' as const }, // Assuming +15% is the desired display
  { id: 'totals', label: 'Totals', value: '$31,564', percentageChange: '+76%', trend: 'up' as const },
];

const progressData: TargetItem[] = [
  { id: 'incomeTarget', title: '71%', value: 71, targetLabel: 'Income Target', colorClass: 'bg-destructive' }, // Red
  { id: 'expensesTarget', title: '54%', value: 54, targetLabel: 'Expenses Target', colorClass: 'bg-accentGreen' }, // Green
  { id: 'spendingsTarget', title: '32%', value: 32, targetLabel: 'Spendings Target', colorClass: 'bg-accentYellow' }, // Yellow
  { id: 'totalsTarget', title: '89%', value: 89, targetLabel: 'Totals Target', colorClass: 'bg-primary' }, // Blue
];

const TargetSection: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Target Section</CardTitle>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <CardDescription>Overview of key financial targets and their progress.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Section for dollar values and percentages (like Income, Expenses, etc.) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 mb-6">
          {targetStatsData.map((stat) => {
            const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : null;
            const trendColor = stat.trend === 'up' ? 'text-accentGreen' : stat.trend === 'down' ? 'text-destructive' : 'text-muted-foreground';
            return (
              <div key={stat.id}>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    {TrendIcon && (
                        <span className={cn("text-sm font-medium flex items-center", trendColor)}>
                            <TrendIcon className="h-4 w-4 mr-1" />
                            {stat.percentageChange}
                        </span>
                    )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Section for progress bars */}
        <div className="space-y-6">
          {progressData.map((item) => (
            <div key={item.id}>
              <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-card-foreground">{item.title}</span>
                <span className="text-sm text-muted-foreground">{item.targetLabel}</span>
              </div>
              <Progress value={item.value} className="h-2" indicatorClassName={item.colorClass} />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-4">
        <Button variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  );
};

export default TargetSection;
