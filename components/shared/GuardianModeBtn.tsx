"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
const GuardianModeBtn = () => {
  const router = useRouter();

  const handleClick = async () => {
    await fetch("/api/mode", {
      method: "POST",
      body: JSON.stringify({ mode: "GUARDIAN" }),
    });

    router.push("/guardian-mode");
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Guardian Mode
    </Button>
  );
};

export default GuardianModeBtn;
