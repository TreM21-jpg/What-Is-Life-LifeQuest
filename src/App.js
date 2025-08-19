import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
  const [stage, setStage] = useState("home");

  const goHome = () => setStage("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      {stage === "home" && (
        <div className="grid gap-6 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">🌱 What Is Life?</h1>

          <Card onClick={() => setStage("elementary")} className="cursor-pointer">
            <CardHeader>
              <CardTitle>🧒 Elementary Stage</CardTitle>
            </CardHeader>
            <CardContent>
              Helping Yourself Helps the Team
            </CardContent>
          </Card>

          <Card onClick={() => setStage("middle")} className="cursor-pointer">
            <CardHeader>
              <CardTitle>🧑‍🤝‍🧑 Middle School Stage</CardTitle>
            </CardHeader>
            <CardContent>
              Mental Health & High School Readiness
            </CardContent>
          </Card>

          <Card onClick={() => setStage("high")} className="cursor-pointer">
            <CardHeader>
              <CardTitle>🎓 High School Stage</CardTitle>
            </CardHeader>
            <CardContent>
              Milestones in Life
            </CardContent>
          </Card>
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
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-6">{description}</p>
      <Button onClick={goHome} className="mt-4">⬅ Back Home</Button>
    </div>
  );
}

export default App;
