"use client";

import { Bell, Menu, Search, Moon, Sun } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Завантажуємо збережену тему при старті
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    // За замовчуванням світла тема
    let initialTheme = 'light';
    if (savedTheme) {
      initialTheme = savedTheme;
    }
    
    // Встановлюємо тему
    const isDark = initialTheme === 'dark';
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    console.log('Switching theme to:', newMode ? 'dark' : 'light'); // Для перевірки
    
    // Змінюємо клас на body
    if (newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 w-full sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Search (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium transition-all duration-300"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                3
              </span>
            </button>

            {/* Simple Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 text-gray-900 dark:text-white hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* User Info and Button */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  All Team
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  team@company.com
                </p>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
