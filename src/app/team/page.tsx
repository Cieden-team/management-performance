"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Layout from "@/components/Layout";
import { Users, Plus, Search, Filter, Mail, Phone, MapPin, Calendar, Clock } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

const TeamPage = () => {
  const { user } = useUser();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("name");

  // Отримуємо користувачів з Convex
  const users = useQuery(api.users.getAllUsers) || [];

  // Фільтрація та сортування
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch = 
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.position?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = departmentFilter === "All Departments" || user.department === departmentFilter;
      const matchesStatus = statusFilter === "All Statuses" || (statusFilter === "Active" ? user.isActive : !user.isActive);
      
      return matchesSearch && matchesDepartment && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case "department":
          return (a.department || "").localeCompare(b.department || "");
        case "leader":
          return (a.leader || "").localeCompare(b.leader || "");
        case "experience":
          return (a.experienceStarted || "").localeCompare(b.experienceStarted || "");
        default:
          return 0;
      }
    });

  // Отримуємо унікальні відділи для фільтра
  const departments = ["All Departments", ...new Set(users.map(u => u.department).filter(Boolean))];

  // Функція для розрахунку досвіду
  const calculateExperience = (startDate: string) => {
    if (!startDate) return "N/A";
    
    try {
      const start = new Date(startDate);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - start.getTime());
      const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
      const diffMonths = Math.floor((diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      
      if (diffYears > 0) {
        return `${diffYears} year${diffYears > 1 ? 's' : ''}${diffMonths > 0 ? ` ${diffMonths} month${diffMonths > 1 ? 's' : ''}` : ''}`;
      } else {
        return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
      }
    } catch {
      return "N/A";
    }
  };

  const getStatusColor = (status: boolean) => {
    return status ? "bg-[#8AC34A] text-white" : "bg-[#646464] text-white";
  };

  const getStatusText = (status: boolean) => {
    return status ? "Active" : "Inactive";
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-[#F44436] text-white";
      case "manager": return "bg-purple-600 text-white";
      case "employee": return "bg-[#646464] text-white";
      default: return "bg-[#646464] text-white";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "admin": return "Administrator";
      case "manager": return "Manager";
      case "employee": return "Employee";
      default: return role;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Team - Live Data</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Team management and employees ({filteredUsers.length} people) - Real-time from Convex
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-3 px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="h-5 w-5" />
            <span className="font-semibold">Add Employee</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-200"
            />
          </div>
          <div className="flex gap-3">
            <select 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-700"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-700"
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-700"
            >
              <option value="name">Sort by Name</option>
              <option value="department">Sort by Department</option>
              <option value="leader">Sort by Leader</option>
              <option value="experience">Sort by Experience</option>
            </select>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((member) => (
            <div key={member._id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-start space-x-4">
                <Avatar
                  src={member.avatar}
                  alt={`${member.firstName} ${member.lastName}`}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {member.firstName} {member.lastName}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(member.isActive)}`}>
                      {getStatusText(member.isActive)}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-[#651FFF] mb-1">
                    {member.position}
                  </p>
                  
                  <p className="text-sm text-gray-500 mb-2">
                    {member.department}
                  </p>

                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(member.role)} mb-3 inline-block`}>
                    {getRoleText(member.role)}
                  </span>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    
                    {member.leader && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span className="truncate">Leader: {member.leader}</span>
                      </div>
                    )}
                    
                    {member.joinedCieden && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Joined: {member.joinedCieden}</span>
                      </div>
                    )}
                    
                    {member.experienceStarted && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Exp: {calculateExperience(member.experienceStarted)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button 
                      onClick={() => setSelectedMember(member)}
                      className="flex-1 px-3 py-2 text-sm bg-[#f0e9ff] dark:bg-purple-600 text-[#651FFF] dark:text-white rounded-lg hover:bg-[#e9d5ff] dark:hover:bg-[#5b1ce6] transition-colors"
                    >
                      Profile
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm border border-gray-100 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#f0e9ff] dark:bg-purple-600 rounded-lg">
                <Users className="h-6 w-6 text-[#651FFF] dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{filteredUsers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#8AC34A] text-white rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredUsers.filter(m => m.isActive).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#f0e9ff] dark:bg-purple-600 rounded-lg">
                <Users className="h-6 w-6 text-[#651FFF] dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Departments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(filteredUsers.map(m => m.department).filter(Boolean)).size}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#FF9102] text-white rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Managers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {filteredUsers.filter(m => m.role === "manager" || m.role === "admin").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Member Side Panel */}
        {showAddModal && (
          <div className="fixed right-0 top-0 h-full w-[28rem] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
              <div className="p-6 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Add Employee</h2>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <span className="text-2xl text-gray-500">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="First name"
                        className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Last name"
                        className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white text-gray-900"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@cieden.com"
                      className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      placeholder="Product Designer"
                      className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white text-gray-900"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Department
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white text-gray-900">
                      <option>Design</option>
                      <option>Sales</option>
                      <option>Product</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Talent Management</option>
                      <option>CEO</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Role
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white text-gray-900">
                      <option>employee</option>
                      <option>manager</option>
                      <option>admin</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-100 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-[#5b1ce6] transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Member Profile Modal */}
        {selectedMember && (
          <div className="fixed right-0 top-0 h-full w-[28rem] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Employee Profile</h2>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="text-2xl text-gray-500">&times;</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <Avatar
                  src={selectedMember.avatar}
                  alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                  size="xl"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </h3>
                  <p className="text-[#651FFF] font-medium">{selectedMember.position}</p>
                  <p className="text-gray-500">{selectedMember.department}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-500">
                  <Mail className="h-4 w-4" />
                  <span>{selectedMember.email}</span>
                </div>
                
                {selectedMember.leader && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>Leader: {selectedMember.leader}</span>
                  </div>
                )}
                
                {selectedMember.joinedCieden && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Started at Cieden: {selectedMember.joinedCieden}</span>
                  </div>
                )}
                
                {selectedMember.experienceStarted && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Total Experience: {calculateExperience(selectedMember.experienceStarted)}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Role:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(selectedMember.role)}`}>
                    {getRoleText(selectedMember.role)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedMember.isActive)}`}>
                    {getStatusText(selectedMember.isActive)}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="flex-1 px-4 py-2 border border-gray-100 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-[#5b1ce6] transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TeamPage;
