"use client";

import { useUser } from "@clerk/nextjs";
import Layout from "@/components/Layout";
import { Settings, User, Bell, Shield, Database, Palette } from "lucide-react";

const SettingsPage = () => {
  const { user } = useUser();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] dark:text-white">Settings</h1>
            <p className="text-[#646464] dark:text-[#909090] mt-1">
              Manage your account and application preferences
            </p>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
              <User className="h-6 w-6 text-[#651FFF] dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Profile</h2>
              <p className="text-sm text-[#646464] dark:text-[#909090]">Personal settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.fullName || ""}
                className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.emailAddresses?.[0]?.emailAddress || ""}
                className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Department
              </label>
              <select className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
                <option>Engineering</option>
                <option>Design</option>
                <option>Product</option>
                <option>Marketing</option>
                <option>Sales</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
              <Bell className="h-6 w-6 text-[#651FFF] dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Notifications</h2>
              <p className="text-sm text-[#646464] dark:text-[#909090]">Notification settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-[#e9e9e9] dark:border-[#373737] rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-[#212121] dark:text-white">Email notifications</h3>
                <p className="text-xs text-[#646464] dark:text-[#909090]">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-[#e9e9e9] dark:bg-[#373737] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#651FFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#651FFF]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-[#e9e9e9] dark:border-[#373737] rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-[#212121] dark:text-white">Push notifications</h3>
                <p className="text-xs text-[#646464] dark:text-[#909090]">Browser notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-[#e9e9e9] dark:bg-[#373737] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#651FFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#651FFF]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-[#e9e9e9] dark:border-[#373737] rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-[#212121] dark:text-white">Daily reports</h3>
                <p className="text-xs text-[#646464] dark:text-[#909090]">Receive daily performance reports</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[#e9e9e9] dark:bg-[#373737] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#651FFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#651FFF]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
              <Database className="h-6 w-6 text-[#651FFF] dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">System</h2>
              <p className="text-sm text-[#646464] dark:text-[#909090]">System settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Language
              </label>
              <select className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
                <option>English</option>
                <option>Ukrainian</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Time Zone
              </label>
              <select className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
                <option>UTC+0 (London)</option>
                <option>UTC+1 (Berlin)</option>
                <option>UTC+2 (Kyiv)</option>
                <option>UTC-5 (New York)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Date Format
              </label>
              <select className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
              <Shield className="h-6 w-6 text-[#651FFF] dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Security</h2>
              <p className="text-sm text-[#646464] dark:text-[#909090]">Security settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] text-[#212121] dark:text-white rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors">
              Change Password
            </button>
            <button className="w-full px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] text-[#212121] dark:text-white rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors">
              Enable Two-Factor Authentication
            </button>
            <button className="w-full px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] text-[#212121] dark:text-white rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors">
              View Login History
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
