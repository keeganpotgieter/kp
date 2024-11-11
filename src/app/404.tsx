"use client";

import { useRouter } from "next/router";
import React from "react";

const NotFoundPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    void router.replace("/");
  }, [router]);

  return null;
};

export default NotFoundPage;
