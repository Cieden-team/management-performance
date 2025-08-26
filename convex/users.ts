import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    role: v.union(v.literal("employee"), v.literal("manager"), v.literal("admin")),
    department: v.string(),
    position: v.string(),
    hireDate: v.string(),
    managerId: v.optional(v.id("users")),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    const userId = await ctx.db.insert("users", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return userId;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const getUsersByManager = query({
  args: { managerId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_manager", (q) => q.eq("managerId", args.managerId))
      .collect();
  },
});

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const updateUser = mutation({
  args: {
    userId: v.id("users"),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    role: v.optional(v.union(v.literal("employee"), v.literal("manager"), v.literal("admin"))),
    department: v.optional(v.string()),
    position: v.optional(v.string()),
    managerId: v.optional(v.id("users")),
    avatar: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    await ctx.db.patch(userId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteUser = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.userId);
  },
});

export const seedCiedenTeam = mutation({
  handler: async (ctx) => {
    // Очищаємо існуючі дані
    const existingUsers = await ctx.db.query("users").collect();
    for (const user of existingUsers) {
      await ctx.db.delete(user._id);
    }

    const ciedenTeam = [
      {
        clerkId: "cieden_yuriy",
        email: "yuriy@cieden.com",
        firstName: "Yuriy",
        lastName: "Mykhasyak",
        role: "admin" as const,
        department: "Leadership",
        position: "CEO & Co-founder",
        hireDate: "2020-01-01",
        avatar: "/team/yuriy-mykhasyak.jpg",
      },
      {
        clerkId: "cieden_iryna",
        email: "iryna@cieden.com",
        firstName: "Iryna",
        lastName: "Serednia",
        role: "admin" as const,
        department: "Design",
        position: "Design Director, Co-founder",
        hireDate: "2020-01-01",
        avatar: "/team/iryna-serednia.jpg",
      },
      {
        clerkId: "cieden_kateryna",
        email: "kateryna@cieden.com",
        firstName: "Kateryna",
        lastName: "Zavertailo",
        role: "manager" as const,
        department: "Sales",
        position: "Sales Manager",
        hireDate: "2021-03-15",
        avatar: "/team/kateryna-zavertailo.jpg",
      },
      {
        clerkId: "cieden_roman",
        email: "roman@cieden.com",
        firstName: "Roman",
        lastName: "Kaminechny",
        role: "manager" as const,
        department: "Design",
        position: "Head of Design Department",
        hireDate: "2021-06-01",
        avatar: "",
      },
      {
        clerkId: "cieden_anastasiya",
        email: "anastasiya@cieden.com",
        firstName: "Anastasiya",
        lastName: "Mudryk",
        role: "manager" as const,
        department: "Product Management",
        position: "Head of PM/BA",
        hireDate: "2021-08-01",
        avatar: "",
      },
    ];

    const userIds = [];
    
    for (const member of ciedenTeam) {
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_clerk_id", (q) => q.eq("clerkId", member.clerkId))
        .first();

      if (!existingUser) {
        const userId = await ctx.db.insert("users", {
          ...member,
          isActive: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        userIds.push(userId);
      }
    }

    return userIds;
  },
});
