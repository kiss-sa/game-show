import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  const goToBoard = (id: number) => {
    router.push({
      pathname: "/board",
      query: { id: id },
    });
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="flex">
            <h1 className="text-6xl font-bold">Hello, Gameshow!</h1>
          </div>

          <div>
            <button onClick={() => goToBoard(1)}>Board 1</button>
          </div>
          <div>
            <button onClick={() => goToBoard(2)}>Board 2</button>
          </div>
          <div>
            <button onClick={() => goToBoard(3)}>Board 3</button>
          </div>
        </div>
      </div>
    </>
  );
}
