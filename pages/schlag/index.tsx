import React, { useState } from "react";
import TitlePage from "../components/title_page";

export default function MiniuteToWinIt() {
  const [start, setStart] = useState<boolean>(false);

  return (
    <>
      {start ? (
        <TitlePage
          titles={[
            "Half'n'Half",
            "18cm :^)",
            "Ham's einen Euro?",
            "Wer weiß mehr",
            "Les upsetti more Spaghetti",
            "FINALE 50er Würfeln",
          ]}
        />
      ) : (
        <div className="flex text-5xl items-center justify-center h-screen w-screen">
          <div className="m-auto leading-loose m-40">Schlag das Wombat</div>
          <div className="flex text-xl flex-col">
            <div>
              Es werden 6 verschiedene Spiele gespielt, teilweise im Team,
              teilweise jeweils eine Person.
            </div>
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
