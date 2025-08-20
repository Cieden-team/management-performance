"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex">
        {/* Fixed Sidebar */}
        <div className="hidden md:block">
          <Sidebar isOpen={true} onClose={() => {}} />
        </div>
        
        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-64">
          {/* Header */}
          <Header onMenuClick={() => setSidebarOpen(true)} />
          
          {/* Page Content */}
          <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
