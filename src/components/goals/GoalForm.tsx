"use client";

import { useState, useEffect } from "react";
import { X, Target, Calendar } from "lucide-react";
import { GoalFormData } from "@/types";

interface GoalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GoalFormData) => void;
  onCancel: () => void;
  initialData?: GoalFormData;
}

const GoalForm = ({ isOpen, onClose, onSubmit, onCancel, initialData }: GoalFormProps) => {
  const [formData, setFormData] = useState<GoalFormData>({
    title: "",
    description: "",
    priority: "medium",
    deadline: "",
    tags: [],
    targetValue: "",
    currentValue: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const priorities = [
    { value: "low", label: "Low", color: "bg-green-500 text-white" },
    { value: "medium", label: "Medium", color: "bg-orange-500 text-white" },
    { value: "high", label: "High", color: "bg-red-500 text-white" }
  ];

  const availableTags = [
    "UX/UI", "Design", "Skills", "AI", "Course", "English", 
    "Presentation", "Clients", "Project Management", "Process", 
    "Optimization", "Certification", "Product Management"
  ];

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
                         <div className="p-2 bg-purple-50 dark:bg-purple-600 rounded-lg">
               <Target className="h-6 w-6 text-purple-600 dark:text-white" />
            </div>
            <div>
                             <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                 {initialData ? "Edit Goal" : "Create New Goal"}
               </h2>
               <p className="text-sm text-gray-600 dark:text-gray-400">Fill in detailed information about the goal</p>
            </div>
          </div>
                     <button
             onClick={onClose}
             className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
           >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-3">
              Goal Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white ${
                formData.title.length > 0
                  ? "border-[#651FFF] bg-[#f0e9ff] dark:bg-[#651FFF] text-[#651FFF] dark:text-white"
                  : "border-[#e9e9e9] dark:border-[#373737]"
              }`}
              placeholder="Enter goal title..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
              placeholder="Describe your goal in detail..."
            />
          </div>

          {/* Priority and Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Priority
              </label>
              <div className="grid grid-cols-3 gap-2">
                {priorities.map((priority) => (
                  <button
                    key={priority.value}
                    type="button"
                                         onClick={() => setFormData({ ...formData, priority: priority.value as "low" | "medium" | "high" })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.priority === priority.value
                        ? priority.color
                        : "bg-[#f8f9fa] dark:bg-[#373737] text-[#212121] dark:text-white hover:bg-[#e9e9e9] dark:hover:bg-[#646464]"
                    }`}
                  >
                    {priority.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Deadline
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-[#646464] dark:text-[#909090]" />
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Target Value
              </label>
              <input
                type="text"
                value={formData.targetValue}
                onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
                className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                placeholder="e.g., 100%, 10 tasks, $50K"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Current Value
              </label>
              <input
                type="text"
                value={formData.currentValue}
                onChange={(e) => setFormData({ ...formData, currentValue: e.target.value })}
                className="w-full px-3 py-2 border border-[#e9e9e9] dark:border-[#373737] rounded-lg focus:ring-2 focus:ring-[#651FFF] focus:border-transparent bg-white dark:bg-[#000319] text-[#212121] dark:text-white"
                placeholder="e.g., 75%, 7 tasks, $35K"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-[#212121] dark:text-white mb-3">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.tags.includes(tag)
                      ? "bg-[#f0e9ff] dark:bg-[#651FFF] text-[#651FFF] dark:text-white border border-[#651FFF] dark:border-[#651FFF]"
                      : "bg-[#f8f9fa] dark:bg-[#373737] text-[#212121] dark:text-white border border-[#e9e9e9] dark:border-[#373737] hover:bg-[#e9e9e9] dark:hover:bg-[#646464]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Tags Display */}
          {formData.tags.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-[#212121] dark:text-white mb-2">
                Selected Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center space-x-1 px-3 py-1 bg-[#f0e9ff] dark:bg-[#651FFF] text-[#651FFF] dark:text-white border border-[#651FFF] dark:border-[#651FFF] rounded-full text-sm"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className="text-[#651FFF] dark:text-white hover:text-[#5b1de6] dark:hover:text-[#f0e9ff]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-[#e9e9e9] dark:border-[#373737]">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-[#212121] dark:text-white bg-[#f8f9fa] dark:bg-[#373737] rounded-lg hover:bg-[#e9e9e9] dark:hover:bg-[#646464] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#651FFF] text-white rounded-lg hover:bg-[#5b1de6] transition-colors"
            >
              {initialData ? "Update Goal" : "Create Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;
