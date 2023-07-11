"use client";
import Metrics from "./components/Metrics";
import Image from "next/image";
import { Provider } from "urql";
import { jpegdAnalyticsClient } from "./utils";

export default function Home() {
  return (
    <Provider value={jpegdAnalyticsClient}>
      <main className="flex min-h-screen flex-col items-center pt-4 p-24">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] mb-4"
          src="/jpegd.gif"
          alt="Jpeg'd Logo"
          width={40}
          height={15}
          priority
        />
        <Metrics />
      </main>
    </Provider>
  );
}
