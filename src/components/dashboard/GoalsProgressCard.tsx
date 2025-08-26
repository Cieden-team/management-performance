"use client";

import { Target, TrendingUp, Calendar } from "lucide-react";

interface Goal {
  _id: string;
  userId: string;
  title: string;
  description: string;
  category: "performance" | "development" | "team" | "personal";
  status: "not_started" | "in_progress" | "completed" | "overdue";
  priority: "low" | "medium" | "high";
  progress: number;
  startDate: string;
  dueDate: string;
  tags?: string[];
  link?: string;
}

interface GoalsProgressCardProps {
  goals?: Goal[];
}

const GoalsProgressCard: React.FC<GoalsProgressCardProps> = ({ goals = [] }) => {
  const safeGoals = goals || [];
  const activeGoals = safeGoals.filter(goal => goal.status === "in_progress");
  const completedGoals = safeGoals.filter(goal => goal.status === "completed");
  const totalProgress = safeGoals.length > 0
    ? safeGoals.reduce((sum, goal) => sum + goal.progress, 0) / safeGoals.length
    : 0;

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "High Priority";
      case "medium": return "Medium Priority";
      case "low": return "Low Priority";
      default: return "Normal";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-[#F44436] text-white";
      case "medium": return "bg-[#FF9102] text-white";
      case "low": return "bg-[#8AC34A] text-white";
      default: return "bg-[#646464] text-white";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Goals Progress</h2>
            <p className="text-gray-500">Your active goals and achievements</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-purple-600">{Math.round(totalProgress)}%</div>
          <div className="text-sm text-gray-500">Overall progress</div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-500">Overall progress</span>
          <span className="font-medium text-gray-900">{Math.round(totalProgress)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-600 to-purple-700 h-4 rounded-full transition-all duration-500"
            style={{ width: `${totalProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 text-center mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{activeGoals.length}</div>
          <div className="text-sm text-gray-500">Active Goals</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{completedGoals.length}</div>
          <div className="text-sm text-gray-500">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{safeGoals.length}</div>
          <div className="text-sm text-gray-500">Total Goals</div>
        </div>
      </div>

      {/* Active Goals List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Goals</h3>
        {activeGoals.length > 0 ? (
          activeGoals.slice(0, 3).map((goal) => (
            <div key={goal._id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-lg mb-2">{goal.title}</h4>
                <p className="text-gray-600 mb-3">{goal.description}</p>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                    goal.priority === 'high' ? 'bg-red-100 text-red-700' :
                    goal.priority === 'medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {getPriorityText(goal.priority)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Due: {new Date(goal.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right ml-6">
                <div className="text-lg font-bold text-gray-900 mb-2">{goal.progress}%</div>
                <div className="w-20 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-gray-500 text-lg">No active goals</p>
            <p className="text-gray-400 text-sm mt-1">Create your first goal to get started</p>
          </div>
        )}
      </div>

      {activeGoals.length > 3 && (
        <div className="mt-6 text-center">
          <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold transition-colors duration-200">
            View all {activeGoals.length} goals →
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalsProgressCard;
