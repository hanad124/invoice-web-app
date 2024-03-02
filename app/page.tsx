"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // automatically redirect to the dashboard page
  useEffect(() => {
    router.push("/dashboard");
  }, []);
  return <div className=""></div>;
}
