"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { MessageSquare, Plus, Filter, Search, Calendar, Star, User, Send, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Layout from "@/components/Layout";
import Avatar from "@/components/ui/Avatar";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { mockFeedbacks, getUserFullName, getUserById } from "@/lib/mockData";

const FeedbackPage = () => {
  const { user } = useUser();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending": return "bg-orange-100 text-orange-700";
      case "draft": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "pending": return "Pending";
      case "draft": return "Draft";
      default: return status;
    }
  };

  const filteredFeedbacks = mockFeedbacks.filter(feedback => {
    const matchesSearch = feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getUserFullName(feedback.fromUserId).toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getUserFullName(feedback.toUserId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || feedback.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Feedback</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Give and receive feedback from team members
            </p>
          </div>
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="flex items-center space-x-3 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus className="h-5 w-5" />
            <span className="font-semibold">Give Feedback</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all duration-200"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-gray-700"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="communication">Communication</option>
            <option value="leadership">Leadership</option>
            <option value="collaboration">Collaboration</option>
          </select>
        </div>

        {/* Feedback Details Side Panel */}
        {selectedFeedback && (
          <div className="fixed right-0 top-0 h-full w-[28rem] bg-white dark:bg-[#000319] shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Feedback Details</h2>
                <button 
                  onClick={() => setSelectedFeedback(null)}
                  className="p-2 hover:bg-[#f8f9fa] dark:hover:bg-[#373737] rounded-lg transition-colors"
                >
                  <span className="text-2xl text-[#646464] dark:text-[#909090]">&times;</span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar src={getUserById(selectedFeedback.fromUserId)?.avatar} alt={getUserFullName(selectedFeedback.fromUserId)} />
                  <div className="font-medium text-[#212121] dark:text-white">
                    {getUserFullName(selectedFeedback.fromUserId)}
                  </div>
                  <span className="text-[#646464] dark:text-[#909090]">→</span>
                  <Avatar src={getUserById(selectedFeedback.toUserId)?.avatar} alt={getUserFullName(selectedFeedback.toUserId)} />
                  <div className="font-medium text-[#212121] dark:text-white">
                    {getUserFullName(selectedFeedback.toUserId)}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-[#646464] dark:text-[#909090] mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                                         <span>{new Date(selectedFeedback.date).toLocaleDateString()}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedFeedback.status)}`}>
                    {getStatusText(selectedFeedback.status)}
                  </span>
                </div>
                
                <div className="p-4 bg-[#f8f9fa] dark:bg-[#373737] rounded-lg">
                  <p className="text-[#212121] dark:text-white">{selectedFeedback.comment}</p>
                </div>
                
                <div className="flex items-center text-sm text-[#646464] dark:text-[#909090]">
                  <Star className="h-4 w-4 text-[#FF9102] mr-1" />
                  <span>Rating: {selectedFeedback.rating}/7</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeedbacks.map((feedback) => (
            <div 
              key={feedback.id} 
              className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedFeedback(feedback)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar src={getUserById(feedback.fromUserId)?.avatar} alt={getUserFullName(feedback.fromUserId)} />
                  <div>
                    <div className="font-medium text-[#212121] dark:text-white">
                      {getUserFullName(feedback.fromUserId)}
                    </div>
                    <div className="text-sm text-[#646464] dark:text-[#909090]">
                      to {getUserFullName(feedback.toUserId)}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(feedback.status)}`}>
                  {getStatusText(feedback.status)}
                </span>
              </div>
              
              <p className="text-[#212121] dark:text-white line-clamp-2 mb-4">{feedback.comment}</p>
              
              <div className="flex items-center justify-between text-sm text-[#646464] dark:text-[#909090]">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-[#FF9102]" />
                  <span>{feedback.rating}/7</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                                     <span>{new Date(feedback.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFeedbacks.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-[#646464] dark:text-[#909090] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#212121] dark:text-white mb-2">No feedback found</h3>
            <p className="text-[#646464] dark:text-[#909090] mb-4">
              {searchTerm || filterCategory !== "all" 
                ? "Try adjusting your search or filters"
                : "Start by giving feedback to your team members"
              }
            </p>
            {!searchTerm && filterCategory === "all" && (
              <button
                onClick={() => setShowFeedbackForm(true)}
                className="px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1ce6] transition-colors"
              >
                Give First Feedback
              </button>
            )}
          </div>
        )}

        {/* Feedback Form Side Panel */}
        {showFeedbackForm && (
          <div className="fixed right-0 top-0 h-full w-[28rem] bg-white dark:bg-[#000319] shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Give Feedback</h2>
                <button 
                  onClick={() => setShowFeedbackForm(false)}
                  className="p-2 hover:bg-[#f8f9fa] dark:hover:bg-[#373737] rounded-lg transition-colors"
                >
                  <span className="text-2xl text-[#646464] dark:text-[#909090]">&times;</span>
                </button>
              </div>
              
                             <FeedbackForm 
                               isOpen={showFeedbackForm} 
                               onClose={() => setShowFeedbackForm(false)} 
                               onSubmit={() => setShowFeedbackForm(false)} 
                               onCancel={() => setShowFeedbackForm(false)} 
                             />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FeedbackPage;
