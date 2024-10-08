import React, { useState } from "react";
import TitlePage from "../components/title_page";

export default function MiniuteToWinIt() {
  const [start, setStart] = useState<boolean>(false);

  return (
    <>
      {start ? (
        <TitlePage
          titles={[
            "Building High",
            "Find the Missing",
            "Water Ping",
            "In the middle",
            "Go Fish",
            "Go Fish, Part II: Electric Boogaloo",
          ]}
        />
      ) : (
        <div className="flex text-5xl items-center justify-center h-screen w-screen">
          <div className="m-auto leading-loose m-40">Minute to Win it</div>
          <div className="flex text-xl flex-col">
            <div>
              6 Runden von kleinen Aufgaben für jeweils ein Teammitglied mit
              einer Minute Zeit.
            </div>
            <div>Ihr tretet gleichzeitig gegeneinander an.</div>
            <div>
              Das gewinnende Team bekommt <b>400 Punkte</b>.
            </div>
            <div className="cursor-pointer mt-4" onClick={() => setStart(true)}>
              START
            </div>
          </div>
        </div>
      )}
    </>
  );
}
