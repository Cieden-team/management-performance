import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.optional(v.string()),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    role: v.string(),
    department: v.string(),
    position: v.string(),
    hireDate: v.optional(v.string()),
    managerId: v.optional(v.id("users")),
    avatar: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    // New fields from CSV
    leader: v.optional(v.string()),
    access: v.optional(v.string()),
    cv: v.optional(v.string()),
    seniority: v.optional(v.string()),
    industries: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    experienceStarted: v.optional(v.string()),
    joinedCieden: v.optional(v.string()),
    inCieden: v.optional(v.string()),
    totalExperience: v.optional(v.string()),
    english: v.optional(v.string()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_manager", ["managerId"]),

  goals: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    category: v.union(
      v.literal("performance"),
      v.literal("development"),
      v.literal("team"),
      v.literal("personal")
    ),
    status: v.union(
      v.literal("not_started"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("overdue")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    startDate: v.string(),
    dueDate: v.string(),
    progress: v.number(), // 0-100
    metrics: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_due_date", ["dueDate"]),

  performanceCycles: defineTable({
    name: v.string(),
    description: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    status: v.union(
      v.literal("planning"),
      v.literal("active"),
      v.literal("review"),
      v.literal("completed")
    ),
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_date_range", ["startDate", "endDate"]),

  reviews: defineTable({
    cycleId: v.id("performanceCycles"),
    employeeId: v.id("users"),
    reviewerId: v.id("users"),
    type: v.union(
      v.literal("self"),
      v.literal("peer"),
      v.literal("manager"),
      v.literal("360")
    ),
    status: v.union(
      v.literal("draft"),
      v.literal("submitted"),
      v.literal("approved"),
      v.literal("completed")
    ),
    overallRating: v.optional(v.number()),
    strengths: v.optional(v.array(v.string())),
    areasForImprovement: v.optional(v.array(v.string())),
    comments: v.optional(v.string()),
    submittedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_cycle", ["cycleId"])
    .index("by_employee", ["employeeId"])
    .index("by_reviewer", ["reviewerId"])
    .index("by_status", ["status"]),

  feedback: defineTable({
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
    status: v.union(v.literal("pending"), v.literal("completed")),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  
  feedbackForms: defineTable({
    fromUserId: v.id("users"),
    toUserId: v.id("users"),
    formType: v.union(v.literal("self"), v.literal("teammate"), v.literal("leader")),
    cycleId: v.optional(v.id("performanceCycles")),
    status: v.union(v.literal("draft"), v.literal("submitted"), v.literal("completed")),
    
    // Previous Achievements
    achievementsAccomplished: v.optional(v.string()), // radio button selection
    achievementsExamples: v.optional(v.string()), // text area
    
    // Plans & Development
    desiredRole: v.optional(v.string()), // text area
    skillsForGrowth: v.optional(v.string()), // text area
    initiativesToDrive: v.optional(v.array(v.string())), // checkboxes
    
    // Cieden Values Ratings (1-7 scale)
    creativityOriginalIdeas: v.optional(v.number()),
    creativityAdaptApproach: v.optional(v.number()),
    intelligenceResearchBased: v.optional(v.number()),
    intelligenceDeepUnderstanding: v.optional(v.number()),
    intelligenceContinuousDevelopment: v.optional(v.number()),
    effectivenessQualityWork: v.optional(v.number()),
    effectivenessValueFocus: v.optional(v.number()),
    effectivenessBusinessAlignment: v.optional(v.number()),
    driveWorkLifeBalance: v.optional(v.number()),
    drivePersistence: v.optional(v.number()),
    driveChallengingTasks: v.optional(v.number()),
    encouragementOpenCommunication: v.optional(v.number()),
    encouragementConstructiveFeedback: v.optional(v.number()),
    encouragementSupportMotivation: v.optional(v.number()),
    nurturingColleagueSuccess: v.optional(v.number()),
    nurturingTeamParticipation: v.optional(v.number()),
    nurturingKnowledgeSharing: v.optional(v.number()),
    
    // Work Comfort & Support
    roleComfort: v.optional(v.number()), // 1-7 scale
    effectivenessSupport: v.optional(v.string()), // text area
    
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_from_user", ["fromUserId"])
    .index("by_to_user", ["toUserId"])
    .index("by_status", ["status"]),

  skills: defineTable({
    userId: v.id("users"),
    name: v.string(),
    category: v.string(),
    level: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced"),
      v.literal("expert")
    ),
    rating: v.number(), // 1-5
    lastAssessed: v.number(),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_category", ["category"]),

  notifications: defineTable({
    userId: v.id("users"),
    type: v.union(
      v.literal("goal_reminder"),
      v.literal("review_due"),
      v.literal("feedback_received"),
      v.literal("cycle_start"),
      v.literal("system")
    ),
    title: v.string(),
    message: v.string(),
    isRead: v.boolean(),
    actionUrl: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_read_status", ["isRead"])
    .index("by_created", ["createdAt"]),
});
