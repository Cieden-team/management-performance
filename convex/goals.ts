import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createGoal = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    category: v.union(
      v.literal("performance"),
      v.literal("development"),
      v.literal("team"),
      v.literal("personal")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    startDate: v.string(),
    dueDate: v.string(),
    metrics: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const goalId = await ctx.db.insert("goals", {
      ...args,
      status: "not_started",
      progress: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return goalId;
  },
});

export const getGoalsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("goals")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getGoalById = query({
  args: { goalId: v.id("goals") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.goalId);
  },
});

export const updateGoal = mutation({
  args: {
    goalId: v.id("goals"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(
      v.union(
        v.literal("performance"),
        v.literal("development"),
        v.literal("team"),
        v.literal("personal")
      )
    ),
    status: v.optional(
      v.union(
        v.literal("not_started"),
        v.literal("in_progress"),
        v.literal("completed"),
        v.literal("overdue")
      )
    ),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    startDate: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    progress: v.optional(v.number()),
    metrics: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { goalId, ...updates } = args;
    await ctx.db.patch(goalId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteGoal = mutation({
  args: { goalId: v.id("goals") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.goalId);
  },
});

export const seedCiedenGoals = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const ciedenUsers = users.filter(user => user.email.includes("@cieden.com"));
    
    const goals = [
      {
        title: "Покращити UX/UI процеси",
        description: "Впровадити нові методології дизайну для підвищення якості продуктів",
        category: "development" as const,
        status: "in_progress" as const,
        priority: "high" as const,
        startDate: "2024-01-01",
        dueDate: "2024-06-30",
        progress: 65,
        metrics: ["Зменшення часу на дизайн на 20%", "Підвищення задоволеності клієнтів"],
      },
      {
        title: "Розширити команду дизайнерів",
        description: "Найняти 5 нових Product Designer для збільшення пропускної спроможності",
        category: "team" as const,
        status: "in_progress" as const,
        priority: "high" as const,
        startDate: "2024-02-01",
        dueDate: "2024-08-31",
        progress: 40,
        metrics: ["5 нових дизайнерів", "Збільшення проектної пропускної спроможності"],
      },
      {
        title: "Покращити комунікацію з клієнтами",
        description: "Впровадити нові інструменти для кращої комунікації та звітності",
        category: "performance" as const,
        status: "not_started" as const,
        priority: "medium" as const,
        startDate: "2024-03-01",
        dueDate: "2024-09-30",
        progress: 0,
        metrics: ["Зменшення часу відповіді на запити", "Підвищення задоволеності клієнтів"],
      },
      {
        title: "Розробити AI-функції для продуктів",
        description: "Створити прототипи AI-функцій для покращення UX",
        category: "development" as const,
        status: "completed" as const,
        priority: "high" as const,
        startDate: "2023-10-01",
        dueDate: "2024-01-31",
        progress: 100,
        metrics: ["3 AI-прототипи", "Позитивні відгуки від клієнтів"],
      },
      {
        title: "Підвищити продажі на 30%",
        description: "Досягти зростання продажів через покращення процесів та маркетингу",
        category: "performance" as const,
        status: "in_progress" as const,
        priority: "high" as const,
        startDate: "2024-01-01",
        dueDate: "2024-12-31",
        progress: 25,
        metrics: ["30% зростання продажів", "Збільшення кількості клієнтів"],
      },
    ];

    const goalIds = [];
    
    for (const goalData of goals) {
      const randomUser = ciedenUsers[Math.floor(Math.random() * ciedenUsers.length)];
      
      const goalId = await ctx.db.insert("goals", {
        userId: randomUser._id,
        ...goalData,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      goalIds.push(goalId);
    }

    return goalIds;
  },
});

export const getGoalsByStatus = query({
  args: { 
    userId: v.id("users"),
    status: v.union(
      v.literal("not_started"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("overdue")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("goals")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), args.status))
      .collect();
  },
});

export const getOverdueGoals = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db
      .query("goals")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => 
        q.and(
          q.lt(q.field("dueDate"), now),
          q.neq(q.field("status"), "completed")
        )
      )
      .collect();
  },
});
