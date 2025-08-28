import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const targetDate = new Date("2025-12-31T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });

      if (distance < 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Next Big Event</h2>
        <div className="flex justify-center space-x-4 text-neon-green">
          <div>
            <span className="block text-4xl font-bold">{timeLeft.days}</span>
            <span>Days</span>
          </div>
          <div>
            <span className="block text-4xl font-bold">{timeLeft.hours}</span>
            <span>Hours</span>
          </div>
          <div>
            <span className="block text-4xl font-bold">{timeLeft.minutes}</span>
            <span>Minutes</span>
          </div>
          <div>
            <span className="block text-4xl font-bold">{timeLeft.seconds}</span>
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
