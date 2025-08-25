"use client";

import { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";

interface CreateCycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cycleData: CycleData) => void;
}

interface CycleData {
  cycleStartDate: string;
  gatheringFeedbackStart: string;
  gatheringFeedbackDue: string;
  conductingMeetingsStart: string;
  conductingMeetingsDue: string;
}

const CreateCycleModal = ({ isOpen, onClose, onSubmit }: CreateCycleModalProps) => {
  const [formData, setFormData] = useState<CycleData>({
    cycleStartDate: "",
    gatheringFeedbackStart: "",
    gatheringFeedbackDue: "",
    conductingMeetingsStart: "",
    conductingMeetingsDue: "",
  });

  const handleInputChange = (field: keyof CycleData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      cycleStartDate: "",
      gatheringFeedbackStart: "",
      gatheringFeedbackDue: "",
      conductingMeetingsStart: "",
      conductingMeetingsDue: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 rounded-xl">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Create New Cycle</h3>
                <p className="text-sm text-gray-500">Set up performance cycle dates</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Cycle Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cycle Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.cycleStartDate}
                  onChange={(e) => handleInputChange("cycleStartDate", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Gathering Feedback Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <h4 className="font-medium text-gray-900">Gathering Feedback</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.gatheringFeedbackStart}
                    onChange={(e) => handleInputChange("gatheringFeedbackStart", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.gatheringFeedbackDue}
                    onChange={(e) => handleInputChange("gatheringFeedbackDue", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Conducting Meetings Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <h4 className="font-medium text-gray-900">Conducting Meetings</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.conductingMeetingsStart}
                    onChange={(e) => handleInputChange("conductingMeetingsStart", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.conductingMeetingsDue}
                    onChange={(e) => handleInputChange("conductingMeetingsDue", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-200 font-medium"
              >
                Create Cycle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCycleModal;
