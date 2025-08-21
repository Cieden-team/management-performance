"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { FileText, Calendar, Star, User, Clock, CheckCircle, AlertCircle, TrendingUp, BarChart3 } from "lucide-react";
import Layout from "@/components/Layout";
import Avatar from "@/components/ui/Avatar";
import { mockUsers, getUserFullName, getUserById } from "@/lib/mockData";

const ReviewsPage = () => {
  const { user } = useUser();
  const [selectedReview, setSelectedReview] = useState<typeof mockReviews[0] | null>(null);

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
      case "completed": return "bg-[#8AC34A] text-white";
      case "pending": return "bg-[#FF9102] text-white";
      case "scheduled": return "bg-[#651FFF] text-white";
      case "overdue": return "bg-[#F44436] text-white";
      default: return "bg-[#646464] text-white";
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
          i < rating ? "text-[#FF9102] fill-[#FF9102]" : "text-[#e9e9e9] dark:text-[#373737]"
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] dark:text-white">Performance Reviews</h1>
            <p className="text-[#646464] dark:text-[#909090] mt-1">
              Manage and track performance reviews
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
                <FileText className="h-6 w-6 text-[#651FFF] dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-[#646464] dark:text-[#909090]">Total Reviews</p>
                <p className="text-2xl font-bold text-[#212121] dark:text-white">{mockReviews.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-[#8AC34A] text-white rounded-lg">
                <CheckCircle className="h-6 w-6 text-[#8AC34A] dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-[#646464] dark:text-[#909090]">Completed</p>
                <p className="text-2xl font-bold text-[#212121] dark:text-white">
                  {mockReviews.filter(r => r.status === "completed").length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-[#FF9102] text-white rounded-lg">
                <Clock className="h-6 w-6 text-[#FF9102] dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-[#646464] dark:text-[#909090]">Scheduled</p>
                <p className="text-2xl font-bold text-[#212121] dark:text-white">
                  {mockReviews.filter(r => r.status === "scheduled").length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
                <BarChart3 className="h-6 w-6 text-[#651FFF] dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-[#646464] dark:text-[#909090]">Average Rating</p>
                <p className="text-2xl font-bold text-[#212121] dark:text-white">
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
              className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedReview(review)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar src={getUserById(review.employeeId)?.avatar} alt={getUserFullName(review.employeeId)} />
                  <div>
                    <div className="font-medium text-[#212121] dark:text-white">
                      {getUserFullName(review.employeeId)}
                    </div>
                    <div className="text-sm text-[#646464] dark:text-[#909090]">
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
                  <span className="text-[#646464] dark:text-[#909090]">Review Date:</span>
                  <span className="text-[#212121] dark:text-white">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </span>
                </div>
                
                {review.rating > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#646464] dark:text-[#909090]">Rating:</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                      <span className="ml-1 text-sm text-[#646464] dark:text-[#909090]">{review.rating}/7</span>
                    </div>
                  </div>
                )}
                
                {review.comment && (
                  <div className="p-3 bg-[#f8f9fa] dark:bg-[#373737] rounded-lg">
                    <p className="text-sm text-[#212121] dark:text-white">{review.comment}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Details Side Panel */}
        {selectedReview && (
          <div className="fixed right-0 top-0 h-full w-[28rem] bg-white dark:bg-[#000319] shadow-2xl transform transition-transform duration-300 ease-in-out z-50">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Review Details</h2>
                <button 
                  onClick={() => setSelectedReview(null)}
                  className="p-2 hover:bg-[#f8f9fa] dark:hover:bg-[#373737] rounded-lg transition-colors"
                >
                  <span className="text-2xl text-[#646464] dark:text-[#909090]">&times;</span>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Avatar src={getUserById(selectedReview.employeeId as string)?.avatar} alt={getUserFullName(selectedReview.employeeId as string)} />
                  <div>
                    <div className="font-medium text-[#212121] dark:text-white">
                      {getUserFullName(selectedReview.employeeId as string)}
                    </div>
                    <div className="text-sm text-[#646464] dark:text-[#909090]">
                      Employee
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Avatar src={getUserById(selectedReview.managerId as string)?.avatar} alt={getUserFullName(selectedReview.managerId as string)} />
                  <div>
                    <div className="font-medium text-[#212121] dark:text-white">
                      {getUserFullName(selectedReview.managerId as string)}
                    </div>
                    <div className="text-sm text-[#646464] dark:text-[#909090]">
                      Manager
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-[#646464] dark:text-[#909090] mb-2">
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
                    <h3 className="font-medium text-[#212121] dark:text-white mb-2">Overall Rating</h3>
                    <div className="flex items-center space-x-2">
                      {renderStars(selectedReview.rating as number)}
                      <span className="text-sm text-[#646464] dark:text-[#909090]">{(selectedReview.rating as number)}/7</span>
                    </div>
                  </div>
                )}
                
                {(selectedReview.comment as string) && (
                  <div>
                    <h3 className="font-medium text-[#212121] dark:text-white mb-2">Comments</h3>
                    <div className="p-3 bg-[#f8f9fa] dark:bg-[#373737] rounded-lg">
                      <p className="text-sm text-[#212121] dark:text-white">{selectedReview.comment as string}</p>
                    </div>
                  </div>
                )}
                
                {(selectedReview.goals as string[])?.length > 0 && (
                  <div>
                    <h3 className="font-medium text-[#212121] dark:text-white mb-2">Goals</h3>
                    <ul className="space-y-1">
                      {(selectedReview.goals as string[]).map((goal, index) => (
                        <li key={index} className="text-sm text-[#646464] dark:text-[#909090] flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#651FFF] rounded-full"></div>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(selectedReview.achievements as string[])?.length > 0 && (
                  <div>
                    <h3 className="font-medium text-[#212121] dark:text-white mb-2">Achievements</h3>
                    <ul className="space-y-1">
                      {(selectedReview.achievements as string[]).map((achievement, index) => (
                        <li key={index} className="text-sm text-[#646464] dark:text-[#909090] flex items-center space-x-2">
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
