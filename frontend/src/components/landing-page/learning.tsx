import React, { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { ConnectCardIcon, PlayCardIcon, TrackCardIcon } from "../ui/icons/icon";

interface FeatureCard {
  title: string;
  description: string;
  background: string;
  icon: ReactNode;
}

const LearningSection = () => {
  const featureCards: FeatureCard[] = [
    {
      title: "Play, Earn And Learn",
      description:
        "Lorem Ipsum Dolor Sit Amet Cotetur. Amet Id Est Quam Pulvinar Enim Non. Metus Purus Suspendisse Tincidunt",
      background: "bg-[linear-gradient(93deg,#815207_-8.58%,#372602_97.64%)]",
      icon: <PlayCardIcon />,
    },
    {
      title: "Connect And Compete",
      description:
        "Lorem Ipsum Dolor Sit Amet Cotetur. Amet Id Est Quam Pulvinar Enim Non. Metus Purus Suspendisse Tincidunt",
      background: "bg-[linear-gradient(96deg,#4667A6_0%,#001421_97.4%)]",
      icon: <ConnectCardIcon />,
    },
    {
      title: "Track Your Mastery",
      description:
        "Lorem Ipsum Dolor Sit Amet Cotetur. Amet Id Est Quam Pulvinar Enim Non. Metus Purus Suspendisse Tincidunt",
      background: "bg-[linear-gradient(95deg,#7B1971_0.54%,#1D001A_79.22%)]",
      icon: <TrackCardIcon />,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto py-[124px]">
      <div className="flex flex-col items-center mb-12">
        <h2 className="font-clash font-semibold text-white text-[52px] text-center leading-tight">
          Elevate Your Play
        </h2>
        <p className="font-inter font-normal text-white text-[32px] text-center leading-8 max-w-[954px] mt-2.5">
          Dive into a world of skill-based word and puzzle games
        </p>
      </div>

      <div className="flex flex-wrap justify-between w-full gap-12">
        {featureCards.map((card, index) => (
          <Card
            key={index}
            className={`border-none flex-1 max-w-[350px] w-full p-6 ${card.background}`}
            style={{ borderRadius: "24.574px" }}
          >
            <CardContent className="p-0">
              <div className="flex flex-col items-start justify-center gap-8">
                {card.icon}
                <div className="flex flex-col items-start gap-5 w-full">
                  <h3 className="font-clash font-semibold text-white text-xl tracking-wide">
                    {card.title}
                  </h3>
                  <p className="font-jakarta font-medium text-gray-200 text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LearningSection;
