"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Target, 
  BarChart3, 
  Settings, 
  CheckCircle, 
  TrendingUp, 
  Calendar,
  Star
} from "lucide-react";

export default function HomePage() {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      router.push("/dashboard");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#000319] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#651FFF]"></div>
      </div>
    );
  }

  const features = [
    {
      icon: Users,
      title: "Team Management",
      description: "Manage your team and track performance"
    },
    {
      icon: Target,
      title: "Goals & OKRs",
      description: "Set and track goals and objectives"
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Comprehensive performance analytics"
    },
    {
      icon: Settings,
      title: "Settings",
      description: "Full system control"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#000319]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#651FFF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#212121] dark:text-white">Performance</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-[#646464] dark:text-[#909090] hover:text-[#212121] dark:hover:text-white font-medium">
                Sign In
              </button>
              <button className="bg-[#651FFF] text-white px-4 py-2 rounded-lg hover:bg-[#5b1de6] transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-[#212121] dark:text-white mb-6">
            Manage your team's
            <span className="text-[#651FFF]"> performance</span>
          </h1>
          <p className="text-xl text-[#646464] dark:text-[#909090] mb-8 max-w-3xl mx-auto">
            Comprehensive performance management system for modern teams. Track goals, provide feedback, and drive success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#651FFF] text-white px-8 py-3 rounded-lg hover:bg-[#5b1de6] transition-colors text-lg font-medium">
              Start Free Trial
            </button>
            <button className="border border-[#e9e9e9] dark:border-[#373737] text-[#212121] dark:text-white px-8 py-3 rounded-lg hover:bg-[#f8f9fa] dark:hover:bg-[#373737] transition-colors text-lg font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-[#000319]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#212121] dark:text-white mb-4">
              Everything you need to manage performance
            </h2>
            <p className="text-lg text-[#646464] dark:text-[#909090]">
              Powerful tools to help your team succeed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-[#f0e9ff] dark:bg-[#651FFF] rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <IconComponent className="w-6 h-6 text-[#651FFF] dark:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#212121] dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#646464] dark:text-[#909090]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#651FFF] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to improve your team's performance?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of teams already using our platform
          </p>
          <button className="bg-white text-[#651FFF] px-8 py-3 rounded-lg hover:bg-[#f8f9fa] transition-colors text-lg font-medium">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#212121] dark:bg-[#000319] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#651FFF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="text-xl font-bold">Performance</span>
            </div>
          </div>
          <p className="text-[#909090]">
            © 2024 Performance Management System. All rights reserved.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-[#909090]">
                <li>Features</li>
                <li>Pricing</li>
                <li>Integrations</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-[#909090]">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-[#909090]">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Community</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#373737] mt-8 pt-8 text-center text-[#909090]">
            <p>Built with ❤️ for modern teams</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
