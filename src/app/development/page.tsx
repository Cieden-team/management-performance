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
      case "completed": return "bg-green-500 text-white";
      case "in_progress": return "bg-purple-600 text-white";
      case "pending": return "bg-orange-500 text-white";
      case "planned": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#212121] dark:text-white">Development</h1>
            <p className="text-[#646464] dark:text-[#909090] mt-1">
              Development plan and skills management
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
              <TrendingUp className="h-6 w-6 text-[#651FFF] dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Skills</h2>
              <p className="text-sm text-[#646464] dark:text-[#909090]">Current level and development goals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-[#212121] dark:text-white">{skill.name}</h3>
                  <p className="text-sm text-[#646464] dark:text-[#909090]">{skill.category}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#646464] dark:text-[#909090]">Current level</span>
                    <span className="font-medium text-[#212121] dark:text-white">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-[#e9e9e9] dark:bg-[#373737] rounded-full h-2">
                    <div 
                      className="bg-[#651FFF] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#646464] dark:text-[#909090]">Target</span>
                    <span className="font-medium text-[#212121] dark:text-white">{skill.target}%</span>
                  </div>
                  <div className="w-full bg-[#e9e9e9] dark:bg-[#373737] rounded-full h-2">
                    <div 
                      className="bg-[#8AC34A] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.target}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Development Plan */}
        <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
              <Target className="h-6 w-6 text-[#651FFF] dark:text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Development Plan</h2>
              <p className="text-sm text-[#646464] dark:text-[#909090]">Goals and tasks for development</p>
            </div>
          </div>

          <div className="space-y-4">
            {developmentPlan.map((item) => (
              <div key={item.id} className="p-4 border border-[#e9e9e9] dark:border-[#373737] rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-[#212121] dark:text-white mb-1">{item.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-[#646464] dark:text-[#909090] mb-3">{item.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#646464] dark:text-[#909090]">Progress</span>
                    <span className="font-medium text-[#212121] dark:text-white">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-[#e9e9e9] dark:bg-[#373737] rounded-full h-2">
                    <div 
                      className="bg-[#651FFF] h-2 rounded-full transition-all duration-300"
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
