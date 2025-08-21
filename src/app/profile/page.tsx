"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Layout from "@/components/Layout";

import { User, Star, Award, FileText, TrendingUp, MessageSquare, X } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { mockFeedbacks } from "@/lib/data";

const ProfilePage = () => {
  const { user } = useUser();
  const [showEditModal, setShowEditModal] = useState(false);

  // Mock current user data
  const currentUser = {
    firstName: "All",
    lastName: "Team",
    email: "team@cieden.com",
    avatar: "",
    role: "admin",
    department: "Management",
    position: "Team Manager",
    rating: 6.2,
    achievements: 3,
    goals: [
      {
        id: 1,
        title: "Improve Team Communication",
        progress: 75,
        status: "active"
      },
      {
        id: 2,
        title: "Complete Project on Time",
        progress: 45,
        status: "active"
      }
    ],
    feedbacks: mockFeedbacks.slice(0, 3)
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] dark:text-white">My Profile</h1>
            <p className="text-[#646464] dark:text-[#909090] mt-1">
              Manage your personal information and performance
            </p>
          </div>
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1ce6] transition-colors"
          >
            <User className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Profile Overview */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-start space-x-6">
            <Avatar src={currentUser.avatar} alt={`${currentUser.firstName} ${currentUser.lastName}`} size="xl" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p className="text-[#646464] dark:text-[#909090]">{currentUser.email}</p>
              <p className="text-sm text-[#646464] dark:text-[#909090] mt-1">{currentUser.position} • {currentUser.department}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Rating */}
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
                <Star className="h-6 w-6 text-[#651FFF] dark:text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#212121] dark:text-white">Overall Rating</h3>
                <p className="text-sm text-[#646464] dark:text-[#909090]">This month</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-[#212121] dark:text-white">{currentUser.rating}/7</div>
              <div className="text-sm text-[#646464] dark:text-[#909090]">points</div>
            </div>
            
            <div className="flex items-center justify-between text-sm mt-4">
              <span className="text-[#646464] dark:text-[#909090]">Progress</span>
              <span className="font-medium text-[#212121] dark:text-white">+0.8</span>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
                <Award className="h-6 w-6 text-[#651FFF] dark:text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#212121] dark:text-white">Achievements</h3>
                <p className="text-sm text-[#646464] dark:text-[#909090]">This month</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-[#212121] dark:text-white">{currentUser.achievements}</div>
              <div className="text-sm text-[#646464] dark:text-[#909090]">achievements</div>
            </div>
            
            <div className="space-y-2 mt-4">
              <div className="text-sm text-[#646464] dark:text-[#909090]">
                • Led successful project delivery
              </div>
              <div className="text-sm text-[#646464] dark:text-[#909090]">
                • Mentored junior developers
              </div>
              <div className="text-sm text-[#646464] dark:text-[#909090]">
                • Improved team communication
              </div>
            </div>
          </div>

          {/* Recent Feedback */}
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
                <FileText className="h-6 w-6 text-[#651FFF] dark:text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#212121] dark:text-white">Recent Feedback</h3>
              </div>
            </div>
            
            {currentUser.feedbacks.length > 0 ? (
              <div className="space-y-3">
                <div className="p-3 bg-[#f8f9fa] dark:bg-[#373737] rounded-lg">
                  <div className="flex items-center justify-between text-sm mb-2">
                                          <span className="text-gray-600 dark:text-gray-400">Date:</span>
                      <span className="text-gray-900 dark:text-white">
                                             {new Date(currentUser.feedbacks[0].createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[#646464] dark:text-[#909090]">Manager:</span>
                    <span className="text-[#212121] dark:text-white">Jane Smith</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#646464] dark:text-[#909090]">Rating:</span>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < currentUser.feedbacks[0].rating ? "text-[#FF9102] fill-[#FF9102]" : "text-[#e9e9e9] dark:text-[#373737]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#646464] dark:text-[#909090]">No recent feedback</p>
            )}
          </div>
        </div>

        {/* Development Plan */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
              <TrendingUp className="h-6 w-6 text-[#651FFF] dark:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#212121] dark:text-white">Development Plan</h3>
            </div>
          </div>
          
          <div className="space-y-4">
            {currentUser.goals.map((goal) => (
              <div key={goal.id} className="p-4 border border-[#e9e9e9] dark:border-[#373737] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-[#212121] dark:text-white">{goal.title}</h4>
                  <span className="text-sm text-[#646464] dark:text-[#909090]">{goal.status}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#646464] dark:text-[#909090]">Progress:</span>
                  <span className="font-medium text-[#212121] dark:text-white">{goal.progress}%</span>
                </div>
                <div className="w-full bg-[#e9e9e9] dark:bg-[#373737] rounded-full h-2 mt-2">
                  <div 
                    className="bg-[#651FFF] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Feedback */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
              <MessageSquare className="h-6 w-6 text-[#651FFF] dark:text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#212121] dark:text-white">Request Feedback</h3>
              <p className="text-sm text-[#646464] dark:text-[#909090]">Get feedback from colleagues</p>
            </div>
          </div>
          
          <button className="w-full px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1ce6] transition-colors">
            Request Feedback
          </button>
        </div>

        {/* Edit Profile Side Panel */}
        {showEditModal && (
          <div className="fixed right-0 top-0 h-full w-[28rem] bg-white dark:bg-[#000319] shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Edit Profile</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-[#f8f9fa] dark:hover:bg-[#373737] rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-[#646464] dark:text-[#909090]" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.firstName}
                    className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.lastName}
                    className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.position}
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
              
              <div className="flex space-x-3 mt-6">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-[#e9e9e9] dark:border-[#373737] text-[#212121] dark:text-white rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1ce6] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
