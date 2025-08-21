"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { Loader2, Users } from "lucide-react";

export default function AdminSeedButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const seedUsers = useMutation(api.users.seedCiedenTeam);

  const handleSeedTeam = async () => {
    setIsSeeding(true);
    try {
      await seedUsers();
      alert("Команда Cieden успішно завантажена!");
    } catch (error) {
      alert("Помилка при завантаженні команди");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button 
      onClick={handleSeedTeam} 
      disabled={isSeeding}
      variant="outline"
      size="sm"
    >
      {isSeeding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Завантаження...
        </>
      ) : (
        <>
          <Users className="mr-2 h-4 w-4" />
          Завантажити команду Cieden
        </>
      )}
    </Button>
  );
}
