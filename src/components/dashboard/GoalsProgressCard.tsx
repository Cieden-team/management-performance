"use client";

import { Target, TrendingUp, Calendar } from "lucide-react";

interface Goal {
  id: number;
  userId: string;
  goalType: string;
  title: string;
  description: string;
  progress: number;
  priority: "high" | "medium" | "low";
  status: string;
  deadline: string;
  tags: string[];
  link: string;
}

interface GoalsProgressCardProps {
  goals?: Goal[];
}

const GoalsProgressCard: React.FC<GoalsProgressCardProps> = ({ goals = [] }) => {
  const safeGoals = goals || [];
  const activeGoals = safeGoals.filter(goal => goal.status === "active");
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
    <div className="bg-white dark:bg-gray-800 rounded-xl border-0 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
            <Target className="h-6 w-6 text-[#651FFF] dark:text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Goals Progress</h2>
            <p className="text-sm text-[#646464] dark:text-[#909090]">Your active goals and achievements</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#212121] dark:text-white">{Math.round(totalProgress)}%</div>
          <div className="text-sm text-[#646464] dark:text-[#909090]">Overall progress</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-[#646464] dark:text-[#909090]">Overall progress</span>
          <span className="font-medium text-[#212121] dark:text-white">{Math.round(totalProgress)}%</span>
        </div>
        <div className="w-full bg-[#e9e9e9] dark:bg-[#373737] rounded-full h-3">
          <div
            className="bg-[#651FFF] h-3 rounded-full"
            style={{ width: `${totalProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#651FFF] dark:text-[#651FFF]">{activeGoals.length}</div>
          <div className="text-sm text-[#646464] dark:text-[#909090]">Active Goals</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#8AC34A] dark:text-[#8AC34A]">{completedGoals.length}</div>
          <div className="text-sm text-[#646464] dark:text-[#909090]">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#651FFF] dark:text-[#651FFF]">{safeGoals.length}</div>
          <div className="text-sm text-[#646464] dark:text-[#909090]">Total Goals</div>
        </div>
      </div>

      {/* Active Goals List */}
      <div className="space-y-3">
        <h3 className="font-medium text-[#212121] dark:text-white">Active Goals</h3>
        {activeGoals.length > 0 ? (
          activeGoals.slice(0, 3).map((goal) => (
            <div key={goal.id} className="flex items-center justify-between p-3 bg-[#f8f9fa] dark:bg-[#373737] rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-[#212121] dark:text-white">{goal.title}</h4>
                <p className="text-sm text-[#646464] dark:text-[#909090] mb-2">{goal.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(goal.priority)}`}>
                    {getPriorityText(goal.priority)}
                  </span>
                  <span className="text-xs text-[#646464] dark:text-[#909090]">
                    Due: {new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-[#212121] dark:text-white">{goal.progress}%</div>
                <div className="w-16 bg-[#e9e9e9] dark:bg-[#373737] rounded-full h-2 mt-1">
                  <div
                    className="bg-[#651FFF] h-2 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <Target className="h-12 w-12 text-[#646464] dark:text-[#909090] mx-auto mb-3" />
            <p className="text-[#646464] dark:text-[#909090]">No active goals</p>
          </div>
        )}
      </div>

      {activeGoals.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-[#651FFF] dark:text-[#651FFF] hover:text-[#5b1ce6] dark:hover:text-[#5b1ce6] text-sm font-medium">
            View all {activeGoals.length} goals
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalsProgressCard;
