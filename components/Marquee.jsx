"use client";

import React from "react";

export default function Marquee() {
  return (
    <div className="bg-primary text-primary-content py-2.5 overflow-hidden w-full border-b border-primary/20 flex relative">
      <style>{`
        @keyframes custom-marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-custom-marquee {
          animation: custom-marquee 25s linear infinite;
          display: inline-block;
          white-space: nowrap;
          will-change: transform;
        }
      `}</style>
      <div className="animate-custom-marquee">
        <span className="text-sm md:text-base font-medium mx-4">
          New Arrivals: A Brief History of Tim | Special Discount on Memberships...
        </span>
        <span className="text-sm md:text-base font-medium mx-4">
          New Arrivals: Clean Code | Special Discount on Memberships...
        </span>
        <span className="text-sm md:text-base font-medium mx-4 hidden sm:inline">
          New Arrivals: The Midnight Library | Special Discount on Memberships...
        </span>
        <span className="text-sm md:text-base font-medium mx-4 hidden md:inline">
          New Arrivals: A Brief History of Tim | Special Discount on Memberships...
        </span>
      </div>
    </div>
  );
}
