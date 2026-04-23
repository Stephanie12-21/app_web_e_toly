"use client";

import { useEffect } from "react";
import { robot } from "@/simulator/robot-sim";
import { speak } from "@/services/speechService";
import { SpeechEvent } from "@/types";

export default function RobotListener() {
  useEffect(() => {
    const handleSpeech = (data: SpeechEvent) => {
      console.log("🗣️ Robot guide :", data.zone);

      // 🔥 on stop toute voix en cours
      speechSynthesis.cancel();

      // 🧠 narration en étapes
      speak(`Bienvenue à ${data.zone}`);

      setTimeout(() => {
        speak(data.introduction);
      }, 2000);

      setTimeout(() => {
        speak(data.recit);
      }, 6000);
    };

    robot.on("speech", handleSpeech);

    return () => {
      robot.off("speech", handleSpeech);
    };
  }, []);

  return null;
}
