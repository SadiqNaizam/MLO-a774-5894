import React from 'react';
import TopHeader from '../Dashboard/TopHeader';

// HeaderProps might be extended if Header needs to pass specific props to TopHeader
// or if Header itself needs external styling/control.
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  // The TopHeader component (from context code) encapsulates its styling and functionality.
  // This includes fixed positioning (top-0), height (h-[80px]), background (bg-card),
  // shadow (shadow-md), and a responsive left offset ('left-0 md:left-64') to accommodate the sidebar.
  // It aligns with the header layout requirements, using 'bg-card' as the surface color.
  // This Header component is a structural wrapper.
  return <TopHeader />;
};

export default Header;
