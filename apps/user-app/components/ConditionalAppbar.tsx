"use client";

import { usePathname } from "next/navigation";
import { AppbarClient } from "./AppbarClient";

export default function ConditionalAppbar() {
  const pathname = usePathname();

  const isLoginPage =
    pathname === "/auth/signin" ||
    pathname === "/auth/password" ||
    pathname === "/auth/signup";

  return !isLoginPage ? <AppbarClient /> : null;
}
