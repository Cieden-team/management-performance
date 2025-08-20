import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSkill = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    category: v.string(),
    level: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced"),
      v.literal("expert")
    ),
    rating: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const skillId = await ctx.db.insert("skills", {
      ...args,
      lastAssessed: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return skillId;
  },
});

export const getSkillsByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getSkillsByCategory = query({
  args: { 
    userId: v.id("users"),
    category: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});

export const getSkillById = query({
  args: { skillId: v.id("skills") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.skillId);
  },
});

export const updateSkill = mutation({
  args: {
    skillId: v.id("skills"),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    level: v.optional(
      v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("advanced"),
        v.literal("expert")
      )
    ),
    rating: v.optional(v.number()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { skillId, ...updates } = args;
    await ctx.db.patch(skillId, {
      ...updates,
      lastAssessed: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const deleteSkill = mutation({
  args: { skillId: v.id("skills") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.skillId);
  },
});

export const seedCiedenSkills = mutation({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const ciedenUsers = users.filter(user => user.email.includes("@cieden.com"));
    
    const skillsData = [
      // UX/UI Design Skills
      { name: "Figma", category: "Design Tools", level: "expert" as const, rating: 5 },
      { name: "Adobe Creative Suite", category: "Design Tools", level: "advanced" as const, rating: 4 },
      { name: "User Research", category: "UX Research", level: "advanced" as const, rating: 4 },
      { name: "Usability Testing", category: "UX Research", level: "advanced" as const, rating: 4 },
      { name: "Wireframing", category: "Design Process", level: "expert" as const, rating: 5 },
      { name: "Prototyping", category: "Design Process", level: "expert" as const, rating: 5 },
      { name: "Design Systems", category: "Design Process", level: "advanced" as const, rating: 4 },
      
      // Business & Management Skills
      { name: "Project Management", category: "Management", level: "advanced" as const, rating: 4 },
      { name: "Client Communication", category: "Communication", level: "expert" as const, rating: 5 },
      { name: "Team Leadership", category: "Leadership", level: "advanced" as const, rating: 4 },
      { name: "Business Analysis", category: "Business", level: "advanced" as const, rating: 4 },
      
      // Technical Skills
      { name: "HTML/CSS", category: "Frontend", level: "intermediate" as const, rating: 3 },
      { name: "JavaScript", category: "Programming", level: "beginner" as const, rating: 2 },
      { name: "Design Handoff", category: "Development", level: "advanced" as const, rating: 4 },
      
      // Soft Skills
      { name: "Problem Solving", category: "Soft Skills", level: "expert" as const, rating: 5 },
      { name: "Creativity", category: "Soft Skills", level: "expert" as const, rating: 5 },
      { name: "Collaboration", category: "Soft Skills", level: "advanced" as const, rating: 4 },
      
      // Industry Knowledge
      { name: "SaaS Design", category: "Industry", level: "expert" as const, rating: 5 },
      { name: "Enterprise Design", category: "Industry", level: "advanced" as const, rating: 4 },
      { name: "AI/ML UX", category: "Emerging Tech", level: "intermediate" as const, rating: 3 },
      { name: "Mobile Design", category: "Platform", level: "advanced" as const, rating: 4 },
      { name: "Web Design", category: "Platform", level: "expert" as const, rating: 5 },
    ];

    const skillIds = [];
    
    for (const skillData of skillsData) {
      const randomUser = ciedenUsers[Math.floor(Math.random() * ciedenUsers.length)];
      
      const skillId = await ctx.db.insert("skills", {
        userId: randomUser._id,
        ...skillData,
        lastAssessed: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      skillIds.push(skillId);
    }

    return skillIds;
  },
});

export const getSkillsByLevel = query({
  args: { 
    userId: v.id("users"),
    level: v.union(
      v.literal("beginner"),
      v.literal("intermediate"),
      v.literal("advanced"),
      v.literal("expert")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("level"), args.level))
      .collect();
  },
});

export const getTopSkills = query({
  args: { 
    userId: v.id("users"),
    limit: v.optional(v.number())
  },
  handler: async (ctx, args) => {
    const skills = await ctx.db
      .query("skills")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    
    // Sort by rating and return top skills
    const sortedSkills = skills.sort((a, b) => b.rating - a.rating);
    return sortedSkills.slice(0, args.limit || 5);
  },
});
