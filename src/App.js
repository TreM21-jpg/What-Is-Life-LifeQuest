import { useState } from "react";

export default function App() {
  const [stage, setStage] = useState("home");

  const goHome = () => setStage("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      {stage === "home" && (
        <div className="grid gap-6 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">🌱 What Is Life?</h1>

          <div
            onClick={() => setStage("elementary")}
            className="cursor-pointer bg-white rounded-2xl shadow p-4"
          >
            <h2 className="font-semibold">🧒 Elementary Stage</h2>
            <p>Helping Yourself Helps the Team</p>
          </div>

          <div
            onClick={() => setStage("middle")}
            className="cursor-pointer bg-white rounded-2xl shadow p-4"
          >
            <h2 className="font-semibold">🧑‍🤝‍🧑 Middle School Stage</h2>
            <p>Mental Health & High School Readiness</p>
          </div>

          <div
            onClick={() => setStage("high")}
            className="cursor-pointer bg-white rounded-2xl shadow p-4"
          >
            <h2 className="font-semibold">🎓 High School Stage</h2>
            <p>Milestones in Life</p>
          </div>
        </div>
      )}

      {stage === "elementary" && (
        <StagePage
          title="🧒 Elementary Stage"
          description="Play teamwork games & write in your 'I Can Help' journal."
          goHome={goHome}
        />
      )}

      {stage === "middle" && (
        <StagePage
          title="🧑‍🤝‍🧑 Middle School Stage"
          description="Practice mindfulness, emotion awareness, and vision boards."
          goHome={goHome}
        />
      )}

      {stage === "high" && (
        <StagePage
          title="🎓 High School Stage"
          description="Map milestones, reflect, and write to your future self."
          goHome={goHome}
        />
      )}
    </div>
  );
}

function StagePage({ title, description, goHome }) {
  return (
    <div className="max-w-lg mx-auto text-center bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-6">{description}</p>
      <button
        onClick={goHome}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        ⬅ Back Home
      </button>
    </div>
  );
}

export default App;
