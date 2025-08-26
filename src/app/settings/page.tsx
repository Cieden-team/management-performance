"use client";

import { useUser } from "@clerk/nextjs";
import Layout from "@/components/Layout";
import { Settings, User, Bell, Shield, Database, Palette } from "lucide-react";

const SettingsPage = () => {
  const { user } = useUser();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage your account and application preferences
            </p>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-purple-50 rounded-2xl">
              <User className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
              <p className="text-gray-500">Personal settings</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Full Name
              </label>
              <input
                type="text"
                defaultValue={user?.fullName || ""}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.emailAddresses?.[0]?.emailAddress || ""}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Department
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-700">
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
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-purple-50 rounded-2xl">
              <Bell className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Notifications</h2>
              <p className="text-gray-500">Notification settings</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Email notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Push notifications</h3>
                <p className="text-sm text-gray-500">Browser notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#651FFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#651FFF]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Daily reports</h3>
                <p className="text-xs text-[#646464] dark:text-[#909090]">Receive daily performance reports</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#651FFF] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#651FFF]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Database className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">System</h2>
              <p className="text-sm text-[#646464] dark:text-[#909090]">System settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Language
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white text-gray-900">
                <option>English</option>
                <option>Ukrainian</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Time Zone
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white text-gray-900">
                <option>UTC+0 (London)</option>
                <option>UTC+1 (Berlin)</option>
                <option>UTC+2 (Kyiv)</option>
                <option>UTC-5 (New York)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Date Format
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white text-gray-900">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Security</h2>
              <p className="text-sm text-[#646464] dark:text-[#909090]">Security settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <button className="w-full px-4 py-2 border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
              Change Password
            </button>
            <button className="w-full px-4 py-2 border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
              Enable Two-Factor Authentication
            </button>
            <button className="w-full px-4 py-2 border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
              View Login History
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
