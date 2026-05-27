"use client";

import React from "react";
import Heading from "../atoms/Heading";
import Button from "../atoms/Button";
import { signIn } from "next-auth/react";

export default function SignInCard() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <Heading className="m-0 mb-2">TaskTracker</Heading>
      <div className="mt-4">
        <Button
          variant="dark"
          onClick={() => signIn("github", { callbackUrl: "/tasks" })}
        >
          Sign in with GitHub
        </Button>
      </div>
    </div>
  );
}
