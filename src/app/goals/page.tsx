"use client";

import { useState } from "react";
import { Plus, Search, Filter, Target, Calendar, Tag, Edit, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";

interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  priority: "high" | "medium" | "low";
  status: "active" | "completed" | "paused";
  deadline: string;
  tags: string[];
  type: "personal" | "team" | "company";
}

const GoalsPage = () => {
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showEditGoalModal, setShowEditGoalModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const goals: Goal[] = [
    {
      id: 1,
      title: "Improve UX/UI design skills",
      description: "Develop a deep understanding of UX/UI principles and methodologies",
      progress: 75,
      priority: "high",
      status: "active",
      deadline: "2024-03-15",
      tags: ["UX/UI", "Design", "Skills"],
      type: "personal"
    },
    {
      id: 2,
      title: "Complete AI Design Patterns course",
      description: "Learn the latest approaches to AI product design",
      progress: 100,
      priority: "high",
      status: "completed",
      deadline: "2024-02-01",
      tags: ["AI", "Course", "Design"],
      type: "personal"
    },
    {
      id: 3,
      title: "Prepare for client presentation",
      description: "Improve English for effective communication with international clients",
      progress: 30,
      priority: "medium",
      status: "active",
      deadline: "2024-04-01",
      tags: ["English", "Presentation", "Clients"],
      type: "team"
    },
    {
      id: 4,
      title: "Optimize project management process",
      description: "Implement new tools for effective project management",
      progress: 60,
      priority: "high",
      status: "active",
      deadline: "2024-03-30",
      tags: ["Project Management", "Process", "Optimization"],
      type: "company"
    },
    {
      id: 5,
      title: "Obtain Product Management certification",
      description: "Pass certification to confirm expertise in Product Management",
      progress: 45,
      priority: "medium",
      status: "active",
      deadline: "2024-05-15",
      tags: ["Certification", "Product Management"],
      type: "personal"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-orange-100 text-orange-700";
      case "low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "completed": return "bg-purple-100 text-purple-700";
      case "paused": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "completed": return "Completed";
      case "paused": return "Paused";
      default: return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "High";
      case "medium": return "Medium";
      case "low": return "Low";
      default: return priority;
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowEditGoalModal(true);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Goals & OKR</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage your goals and objective key results
            </p>
          </div>
          <button
            onClick={() => setShowAddGoalModal(true)}
            className="flex items-center space-x-3 bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="h-5 w-5" />
            <span className="font-semibold">Add Goal</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search goals..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-200"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200">
              <Filter className="h-4 w-4" />
              <span>All Statuses</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200">
              <Target className="h-4 w-4" />
              <span>All Types</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200">
              <Tag className="h-4 w-4" />
              <span>All Priorities</span>
            </button>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                    {getPriorityText(goal.priority)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(goal.status)}`}>
                    {getStatusText(goal.status)}
                  </span>
                </div>
                <button
                  onClick={() => handleEditGoal(goal)}
                  className="text-[#646464] dark:text-[#909090] hover:text-[#212121] dark:hover:text-white"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-semibold text-[#212121] dark:text-white">{goal.title}</h3>
                <p className="text-sm text-[#646464] dark:text-[#909090]">{goal.description}</p>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#646464] dark:text-[#909090]">Progress</span>
                    <span className="font-medium text-[#212121] dark:text-white">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-[#e9e9e9] dark:bg-[#373737] rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        goal.status === "completed" ? "bg-[#8AC34A]" : "bg-[#651FFF]"
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center space-x-2 text-sm text-[#646464] dark:text-[#909090]">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {goal.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-[#f0e9ff] dark:bg-[#651FFF] text-[#651FFF] dark:text-white rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#000319] rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Add New Goal</h2>
              <button
                onClick={() => setShowAddGoalModal(false)}
                className="text-[#646464] dark:text-[#909090] hover:text-[#212121] dark:hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                  Goal Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                  placeholder="Enter goal title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                  rows={3}
                  placeholder="Enter goal description"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                    Priority
                  </label>
                  <select className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="flex-1 px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] text-[#212121] dark:text-white bg-white dark:bg-[#000319] rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1ce6] transition-colors"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Goal Modal */}
      {showEditGoalModal && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#000319] rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Edit Goal</h2>
              <button
                onClick={() => setShowEditGoalModal(false)}
                className="text-[#646464] dark:text-[#909090] hover:text-[#212121] dark:hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                  Goal Title
                </label>
                <input
                  type="text"
                  defaultValue={selectedGoal.title}
                  className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={selectedGoal.description}
                  className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                  rows={3}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                    Priority
                  </label>
                  <select defaultValue={selectedGoal.priority} className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                    Status
                  </label>
                  <select defaultValue={selectedGoal.status} className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white">
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditGoalModal(false)}
                  className="flex-1 px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] text-[#212121] dark:text-white bg-white dark:bg-[#000319] rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1ce6] transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default GoalsPage;
