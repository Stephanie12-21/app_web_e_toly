"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { setGuardianMode } from "@/services/robotService";
const GuardianModeBtn = () => {
  const router = useRouter();

  const handleClick = async () => {
    await setGuardianMode();
    router.push("/guardian-mode");
  };
  return (
    <Button variant="outline" onClick={handleClick}>
      Guardian Mode
    </Button>
  );
};

export default GuardianModeBtn;
