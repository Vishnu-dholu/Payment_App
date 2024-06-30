import { Suspense } from "react";
import dynamic from "next/dynamic";

const PasswordForm = dynamic(() => import("./PasswordForm"), {
  ssr: false,
});

export default function Password() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordForm />
    </Suspense>
  );
}
