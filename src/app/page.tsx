"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { SignIn, SignUp } from "@clerk/nextjs";

export default function HomePage() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      router.push("/dashboard");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Performance Management
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isSignUp ? "Create your account" : "Sign in to your account"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Toggle buttons */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isSignUp
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isSignUp
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Clerk components */}
          <div className="flex justify-center">
            {isSignUp ? (
              <SignUp 
                routing="hash"
                signInUrl="#"
                afterSignUpUrl="/dashboard"
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                    card: "shadow-none border-0 p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "border-gray-300",
                    dividerLine: "bg-gray-300",
                    dividerText: "text-gray-500",
                    formFieldInput: "border-gray-300 focus:border-purple-500 focus:ring-purple-500",
                    footerActionLink: "text-purple-600 hover:text-purple-500"
                  }
                }}
              />
            ) : (
              <SignIn 
                routing="hash"
                signUpUrl="#"
                afterSignInUrl="/dashboard"
                appearance={{
                  elements: {
                    formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                    card: "shadow-none border-0 p-0",
                    headerTitle: "hidden", 
                    headerSubtitle: "hidden",
                    socialButtonsBlockButton: "border-gray-300",
                    dividerLine: "bg-gray-300",
                    dividerText: "text-gray-500",
                    formFieldInput: "border-gray-300 focus:border-purple-500 focus:ring-purple-500",
                    footerActionLink: "text-purple-600 hover:text-purple-500"
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* Info section */}
        <div className="mt-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Powerful Performance Management
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-sm">👥</span>
                </div>
                <span className="text-sm text-gray-600">Team Management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-sm">🎯</span>
                </div>
                <span className="text-sm text-gray-600">Goal Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-sm">📊</span>
                </div>
                <span className="text-sm text-gray-600">Analytics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-sm">💬</span>
                </div>
                <span className="text-sm text-gray-600">Feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
