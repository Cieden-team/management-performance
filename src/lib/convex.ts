import { ConvexProvider, ConvexReactClient } from "convex/react";

// Перевіряємо наявність Convex URL
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.warn("NEXT_PUBLIC_CONVEX_URL is not set. Convex will not work properly.");
}

export const convex = new ConvexReactClient(convexUrl || "https://placeholder.convex.cloud");

export { ConvexProvider };
