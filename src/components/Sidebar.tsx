"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  BarChart3, 
  Target, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Settings, 
  FileText,
  Calendar,
  Shield,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Визначаємо поточну тему
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.body.classList.contains('dark-mode');
      setIsDarkMode(isDark);
    };

    checkTheme();
    
    // Слухаємо зміни теми
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Goals", href: "/goals", icon: Target },
    { name: "Feedback", href: "/feedback", icon: MessageSquare },
    { name: "Feedback Forms", href: "/feedback-forms", icon: FileText },
    { name: "Reviews", href: "/reviews", icon: Calendar },
    { name: "Development", href: "/development", icon: TrendingUp },
    { name: "Team", href: "/team", icon: Users },
    { name: "Cycles", href: "/cycles", icon: Calendar },
    { name: "Admin Panel", href: "/admin", icon: Shield },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Image
                  src={isDarkMode ? "/logoWhite.svg" : "/logoDark.svg"}
                  alt="Cieden Logo"
                  width={100}
                  height={32}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="md:hidden p-1 rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors"
              >
                <X className="h-5 w-5 text-[#646464] dark:text-[#909090]" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 space-y-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-3 rounded-xl font-gilroy font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:transform hover:scale-105"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#F44436] rounded-full"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">N 7 Issues</span>
                <button className="ml-auto text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
