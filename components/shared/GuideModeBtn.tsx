"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
const GuideModeBtn = () => {
  const router = useRouter();

  const handleClick = async () => {
    await fetch("/api/mode", {
      method: "POST",
      body: JSON.stringify({ mode: "GUIDE" }),
    });

    router.push("/guide-mode");
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Guide Mode
    </Button>
  );
};

export default GuideModeBtn;
