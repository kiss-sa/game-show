import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HomePage() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div>
          <div className="flex">
            <h1 className="text-6xl font-bold">Hello, Gameshow!</h1>
          </div>

          <Link href={"/board?id=1"} className="flex">
            <button>Get Started</button>
          </Link>
        </div>
      </div>
    </>
  );
}
