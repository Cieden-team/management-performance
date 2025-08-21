"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  MessageSquare, 
  Calendar,
  Download,
  FileText,
  BarChart3,
  Mail,
  Eye,
  AlertTriangle
} from "lucide-react";

const HRMAnalytics = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for HR Analytics
  const kpis = [
    {
      title: "Total Employees",
      value: "32",
      change: "+2",
      changeType: "positive",
      icon: Users
    },
    {
      title: "Active Goals",
      value: "156",
      change: "+12",
      changeType: "positive",
      icon: Target
    },
    {
      title: "Feedback Given",
      value: "89",
      change: "-3",
      changeType: "negative",
      icon: MessageSquare
    },
    {
      title: "Performance Reviews",
      value: "24",
      change: "+4",
      changeType: "positive",
      icon: Calendar
    }
  ];

  const performanceTrends = [
    { month: "Jan", value: 6.2 },
    { month: "Feb", value: 6.5 },
    { month: "Mar", value: 6.8 },
    { month: "Apr", value: 6.3 },
    { month: "May", value: 6.7 },
    { month: "Jun", value: 6.9 }
  ];

  const feedbackAnalytics = {
    total: 156,
    completed: 142,
    pending: 14,
    anonymous: 23
  };

  const feedbackByCategory = {
    "Communication": 45,
    "Leadership": 32,
    "Technical Skills": 28,
    "Teamwork": 23,
    "Problem Solving": 18,
    "Innovation": 10
  };

  const goalsAnalytics = {
    total: 156,
    active: 89,
    completed: 67,
    averageProgress: 78
  };

  const goalsByType = {
    "Performance": 45,
    "Development": 38,
    "Project": 32,
    "Learning": 25,
    "Leadership": 16
  };

  const goalProgressTrends = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 68 },
    { month: "Mar", value: 72 },
    { month: "Apr", value: 75 },
    { month: "May", value: 78 },
    { month: "Jun", value: 82 }
  ];

  const exportOptions = [
    {
      title: "Export to Excel",
      description: "Generate report",
      icon: Download,
              action: () => {}
    },
    {
      title: "Export to CSV",
      description: "Export data",
      icon: FileText,
              action: () => {}
    },
    {
      title: "Detailed Analytics",
      description: "Deep analysis",
      icon: BarChart3,
              action: () => {}
    }
  ];

  const notificationStats = [
    {
      title: "Sent",
      value: "156",
      icon: Mail,
      color: "text-[#651FFF]"
    },
    {
      title: "Opened",
      value: "142",
      icon: Eye,
      color: "text-[#8AC34A]"
    },
    {
      title: "Errors",
      value: "3",
      icon: AlertTriangle,
      color: "text-[#F44436]"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#212121] dark:text-white">HR Analytics</h2>
          <p className="text-[#646464] dark:text-[#909090] mt-1">
            Comprehensive analytics and insights for HR management
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const IconComponent = kpi.icon;
          return (
            <div key={kpi.title} className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#646464] dark:text-[#909090]">{kpi.title}</p>
                  <p className="text-2xl font-bold text-[#212121] dark:text-white">{kpi.value}</p>
                  <div className="flex items-center mt-1">
                    <span className={`text-sm font-medium ${
                      kpi.changeType === 'negative' ? 'text-[#F44436]' : 'text-[#8AC34A]'
                    }`}>
                      {kpi.change}
                    </span>
                    <span className="text-sm text-[#646464] dark:text-[#909090] ml-1">from last month</span>
                  </div>
                </div>
                <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
                  <IconComponent className="h-6 w-6 text-[#651FFF] dark:text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <button
              key={option.title}
              onClick={option.action}
              className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
                  <IconComponent className="h-5 w-5 text-[#651FFF] dark:text-white" />
                </div>
                <div>
                  <div className="font-medium text-[#212121] dark:text-white">{option.title}</div>
                  <div className="text-sm text-[#646464] dark:text-[#909090]">{option.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] shadow-sm">
        <div className="border-b border-[#e9e9e9] dark:border-[#373737]">
          <nav className="flex space-x-8 px-6">
            {["overview", "feedback", "goals", "trends"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-[#651FFF] text-[#651FFF] dark:text-white'
                    : 'border-transparent text-[#646464] dark:text-[#909090] hover:text-[#212121] dark:hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#212121] dark:text-white">Performance Trends</h3>
                <div className="mt-4 flex items-end space-x-2 h-32">
                  {performanceTrends.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-[#651FFF] rounded-t"
                        style={{ height: `${(data.value / 7) * 100}%` }}
                      />
                      <span className="text-xs text-[#646464] dark:text-[#909090] mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#212121] dark:text-white">{feedbackAnalytics.total}</div>
                  <div className="text-sm text-[#646464] dark:text-[#909090]">Total Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8AC34A]">{feedbackAnalytics.completed}</div>
                  <div className="text-sm text-[#646464] dark:text-[#909090]">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF9102]">{feedbackAnalytics.pending}</div>
                  <div className="text-sm text-[#646464] dark:text-[#909090]">Pending</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#651FFF]">{feedbackAnalytics.anonymous}</div>
                  <div className="text-sm text-[#646464] dark:text-[#909090]">Anonymous</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#212121] dark:text-white mb-4">Reviews by Category</h3>
                <div className="space-y-3">
                  {Object.entries(feedbackByCategory).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm text-[#646464] dark:text-[#909090] capitalize">
                        {category}
                      </span>
                      <span className="font-medium text-[#212121] dark:text-white">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "goals" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#212121] dark:text-white">{goalsAnalytics.total}</div>
                  <div className="text-sm text-[#646464] dark:text-[#909090]">Total Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#651FFF]">{goalsAnalytics.active}</div>
                  <div className="text-sm text-[#646464] dark:text-[#909090]">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#8AC34A]">{goalsAnalytics.completed}</div>
                  <div className="text-sm text-[#646464] dark:text-[#909090]">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF9102]">{goalsAnalytics.averageProgress}%</div>
                  <div className="text-sm text-[#646464] dark:text-[#909090]">Average Progress</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#212121] dark:text-white mb-4">Goals by Type</h3>
                <div className="space-y-3">
                  {Object.entries(goalsByType).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-sm text-[#646464] dark:text-[#909090] capitalize">{type}</span>
                      <span className="font-medium text-[#212121] dark:text-white">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#212121] dark:text-white mb-4">Performance Trends</h3>
                <div className="flex items-end space-x-2 h-32">
                  {performanceTrends.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-[#651FFF] rounded-t"
                        style={{ height: `${(data.value / 7) * 100}%` }}
                      />
                      <span className="text-xs text-[#646464] dark:text-[#909090] mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#212121] dark:text-white mb-4">Goal Progress Trends</h3>
                <div className="flex items-end space-x-2 h-32">
                  {goalProgressTrends.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-[#8AC34A] rounded-t"
                        style={{ height: `${data.value}%` }}
                      />
                      <span className="text-xs text-[#646464] dark:text-[#909090] mt-2">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notificationStats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div key={stat.title} className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
                  <IconComponent className="h-6 w-6 text-[#651FFF] dark:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#212121] dark:text-white">{stat.title}</h3>
                  <p className="text-2xl font-bold text-[#212121] dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HRMAnalytics;

