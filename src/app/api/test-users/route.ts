import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";

export async function GET() {
  try {
    const convex = new ConvexHttpClient("https://festive-porpoise-89.convex.cloud");
    const users = await convex.query("users:getAllUsers");
    
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
      error: error.message
    }, { status: 500 });
  }
}

