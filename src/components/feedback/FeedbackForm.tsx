"use client";

import { useState } from "react";
import { X, Star, Send } from "lucide-react";
import { getAllTeamMembers } from "@/lib/roleManager";

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const FeedbackForm = ({ isOpen, onClose, onSubmit, onCancel }: FeedbackFormProps) => {
  const [formData, setFormData] = useState({
    recipientId: "",
    category: "",
    rating: 0,
    message: "",
    isAnonymous: false
  });

  const teamMembers = getAllTeamMembers();

  const renderStars = (rating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`${
              star <= rating
                ? 'text-[#FF9102] fill-current'
                : 'text-[#e9e9e9] dark:text-[#373737]'
            } hover:text-[#FF9102] transition-colors`}
          >
            <Star className="w-5 h-5" />
          </button>
        ))}
        <span className="ml-2 text-sm text-[#646464] dark:text-[#909090]">
          {rating}/5
        </span>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Give Feedback</h2>
          <button
            onClick={onClose}
            className="text-[#646464] dark:text-[#909090] hover:text-[#212121] dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}>
          {/* Recipient */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
              To whom to give feedback
            </label>
            <select
              value={formData.recipientId}
              onChange={(e) => setFormData({ ...formData, recipientId: e.target.value })}
              className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
              required
            >
              <option value="">Select employee</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} - {member.role}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
              Feedback category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
              required
            >
              <option value="">Select category</option>
              <option value="technical">Technical</option>
              <option value="communication">Communication</option>
              <option value="leadership">Leadership</option>
              <option value="collaboration">Collaboration</option>
              <option value="innovation">Innovation</option>
              <option value="quality">Quality</option>
            </select>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
              Rating
            </label>
            {renderStars(formData.rating, (rating) => setFormData({ ...formData, rating }))}
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
              Detailed feedback
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              placeholder="Write detailed feedback..."
              className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
              required
            />
          </div>

          {/* Anonymous */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="h-4 w-4 text-[#651FFF] focus:ring-[#651FFF] border-[#e9e9e9] dark:border-[#373737] rounded"
              />
              <span className="ml-2 text-sm text-[#212121] dark:text-white">
                Send anonymously
              </span>
            </label>
          </div>

          {/* Status */}
          <div className="mb-6 p-3 rounded-lg border border-[#e9e9e9] dark:border-[#373737]">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              formData.isAnonymous 
                ? 'bg-[#8AC34A] text-white'
                : 'bg-[#646464] text-white'
            }`}>
              {formData.isAnonymous ? 'Anonymous feedback' : 'Signed feedback'}
            </div>
            <p className="text-xs text-[#646464] dark:text-[#909090] mt-1">
              {formData.isAnonymous 
                ? 'The recipient will not see who sent this feedback'
                : 'The recipient will see your name'
              }
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-[#e9e9e9] dark:border-[#373737]">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-[#212121] dark:text-white bg-[#f8f9fa] dark:bg-[#373737] rounded-lg hover:bg-[#e9e9e9] dark:hover:bg-[#646464] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1de6] transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Give Feedback</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
