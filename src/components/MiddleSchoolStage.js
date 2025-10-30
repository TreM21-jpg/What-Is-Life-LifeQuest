import { useState } from "react";

export default function MiddleSchoolStage() {
  const [stage, setStage] = useState("start");
  const [message, setMessage] = useState("");

  const handleChoice = (choice) => {
    if (choice === "talk") {
      setMessage("You talked to your teacher and learned from your mistakes — progress matters more than perfection!");
      setStage("end");
    } else if (choice === "hide") {
      setMessage("You hid your test results and felt stressed. Honesty helps you grow stronger!");
      setStage("end");
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🧑‍🤝‍🧑 Middle School Stage</h1>
      {stage === "start" ? (
        <>
          <p className="mb-6 text-lg">You failed your math test. What do you do next?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleChoice("talk")}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Talk to Teacher 📘
            </button>
            <button
              onClick={() => handleChoice("hide")}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Hide It 😶
            </button>
          </div>
        </>
      ) : (
        <p className="text-lg mt-6">{message}</p>
      )}
    </div>
  );
}
<div className="mt-10 border-t pt-4">
  <h2 className="text-xl font-semibold mb-2">💬 Side Quest Chat</h2>
  <p className="text-gray-600">Ask LifeQuest AI for advice or side missions (coming soon!)</p>
</div>
