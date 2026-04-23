"use client";

import GoBackBtn from "@/components/shared/GoBackBtn";
import { Suspense } from "react";
const GuardianModePage = () => {
  return (
    <div className=" px-4">
      <Suspense fallback={<div>Chargement...</div>}>
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 mt-13">
          <GoBackBtn />
          guardian mode page
        </div>
      </Suspense>
    </div>
  );
};

export default GuardianModePage;
