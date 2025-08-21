// Types for forms and data
export interface GoalFormData {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  deadline: string;
  tags: string[];
  targetValue: string;
  currentValue: string;
}

export interface FeedbackFormData {
  toUserId: string;
  category: string;
  rating: number;
  comment: string;
  isAnonymous: boolean;
}

export interface User {
  _id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "manager" | "employee";
  department: string;
  position: string;
  hireDate: string;
  managerId?: string;
  avatar: string;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: "personal" | "team" | "company";
  priority: "low" | "medium" | "high";
  status: "active" | "completed" | "paused";
  progress: number;
  deadline: string;
  tags: string[];
  userId: string;
}

export interface Feedback {
  id: string;
  fromUserId: string;
  toUserId: string;
  category: string;
  rating: number;
  comment: string;
  status: "completed" | "pending" | "draft";
  createdAt: string;
  isAnonymous: boolean;
}
