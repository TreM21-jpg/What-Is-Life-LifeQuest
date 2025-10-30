import { useState } from "react";

export default function ElementaryStage() {
  const [stage, setStage] = useState("start");
  const [message, setMessage] = useState("");

  const handleChoice = (choice) => {
    if (choice === "share") {
      setMessage("You shared your sandwich! Your friend is happy, and the teacher praises your kindness.");
      setStage("end");
    } else if (choice === "ignore") {
      setMessage("Your friend feels sad. Later, you realize teamwork matters more than winning alone.");
      setStage("end");
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🧒 Elementary Stage</h1>
      {stage === "start" ? (
        <>
          <p className="mb-6 text-lg">Your friend forgot their lunch. What will you do?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleChoice("share")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Share Lunch 🍎
            </button>
            <button
              onClick={() => handleChoice("ignore")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Ignore 🙈
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
