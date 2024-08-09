import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import goBack from "../assets/go_back.png";

type FileResponse = {
  music: string[];
  games: string[];
  quotes: string[];
  series: string[];
};

export default function Minigame1() {
  const themes: string[] = ["music", "games", "quotes", "series"];
  const [files, setFiles] = useState<FileResponse>();
  const [idx, setIdx] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/minigame2`)
      .then((response) => response.json())
      .then((data: FileResponse) => setFiles(data));
  }, []);

  const titleDesc = useMemo(() => getDescription(themes[idx]), [idx]);
  const audios = useMemo(() => {
    switch (themes[idx]) {
      case "music":
        return files?.music;
      case "games":
        return files?.games;
      case "series":
        return files?.series;
      case "quotes":
        return files?.quotes;
    }
  }, [idx, themes]);

  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col">
      <div className="text-5xl">{titleDesc.title}</div>
      <div>{titleDesc.desc}</div>
      <div className="grid grid-cols-2 gap-4">
        {audios?.map((f) => (
          <audio controls key={f}>
            <source src={`/assets/${f}`} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ))}
      </div>
      <div className="flex justify-between w-9/12 mt-6">
        <div
          className="max-h-20"
          style={{ cursor: "pointer" }}
          onClick={() => router.push({ pathname: "/" })}
        >
          <img className="max-h-20" src={goBack.src} />
        </div>
        <button onClick={() => setIdx((idx + 1) % themes.length)}>Next</button>
      </div>
    </div>
  );
}

interface TitleDesc {
  title: string;
  desc: string;
}

function getDescription(name: string): TitleDesc {
  switch (name) {
    case "music":
      return {
        title: "Welches Lied?",
        desc: "100 Punkte für das Lied \n\r 100 Punkte für den Interpreten",
      };
    case "games":
      return {
        title: "Zu welchem Spiel gehört der Soundtrack?",
        desc: "100 Punkte für das Game",
      };
    case "series":
      return {
        title: "Welche Serie suchen wir?",
        desc: "100 Punkte für den richtigen Titel der Serie (deutsch oder englisch).",
      };
    case "quotes":
      return {
        title: "Aus welchem Franchise kommt die Quote?",
        desc: "200 Punkte für das richtige Franchise",
      };
  }
  return { title: "", desc: "" };
}
