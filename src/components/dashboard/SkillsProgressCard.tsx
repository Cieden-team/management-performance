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
    <div className="bg-white dark:bg-[#000319] rounded-xl border border-[#e9e9e9] dark:border-[#373737] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg">
            <TrendingUp className="h-6 w-6 text-[#651FFF] dark:text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#212121] dark:text-white">Skills Progress</h2>
            <p className="text-sm text-[#646464] dark:text-[#909090]">Your key competencies as Product Designer</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#212121] dark:text-white">
            {Math.round(skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length)}%
          </div>
          <div className="text-sm text-[#646464] dark:text-[#909090]">average</div>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        {skills.map((skill) => {
          const IconComponent = skill.icon || TrendingUp;
          return (
            <div key={skill.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-1 bg-[#f8f9fa] dark:bg-[#373737] rounded">
                    <IconComponent className="h-4 w-4 text-[#646464] dark:text-[#909090]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#212121] dark:text-white">{skill.name}</h3>
                    <p className="text-xs text-[#646464] dark:text-[#909090]">{getCategoryLabel(skill.category)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-[#212121] dark:text-white">{skill.progress}%</div>
                  <div className="text-xs text-[#646464] dark:text-[#909090]">target: {skill.target}%</div>
                </div>
              </div>
              <div className="w-full bg-[#e9e9e9] dark:bg-[#373737] rounded-full h-2">
                <div 
                  className={`${skill.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${skill.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-[#e9e9e9] dark:border-[#373737]">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-[#8AC34A]">
              {skills.filter(s => s.progress >= 90).length}
            </div>
            <div className="text-xs text-[#646464] dark:text-[#909090]">Excellent</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#651FFF]">
              {skills.filter(s => s.progress >= 75 && s.progress < 90).length}
            </div>
            <div className="text-xs text-[#646464] dark:text-[#909090]">Good</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsProgressCard;