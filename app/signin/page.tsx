"use client"

import React from "react"
import { signIn } from "next-auth/react"

export default function SignInPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: 24, borderRadius: 8, boxShadow: "0 6px 18px rgba(0,0,0,0.08)" }}>
        <h1 style={{ margin: 0, marginBottom: 8 }}>TaskTracker</h1>
        <button
          onClick={() => signIn("github", {redirectTo:"/tasks"})}
          style={{
            background: "#24292f",
            color: "#fff",
            border: "none",
            padding: "10px 16px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  )
}
