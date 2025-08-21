"use client";

import { useUser } from "@clerk/nextjs";
import Layout from "@/components/Layout";


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

      color: "#7c3aed"
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
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-white via-white to-blue-50/20 dark:from-gray-800 dark:via-gray-800 dark:to-purple-900/20 rounded-2xl border-0 dark:border-gray-700 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar src={currentUser.avatar} alt={`${currentUser.firstName} ${currentUser.lastName}`} size="lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 font-gilroy">
                Welcome back, {currentUser.firstName} {currentUser.lastName}!
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Last login: {formatDate(new Date().toISOString())} at {formatTime(new Date().toISOString())}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border-0 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Active Goals</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white font-gilroy">
                  {goals.filter(g => g.status === "active").length}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl hover:scale-110 transition-transform duration-300">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border-0 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Feedback Received</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white font-gilroy">
                  {feedbacks.length}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl hover:scale-110 transition-transform duration-300">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border-0 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white font-gilroy">
                  {feedbacks.length > 0 
                    ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1)
                    : "0.0"
                  }
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl hover:scale-110 transition-transform duration-300">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

                           {/* Main Content Grid */}
                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                     {/* Left Column */}
                     <div className="lg:col-span-2 space-y-6">
                       <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Goals Progress</h3>
                         <p className="text-gray-600 dark:text-gray-400">Goals tracking will be here</p>
                       </div>
                       <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills Progress</h3>
                         <p className="text-gray-600 dark:text-gray-400">Skills tracking will be here</p>
                       </div>
                     </div>
           
                     {/* Right Column */}
                     <div className="space-y-6">
                       <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Feedback</h3>
                         <p className="text-gray-600 dark:text-gray-400">Feedback will be here</p>
                       </div>
                     </div>
                   </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
