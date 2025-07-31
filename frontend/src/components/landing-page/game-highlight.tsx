import React from "react";
import { Button } from "../ui/button";

const GameHighlightSection = () => {
  return (
    <section className="flex flex-col items-center gap-[54px] w-full max-w-4xl mx-auto py-12">
      <div className="flex flex-col items-center gap-2 w-full">
        <h2 className="w-full capitalize max-w-[288px] md:max-w-[80%] lg:max-w-[708px] font-clash font-semibold text-white text-[34px] sm:text-5xl lg:text-[82px] text-center tracking-tight leading-tight">
          Unlock Endless Discoveries.
        </h2>

        <p className="max-w-[683px] mx-auto font-jakarta  font-normal text-white/80 text-lg text-center tracking-wide leading-relaxed">
          Challenge your mind with a growing world of games designed for
          thinkers, learners, and players who crave more than just fun
        </p>
      </div>

      <Button variant="outline" size="lg">
        Explore Games
      </Button>
    </section>
  );
};

export default GameHighlightSection;
