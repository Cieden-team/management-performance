"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

const AdminSeedButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const seedUsers = useMutation(api.users.seedCiedenTeam);
  const seedGoals = useMutation(api.goals.seedCiedenGoals);
  const seedFeedback = useMutation(api.feedback.seedCiedenFeedback);

  const handleSeedData = async () => {
    setIsLoading(true);
    try {
      console.log("Seeding users...");
      await seedUsers();
      
      console.log("Seeding goals...");
      await seedGoals();
      
      console.log("Seeding feedback...");
      await seedFeedback();
      
      console.log("All data seeded successfully!");
      alert("Test data created successfully!");
    } catch (error) {
      console.error("Error seeding data:", error);
      alert("Error creating test data. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={handleSeedData}
        disabled={isLoading}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
      >
        {isLoading ? "Creating..." : "Create Test Data"}
      </button>
    </div>
  );
};

export default AdminSeedButton;
