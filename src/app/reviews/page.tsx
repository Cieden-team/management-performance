"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FileText, Calendar, Star, User, Clock, CheckCircle, AlertCircle, TrendingUp, BarChart3 } from "lucide-react";
import Layout from "@/components/Layout";
import Avatar from "@/components/ui/Avatar";
import { mockUsers, getUserFullName, getUserById } from "@/lib/mockData";

const ReviewsPage = () => {
  const { user } = useUser();
  const [selectedReview, setSelectedReview] = useState<Record<string, unknown> | null>(null);

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      employeeId: "user1",
      managerId: "user2",
      reviewDate: "2024-01-15",
      status: "completed",
      rating: 6.5,
      comment: "Excellent performance this quarter. Shows strong leadership and technical skills.",
      goals: ["Improve team communication", "Complete project on time"],
      achievements: ["Led successful project delivery", "Mentored junior developers"]
    },
    {
      id: 2,
      employeeId: "user3",
      managerId: "user1",
      reviewDate: "2024-01-20",
      status: "pending",
      rating: 0,
      comment: "",
      goals: ["Enhance technical skills", "Improve documentation"],
      achievements: []
    },
    {
      id: 3,
      employeeId: "user2",
      managerId: "user1",
      reviewDate: "2024-01-25",
      status: "scheduled",
      rating: 0,
      comment: "",
      goals: ["Lead team initiatives", "Improve process efficiency"],
      achievements: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending": return "bg-orange-100 text-orange-700";
      case "scheduled": return "bg-purple-100 text-purple-700";
      case "overdue": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "pending": return "Pending";
      case "scheduled": return "Scheduled";
      case "overdue": return "Overdue";
      default: return status;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 7 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-orange-500 fill-orange-500" : "text-gray-200"
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Performance Reviews</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Manage and track performance reviews
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{mockReviews.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-green-500 text-white rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockReviews.filter(r => r.status === "completed").length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-orange-500 text-white rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockReviews.filter(r => r.status === "scheduled").length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockReviews.filter(r => r.rating > 0).length > 0 
                    ? (mockReviews.filter(r => r.rating > 0).reduce((acc, r) => acc + r.rating, 0) / mockReviews.filter(r => r.rating > 0).length).toFixed(1)
                    : "0.0"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedReview(review)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar src={getUserById(review.employeeId)?.avatar} alt={getUserFullName(review.employeeId)} />
                  <div>
                    <div className="font-medium text-gray-900">
                      {getUserFullName(review.employeeId)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Reviewed by {getUserFullName(review.managerId)}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(review.status)}`}>
                  {getStatusText(review.status)}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Review Date:</span>
                  <span className="text-gray-900">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </span>
                </div>
                
                {review.rating > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Rating:</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                      <span className="ml-1 text-sm text-gray-500">{review.rating}/7</span>
                    </div>
                  </div>
                )}
                
                {review.comment && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">{review.comment}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Details Side Panel */}
        {selectedReview && (
          <div className="fixed right-0 top-0 h-full w-[28rem] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Review Details</h2>
                <button 
                  onClick={() => setSelectedReview(null)}
                  className="p-2 hover:bg-[#f8f9fa] dark:hover:bg-[#373737] rounded-lg transition-colors"
                >
                  <span className="text-2xl text-gray-500">&times;</span>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Avatar src={getUserById(selectedReview.employeeId as string)?.avatar} alt={getUserFullName(selectedReview.employeeId as string)} />
                  <div>
                    <div className="font-medium text-gray-900">
                      {getUserFullName(selectedReview.employeeId as string)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Employee
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Avatar src={getUserById(selectedReview.managerId as string)?.avatar} alt={getUserFullName(selectedReview.managerId as string)} />
                  <div>
                    <div className="font-medium text-gray-900">
                      {getUserFullName(selectedReview.managerId as string)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Manager
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(selectedReview.reviewDate as string).toLocaleDateString()}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedReview.status as string)}`}>
                    {getStatusText(selectedReview.status as string)}
                  </span>
                </div>
                
                {(selectedReview.rating as number) > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Overall Rating</h3>
                    <div className="flex items-center space-x-2">
                      {renderStars(selectedReview.rating as number)}
                      <span className="text-sm text-gray-500">{(selectedReview.rating as number)}/7</span>
                    </div>
                  </div>
                )}
                
                {(selectedReview.comment as string) && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Comments</h3>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-900">{selectedReview.comment as string}</p>
                    </div>
                  </div>
                )}
                
                {(selectedReview.goals as string[])?.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Goals</h3>
                    <ul className="space-y-1">
                      {(selectedReview.goals as string[]).map((goal, index) => (
                        <li key={index} className="text-sm text-gray-500 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#651FFF] rounded-full"></div>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(selectedReview.achievements as string[])?.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Achievements</h3>
                    <ul className="space-y-1">
                      {(selectedReview.achievements as string[]).map((achievement, index) => (
                        <li key={index} className="text-sm text-gray-500 flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-[#8AC34A]" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ReviewsPage;
