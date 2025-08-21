"use client";

import { MessageSquare, Star } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

interface Feedback {
  id: number;
  fromUserId: string;
  toUserId: string;
  message: string;
  rating: number;
  category: string;
  createdAt: string;
}

interface FeedbackReceivedCardProps {
  feedbacks?: Feedback[];
}

const FeedbackReceivedCard: React.FC<FeedbackReceivedCardProps> = ({ feedbacks = [] }) => {
  const safeFeedbacks = feedbacks || [];
  const averageRating = safeFeedbacks.length > 0
    ? safeFeedbacks.reduce((acc, f) => acc + f.rating, 0) / safeFeedbacks.length
    : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-[#FF9102] fill-[#FF9102]" : "text-[#e9e9e9] dark:text-[#373737]"
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Feedback Received</h2>
            <p className="text-gray-500">Feedback for the semester</p>
          </div>
        </div>
      </div>

      {/* Average Rating */}
      <div className="mb-8 p-6 bg-purple-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Average rating</p>
            <p className="text-3xl font-bold text-purple-600">
              {averageRating.toFixed(1)}/5
            </p>
          </div>
          <div className="flex space-x-1">
            {renderStars(averageRating)}
          </div>
        </div>
      </div>

      {/* Latest Feedback */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Latest feedback</h3>
        <div className="space-y-4">
          {safeFeedbacks.length > 0 ? (
            safeFeedbacks.slice(0, 3).map((feedback) => (
              <div key={feedback.id} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
                <Avatar src="" alt="User" size="sm" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900 text-lg">
                      User {feedback.fromUserId}
                    </p>
                    <div className="flex space-x-1">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {feedback.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-600 font-medium capitalize">
                      {feedback.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-gray-500 text-lg">No feedback received yet</p>
              <p className="text-gray-400 text-sm mt-1">Start collaborating to receive feedback</p>
            </div>
          )}
        </div>
      </div>

      {safeFeedbacks.length > 3 && (
        <div className="mt-6 text-center">
          <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold transition-colors duration-200">
            View all {safeFeedbacks.length} feedback →
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackReceivedCard;

