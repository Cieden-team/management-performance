"use client";

import { useUser } from "@clerk/nextjs";
import Layout from "@/components/Layout";
import { TrendingUp, Target, BookOpen, Award, Calendar, CheckCircle } from "lucide-react";

const DevelopmentPage = () => {
  const { user } = useUser();

  const skills = [
    {
      id: 1,
      name: "React",
      level: 85,
      target: 90,
      category: "Frontend",
      progress: 85
    },
    {
      id: 2,
      name: "TypeScript",
      level: 70,
      target: 85,
      category: "Programming",
      progress: 70
    },
    {
      id: 3,
      name: "UI/UX Design",
      level: 60,
      target: 75,
      category: "Design",
      progress: 60
    },
    {
      id: 4,
      name: "Project Management",
      level: 80,
      target: 85,
      category: "Leadership",
      progress: 80
    }
  ];

  const developmentPlan = [
    {
      id: 1,
      title: "Advanced React Patterns",
      description: "Study advanced React patterns and optimization techniques",
      progress: 60,
      deadline: "2024-03-15",
      status: "in_progress"
    },
    {
      id: 2,
      title: "System Design Course",
      description: "Complete system design course for senior level",
      progress: 30,
      deadline: "2024-04-30",
      status: "pending"
    },
    {
      id: 3,
      title: "Leadership Training",
      description: "Attend leadership and management training",
      progress: 0,
      deadline: "2024-06-15",
      status: "planned"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "JavaScript Advanced Certificate",
      description: "Certificate completed",
      date: "2024-01-15",
      type: "certificate"
    },
    {
      id: 2,
      title: "React Fundamentals Course",
      description: "Course completed",
      date: "2024-01-10",
      type: "course"
    },
    {
      id: 3,
      title: "Team Lead Promotion",
      description: "Promotion",
      date: "2024-01-01",
      type: "promotion"
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: "React Performance Optimization",
      description: "Advanced course on React performance optimization techniques",
      duration: "8 weeks",
      level: "Advanced"
    },
    {
      id: 2,
      title: "System Design Fundamentals",
      description: "Learn system design principles and patterns",
      duration: "12 weeks",
      level: "Intermediate"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-[#8AC34A] text-white";
      case "in_progress": return "bg-[#651FFF] text-white";
      case "pending": return "bg-[#FF9102] text-white";
      case "planned": return "bg-[#646464] text-white";
      default: return "bg-[#646464] text-white";
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Development</h1>
            <p className="text-gray-500 mt-2 text-lg">
              Development plan and skills management
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-purple-50 rounded-xl">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
              <p className="text-gray-500">Current level and development goals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{skill.name}</h3>
                  <p className="text-gray-500">{skill.category}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Current level</span>
                    <span className="font-medium text-gray-900">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Target</span>
                    <span className="font-medium text-gray-900">{skill.target}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${skill.target}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Plan */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Development Plan</h2>
              <p className="text-gray-500">Goals and tasks for development</p>
            </div>
          </div>

          <div className="space-y-6">
            {developmentPlan.map((item) => (
              <div key={item.id} className="p-6 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{item.title}</h3>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-900">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-[#646464] dark:text-[#909090] mt-3">
                  <span>Deadline: {new Date(item.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
              <Award className="h-6 w-6 text-[#651FFF] dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Achievements</h2>
              <p className="text-sm text-[#646464] dark:text-[#909090]">Recent achievements and certificates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="p-4 border border-[#e9e9e9] dark:border-[#373737] rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <CheckCircle className="h-5 w-5 text-[#8AC34A]" />
                  <h3 className="font-medium text-[#212121] dark:text-white mb-1">{achievement.title}</h3>
                </div>
                <p className="text-sm text-[#646464] dark:text-[#909090]">{achievement.description}</p>
                <p className="text-xs text-[#646464] dark:text-[#909090] mt-1">{achievement.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
              <BookOpen className="h-6 w-6 text-[#651FFF] dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Recommendations</h2>
              <p className="text-sm text-[#646464] dark:text-[#909090]">Courses and resources for development</p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-4 border border-[#e9e9e9] dark:border-[#373737] rounded-lg">
                <h3 className="font-medium text-[#212121] dark:text-white mb-2">{rec.title}</h3>
                <p className="text-sm text-[#646464] dark:text-[#909090] mb-3">
                  {rec.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-[#646464] dark:text-[#909090]">
                  <span>Duration: {rec.duration}</span>
                  <span>Level: {rec.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DevelopmentPage;
