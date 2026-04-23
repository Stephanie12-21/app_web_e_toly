"use client";

import GoBackBtn from "@/components/shared/GoBackBtn";
import ViewCard from "@/components/guide_mode_component/ViewCard";
const GuideModePage = () => {
  return (
    <div className=" px-4">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 mt-13">
        <GoBackBtn />

        {/* Titre + filtre */}
        <div className="mb-8  mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Découvrez nos destinations
            </h1>
            <p className="text-gray-600 text-lg">
              Trouvez votre prochaine aventure parmi nos circuits exceptionnels
            </p>
          </div>
        </div>

        <ViewCard />

      </div>
    </div>
  );
};

export default GuideModePage;
