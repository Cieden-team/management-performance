import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createCycle = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    createdBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const cycleId = await ctx.db.insert("performanceCycles", {
      ...args,
      status: "planning",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return cycleId;
  },
});

export const getActiveCycles = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("performanceCycles")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();
  },
});

export const getAllCycles = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("performanceCycles")
      .order("desc")
      .collect();
  },
});

export const getCycleById = query({
  args: { cycleId: v.id("performanceCycles") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.cycleId);
  },
});

export const updateCycle = mutation({
  args: {
    cycleId: v.id("performanceCycles"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("planning"),
        v.literal("active"),
        v.literal("review"),
        v.literal("completed")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { cycleId, ...updates } = args;
    await ctx.db.patch(cycleId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteCycle = mutation({
  args: { cycleId: v.id("performanceCycles") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.cycleId);
  },
});

export const getCyclesByStatus = query({
  args: { 
    status: v.union(
      v.literal("planning"),
      v.literal("active"),
      v.literal("review"),
      v.literal("completed")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("performanceCycles")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const getUpcomingCycles = query({
  handler: async (ctx) => {
    const now = new Date().toISOString();
    return await ctx.db
      .query("performanceCycles")
      .withIndex("by_date_range", (q) => q.gte("startDate", now))
      .filter((q) => q.eq(q.field("status"), "planning"))
      .collect();
  },
});
