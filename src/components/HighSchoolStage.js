import { useState } from "react";

export default function HighSchoolStage() {
  const [stage, setStage] = useState("start");
  const [message, setMessage] = useState("");

  const handleChoice = (choice) => {
    if (choice === "study") {
      setMessage("You chose to study — your grades improved, and you balanced fun later responsibly!");
      setStage("end");
    } else if (choice === "party") {
      setMessage("You partied and missed the final. Next time, balance fun and goals!");
      setStage("end");
    } else if (choice === "balance") {
      setMessage("You studied, then celebrated! You’re mastering life balance. 🎯");
      setStage("end");
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🎓 High School Stage</h1>
      {stage === "start" ? (
        <>
          <p className="mb-6 text-lg">Finals are coming, but your friends invite you to a party. What do you do?</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => handleChoice("study")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Study 📚
            </button>
            <button
              onClick={() => handleChoice("party")}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Party 🎉
            </button>
            <button
              onClick={() => handleChoice("balance")}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Balance Both ⚖️
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
