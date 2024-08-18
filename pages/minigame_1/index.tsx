import React, { useEffect, useMemo, useState } from "react";
import GoBackButton from "../components/goback";
import { linkSync } from "fs";

type FileResponse = {
  Filme: string[];
  Games: string[];
  Tierbeschreibungen: string[];
};

export default function MiniGame() {
  const themes: string[] = ["Filme", "Games", "Tiere"];
  const [files, setFiles] = useState<FileResponse>();
  const [idx, setIdx] = useState<number>(0);
  const [currentTheme, setCurrentTheme] = useState<number | null>(null);
  const [radius, setRadius] = useState(0);
  const [currentLine, setCurrentLine] = useState<number>(0);

  useEffect(() => {
    fetch(`/api/minigame1`)
      .then((response) => response.json())
      .then((data: FileResponse) => setFiles(data));
  }, []);

  const currentFiles = useMemo(() => {
    if (currentTheme === 0) {
      return files?.Filme;
    }
    if (currentTheme === 1) {
      return files?.Games;
    }
    if (currentTheme === 2) {
      return files?.Tierbeschreibungen;
    }
    return null;
  }, [files, currentTheme]);

  console.log(currentFiles ? currentFiles[idx] : "undefined");

  return (
    <div className="flex items-center justify-center h-screen w-screen flex-col">
      {currentTheme === null ? (
        <>
          <div className="flex text-3xl h-2/5 text-center justify-center flex-col w-4/5 gap-8">
            <div className="flex text-5xl justify-center items-center leading-loose text-center">
              <>What is?</>
            </div>
            <div>
              Ihr bekommt für jede richtige Antwort <b>200</b> Punkte.
            </div>
            <div>
              Wer zuerst buzzert hat <b>5 Sekunden</b> Zeit zu antworten,
              währendessen wird das reveal pausiert.
            </div>
            <div>
              Ist die Antwort falsch bekommt das andere Team die Möglichkeit,
              die Frage zu beantworten.
            </div>
            <div>
              Ist diese Antwort wieder falsch, geht das Spiel weiter - beide
              Teams können wieder buzzern.
            </div>
            {themes.map((theme, idx) => (
              <div
                className={"cursor-pointer"}
                key={idx}
                onClick={() => setCurrentTheme(idx)}
              >
                {theme}
              </div>
            ))}
          </div>
          <div className="flex w-4/5">
            <GoBackButton />
          </div>
        </>
      ) : (
        <>
          <div className="flex text-5xl justify-center items-center text-center">
            <>{themes[currentTheme]}</>
          </div>
          <div>
            {currentFiles &&
            (themes[currentTheme] === "Filme" ||
              themes[currentTheme] === "Games") ? (
              <QuizImageReveal
                src={`/assets${currentFiles[idx]}`}
                revealTime={10000}
                radius={radius}
                setRadius={setRadius}
              />
            ) : (
              currentFiles && (
                <TextReveal
                  src={currentFiles[idx]}
                  currentLine={currentLine}
                  setCurrentLine={setCurrentLine}
                />
              )
            )}
          </div>
          <div className="flex justify-between w-9/12 mt-6">
            <GoBackButton />
            <button onClick={() => setCurrentTheme(null)}>Menu</button>
            <button
              onClick={() => {
                setRadius(0);
                setCurrentLine(0);
                setIdx((idx + 1) % (currentFiles ? currentFiles.length : 0));
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

interface RevealProps {
  src: string;
  revealTime: number;
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
}

const QuizImageReveal = (props: RevealProps) => {
  const { src, revealTime, radius, setRadius } = props;

  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
    if (!start) return;

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
  }, [start, revealTime]);

  const handleStartStop = () => {
    setStart((prevStart) => {
      return !prevStart;
    });
  };

  return (
    <div className="flex items-center justify-center w-screen">
      <div className="flex items-center justify-center flex-col w-screen">
        <img
          style={{
            clipPath: `circle(${radius}% at 50% 50%)`,
            transition: "clip-path 0.1s linear",
            maxHeight: "700px",
            margin: "auto",
          }}
          src={src}
        ></img>
        <div style={{ cursor: "pointer" }} onClick={handleStartStop}>
          {!start ? "Start" : "Pause"}
        </div>
      </div>
    </div>
  );
};

function TextReveal(props: {
  src: string;
  currentLine: number;
  setCurrentLine: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { currentLine, setCurrentLine } = props;
  const data = props.src;
  const lines = data.split("\n");

  const handleRevealLine = () => {
    currentLine < lines.length ? setCurrentLine(currentLine + 1) : undefined;
  };

  return (
    <div className="flex text-3xl justify-center items-center flex-col mt-8 w-screen">
      <div className="text-center m-8 bg-white w-4/5 min-h-96 p-8">
        <div className="flex flex-col m-auto gap-4">
          {lines.slice(0, currentLine).map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className="text-xl">
        <button onClick={handleRevealLine}>Next Line</button>
      </div>
    </div>
  );
}
