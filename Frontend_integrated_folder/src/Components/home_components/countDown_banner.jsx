"use client";

import { useState, useEffect } from "react";

const CountdownBanner = () => {
  const calculateTimeLeft = () => {
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 47); // 47 days from now
    const difference = saleEndDate - new Date();

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-blue-600 px-4 md:px-8 lg:px-28 text-white text-center py-2 flex flex-col md:flex-row justify-between items-center h-auto md:h-8 text-xs md:text-sm">
      <span className="mb-1 md:mb-0 text-[9px]">
        FREE delivery & 40% Discount for next 3 orders! Place your 1st order
        now.
      </span>
      <span className="text-[9px]">
        Until the end of the sale: <strong>{timeLeft.days}</strong> days{" "}
        <strong>{timeLeft.hours}</strong> hours{" "}
        <strong>{timeLeft.minutes}</strong> minutes{" "}
        <strong>{timeLeft.seconds}</strong> sec.
      </span>
    </div>
  );
};

export default CountdownBanner;
