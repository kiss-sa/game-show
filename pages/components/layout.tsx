import type { Metadata } from "next";
import Head from "next/head";
import { Pangolin } from "next/font/google";
import "../styles/globals.css";
import { Suspense } from "react";
import Loading from "../loading";

const pangolin = Pangolin({
  weight: "400",
  subsets: ["latin"],
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={pangolin.className}>
      <Head>
        <title>Wombat's Wondrous Trivia Time</title>
        <meta name="description" content="Trivia Fun for the whole family!" />
        <link rel="icon" href="/static/favicon.ico" sizes="any" />
      </Head>

      {children}
    </div>
  );
}
