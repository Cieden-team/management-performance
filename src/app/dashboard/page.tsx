"use client";

import { useUser } from "@clerk/nextjs";
import Layout from "@/components/Layout";
import GoalsProgressCard from "@/components/dashboard/GoalsProgressCard";
import FeedbackReceivedCard from "@/components/dashboard/FeedbackReceivedCard";
import SkillsProgressCard from "@/components/dashboard/SkillsProgressCard";

import Avatar from "@/components/ui/Avatar";

const DashboardPage = () => {
  const { user } = useUser();

  // Mock current user data
  const currentUser = {
    firstName: "All",
    lastName: "Team",
    email: "team@cieden.com",
    avatar: "",
    role: "admin",
    department: "Management"
  };

  // Mock data
  const goals = [
    {
      id: 1,
      userId: "user1",
      goalType: "personal",
      title: "Improve React Performance",
      description: "Optimize component rendering and reduce bundle size",
      progress: 75,
      priority: "high" as const,
      status: "active" as const,
      deadline: "2024-03-15",
      tags: ["React", "Performance"],
      link: ""
    },
    {
      id: 2,
      userId: "user1",
      goalType: "team",
      title: "Lead Design System Implementation",
      description: "Create and implement a comprehensive design system",
      progress: 45,
      priority: "medium" as const,
      status: "active" as const,
      deadline: "2024-04-30",
      tags: ["Design", "Leadership"],
      link: ""
    }
  ];

  const feedbacks = [
    {
      id: 1,
      fromUserId: "user2",
      toUserId: "user1",
      message: "Excellent work on the new feature implementation!",
      rating: 5,
      category: "technical",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      fromUserId: "user3",
      toUserId: "user1",
      message: "Great collaboration and communication skills",
      rating: 4,
      category: "communication",
      createdAt: "2024-01-14T14:20:00Z"
    }
  ];

  const skills = [
    { 
      id: 1,
      name: "React", 
      level: 85, 
      target: 90, 
      category: "Frontend",
      progress: 85,

      color: "#651FFF"
    },
    { 
      id: 2,
      name: "TypeScript", 
      level: 70, 
      target: 85, 
      category: "Programming",
      progress: 70,

      color: "#8AC34A"
    },
    { 
      id: 3,
      name: "UI/UX Design", 
      level: 60, 
      target: 75, 
      category: "Design",
      progress: 60,

      color: "#FF9102"
    },
    { 
      id: 4,
      name: "Project Management", 
      level: 80, 
      target: 85, 
      category: "Leadership",
      progress: 80,

      color: "#F44436"
    }
  ];







  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center space-x-6">
            <Avatar src={currentUser.avatar} alt={`${currentUser.firstName} ${currentUser.lastName}`} size="lg" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {currentUser.firstName} {currentUser.lastName}! 👋
              </h1>
              <p className="text-gray-500 text-lg">
                Last login: {formatDate(new Date().toISOString())} at {formatTime(new Date().toISOString())}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Goals</p>
                <p className="text-3xl font-bold text-gray-900">
                  {goals.filter(g => g.status === "active").length}
                </p>
              </div>
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center">
                <span className="text-purple-600 text-2xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Feedback Received</p>
                <p className="text-3xl font-bold text-gray-900">
                  {feedbacks.length}
                </p>
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                <span className="text-blue-600 text-2xl">💬</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900">
                  {feedbacks.length > 0 
                    ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)
                    : "0.0"
                  }/5
                </p>
              </div>
              <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center">
                <span className="text-yellow-600 text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <GoalsProgressCard goals={goals} />
            <SkillsProgressCard skills={skills} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <FeedbackReceivedCard feedbacks={feedbacks} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
