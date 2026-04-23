"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
const GuardianModeBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/guardian-mode");
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Guardian Mode
    </Button>
  );
};

export default GuardianModeBtn;
