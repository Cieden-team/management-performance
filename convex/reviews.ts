import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createReview = mutation({
  args: {
    cycleId: v.id("performanceCycles"),
    employeeId: v.id("users"),
    reviewerId: v.id("users"),
    type: v.union(
      v.literal("self"),
      v.literal("peer"),
      v.literal("manager"),
      v.literal("360")
    ),
  },
  handler: async (ctx, args) => {
    const reviewId = await ctx.db.insert("reviews", {
      ...args,
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return reviewId;
  },
});

export const getReviewsByEmployee = query({
  args: { employeeId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("by_employee", (q) => q.eq("employeeId", args.employeeId))
      .order("desc")
      .collect();
  },
});

export const getReviewsByReviewer = query({
  args: { reviewerId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("by_reviewer", (q) => q.eq("reviewerId", args.reviewerId))
      .order("desc")
      .collect();
  },
});

export const getReviewsByCycle = query({
  args: { cycleId: v.id("performanceCycles") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("by_cycle", (q) => q.eq("cycleId", args.cycleId))
      .collect();
  },
});

export const getReviewById = query({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.reviewId);
  },
});

export const updateReview = mutation({
  args: {
    reviewId: v.id("reviews"),
    overallRating: v.optional(v.number()),
    strengths: v.optional(v.array(v.string())),
    areasForImprovement: v.optional(v.array(v.string())),
    comments: v.optional(v.string()),
    status: v.optional(
      v.union(
        v.literal("draft"),
        v.literal("submitted"),
        v.literal("approved"),
        v.literal("completed")
      )
    ),
  },
  handler: async (ctx, args) => {
    const { reviewId, ...updates } = args;
    const updateData: any = {
      ...updates,
      updatedAt: Date.now(),
    };

    if (updates.status === "submitted") {
      updateData.submittedAt = Date.now();
    }

    await ctx.db.patch(reviewId, updateData);
  },
});

export const deleteReview = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.reviewId);
  },
});

export const seedCiedenReviews = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const ciedenUsers = users.filter(user => user.email.includes("@cieden.com"));
    
    // Створимо цикл продуктивності
    const cycleId = await ctx.db.insert("performanceCycles", {
      name: "Q1 2024 Performance Review",
      description: "Огляд продуктивності за перший квартал 2024 року",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      status: "active" as const,
      createdBy: ciedenUsers.find(u => u.role === "admin")?._id || ciedenUsers[0]._id,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    const reviewData = [
      {
        type: "manager" as const,
        status: "completed" as const,
        overallRating: 4.5,
        strengths: ["Відмінні лідерські якості", "Професійний підхід до роботи", "Ефективна комунікація"],
        areasForImprovement: ["Можна покращити делегування завдань"],
        comments: "Загалом відмінна робота. Продовжуйте розвиватися в тому ж напрямку.",
      },
      {
        type: "self" as const,
        status: "submitted" as const,
        overallRating: 4.0,
        strengths: ["Відповідальність", "Креативність", "Командна робота"],
        areasForImprovement: ["Тайм-менеджмент", "Презентаційні навички"],
        comments: "Працюю над покращенням своїх слабких сторін. Планую пройти курси з тайм-менеджменту.",
      },
      {
        type: "peer" as const,
        status: "completed" as const,
        overallRating: 4.8,
        strengths: ["Відмінний командний гравець", "Високий рівень експертизи", "Готовність допомогти"],
        areasForImprovement: ["Можна бути більш ініціативним"],
        comments: "Дуже приємно працювати разом. Завжди готовий поділитися знаннями.",
      },
    ];

    const reviewIds = [];
    
    for (const review of reviewData) {
      const employee = ciedenUsers[Math.floor(Math.random() * ciedenUsers.length)];
      let reviewer;
      do {
        reviewer = ciedenUsers[Math.floor(Math.random() * ciedenUsers.length)];
      } while (employee._id === reviewer._id);
      
      const reviewId = await ctx.db.insert("reviews", {
        cycleId,
        employeeId: employee._id,
        reviewerId: reviewer._id,
        ...review,
        submittedAt: review.status === "completed" || review.status === "submitted" ? Date.now() : undefined,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      reviewIds.push(reviewId);
    }

    return reviewIds;
  },
});

export const getReviewsByStatus = query({
  args: { 
    userId: v.id("users"),
    status: v.union(
      v.literal("draft"),
      v.literal("submitted"),
      v.literal("approved"),
      v.literal("completed")
    ),
    role: v.union(v.literal("employee"), v.literal("reviewer"))
  },
  handler: async (ctx, args) => {
    if (args.role === "employee") {
      return await ctx.db
        .query("reviews")
        .withIndex("by_employee", (q) => q.eq("employeeId", args.userId))
        .filter((q) => q.eq(q.field("status"), args.status))
        .collect();
    } else {
      return await ctx.db
        .query("reviews")
        .withIndex("by_reviewer", (q) => q.eq("reviewerId", args.userId))
        .filter((q) => q.eq(q.field("status"), args.status))
        .collect();
    }
  },
});
