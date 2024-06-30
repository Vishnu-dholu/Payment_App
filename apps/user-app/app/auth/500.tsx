// pages/500.tsx

import { NextPage } from "next";
import ErrorPage from "next/error";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ServerErrorPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <ErrorPage statusCode={500} title="Server Error">
      <p>Oops! Something went wrong on our end.</p>
      <p>We're redirecting you to the homepage.</p>
    </ErrorPage>
  );
};

export default ServerErrorPage;
