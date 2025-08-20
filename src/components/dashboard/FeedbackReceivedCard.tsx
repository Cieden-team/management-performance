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
    <div className="bg-white dark:bg-gray-800 rounded-xl border-0 dark:border dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
            <MessageSquare className="h-6 w-6 text-[#651FFF] dark:text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Feedback Received</h2>
            <p className="text-sm text-[#646464] dark:text-[#909090]">Feedback for the semester</p>
          </div>
        </div>
      </div>

      {/* Average Rating */}
      <div className="mb-6 p-4 bg-[#f8f9fa] dark:bg-[#373737] rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[#646464] dark:text-[#909090]">Average rating</p>
            <p className="text-2xl font-bold text-[#212121] dark:text-white">
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
        <h3 className="font-medium text-[#212121] dark:text-white mb-4">Latest feedback</h3>
        <div className="space-y-4">
          {safeFeedbacks.length > 0 ? (
            safeFeedbacks.slice(0, 3).map((feedback) => (
              <div key={feedback.id} className="flex items-start space-x-3 p-3 bg-[#f8f9fa] dark:bg-[#373737] rounded-lg">
                <Avatar src="" alt="User" size="sm" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-[#212121] dark:text-white">
                      User {feedback.fromUserId}
                    </p>
                    <div className="flex space-x-1">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-[#646464] dark:text-[#909090] mb-2">
                    {feedback.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#646464] dark:text-[#909090] capitalize">
                      {feedback.category}
                    </span>
                    <span className="text-xs text-[#646464] dark:text-[#909090]">
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <MessageSquare className="h-12 w-12 text-[#646464] dark:text-[#909090] mx-auto mb-3" />
              <p className="text-[#646464] dark:text-[#909090]">No feedback received yet</p>
            </div>
          )}
        </div>
      </div>

      {safeFeedbacks.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-[#651FFF] dark:text-[#651FFF] hover:text-[#5b1ce6] dark:hover:text-[#5b1ce6] text-sm font-medium">
            View all {safeFeedbacks.length} feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackReceivedCard;

