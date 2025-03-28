"use client"; // Enables client-side rendering

import { useSession, signOut } from "next-auth/react"; // Import authentication hooks from NextAuth

export default function Dashboard() {
  const { data: session } = useSession(); // Retrieves user session data

  // If the user is not logged in, display a message
  if (!session) {
    return <p className="text-center text-xl">You are not logged in.</p>;
  }

  return (
    <div className="p-6 text-center">
      {" "}
      {/* Container div with padding and centered text */}
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}!</h1>{" "}
      {/* Display user's name */}
      <button
        onClick={() => signOut()} // Calls signOut function to log the user out
        className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md" // Styling for logout button
      >
        Logout
      </button>
    </div>
  );
}
