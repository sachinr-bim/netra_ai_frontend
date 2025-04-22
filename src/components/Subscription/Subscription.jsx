import React, { useState } from "react";

// Components
import PlanCards from "./PlanCards";

export default function Subscription() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Basic Plan",
      price: isYearly ? 156 * 12 * 0.7 : 156,
      features: ["Track number of visitors", "Monitoring actions for theft", "Gesture Detection"],
    },
    {
      name: "Standard Plan",
      price: isYearly ? 249 * 12 * 0.7 : 249,
      features: ["Track number of visitors", "Monitoring actions for theft", "Gesture Detection", "Safety Monitoring"],
    },
    {
      name: "Premium Plan",
      price: isYearly ? 399 * 12 * 0.7 : 399,
      features: ["Track number of visitors", "Suspicious behaviours", "Gesture Detection"],
    },
  ];

  return (
    <div className="flex bg-white min-h-screen flex-col items-center py-35  px-4 md:px-20">
      <h2 className="text-[var(--theme-color)] text-md mt-10">Pricing Plan</h2>
      <h1 className="text-3xl font-bold mt-2">
        <span className="text-[var(--theme-color)]">Netra3</span> Plans For You
      </h1>

      <PlanCards plans={plans} isYearly={isYearly} setIsYearly={setIsYearly} />
    </div>
  );
};

