"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SiteFooterSection = () => {
  const mainNavLinks = [
    { title: "Home", path: "/" },
    { title: "All Games", path: "/games" },
    { title: "Community", path: "/community" },
    { title: "Support / Help centre", path: "/support" },
  ];

  const secondaryNavLinks = [
    { title: "Terms of use", path: "/terms" },
    { title: "Privacy Policy", path: "/privacy" },
    { title: "Player agreement", path: "/player-agreement" },
    { title: "Report a bug", path: "/report-bug" },
  ];

  return (
    <footer className="flex flex-col w-full items-center gap-10 px-5 py-20 bg-gradient-radial from-dark-200 to-primary-950">
      <div className="flex items-center gap-12 relative">
        <div className="flex items-center gap-2">
          <div className="relative w-23 h-6">
            <Image alt="lead studio" src="/logo.svg" width={91} height={24} />
          </div>
          <div className="font-clash font-normal text-white text-2xl tracking-widest">
            Studio
          </div>
        </div>

        <div>
          <div className="flex items-start justify-end gap-16">
            {mainNavLinks.map((link, index) => (
              <Link key={`${index}`} href={link.path} className="opacity-70">
                <div className="inline-flex items-center gap-1.5">
                  <span className="font-medium text-gray-100 text-lg text-center tracking-wide whitespace-nowrap">
                    {link.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-start gap-16">
          {secondaryNavLinks.map((link, index) => (
            <Link
              href={link.path}
              key={`secondary-nav-${index}`}
              className="opacity-70"
            >
              <div className="inline-flex items-center gap-1.5">
                <span className="font-medium text-gray-300 text-base text-center tracking-wide whitespace-nowrap">
                  {link.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="opacity-80 font-medium text-gray-400 text-base whitespace-nowrap">
        Copyright © 2024 Lead Studio
      </div>
    </footer>
  );
};

export default SiteFooterSection;
