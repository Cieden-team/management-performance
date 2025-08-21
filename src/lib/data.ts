import { User, Goal, Feedback } from "@/types";

// Мінімальні дані для тестування
export const mockUsers: User[] = [
  {
    _id: "user1",
    clerkId: "clerk_user1",
    email: "admin@company.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    department: "Leadership",
    position: "CEO",
    hireDate: "2020-01-01",
    managerId: undefined,
    avatar: "",
    isActive: true,
    createdAt: 1577836800000,
    updatedAt: 1577836800000,
  },
  {
    _id: "user2",
    clerkId: "clerk_user2",
    email: "manager@company.com",
    firstName: "Manager",
    lastName: "User",
    role: "manager",
    department: "Design",
    position: "Design Lead",
    hireDate: "2021-01-01",
    managerId: "user1",
    avatar: "",
    isActive: true,
    createdAt: 1609459200000,
    updatedAt: 1609459200000,
  },
  {
    _id: "user3",
    clerkId: "clerk_user3",
    email: "employee@company.com",
    firstName: "Employee",
    lastName: "User",
    role: "employee",
    department: "Design",
    position: "Designer",
    hireDate: "2022-01-01",
    managerId: "user2",
    avatar: "",
    isActive: true,
    createdAt: 1640995200000,
    updatedAt: 1640995200000,
  },
];

export const mockGoals: Goal[] = [
  {
    id: "goal1",
    title: "Improve Design Skills",
    description: "Master advanced design techniques",
    type: "personal",
    priority: "high",
    status: "active",
    progress: 75,
    deadline: "2024-12-31",
    tags: ["Design", "Skills"],
    userId: "user3",
  },
  {
    id: "goal2",
    title: "Team Leadership",
    description: "Develop leadership skills",
    type: "team",
    priority: "medium",
    status: "active",
    progress: 60,
    deadline: "2024-12-31",
    tags: ["Leadership"],
    userId: "user2",
  },
];

export const mockFeedbacks: Feedback[] = [
  {
    id: "feedback1",
    fromUserId: "user2",
    toUserId: "user3",
    category: "technical",
    rating: 4,
    comment: "Great work on the latest project!",
    status: "completed",
    createdAt: "2024-01-15",
    isAnonymous: false,
  },
  {
    id: "feedback2",
    fromUserId: "user1",
    toUserId: "user2",
    category: "leadership",
    rating: 5,
    comment: "Excellent leadership skills demonstrated",
    status: "completed",
    createdAt: "2024-01-10",
    isAnonymous: false,
  },
];

// Допоміжні функції
export const getUserFullName = (userId: string): string => {
  const user = mockUsers.find(u => u._id === userId);
  return user ? `${user.firstName} ${user.lastName}` : "Unknown User";
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(u => u._id === userId);
};
