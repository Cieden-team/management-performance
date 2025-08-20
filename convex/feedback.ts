import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createFeedback = mutation({
  args: {
    fromUserId: v.id("users"),
    toUserId: v.id("users"),
    reviewId: v.optional(v.id("reviews")),
    type: v.union(v.literal("requested"), v.literal("given")),
    category: v.union(
      v.literal("communication"),
      v.literal("leadership"),
      v.literal("technical"),
      v.literal("collaboration"),
      v.literal("other")
    ),
    rating: v.optional(v.number()),
    comment: v.string(),
    isAnonymous: v.boolean(),
  },
  handler: async (ctx, args) => {
    const feedbackId = await ctx.db.insert("feedback", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return feedbackId;
  },
});

export const getFeedbackByUser = query({
  args: { userId: v.id("users"), type: v.union(v.literal("received"), v.literal("given")) },
  handler: async (ctx, args) => {
    if (args.type === "received") {
      return await ctx.db
        .query("feedback")
        .withIndex("by_to_user", (q) => q.eq("toUserId", args.userId))
        .order("desc")
        .collect();
    } else {
      return await ctx.db
        .query("feedback")
        .withIndex("by_from_user", (q) => q.eq("fromUserId", args.userId))
        .order("desc")
        .collect();
    }
  },
});

export const getFeedbackById = query({
  args: { feedbackId: v.id("feedback") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.feedbackId);
  },
});

export const updateFeedback = mutation({
  args: {
    feedbackId: v.id("feedback"),
    rating: v.optional(v.number()),
    comment: v.optional(v.string()),
    status: v.optional(v.union(v.literal("pending"), v.literal("completed"))),
  },
  handler: async (ctx, args) => {
    const { feedbackId, ...updates } = args;
    await ctx.db.patch(feedbackId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteFeedback = mutation({
  args: { feedbackId: v.id("feedback") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.feedbackId);
  },
});

export const seedCiedenFeedback = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const ciedenUsers = users.filter(user => user.email.includes("@cieden.com"));
    
    const feedbackData = [
      {
        type: "given" as const,
        category: "communication" as const,
        rating: 5,
        comment: "Відмінна комунікація та здатність пояснювати складні концепції простими словами. Завжди готова допомогти колегам.",
        isAnonymous: false,
        status: "completed" as const,
      },
      {
        type: "given" as const,
        category: "leadership" as const,
        rating: 5,
        comment: "Чудовий лідер команди. Вміє мотивувати та надихати на досягнення результатів. Професійний підхід до управління проектами.",
        isAnonymous: false,
        status: "completed" as const,
      },
      {
        type: "given" as const,
        category: "technical" as const,
        rating: 4,
        comment: "Високий рівень технічних навичок. Постійно вдосконалюється та слідкує за новими трендами в дизайні.",
        isAnonymous: true,
        status: "completed" as const,
      },
      {
        type: "given" as const,
        category: "collaboration" as const,
        rating: 5,
        comment: "Відмінний командний гравець. Завжди готовий поділитися знаннями та підтримати колег у складних ситуаціях.",
        isAnonymous: false,
        status: "completed" as const,
      },
      {
        type: "given" as const,
        category: "communication" as const,
        rating: 4,
        comment: "Чітка та ефективна комунікація з клієнтами. Вміє слухати та розуміти потреби замовників.",
        isAnonymous: true,
        status: "completed" as const,
      },
    ];

    const feedbackIds = [];
    
    for (const feedback of feedbackData) {
      const fromUser = ciedenUsers[Math.floor(Math.random() * ciedenUsers.length)];
      let toUser;
      do {
        toUser = ciedenUsers[Math.floor(Math.random() * ciedenUsers.length)];
      } while (fromUser._id === toUser._id);
      
      const feedbackId = await ctx.db.insert("feedback", {
        fromUserId: fromUser._id,
        toUserId: toUser._id,
        ...feedback,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      feedbackIds.push(feedbackId);
    }

    return feedbackIds;
  },
});

export const getFeedbackByStatus = query({
  args: { 
    userId: v.id("users"),
    status: v.union(v.literal("pending"), v.literal("completed")),
    type: v.union(v.literal("received"), v.literal("given"))
  },
  handler: async (ctx, args) => {
    if (args.type === "received") {
      return await ctx.db
        .query("feedback")
        .withIndex("by_to_user", (q) => q.eq("toUserId", args.userId))
        .filter((q) => q.eq(q.field("status"), args.status))
        .collect();
    } else {
      return await ctx.db
        .query("feedback")
        .withIndex("by_from_user", (q) => q.eq("fromUserId", args.userId))
        .filter((q) => q.eq(q.field("status"), args.status))
        .collect();
    }
  },
});

export const getFeedbackByCategory = query({
  args: { 
    userId: v.id("users"),
    category: v.union(
      v.literal("communication"),
      v.literal("leadership"),
      v.literal("technical"),
      v.literal("collaboration"),
      v.literal("other")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("feedback")
      .withIndex("by_to_user", (q) => q.eq("toUserId", args.userId))
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});
