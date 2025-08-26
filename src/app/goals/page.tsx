"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Search, Filter, Target, Calendar, Tag, Edit, Trash2, CheckCircle, ChevronDown, Star } from "lucide-react";
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
  
  // State для пошуку та фільтрів
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  
  // State для dropdown меню
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  // State для анімацій та фідбеку
  const [showCompletionToast, setShowCompletionToast] = useState<boolean>(false);
  const [completedGoalTitle, setCompletedGoalTitle] = useState<string>("");

  const [goals, setGoals] = useState<Goal[]>([
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
  ]);

  // Додаємо CSS стилі для повзунка з покращеними анімаціями
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .progress-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 10px;
        border-radius: 5px;
        background: #e5e7eb;
        outline: none;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .progress-slider:hover {
        transform: scaleY(1.2);
      }
      
      .progress-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #9333EA;
        cursor: pointer;
        border: 3px solid white;
        box-shadow: 0 4px 8px rgba(147, 51, 234, 0.3);
        transition: all 0.2s ease;
      }
      
      .progress-slider::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(147, 51, 234, 0.4);
      }
      
      .progress-slider::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #9333EA;
        cursor: pointer;
        border: 3px solid white;
        box-shadow: 0 4px 8px rgba(147, 51, 234, 0.3);
        transition: all 0.2s ease;
      }
      
      .progress-slider::-moz-range-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 12px rgba(147, 51, 234, 0.4);
      }
      
      .progress-slider:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
      }
      
      .progress-slider.completed::-webkit-slider-thumb {
        background: #8AC34A;
        box-shadow: 0 4px 8px rgba(138, 195, 74, 0.3);
      }
      
      .progress-slider.completed::-webkit-slider-thumb:hover {
        box-shadow: 0 6px 12px rgba(138, 195, 74, 0.4);
      }
      
      .progress-slider.completed::-moz-range-thumb {
        background: #8AC34A;
        box-shadow: 0 4px 8px rgba(138, 195, 74, 0.3);
      }
      
      .progress-slider.completed::-moz-range-thumb:hover {
        box-shadow: 0 6px 12px rgba(138, 195, 74, 0.4);
      }

      .completion-toast {
        animation: slideInFromTop 0.5s ease-out;
      }

      @keyframes slideInFromTop {
        from {
          transform: translateY(-100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      .progress-bar-animation {
        transition: width 0.5s ease-out;
      }

      .goal-card-completed {
        animation: pulse 2s ease-in-out;
      }

      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.02);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Функція для відтворення звуку досягнення
  const playCompletionSound = () => {
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
      audio.volume = 0.3;
      audio.play();
    } catch (error) {
      console.log('Audio playback not supported');
    }
  };

  // Функція для показу toast повідомлення
  const displayCompletionToast = (goalTitle: string) => {
    setCompletedGoalTitle(goalTitle);
    setShowCompletionToast(true);
    playCompletionSound();
    
    setTimeout(() => {
      setShowCompletionToast(false);
    }, 4000);
  };

  // Фільтрація цілей
  const filteredGoals = useMemo(() => {
    return goals.filter(goal => {
      const matchesSearch = 
        goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        goal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        goal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === "All Statuses" || goal.status === statusFilter.toLowerCase();
      const matchesType = typeFilter === "All Types" || goal.type === typeFilter.toLowerCase();
      const matchesPriority = priorityFilter === "All Priorities" || goal.priority === priorityFilter.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });
  }, [goals, searchTerm, statusFilter, typeFilter, priorityFilter]);

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

  const getTypeText = (type: string) => {
    switch (type) {
      case "personal": return "Personal";
      case "team": return "Team";
      case "company": return "Company";
      default: return type;
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowEditGoalModal(true);
  };

  // Покращена функція для оновлення прогресу цілі
  const handleProgressChange = (goalId: number, newProgress: number) => {
    setGoals(prevGoals => 
      prevGoals.map(goal => {
        if (goal.id === goalId) {
          const wasCompleted = goal.status === "completed";
          const willBeCompleted = newProgress >= 100;
          
          const updatedGoal = {
            ...goal,
            progress: newProgress,
            status: willBeCompleted ? "completed" : (wasCompleted && newProgress < 100 ? "active" : goal.status)
          };

          // Показуємо toast тільки якщо ціль щойно досягнута
          if (!wasCompleted && willBeCompleted) {
            setTimeout(() => displayCompletionToast(goal.title), 100);
          }

          return updatedGoal;
        }
        return goal;
      })
    );
  };

  // Закриття dropdown при кліку поза ним
  useEffect(() => {
    const handleClickOutside = () => {
      setShowStatusDropdown(false);
      setShowTypeDropdown(false);
      setShowPriorityDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Completion Toast */}
        {showCompletionToast && (
          <div className="fixed top-4 right-4 z-50 completion-toast">
            <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg flex items-center space-x-3">
              <CheckCircle className="h-6 w-6" />
              <div>
                <div className="font-semibold">🎉 Goal Completed!</div>
                <div className="text-sm opacity-90">{completedGoalTitle}</div>
              </div>
            </div>
          </div>
        )}

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-200"
            />
          </div>
          
          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowStatusDropdown(!showStatusDropdown);
              }}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 min-w-[140px]"
            >
              <Filter className="h-4 w-4" />
              <span>{statusFilter}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {showStatusDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {["All Statuses", "Active", "Completed", "Paused"].map((status) => (
                  <button
                    key={status}
                    onClick={(e) => {
                      e.stopPropagation();
                      setStatusFilter(status);
                      setShowStatusDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Type Filter */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTypeDropdown(!showTypeDropdown);
              }}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 min-w-[120px]"
            >
              <Target className="h-4 w-4" />
              <span>{typeFilter}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {showTypeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {["All Types", "Personal", "Team", "Company"].map((type) => (
                  <button
                    key={type}
                    onClick={(e) => {
                      e.stopPropagation();
                      setTypeFilter(type);
                      setShowTypeDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Priority Filter */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPriorityDropdown(!showPriorityDropdown);
              }}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200 min-w-[140px]"
            >
              <Tag className="h-4 w-4" />
              <span>{priorityFilter}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {showPriorityDropdown && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {["All Priorities", "High", "Medium", "Low"].map((priority) => (
                  <button
                    key={priority}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPriorityFilter(priority);
                      setShowPriorityDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {priority}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-500">
          Showing {filteredGoals.length} of {goals.length} goals
          {searchTerm && ` for "${searchTerm}"`}
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => (
            <div 
              key={goal.id} 
              className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
                goal.status === "completed" ? "goal-card-completed" : ""
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                    {getPriorityText(goal.priority)}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(goal.status)} flex items-center gap-1`}>
                    {goal.status === "completed" && <CheckCircle className="h-3 w-3" />}
                    {getStatusText(goal.status)}
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {getTypeText(goal.type)}
                  </span>
                </div>
                <button
                  onClick={() => handleEditGoal(goal)}
                  className="text-gray-500 hover:text-[#212121] dark:hover:text-white transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                <p className="text-sm text-gray-500">{goal.description}</p>

                {/* Interactive Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-900">{goal.progress}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-[#e9e9e9] dark:bg-[#373737] rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full progress-bar-animation ${
                        goal.status === "completed" ? "bg-[#8AC34A]" : "bg-purple-600"
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>

                  {/* Interactive Slider */}
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={goal.progress}
                      onChange={(e) => handleProgressChange(goal.id, parseInt(e.target.value))}
                      className={`progress-slider ${goal.status === "completed" ? "completed" : ""}`}
                      style={{
                        background: `linear-gradient(to right, ${goal.status === "completed" ? "#8AC34A" : "#9333EA"} 0%, ${goal.status === "completed" ? "#8AC34A" : "#9333EA"} ${goal.progress}%, #e5e7eb ${goal.progress}%, #e5e7eb 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Completion Message */}
                  {goal.status === "completed" && (
                    <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg mt-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Goal completed! 🎉</span>
                    </div>
                  )}
                </div>

                {/* Deadline */}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {goal.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-[#f0e9ff] dark:bg-purple-600 text-[#651FFF] dark:text-white rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGoals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Target className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No goals found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Add New Goal</h2>
              <button
                onClick={() => setShowAddGoalModal(false)}
                className="text-gray-500 hover:text-[#212121] dark:hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Goal Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900"
                  placeholder="Enter goal title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900"
                  rows={3}
                  placeholder="Enter goal description"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Priority
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddGoalModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-900 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Edit Goal</h2>
              <button
                onClick={() => setShowEditGoalModal(false)}
                className="text-gray-500 hover:text-[#212121] dark:hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Goal Title
                </label>
                <input
                  type="text"
                  defaultValue={selectedGoal.title}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={selectedGoal.description}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900"
                  rows={3}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Priority
                  </label>
                  <select defaultValue={selectedGoal.priority} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Status
                  </label>
                  <select defaultValue={selectedGoal.status} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900">
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
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-900 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
