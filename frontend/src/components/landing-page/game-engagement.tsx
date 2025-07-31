import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

 const GameEngagementSection = () => {
  return (
    <Card className="p-0 rounded-[32px] border-[0.5px] max-w-[1162px] mx-auto w-full border-white/20 bg-gradient-to-b from-dark-300/80 to-transparent">
      <CardContent className="flex flex-col items-center gap-8 p-10">
        <div className="flex flex-col items-center gap-4 py-2.5">
          <h2 className="font-clash font-semibold text-white text-[43px] text-center tracking-wide leading-tight whitespace-nowrap">
            Want to play?
          </h2>
          <p className="w-full max-w-[728px] mx-auto font-inter font-medium text-white text-2xl text-center tracking-wide leading-relaxed">
            Discover a unique world of unlimited learning built the on
            adventure. Jump in and explore
          </p>
        </div>

        <Button
          variant="outline"
          className="px-6 py-4 w-44 rounded-xl border border-white bg-transparent hover:bg-white/10 font-jakarta font-medium text-white text-lg tracking-wide"
        >
          Explore Games
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameEngagementSection;
