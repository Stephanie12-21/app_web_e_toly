"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { setGuideMode } from "@/services/robotService";

const GuideModeBtn = () => {
  const router = useRouter();

  const handleClick = async () => {
    await setGuideMode(); // 🔥 ACTIVE LE ROBOT
    router.push("/guide-mode");
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Guide Mode
    </Button>
  );
};

export default GuideModeBtn;
