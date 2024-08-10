import { Prosto_One } from "next/font/google";
import React, { useState } from "react";
import GoBackButton from "./goback";

export default function TitlePage(props: { titles: string[] }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex text-5xl items-center justify-center h-screen w-screen">
      <div className="flex flex-col h-7/8 w-4/5 items-center">
        <div className="m-auto leading-loose m-40 text-center">
          {props.titles[index]}
        </div>
        <div className="flex justify-between w-full text-xl">
          <GoBackButton />
          <div
            className="cursor-pointer"
            onClick={() => setIndex((index - 1) % props.titles.length)}
          >
            Go Back
          </div>
          <div
            className="cursor-pointer mt-100"
            onClick={() => setIndex((index + 1) % props.titles.length)}
          >
            Next
          </div>
        </div>
      </div>
    </div>
  );
}
