import React, { useState } from "react";
import IntroSequence from "./IntroSequence.jsx";
import OutroSequence from "./OutroSequence.jsx";

export default function SequenceController({ children }) {
  const [phase, setPhase] = useState("intro"); // intro -> app -> outro

  if (phase === "intro") {
    return <IntroSequence onComplete={() => setPhase("app")} />;
  }

  if (phase === "outro") {
    return <OutroSequence badges={["First Blood", "Neon Master"]} titles={["Cyber Vanguard"]} onComplete={() => setPhase("app")} />;
  }

  return (
    <>
      {children}
      {/* Example: trigger outro somewhere in your app */}
      {/* <button onClick={() => setPhase("outro")}>End Showcase</button> */}
    </>
  );
}
