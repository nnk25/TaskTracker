"use client";

import React from "react";
import SignInCard from "../components/molecules/SignInCard";

export default function SignInPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SignInCard />
    </div>
  );
}
