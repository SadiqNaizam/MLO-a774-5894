import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  LayoutDashboard,
  BarChart2,
  ShoppingCart,
  DollarSign,
  Users,
  Briefcase,
  Settings2,
  LayoutGrid,
  ClipboardList,
  PieChart,
  ChevronDown,
  ChevronRight,
  FileText, // For Pages & Applications
  Layers // For UI Components, more generic
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  isPrimary?: boolean; // For main dashboard links
  children?: NavItem[];
}

const navigationData: NavItem[] = [
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: LayoutDashboard,
    isPrimary: true,
    children: [
      { id: 'analytics', label: 'Analytics', href: '#/analytics', icon: BarChart2 },
      { id: 'commerce', label: 'Commerce', href: '#/commerce', icon: ShoppingCart },
      { id: 'sales', label: 'Sales', href: '#/sales', icon: DollarSign },
      {
        id: 'minimal',
        label: 'Minimal',
        icon: LayoutGrid, // Using LayoutGrid for Minimal
        children: [
          { id: 'variation1', label: 'Variation 1', href: '#/minimal/v1', icon: PieChart, isPrimary: true }, // Make Variation 1 visually primary
          { id: 'variation2', label: 'Variation 2', href: '#/minimal/v2', icon: PieChart },
        ],
      },
    ],
  },
  { id: 'crm', label: 'CRM', icon: Users, href: '#/crm' },
  {
    id: 'pages',
    label: 'Pages',
    icon: FileText,
    children: [{ id: 'login', label: 'Login', href: '#/login', icon: Users }],
  },
  {
    id: 'applications',
    label: 'Applications',
    icon: Briefcase,
    children: [{ id: 'calendar', label: 'Calendar', href: '#/calendar', icon: Briefcase }],
  },
];

const secondaryNavSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'UI COMPONENTS',
    items: [
      { id: 'elements', label: 'Elements', icon: Layers, href: '#/ui/elements' },
      { id: 'components', label: 'Components', icon: Layers, href: '#/ui/components' },
      { id: 'tables', label: 'Tables', icon: LayoutGrid, href: '#/ui/tables' },
    ],
  },
  {
    title: 'DASHBOARD WIDGETS',
    items: [
      { id: 'chartboxes1', label: 'Chart Boxes 1', icon: BarChart2, href: '#/widgets/chartboxes1' },
      { id: 'chartboxes2', label: 'Chart Boxes 2', icon: BarChart2, href: '#/widgets/chartboxes2' },
      { id: 'profileboxes', label: 'Profile Boxes', icon: Users, href: '#/widgets/profileboxes' },
    ],
  },
  {
    title: 'FORMS',
    items: [
      { id: 'formelements', label: 'Elements', icon: ClipboardList, href: '#/forms/elements' },
      { id: 'formwidgets', label: 'Widgets', icon: ClipboardList, href: '#/forms/widgets' },
    ],
  },
  {
    title: 'CHARTS',
    items: [
      { id: 'chartjs', label: 'ChartJS', icon: PieChart, href: '#/charts/chartjs' },
      { id: 'apexcharts', label: 'Apex Charts', icon: PieChart, href: '#/charts/apexcharts' },
    ],
  },
];

interface SidebarNavItemProps {
  item: NavItem;
  activePath: string;
  setActivePath: (path: string) => void;
  level?: number;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, activePath, setActivePath, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(item.children ? activePath.startsWith(item.id) : false);
  const isActive = item.href === activePath || (item.isPrimary && item.id === 'minimal' && activePath.startsWith('/minimal/v1'));

  const handleItemClick = () => {
    if (item.href) {
      setActivePath(item.href);
    }
    if (item.children) {
      setIsOpen(!isOpen);
    }
  };

  const paddingLeftClass = `pl-${4 + level * 4}`;

  if (item.children) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start items-center text-sm font-medium rounded-md hover:bg-sidebar-accent',
              paddingLeftClass,
              isActive || (isOpen && !item.href) ? 'bg-sidebar-accent text-sidebar-primary-foreground' : 'text-sidebar-foreground',
            )}
            onClick={handleItemClick}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className="flex-1 text-left">{item.label}</span>
            {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-1">
          {item.children.map((child) => (
            <SidebarNavItem key={child.id} item={child} activePath={activePath} setActivePath={setActivePath} level={level + 1} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button
      variant={isActive && item.isPrimary ? 'default' : 'ghost'}
      className={cn(
        'w-full justify-start items-center text-sm font-medium rounded-md',
        paddingLeftClass,
        isActive ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-sidebar-foreground hover:bg-sidebar-accent',
        item.isPrimary && isActive && 'font-semibold'
      )}
      onClick={handleItemClick}
      asChild={!!item.href}
    >
      {item.href ? (
        <a href={item.href}>
          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
          {item.label}
        </a>
      ) : (
        <>
          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
          {item.label}
        </>
      )}
    </Button>
  );
};

const SidebarNav: React.FC = () => {
  const [activePath, setActivePath] = useState('#/minimal/v1'); // Default active path

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-sidebar text-sidebar-foreground flex flex-col shadow-lg z-20">
      <div className="h-[80px] flex items-center px-6 border-b border-sidebar-border">
        <LayoutDashboard className="h-8 w-8 mr-2 text-sidebar-primary" />
        <h1 className="text-2xl font-bold text-sidebar-foreground">Architect</h1>
      </div>
      <ScrollArea className="flex-1">
        <nav className="py-4 px-3 space-y-1">
          <h2 className="px-4 pt-2 pb-1 text-xs font-semibold uppercase text-sidebar-muted-foreground tracking-wider">Menu</h2>
          {navigationData.map((item) => (
            <SidebarNavItem key={item.id} item={item} activePath={activePath} setActivePath={setActivePath} />
          ))}

          {secondaryNavSections.map((section) => (
            <div key={section.title} className="pt-4">
              <h2 className="px-4 pt-2 pb-1 text-xs font-semibold uppercase text-sidebar-muted-foreground tracking-wider">
                {section.title}
              </h2>
              {section.items.map((item) => (
                <SidebarNavItem key={item.id} item={item} activePath={activePath} setActivePath={setActivePath} />
              ))}
            </div>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-sidebar-border">
        <Button variant="outline" className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
          <Settings2 className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </aside>
  );
};

export default SidebarNav;
