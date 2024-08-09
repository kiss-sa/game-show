import { useRouter } from "next/router";
import goBack from "../assets/go_back.png";

import React from "react";

export default function GoBackButton() {
  const router = useRouter();

  return (
    <div
      className="max-h-20"
      style={{ cursor: "pointer" }}
      onClick={() => router.push({ pathname: "/" })}
    >
      <img className="max-h-20" src={goBack.src} />
    </div>
  );
}
