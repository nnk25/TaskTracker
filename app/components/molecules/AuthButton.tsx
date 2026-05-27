"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../atoms/Button";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (session) {
      void signOut({ callbackUrl: "/signin" });
    } else {
      router.push("/signin");
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={status === "loading"}
      variant={session ? "muted" : "primary"}
    >
      {session ? "Sign out" : "Sign in"}
    </Button>
  );
}
