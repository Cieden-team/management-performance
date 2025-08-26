"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

const UserSetup = () => {
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.users.createUser);
  const existingUser = useQuery(api.users.getUserByClerkId, 
    user?.id ? { clerkId: user.id } : "skip"
  );

  useEffect(() => {
    if (isLoaded && user && !existingUser) {
      // Створюємо користувача при першому вході
      createUser({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        role: "employee",
        department: "General",
        position: "Employee",
        hireDate: new Date().toISOString().split('T')[0],
        avatar: user.imageUrl || "",
      });
    }
  }, [isLoaded, user, existingUser, createUser]);

  return null; // Цей компонент не рендерить нічого
};

export default UserSetup;
