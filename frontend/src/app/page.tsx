import Image from "next/image";
import Header from "../components/header";
import GameHighlightSection from "@/components/landing-page/game-highlight";
import LearningSection from "@/components/landing-page/learning";
import ExploreGamesSection from "@/components/landing-page/explore-games";
import SiteFooterSection from "@/components/landing-page/footer";
import GameEngagementSection from "@/components/landing-page/game-engagement";
import CommunitySection from "@/components/landing-page/community";

const Home = () => {
  return (
    <main className="flex flex-col relative w-full bg-primary-950  min-h-screen h-full overflow-x-hidden">
      <Header />

      <section className="relative flex items-center justify-center overflow-hidden bg-[url('/gradient.svg')] bg-cover bg-no-repeat bg-center w-full h-[50rem] rounded-b-[40px]">
        <Image
          className="object-cover w-full h-full inset-0 mix-blend-color-dodge"
          alt="background"
          fill
          src="/bg.svg"
        />

        <div className="absolute w-9 h-9 top-[42.125rem] left-[43.875rem] opacity-60">
          <div className="relative w-8 h-8 top-0.5 left-0.5 bg-[url(/vector-17.svg)] bg-[100%_100%]">
            <img
              className="absolute w-3.5 h-2 top-3 left-[0.5625rem]"
              alt="Vector"
              src="/vector-6.svg"
            />
          </div>
        </div>

        <GameHighlightSection />
      </section>

      <LearningSection />

      <ExploreGamesSection />
      <CommunitySection />

      <GameEngagementSection />

      <SiteFooterSection />
    </main>
  );
};

export default Home;
