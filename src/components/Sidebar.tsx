"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
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
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Link href="/dashboard">
                <Image
                  src="/logoDark.svg"
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
                className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-purple-50 text-purple-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#e9e9e9] dark:border-[#373737]">
            <div className="bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#F44436] rounded-full"></div>
                <span className="text-sm font-medium text-[#212121] dark:text-white">N 7 Issues</span>
                <button className="ml-auto text-[#646464] dark:text-[#909090] hover:text-[#212121] dark:hover:text-white">
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
