"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Layout from "@/components/Layout";
import { Users, Plus, Search, Filter, Mail, Phone, MapPin } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

const TeamPage = () => {
  const { user } = useUser();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  
  // Повний список команди Cieden (32 співробітники)
  const teamMembers = [
    {
      _id: "1",
      firstName: "Yuriy",
      lastName: "Mykhasyak",
      email: "yuriy@cieden.com",
      position: "CEO & Co-founder",
      department: "Leadership",
      role: "admin",
      isActive: true,
      avatar: "",
    },
    {
      _id: "2",
      firstName: "Iryna",
      lastName: "Serednia",
      email: "iryna@cieden.com",
      position: "Design Director, Co-founder",
      department: "Design",
      role: "admin",
      isActive: true,
      avatar: "",
    },
    {
      _id: "3",
      firstName: "Kateryna",
      lastName: "Zavertailo",
      email: "kateryna@cieden.com",
      position: "Sales Manager",
      department: "Sales",
      role: "manager",
      isActive: true,
      avatar: "",
    },
    {
      _id: "4",
      firstName: "Roman",
      lastName: "Kaminechny",
      email: "roman@cieden.com",
      position: "Head of Design Department",
      department: "Design",
      role: "manager",
      isActive: true,
      avatar: "",
    },
    {
      _id: "5",
      firstName: "Anastasiya",
      lastName: "Mudryk",
      email: "anastasiya@cieden.com",
      position: "Head of PM/BA",
      department: "Product Management",
      role: "manager",
      isActive: true,
      avatar: "",
    },
    {
      _id: "6",
      firstName: "Olesia",
      lastName: "Havryshko",
      email: "olesia@cieden.com",
      position: "Product Manager/Business Analyst",
      department: "Product Management",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "7",
      firstName: "Tetiana",
      lastName: "Bondarchuk",
      email: "tetiana.b@cieden.com",
      position: "Product Manager/Business Analyst",
      department: "Product Management",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "8",
      firstName: "Yulia",
      lastName: "Mahera",
      email: "yulia@cieden.com",
      position: "Product Manager/Business Analyst",
      department: "Product Management",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "9",
      firstName: "Andrew",
      lastName: "Sapkowski",
      email: "andrew@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "10",
      firstName: "Denis",
      lastName: "Dudar",
      email: "denis@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "11",
      firstName: "Valentyn",
      lastName: "Skliarov",
      email: "valentyn@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "12",
      firstName: "Daria",
      lastName: "Novosiadla",
      email: "daria@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "13",
      firstName: "Tetiana",
      lastName: "Zakus",
      email: "tetiana.z@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "14",
      firstName: "Maksym",
      lastName: "Gozhelsky",
      email: "maksym.g@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "15",
      firstName: "Oksana",
      lastName: "Veskera",
      email: "oksana@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "16",
      firstName: "Demian",
      lastName: "Peretiatko",
      email: "demian@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "17",
      firstName: "Marta",
      lastName: "Kacharaba",
      email: "marta@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "18",
      firstName: "Iryna",
      lastName: "Mykytenko",
      email: "iryna.m@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "19",
      firstName: "Volodymyr",
      lastName: "Merlenko",
      email: "volodymyr@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "20",
      firstName: "Iryna",
      lastName: "Tanavska",
      email: "iryna.t@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "21",
      firstName: "Yuliia",
      lastName: "Braslavska",
      email: "yuliia@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "22",
      firstName: "Vladyslav",
      lastName: "Pianov",
      email: "vladyslav@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "23",
      firstName: "Maksym",
      lastName: "Vertsanov",
      email: "maksym.v@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "24",
      firstName: "Khrystyna",
      lastName: "Nych",
      email: "khrystyna@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "25",
      firstName: "Illia",
      lastName: "Suprun",
      email: "illia@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "26",
      firstName: "Dmytro",
      lastName: "Chyzh",
      email: "dmytro@cieden.com",
      position: "Product Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "27",
      firstName: "Bohdana",
      lastName: "Levochko",
      email: "bohdana@cieden.com",
      position: "Lead Generation / Account Manager",
      department: "Sales",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "28",
      firstName: "Taras",
      lastName: "Kunanets",
      email: "taras@cieden.com",
      position: "Lead Generation Manager",
      department: "Sales",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "29",
      firstName: "Daya",
      lastName: "Danyliv",
      email: "daya@cieden.com",
      position: "Graphic Designer",
      department: "Design",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "30",
      firstName: "Tamara",
      lastName: "Zhostka",
      email: "tamara@cieden.com",
      position: "Marketing Manager",
      department: "Marketing",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "31",
      firstName: "Tetiana",
      lastName: "Korol",
      email: "tetiana.k@cieden.com",
      position: "Marketing Manager",
      department: "Marketing",
      role: "employee",
      isActive: true,
      avatar: "",
    },
    {
      _id: "32",
      firstName: "Natalia",
      lastName: "Antonyshyn",
      email: "natalia@cieden.com",
      position: "Accountant",
      department: "Finance",
      role: "employee",
      isActive: true,
      avatar: "",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-[#8AC34A] text-white";
      case "inactive": return "bg-[#646464] text-white";
      case "away": return "bg-[#FF9102] text-white";
      default: return "bg-[#646464] text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "inactive": return "Inactive";
      case "away": return "Away";
      default: return status;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-[#F44436] text-white";
      case "manager": return "bg-[#651FFF] text-white";
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] dark:text-white">Team</h1>
            <p className="text-[#646464] dark:text-[#909090] mt-1">
              Team management and employees ({teamMembers.length} people)
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1ce6] transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#646464] dark:text-[#909090]" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white placeholder-[#646464] dark:placeholder-[#909090]"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
              <option>All Departments</option>
              <option>Leadership</option>
              <option>Design</option>
              <option>Sales</option>
              <option>Product Management</option>
              <option>Marketing</option>
              <option>Finance</option>
            </select>
            <select className="px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Away</option>
            </select>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member._id} className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <Avatar
                  src={member.avatar}
                  alt={`${member.firstName} ${member.lastName}`}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-[#212121] dark:text-white truncate">
                      {member.firstName} {member.lastName}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(member.isActive ? "active" : "inactive")}`}>
                      {getStatusText(member.isActive ? "active" : "inactive")}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-[#651FFF] mb-1">
                    {member.position}
                  </p>
                  
                  <p className="text-sm text-[#646464] dark:text-[#909090] mb-2">
                    {member.department}
                  </p>

                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(member.role)} mb-3 inline-block`}>
                    {getRoleText(member.role)}
                  </span>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-[#646464] dark:text-[#909090]">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-[#646464] dark:text-[#909090]">
                      <MapPin className="h-4 w-4" />
                      <span>Kyiv</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <button 
                      onClick={() => setSelectedMember(member)}
                      className="flex-1 px-3 py-2 text-sm bg-[#f0e9ff] dark:bg-[#651FFF] text-[#651FFF] dark:text-white rounded-lg hover:bg-[#e9d5ff] dark:hover:bg-[#5b1ce6] transition-colors"
                    >
                      Profile
                    </button>
                    <button className="flex-1 px-3 py-2 text-sm border border-[#e9e9e9] dark:border-[#373737] text-[#646464] dark:text-[#909090] rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors">
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
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
                <Users className="h-6 w-6 text-[#651FFF] dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-[#646464] dark:text-[#909090]">Total Employees</p>
                <p className="text-2xl font-bold text-[#212121] dark:text-white">{teamMembers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-[#8AC34A] text-white rounded-lg">
                <Users className="h-6 w-6 text-[#8AC34A] dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-[#646464] dark:text-[#909090]">Active</p>
                <p className="text-2xl font-bold text-[#212121] dark:text-white">
                  {teamMembers.filter(m => m.isActive).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
                <Users className="h-6 w-6 text-[#651FFF] dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-[#646464] dark:text-[#909090]">Departments</p>
                <p className="text-2xl font-bold text-[#212121] dark:text-white">
                  {new Set(teamMembers.map(m => m.department)).size}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-[#FF9102] text-white rounded-lg">
                <Users className="h-6 w-6 text-[#FF9102] dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-[#646464] dark:text-[#909090]">Managers</p>
                <p className="text-2xl font-bold text-[#212121] dark:text-white">
                  {teamMembers.filter(m => m.role === "manager" || m.role === "admin").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Member Side Panel */}
        {showAddModal && (
          <div className="fixed right-0 top-0 h-full w-[28rem] bg-white dark:bg-[#000319] shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
              <div className="p-6 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Add Employee</h2>
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-[#f8f9fa] dark:hover:bg-[#373737] rounded-lg transition-colors"
                  >
                    <span className="text-2xl text-[#646464] dark:text-[#909090]">&times;</span>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="First name"
                        className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Last name"
                        className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="email@cieden.com"
                      className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      placeholder="Product Designer"
                      className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                      Department
                    </label>
                    <select className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
                      <option>Design</option>
                      <option>Sales</option>
                      <option>Product Management</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Leadership</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                      Role
                    </label>
                    <select className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
                      <option>employee</option>
                      <option>manager</option>
                      <option>admin</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] text-[#646464] dark:text-[#909090] rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1ce6] transition-colors">
                    Add
                  </button>
                </div>
              </div>
            </div>
        )}

        {/* Member Profile Modal */}
        {selectedMember && (
          <div className="fixed right-0 top-0 h-full w-[28rem] bg-white dark:bg-[#000319] shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Employee Profile</h2>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="p-2 hover:bg-[#f8f9fa] dark:hover:bg-[#373737] rounded-lg transition-colors"
                >
                  <span className="text-2xl text-[#646464] dark:text-[#909090]">&times;</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <Avatar
                  src={selectedMember.avatar}
                  alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                  size="xl"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#212121] dark:text-white">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </h3>
                  <p className="text-[#651FFF] font-medium">{selectedMember.position}</p>
                  <p className="text-[#646464] dark:text-[#909090]">{selectedMember.department}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#646464] dark:text-[#909090]">
                  <Mail className="h-4 w-4" />
                  <span>{selectedMember.email}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-[#646464] dark:text-[#909090]">
                  <MapPin className="h-4 w-4" />
                  <span>Kyiv, Ukraine</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-[#646464] dark:text-[#909090]">Role:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(selectedMember.role)}`}>
                    {getRoleText(selectedMember.role)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-[#646464] dark:text-[#909090]">Status:</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedMember.isActive ? "active" : "inactive")}`}>
                    {getStatusText(selectedMember.isActive ? "active" : "inactive")}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="flex-1 px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] text-[#646464] dark:text-[#909090] rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1ce6] transition-colors">
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
