import GuardianModeBtn from "@/components/shared/GuardianModeBtn";
import GuideModeBtn from "@/components/shared/GuideModeBtn";

const Home = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-10">
      Bienvenu cher visiteur Veuillez choisir le mode que vous souhaitez pour le
      robot :
      <div className="flex items-center justify-center gap-14">
        <GuardianModeBtn />
        <GuideModeBtn />
      </div>
    </div>
  );
};

export default Home;
