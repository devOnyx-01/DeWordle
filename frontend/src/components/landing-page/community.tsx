"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { NextIcon } from "../ui/icons/icon";
const games = [
  {
    id: "spelling-bee",
    title: "SPELLING BEE",
    description:
      "Test your vocabulary skills with our unique word-guessing game. Six attempts to find the hidden word and earn your victory!",
    buttonText: "Play Spelling Bee",
    imageSrc: "/words.svg",
  },
  {
    id: "dewordle",
    title: "DEWORDLE",
    description:
      "Test your vocabulary skills with our unique word-guessing game. Six attempts to find the hidden word and earn your victory!",
    buttonText: "Play Dewordle",
    imageSrc: "/sword.svg",
  },
  {
    id: "tiles",
    title: "TILES",
    description:
      "Test your vocabulary skills with our unique word-guessing game. Six attempts to find the hidden word and earn your victory!",
    buttonText: "Play Tiles",
    imageSrc: "/word.svg",
  },
];
const CommunitySection = () => {
  // Game data for mapping

  const [currentIndex, setCurrentIndex] = useState(1); // Start with DEWORDLE (index 1) in center

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  // Create extended array for smooth infinite scrolling (5 copies for better infinite effect)
  const extendedGames = [...games, ...games, ...games, ...games, ...games];
  const centerOffset = games.length * 2; // Start from the middle set (3rd copy)
  const actualIndex = centerOffset + (currentIndex % games.length);

  // Reset position when we get too far from center (invisible to user)
  useEffect(() => {
    if (currentIndex > games.length || currentIndex < -games.length) {
      // Reset to equivalent position in center without animation
      const resetIndex =
        ((currentIndex % games.length) + games.length) % games.length;
      setTimeout(() => {
        setCurrentIndex(resetIndex);
      }, 0);
    }
  }, [currentIndex, games.length]);

  return (
    <div className="relative w-full py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute w-full  max-w-[1566px] h-[718px] top-0 left-1/2 -translate-x-1/2 bg-[#69438e33] rounded-[782.87px/358.98px] blur-[125px]" />

      {/* Section header */}
      <div className="relative text-center mb-16">
        <h2 className="font-clash font-normal text-white text-[50px] leading-[50px] mb-6">
          Your next obsession awaits
        </h2>
        <p className="font-jakarta font-normal text-white text-[21px] leading-[29.4px]">
          Challenge your mind with a games more than just fun
        </p>
      </div>

      {/* Games carousel */}
      <div className="relative max-w-[1734px] mx-auto">
        <div className="overflow-hidden">
          <div
            className={`flex items-center gap-8 transition-transform duration-700 ease-in-out ${
              Math.abs(currentIndex) > games.length ? "transition-none" : ""
            }`}
            style={{
              transform: `translateX(calc(-${
                actualIndex * (564 + 32)
              }px + 50vw - 282px))`,
              width: `${extendedGames.length * (564 + 32)}px`,
            }}
          >
            {extendedGames.map((game, index) => {
              const distanceFromCenter = Math.abs(index - actualIndex);
              const isCenter = index === actualIndex;
              const isVisible = distanceFromCenter <= 1;

              return (
                <Card
                  key={`${game.id}-${index}`}
                  className={`transition-all duration-500 ease-in-out ${
                    isCenter
                      ? "scale-100 opacity-100 z-10"
                      : isVisible
                      ? "scale-75 opacity-60 z-0"
                      : "scale-50 opacity-30 z-0"
                  } flex-shrink-0`}
                  style={{ width: "564px" }}
                >
                  <CardContent
                    className={`
                    ${
                      isCenter
                        ? "bg-[#00000066] rounded-[14.36px] backdrop-blur-[6.73px] relative p-[2px]"
                        : "bg-[#00000066] rounded-[12.25px] border border-solid border-[#636363] backdrop-blur-[5.74px]"
                    }
                    flex flex-col w-full overflow-hidden
                  `}
                  >
                    <div
                      className={`${
                        isCenter
                          ? "bg-[#00000066] rounded-[12.36px] backdrop-blur-[6.73px]"
                          : ""
                      } flex flex-col h-full`}
                    >
                      <div className="p-0">
                        <img
                          className="w-full"
                          alt={game.title}
                          src={game.imageSrc}
                        />
                        <div className="flex flex-col items-center p-[18px] gap-[14px]">
                          <div className="flex flex-col items-center gap-[7px]">
                            <h3
                              className={`
                            [font-family:'Clash_Display-Semibold',Helvetica] 
                            font-normal text-white text-center tracking-[0.6px]
                            ${
                              isCenter
                                ? "text-[36px] leading-[50px]"
                                : "text-[30.6px] leading-[43px]"
                            }
                          `}
                            >
                              {game.title}
                            </h3>
                            <p
                              className={`
                            [font-family:'Plus_Jakarta_Sans',Helvetica] 
                            font-normal text-white text-center
                            ${
                              isCenter
                                ? "text-base leading-[22.4px]"
                                : "text-[16px] leading-[22.5px]"
                            }
                          `}
                            >
                              {game.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      <CardFooter className="p-[18px] pt-0">
                        <Button
                          className={`
                          w-full rounded-lg border border-solid 
                          ${isCenter ? "border-[#ffffff66]" : "border-white"} 
                          bg-transparent hover:bg-white/10
                          font-jakarta font-medium text-white
                          ${
                            isCenter
                              ? "text-[21px] py-[21px]"
                              : "text-[16px] py-[18px]"
                          }
                        `}
                        >
                          {game.buttonText}
                        </Button>
                      </CardFooter>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-[134px] h-[134px] -rotate-90 opacity-80 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none"
          aria-label="Previous game"
        >
          <div className="relative w-[116px] h-[116px] top-[9px] left-[9px]">
            <NextIcon />
          </div>
        </div>

        <div
          onClick={handlePrevious}
          className="absolute top-1/2 -translate-y-1/2 right-0 w-[134px] h-[134px] rotate-90 opacity-80 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none"
          aria-label="Next game"
        >
          <NextIcon />
        </div>

        <div className="absolute inset-0 w-full h-[726px] top-[54px] left-0 [background:radial-gradient(50%_50%_at_50%_0%,rgba(9,1,27,0)_8%,rgba(9,1,27,0.05)_64%,rgba(9,1,27,0.7)_100%)] pointer-events-none" />
      </div>

      {/* View all games button */}
      <div className="flex justify-center mt-16">
        <Button className="w-[330px] h-auto px-2.5 py-4 rounded-[40px] bg-transparent text-white text-2xl [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal leading-[33.6px]  hover:bg-white/5">
          View all Games
        </Button>
      </div>
    </div>
  );
};
export default CommunitySection;
