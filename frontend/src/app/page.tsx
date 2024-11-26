'use client';
import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import HomePage from "./components/layout/HomePage";

export default function Home() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      if (userId) {
        setUserId(userId);
      }
    }
  }, []);

  return (
    <main className="w-full min-h-svh h-fit">
      <Header userId={userId} />
      <HomePage />
    </main>
  );
}
