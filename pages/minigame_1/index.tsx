import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function MiniGame() {
  return (
    <div>
      <QuizImageReveal
        src="/assets/test.png"
        width={500}
        height={500}
        revealTime={10000}
      />
    </div>
  );
}

interface RevealProps {
  src: string;
  width: number;
  height: number;
  revealTime: number;
}

const QuizImageReveal = (props: RevealProps) => {
  const { src, width, height, revealTime } = props;

  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadius((prev) => {
        if (prev >= 75) {
          clearInterval(interval);
          return 75;
        }
        return prev + 0.5;
      });
    }, revealTime / 100);
    return () => clearInterval(interval);
  }, [revealTime]);

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Image
        src={src}
        alt="Quiz Image"
        width={width}
        height={height}
        className="quiz-image"
        style={{
          clipPath: `circle(${radius}% at 50% 50%)`,
          transition: "clip-path 0.1s linear",
        }}
      />
    </div>
  );
};
