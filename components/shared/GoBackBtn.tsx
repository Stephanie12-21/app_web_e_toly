"use client";

import { Button } from "@/components/ui/button";

const GoBackBtn = () => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <Button variant="outline" size="lg" onClick={handleGoBack}>
      Retour
    </Button>
  );
};

export default GoBackBtn;
