"use client";

import { TrendingUp, Code, Palette, MessageSquare, Users, Zap, Target } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  category: string;
  progress: number;
  target: number;
  icon?: React.ComponentType<any>;
  color: string;
}

interface SkillsProgressCardProps {
  skills?: Skill[];
}

const SkillsProgressCard: React.FC<SkillsProgressCardProps> = ({ skills: propSkills }) => {
  // Mock data for Product Designer skills in Cieden
  const skills = propSkills || [
    {
      id: 1,
      name: "UX/UI Design",
      category: "design",
      progress: 85,
      target: 90,
      icon: Palette,
      color: "bg-[#651FFF]"
    },
    {
      id: 2,
      name: "Figma",
      category: "tools",
      progress: 90,
      target: 95,
      icon: Code,
      color: "bg-[#8AC34A]"
    },
    {
      id: 3,
      name: "User Research",
      category: "research",
      progress: 75,
      target: 85,
      icon: Users,
      color: "bg-[#FF9102]"
    },
    {
      id: 4,
      name: "Prototyping",
      category: "design",
      progress: 80,
      target: 90,
      icon: Zap,
      color: "bg-[#651FFF]"
    },
    {
      id: 5,
      name: "Design Systems",
      category: "design",
      progress: 70,
      target: 85,
      icon: Target,
      color: "bg-[#F44436]"
    },
    {
      id: 6,
      name: "Client Communication",
      category: "soft",
      progress: 85,
      target: 90,
      icon: MessageSquare,
      color: "bg-[#651FFF]"
    }
  ];

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "design": return "Design";
      case "tools": return "Tools";
      case "research": return "Research";
      case "soft": return "Soft Skills";
      default: return category;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "bg-[#8AC34A]";
    if (progress >= 75) return "bg-[#651FFF]";
    if (progress >= 60) return "bg-[#FF9102]";
    return "bg-[#F44436]";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Skills Progress</h2>
            <p className="text-gray-500">Your key competencies as Product Designer</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-purple-600">
            {Math.round(skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length)}%
          </div>
          <div className="text-sm text-gray-500">Average</div>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {skills.map((skill) => {
          const IconComponent = skill.icon || TrendingUp;
          return (
            <div key={skill.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <IconComponent className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{skill.name}</h3>
                  <p className="text-sm text-gray-500">{getCategoryLabel(skill.category)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{skill.progress}%</div>
                  <div className="text-sm text-gray-500">target: {skill.target}%</div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${skill.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div className="p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">
              {skills.filter(s => s.progress >= 90).length}
            </div>
            <div className="text-sm text-green-600 font-medium">Excellent</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">
              {skills.filter(s => s.progress >= 75 && s.progress < 90).length}
            </div>
            <div className="text-sm text-purple-600 font-medium">Good</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsProgressCard;