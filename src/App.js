import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Elementary from "./components/Elementary";
import MiddleSchool from "./components/MiddleSchool";
import HighSchool from "./components/HighSchool";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-center p-6">
        <h1 className="text-3xl font-bold mb-6">🌱 What Is Life?</h1>

        {/* Navigation */}
        <nav className="flex justify-center gap-6 mb-10">
          <Link to="/elementary" className="px-4 py-2 bg-green-200 rounded-lg hover:bg-green-300">
            🧒 Elementary
          </Link>
          <Link to="/middle" className="px-4 py-2 bg-blue-200 rounded-lg hover:bg-blue-300">
            🧑‍🤝‍🧑 Middle School
          </Link>
          <Link to="/highschool" className="px-4 py-2 bg-purple-200 rounded-lg hover:bg-purple-300">
            🎓 High School
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/elementary" element={<Elementary />} />
          <Route path="/middle" element={<MiddleSchool />} />
          <Route path="/highschool" element={<HighSchool />} />
          <Route path="/" element={<h2 className="text-lg">Pick a stage to begin your journey 🚀</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
