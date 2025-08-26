"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import ConvexErrorBoundary from "./ConvexErrorBoundary";

// Перевіряємо наявність Convex URL
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!convexUrl) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set. Please check your environment variables.");
}

const convex = new ConvexReactClient(convexUrl);

interface ClientProvidersProps {
  children: React.ReactNode;
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <ConvexErrorBoundary>
      <ConvexProvider client={convex}>
        {children}
      </ConvexProvider>
    </ConvexErrorBoundary>
  );
};

export default ClientProviders;
