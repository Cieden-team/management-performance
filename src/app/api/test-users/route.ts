import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

export async function GET() {
  try {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const users = await convex.query(api.users.getAllUsers);
    
    return NextResponse.json({
      success: true,
      count: users.length,
      users: users.slice(0, 5).map(u => ({
        name: `${u.firstName} ${u.lastName}`,
        department: u.department,
        position: u.position
      }))
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

