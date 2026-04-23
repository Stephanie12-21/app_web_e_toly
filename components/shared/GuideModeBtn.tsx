"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
const GuideModeBtn = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/guide-mode");
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      Guide Mode
    </Button>
  );
};

export default GuideModeBtn;
