import React, { useEffect, useState } from "react";
import Image from "next/image";
import FadeLoader from "react-spinners/FadeLoader";

export default function Loading(props: { startIdx: number }) {
  const { startIdx } = props;
  const [idx, setCurrIdx] = useState<number>(startIdx);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrIdx((prevIndex) => (prevIndex + 1) % tips.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <Image src="/assets/loading_screen.jpg" fill={true} alt="loadingscreen" />
      <div className="absolute max-w-3xl bottom-12 text-white font-sans text-3xl text-center">
        {tips[idx]}
      </div>
      <div className="absolute bottom-1 right-2 bg-black">
        <FadeLoader color={"#FFFFFF"} loading={true} />
      </div>
    </div>
  );
}

const tips = [
  "Schlecht gespielt? Ein schnelles “Microruckler” kann jeden Imageverlust wiederherstellen.",
  "Bei übermäßigem Geschwafel deiner Kollegen kannst du den Errorcode “SpürstDuDichNoch?” probieren, um einen Neustart anzustoßen.",
  "Auch Nutzer von Verliererkraut können die Handwerksfähigkeit “Gärtner” erwerben.",
  "Die “Fleißig”-Eigenschaft ermöglicht schnellen Progress durch den Einsatz mentaler Gesundheit.",
  "Steuerhinterziehung und Arbeitszeitbetrug sind effektive Mittel, um deine Ressourcen zu maximieren. Ingame natürlich.",
  "Beim Spielen nicht auf die 3G vergessen: Girlboss, Gaslight, Gatekeep",
  "Getränk nicht kalt genug? Der kleine Gletscher Ymir schafft Abhilfe!",
  "WWTT - Was würden Tomaten tun?",
  "Wo wirre Wombats Wunder wirken, werden Wunden wieder binden.",
  "Die Terrasse spendet auch nachts noch Wärme",
  "Schon beim Hotelanimateur für ein Workout angefragt?",
];
