import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";

 const ExploreGamesSection = () => {
  return (
    <Card className="flex flex-row items-center bg-[url(/bg-2.svg)] bg-cover bg-no-repeatjustify-center max-w-[1300px] mx-auto w-full h-auto  gap-37 px-10 py-0 rounded-[40px]">
      <div className="flex flex-col items-start w-fit gap-10 py-38">
        <div className="flex flex-col items-start gap-2 w-full">
          <p className="w-full max-w-[567px] font-jakarta font-semibold text-white text-[28px] tracking-wide leading-relaxed">
            Engage your mind with skill-based game. Earn rewards, discover new
            words, and level up your knowledge in every session.
          </p>
        </div>

        <Button className="px-6 py-4 bg-primary-500 rounded-xl w-44 font-jakarta font-bold text-white text-lg tracking-wide border border-white hover:bg-primary-600">
          Learn More
        </Button>
      </div>

      <div className="py-13 h-full w-fit max-w-[431px] max-h-[478px] flex items-center justify-center">
        <Image
          className="object-contain"
          width={431}
          height={478}
          alt="Game interface preview"
          src="/interface.svg"
        />
      </div>
    </Card>
  );
};

export default ExploreGamesSection;
