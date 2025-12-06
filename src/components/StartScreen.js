import React, { useState } from "react";

export default function StartScreen({ onStart }) {
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!birthday || !email) return alert("Please enter both fields.");

    const birthYear = new Date(birthday).getFullYear();
    const age = new Date().getFullYear() - birthYear;

    let stage = "General";
    if (age >= 11 && age <= 13) stage = "Middle School";
    else if (age >= 14 && age <= 15) stage = "Early High School";
    else if (age >= 16 && age <= 18) stage = "Upper High School";

    onStart({ email, stage });
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🎉 Welcome to LifeQuest</h2>
      <p>Enter your birthday and email to begin:</p>

      <label>Birthday:</label>
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />

      <br /><br />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Start</button>
    </div>
  );
}
