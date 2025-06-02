import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Settings, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';

interface IncomeWidgetProps {
  percentage: number;
  targetLabel: string;
  targetValue: string;
  targetTrend: 'up' | 'down';
  targetPercentage: string;
  className?: string;
}

const incomeData: IncomeWidgetProps = {
  percentage: 75,
  targetLabel: 'Spendings Target',
  targetValue: '$12,495',
  targetTrend: 'up' as const,
  targetPercentage: '32%',
};

const IncomeWidget: React.FC<IncomeWidgetProps & {className?: string}> = ({
  percentage,
  targetLabel,
  targetValue,
  targetTrend,
  targetPercentage,
  className,
}) => {
  const chartData = [{ name: 'Income', value: percentage, fill: 'hsl(var(--primary))' }];
  const TrendIcon = targetTrend === 'up' ? TrendingUp : TrendingDown;

  return (
    <Card className={cn('shadow-sm hover:shadow-md transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Income</CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-4 pb-8">
        <div className="h-[180px] w-[180px] relative mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              barSize={12}
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                background={{ fill: 'hsl(var(--muted))' }}
                dataKey="value"
                cornerRadius={6}
                angleAxisId={0}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs text-muted-foreground">Percent</span>
            <span className="text-4xl font-bold text-card-foreground">{percentage}</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">{targetPercentage} {targetLabel}</p>
          {/* <div className="flex items-center justify-center mt-1">
            <span className="text-xl font-semibold text-card-foreground">{targetValue}</span>
            <TrendIcon className={cn(
              'ml-1 h-4 w-4',
              targetTrend === 'up' ? 'text-accentGreen' : 'text-destructive'
            )} />
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
};

// Default export that uses the predefined data
const IncomeWidgetContainer: React.FC<{className?: string}> = ({ className }) => {
    return <IncomeWidget {...incomeData} className={className} />
};

export default IncomeWidgetContainer;
