"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Layout from "@/components/Layout";
import { Calendar, Plus, Clock, Users, CheckCircle, AlertCircle, TrendingUp } from "lucide-react";

const CyclesPage = () => {
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Мокові дані циклів продуктивності
  const performanceCycles = [
    {
      id: "1",
      name: "Q1 2024 Performance Review",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "completed",
      participants: 32,
      completedReviews: 32,
      averageRating: 6.8,
      description: "First quarter performance review 2024"
    },
    {
      id: "2",
      name: "Q2 2024 Performance Review",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      status: "active",
      participants: 32,
      completedReviews: 18,
      averageRating: 6.5,
      description: "Second quarter performance review 2024"
    },
    {
      id: "3",
      name: "Q3 2024 Performance Review",
      startDate: "2024-07-01",
      endDate: "2024-09-30",
      status: "planned",
      participants: 32,
      completedReviews: 0,
      averageRating: 0,
      description: "Third quarter performance review 2024"
    },
    {
      id: "4",
      name: "Q4 2024 Performance Review",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      status: "planned",
      participants: 32,
      completedReviews: 0,
      averageRating: 0,
      description: "Fourth quarter performance review 2024"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "active": return "bg-purple-100 text-purple-700";
      case "planned": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "active": return "Active";
      case "planned": return "Planned";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "active": return Clock;
      case "planned": return Calendar;
      default: return Calendar;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Performance Cycles</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Management of periodic performance reviews
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-3 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            <span>Create Cycle</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Cycles</p>
                <p className="text-2xl font-bold text-gray-900">{performanceCycles.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-50 rounded-xl">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-gray-900">
                  {performanceCycles.filter(c => c.status === "active").length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {performanceCycles.filter(c => c.status === "completed").length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Participants</p>
                <p className="text-2xl font-bold text-gray-900">
                  {performanceCycles.reduce((acc, cycle) => acc + cycle.participants, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cycles List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {performanceCycles.map((cycle) => {
            const IconComponent = getStatusIcon(cycle.status);
            const progress = cycle.participants > 0 ? (cycle.completedReviews / cycle.participants) * 100 : 0;
            
            return (
              <div key={cycle.id} className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-50 rounded-xl">
                      <IconComponent className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{cycle.name}</h3>
                      <p className="text-gray-500">{cycle.description}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(cycle.status)}`}>
                    {getStatusText(cycle.status)}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Period:</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(cycle.startDate).toLocaleDateString()} - {new Date(cycle.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Participants:</span>
                    <span className="text-gray-900 font-medium">{cycle.participants}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Completed Reviews:</span>
                    <span className="text-gray-900 font-medium">{cycle.completedReviews}</span>
                  </div>
                  
                  {cycle.averageRating > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Average Rating:</span>
                      <span className="text-gray-900 font-medium">{cycle.averageRating}/7</span>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-gray-900 font-medium">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <button className="flex-1 px-4 py-3 text-sm bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md">
                    View Details
                  </button>
                  {cycle.status === "active" && (
                    <button className="flex-1 px-4 py-3 text-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200">
                      Manage
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Create Cycle Side Panel */}
        {showCreateModal && (
          <div className="fixed right-0 top-0 h-full w-[28rem] bg-white dark:bg-[#000319] shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
              <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Create New Cycle</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-[#f8f9fa] dark:hover:bg-[#373737] rounded-lg transition-colors"
                >
                  <span className="text-2xl text-[#646464] dark:text-[#909090]">&times;</span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                    Cycle Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Q3 2024 Performance Review"
                    className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Performance cycle description..."
                    rows={3}
                    className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] text-[#646464] dark:text-[#909090] rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1ce6] transition-colors">
                  Create
                </button>
              </div>
              </div>
            </div>
        )}
      </div>
    </Layout>
  );
};

export default CyclesPage;
