import { SignInButton, SignOutButton, useAuth } from "@clerk/clerk-react";
import React from "react";

export default function Logout() {
  const { sessionId } = useAuth();

  if (!sessionId) {
    return <SignInButton />;
  }

  return <SignOutButton signOutOptions={{ sessionId }} />;
}