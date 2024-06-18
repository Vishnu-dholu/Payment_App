"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

export function AppbarClient() {
  const { data: session } = useSession();

  const handleSignout = async () => {
    await signOut();
  };

  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={handleSignout}
        user={session?.user}
      />
    </div>
  );
}
