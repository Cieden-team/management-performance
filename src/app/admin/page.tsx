"use client";

import { useState } from "react";
import { 
  Users, 
  Calendar, 
  Settings, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Database,
  Server,
  HardDrive,
  BarChart3,
  UserPlus,
  Shield
} from "lucide-react";
import AdminSeedButton from "@/components/AdminSeedButton";
import Avatar from "@/components/ui/Avatar";
import Layout from "@/components/Layout";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Active Cycles",
      value: "8",
      change: "+2",
      changeType: "positive" as const,
      icon: Calendar,
    },
    {
      title: "System Health",
      value: "98%",
      change: "+1%",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
    {
      title: "Storage Used",
      value: "2.4GB",
      change: "+0.2GB",
      changeType: "negative" as const,
      icon: HardDrive,
    },
  ];

  const recentUsers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      role: "employee",
      department: "Engineering",
      status: "active",
      avatar: "",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      role: "manager",
      department: "Design",
      status: "active",
      avatar: "",
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob@example.com",
      role: "admin",
      department: "Management",
      status: "inactive",
      avatar: "",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "inactive": return "bg-red-100 text-red-700";
      case "pending": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-[#651FFF] text-white";
      case "manager": return "bg-[#FF9102] text-white";
      case "employee": return "bg-[#646464] text-white";
      default: return "bg-[#646464] text-white";
    }
  };

  const handleViewAllUsers = () => {
    window.location.href = "/team";
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: BarChart3 },
    { id: "users", name: "Users", icon: Users },
    { id: "cycles", name: "Cycles", icon: Calendar },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  return (
    <Layout>
      <div className="min-h-full w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 mt-2 text-lg">
            Manage users, performance cycles, and system settings
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <span
                          className={`text-sm font-medium ${
                            stat.changeType === "negative" ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl">
                      <stat.icon className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">User Management</div>
                    <div className="text-gray-500">Add, edit, delete users</div>
                  </div>
                </div>
                <button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 px-4 py-3 rounded-xl">
                  Manage Users
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Performance Cycles</div>
                    <div className="text-gray-500">Setup and planning</div>
                  </div>
                </div>
                <button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 px-4 py-3 rounded-xl">
                  Manage Cycles
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-purple-50 rounded-xl">
                    <Settings className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">System Settings</div>
                    <div className="text-gray-500">Configuration and parameters</div>
                  </div>
                </div>
                <button className="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200 px-4 py-3 rounded-xl">
                  Configure
                </button>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-semibold text-gray-900">Recently added or updated</h3>
                <button 
                  onClick={handleViewAllUsers}
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <Avatar src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                      <div>
                        <div className="font-medium text-gray-900">{user.email}</div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-3 py-1 text-sm rounded-full ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                          <span className="text-gray-500">{user.department}</span>
                          <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200">
                      <Eye className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status and Quick Functions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">All services are running normally</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Database</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">API</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">File Storage</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently used functions</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200">
                    <UserPlus className="h-6 w-6 text-purple-600" />
                    <span className="text-gray-900 font-medium">Add New User</span>
                  </button>
                  <button className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200">
                    <Calendar className="h-6 w-6 text-purple-600" />
                    <span className="text-gray-900 font-medium">Create Cycle</span>
                  </button>
                  <button className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200">
                    <Shield className="h-6 w-6 text-purple-600" />
                    <span className="text-gray-900 font-medium">Security Settings</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Seed Data Button */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <AdminSeedButton />
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">User Management</h2>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="flex items-center space-x-3 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Plus className="h-5 w-5" />
                <span className="font-semibold">Add User</span>
              </button>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <p className="text-gray-500">User management interface will be implemented here.</p>
            </div>
          </div>
        )}

        {/* Cycles Tab */}
        {activeTab === "cycles" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Performance Cycles</h2>
              <button className="flex items-center space-x-3 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md">
                <Plus className="h-5 w-5" />
                <span className="font-semibold">Create Cycle</span>
              </button>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <p className="text-gray-500">Performance cycles management interface will be implemented here.</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-900">System Settings</h2>
            
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
              <p className="text-gray-500">System settings interface will be implemented here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default AdminPage;
