import React from 'react';
import { Home, ChevronRight, Info, Printer, CalendarDays, ChevronDown } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

// Project components - use relative paths as per instructions
import MainAppLayout from '../components/layout/MainAppLayout';
import MetricCardGrid from '../components/Dashboard/MetricCardGrid';
import TrafficChart from '../components/Dashboard/TrafficChart';
import IncomeWidget from '../components/Dashboard/IncomeWidget';
import TargetSection from '../components/Dashboard/TargetSection';

const DashboardOverviewPage: React.FC = () => {
  return (
    <MainAppLayout title="Minimal Dashboard - Overview">
      {/* Page Header: Title, Breadcrumbs and Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Minimal Dashboard
          </h1>
          <nav aria-label="breadcrumb">
            <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
              <li>
                <a href="#dashboard" className="hover:text-primary flex items-center">
                  <Home className="h-4 w-4 mr-1.5 flex-shrink-0" />
                  <span>Dashboards</span>
                </a>
              </li>
              <li>
                <ChevronRight className="h-4 w-4" />
              </li>
              <li aria-current="page" className="font-medium text-foreground">
                Minimal Dashboard Example
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-card hover:bg-muted">
            <CalendarDays className="mr-2 h-4 w-4" />
            Select period
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-card hover:bg-muted">
            <Printer className="h-4 w-4" />
            <span className="sr-only">Print</span>
          </Button>
        </div>
      </div>

      {/* Informational Alert */}
      <Alert className="border-primary/30 bg-primary/10 text-primary">
        <Info className="h-5 w-5 flex-shrink-0" /> {/* Icon color will be inherited from text-primary on Alert */}
        <AlertDescription>
          This dashboard example was created using only the available elements and components, no additional SCSS was written!
        </AlertDescription>
      </Alert>

      {/* Metric Cards */}
      <MetricCardGrid />

      {/* Charts and Widgets Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <TrafficChart className="lg:col-span-2" />
        <IncomeWidget className="lg:col-span-1" />
      </div>

      {/* Target Section */}
      <TargetSection />
    </MainAppLayout>
  );
};

export default DashboardOverviewPage;
