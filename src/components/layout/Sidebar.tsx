import React from 'react';
import SidebarNav from '../Dashboard/SidebarNav';

// SidebarProps might be extended in the future if Sidebar needs to pass specific props to SidebarNav
// or if Sidebar itself needs to be styled/controlled externally.
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  // The SidebarNav component (from context code) already implements all necessary styling and logic,
  // including fixed positioning, width (w-64), height (h-screen), background (bg-sidebar),
  // and text colors (text-sidebar-foreground), as per the project's layout requirements.
  // This Sidebar component acts as a clean structural wrapper.
  return <SidebarNav />;
};

export default Sidebar;
