import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="flex mb-8">
            <h1 className="text-6xl font-bold">Newer Better Longer WWTT</h1>
          </div>
          <div className="flex flex-row gap-4  ">
            <div className="flex flex-col items-center justify-center text-4xl gap-4 text-center">
              <BoardButton boardID={1}>Trivial Trivia</BoardButton>
              <BoardButton boardID={2}>Food</BoardButton>
              <BoardButton boardID={3}>Dice</BoardButton>
              <BoardButton boardID={4}>PUNS</BoardButton>
            </div>
            <div className="flex flex-col items-center justify-center text-4xl gap-4 text-center">
              <RedButton
                onClick={() => {
                  router.push({
                    pathname: "/minigame_1",
                  });
                }}
              >
                What is?
              </RedButton>
              <RedButton
                onClick={() => {
                  router.push({
                    pathname: "/minute",
                  });
                }}
              >
                Minute to Win it
              </RedButton>
              <RedButton
                onClick={() => {
                  router.push({
                    pathname: "/minigame_2",
                  });
                }}
              >
                Musical Musings
              </RedButton>
              <RedButton
                onClick={() => {
                  router.push({
                    pathname: "/schlag",
                  });
                }}
              >
                ???
              </RedButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface ButtonProps {
  boardID: number;
  children?: React.ReactNode;
}

function BoardButton(props: ButtonProps) {
  const { boardID, children } = props;
  const router = useRouter();

  const goToBoard = (id: number) => {
    router.push({
      pathname: "/board",
      query: { id: id },
    });
  };

  return <RedButton onClick={() => goToBoard(boardID)}>{children}</RedButton>;
}

function RedButton(props: { children: React.ReactNode; onClick: () => void }) {
  const { children, onClick } = props;
  return (
    <div
      onClick={onClick}
      className="border-solid border-4 border-red-600 w-80 rounded-lg py-2 cursor-pointer"
    >
      {children}
    </div>
  );
}
