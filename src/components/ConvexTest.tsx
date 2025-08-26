"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const ConvexTest = () => {
  const users = useQuery(api.users.getAllUsers);

  if (!users) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Convex Test - Users ({users.length})</h3>
      <div className="space-y-2">
        {users.map((user: any) => (
          <div key={user._id} className="p-2 bg-gray-50 rounded">
            {user.firstName} {user.lastName} - {user.email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConvexTest;
