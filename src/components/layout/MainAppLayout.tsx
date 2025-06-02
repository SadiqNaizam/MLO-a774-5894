import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode; // Content to be rendered within the main layout area
  title?: string; // Optional title for the page, can be used for document.title or a header element if needed
  className?: string; // Allows additional custom styling for the <main> content viewport element
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, title, className }) => {
  // This component orchestrates the overall application layout using fixed Sidebar and Header.

  // Sidebar (via Sidebar.tsx -> SidebarNav.tsx) characteristics:
  // - Fixed position: top-0, left-0
  // - Dimensions: w-64 (width), h-screen (height)
  // - Stacking: z-20 (typically higher than header if they could overlap without proper layout)

  // Header (via Header.tsx -> TopHeader.tsx) characteristics:
  // - Fixed position: top-0
  // - Dimensions: h-[80px] (height)
  // - Horizontal positioning (responsive, from TopHeader.tsx):
  //   - Small screens (<md): left-0, right-0 (full viewport width, overlays Sidebar)
  //   - Medium screens and up (md+): left-64, right-0 (positioned to the right of the Sidebar)
  // - Stacking: z-10

  // The <main> content area needs appropriate padding to prevent overlap by the fixed Sidebar and Header.

  React.useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <div className="h-screen bg-background">
      {/* Sidebar and Header are fixed positioned and rendered as siblings to main content area */}
      <Sidebar />
      <Header />
      
      {/* Main content viewport: responsible for its own scrolling and padding. */}
      <main
        className={cn(
          "h-screen overflow-y-auto", // Ensures the main area can scroll and fills viewport height.
          "pt-[80px]",                 // Padding-top to account for the fixed Header (height: 80px).
          "md:pl-64",                  // Padding-left for fixed Sidebar (width: w-64) on md+ screens.
                                     // On smaller screens (<md), pl-0; content is full-width beneath Header
                                     // and will visually flow under the Sidebar (which Header also overlays).
          "bg-background",             // Base background color for the content area.
          className                    // Allows consumers to pass additional Tailwind classes.
        )}
      >
        {/* Inner div to apply consistent padding around the page content, as per mainContent.layout requirements ("p-6") */}
        <div className="p-6">
          {/* Container for the children, applying flex column layout and gap as per mainContent.container requirements */}
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
