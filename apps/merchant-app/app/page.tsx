"use client";

import { useBalance } from "@repo/store/balance";

export default function Home() {
  const balance = useBalance();
  return <div>hi there {balance}</div>;
}
