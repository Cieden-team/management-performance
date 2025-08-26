"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Layout from "@/components/Layout";
import { MessageSquare, Plus, Search, Filter, Star, Calendar, User } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

// Динамічний рендеринг
export const dynamic = 'force-dynamic';

const FeedbackPage = () => {
  const { user } = useUser();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("date");

  // Отримуємо дані з Convex
  const currentUser = useQuery(api.users.getUserByClerkId, 
    user?.id ? { clerkId: user.id } : "skip"
  );
  
  const feedbacks = useQuery(api.feedback.getFeedbackByUser, 
    currentUser?._id ? { userId: currentUser._id, type: "received" } : "skip"
  );

  // Loading state
  if (!currentUser || !feedbacks) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    );
  }

  // Фільтрація та сортування
  const filteredFeedbacks = feedbacks
    .filter((feedback) => {
      const matchesSearch = 
        feedback.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.category?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "All Categories" || feedback.category === categoryFilter;
      const matchesStatus = statusFilter === "All Statuses" || feedback.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return b.createdAt - a.createdAt;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "category":
          return (a.category || "").localeCompare(b.category || "");
        default:
          return 0;
      }
    });

  // Отримуємо унікальні категорії для фільтра
  const categories = ["All Categories", ...new Set(feedbacks.map(f => f.category).filter(Boolean))];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "communication": return "bg-blue-100 text-blue-700";
      case "leadership": return "bg-purple-100 text-purple-700";
      case "technical": return "bg-green-100 text-green-700";
      case "collaboration": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
            <p className="text-gray-500 mt-2">Manage and review feedback from your team</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Feedback</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="category">Sort by Category</option>
            </select>
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Feedback ({filteredFeedbacks.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((feedback) => (
                <div key={feedback._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start space-x-4">
                    <Avatar src="" alt="User" size="md" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-gray-900">
                            Feedback from User {feedback.fromUserId}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(feedback.category)}`}>
                            {feedback.category}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(feedback.status)}`}>
                            {feedback.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {feedback.rating && renderStars(feedback.rating)}
                          <span className="text-sm text-gray-500">
                            {new Date(feedback.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">{feedback.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No feedback found</h3>
                <p className="text-gray-500">Try adjusting your filters or add new feedback</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
