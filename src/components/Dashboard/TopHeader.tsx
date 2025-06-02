import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Settings, Bell, Grid, ChevronDown, UserCircle, LogOut, CreditCard, LifeBuoy } from 'lucide-react';

const TopHeader: React.FC = () => {
  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-[80px] bg-card text-card-foreground shadow-md',
        'flex items-center justify-between px-6 z-10',
        'left-0 md:left-64' // Full width on small screens, offset by sidebar on medium+ 
      )}
    >
      <div className="flex items-center space-x-4">
        {/* Hamburger for mobile - assuming it would toggle sidebar visibility, not implemented here */}
        {/* <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button> */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-10 w-64 bg-background" />
        </div>

        <nav className="hidden lg:flex items-center space-x-1">
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Mega Menu <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            <Settings className="mr-1 h-4 w-4" /> Settings <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Projects <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Grid className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          {/* Placeholder for flag icon - Lucide doesn't have flags */}
          <span className="text-lg">🇩🇪</span> 
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-1 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://i.pravatar.cc/150?u=alina" alt="Alina Mclourd" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">Alina Mclourd</span>
                <span className="text-xs text-muted-foreground">VP People Manager</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" /> 
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
