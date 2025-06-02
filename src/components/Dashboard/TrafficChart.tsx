import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { MoreHorizontal, CalendarDays } from 'lucide-react';

const initialChartData = [
  { name: 'Jan 01', websiteBlog: 400, socialMedia: 240 },
  { name: 'Jan 02', websiteBlog: 510, socialMedia: 139 },
  { name: 'Jan 03', websiteBlog: 420, socialMedia: 580 },
  { name: 'Jan 04', websiteBlog: 650, socialMedia: 390 },
  { name: 'Jan 05', websiteBlog: 230, socialMedia: 700 },
  { name: 'Jan 06', websiteBlog: 480, socialMedia: 200 },
  { name: 'Jan 07', websiteBlog: 180, socialMedia: 280 },
  { name: 'Jan 08', websiteBlog: 390, socialMedia: 520 },
  { name: 'Jan 09', websiteBlog: 780, socialMedia: 250 },
  { name: 'Jan 10', websiteBlog: 320, socialMedia: 310 },
  { name: 'Jan 11', websiteBlog: 150, socialMedia: 180 },
  { name: 'Jan 12', websiteBlog: 280, socialMedia: 120 },
];

type TimeRange = '7days' | '30days' | '90days';

const generateRandomData = (numPoints: number) => {
  return Array.from({ length: numPoints }, (_, i) => ({
    name: `Day ${i + 1}`,
    websiteBlog: Math.floor(Math.random() * 700) + 100,
    socialMedia: Math.floor(Math.random() * 600) + 50,
  }));
};

const TrafficChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('7days');
  const [chartData, setChartData] = useState(initialChartData);

  const handleTimeRangeChange = (newRange: TimeRange) => {
    setTimeRange(newRange);
    let points = 12;
    if (newRange === '30days') points = 30;
    if (newRange === '90days') points = 90;
    // For simplicity, we re-use the initial style data for 7 days, otherwise random
    setChartData(newRange === '7days' ? initialChartData : generateRandomData(points)); 
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Traffic Sources</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Website Blog vs Social Media Traffic
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <span>Actions</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Time Range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={timeRange} onValueChange={(value) => handleTimeRangeChange(value as TimeRange)}>
              <DropdownMenuRadioItem value="7days">Last 7 Days</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="30days">Last 30 Days</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="90days">Last 90 Days</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>Custom Range</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="hsl(var(--primary))" 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="hsl(var(--accent-green))" 
                tickLine={false} 
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))', 
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--popover-foreground))', fontWeight: 'bold'}}
              />
              <Legend 
                iconType="circle" 
                wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }}
                formatter={(value) => <span className="text-muted-foreground capitalize">{value.replace(/([A-Z])/g, ' $1')}</span>}
              />
              <Bar dataKey="websiteBlog" yAxisId="left" name="Website Blog" barSize={20} >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                ))}
              </Bar>
              <Line type="monotone" dataKey="socialMedia" yAxisId="right" name="Social Media" strokeWidth={2} stroke="hsl(var(--accent-green))" dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--accent-green))' }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-4">
        <span className="text-xs text-muted-foreground">Updated just now</span>
      </CardFooter>
    </Card>
  );
};

export default TrafficChart;
