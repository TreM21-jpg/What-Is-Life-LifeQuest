import React, { useState } from "react";

export default function AvatarCustomizer({ onCustomize }) {
  const [gender, setGender] = useState("male");
  const [skinTone, setSkinTone] = useState("light");
  const [outfit, setOutfit] = useState("casual");

  const handleSubmit = () => {
    onCustomize({ gender, skinTone, outfit });
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🎮 Customize Your Avatar</h2>

      <label>Gender:</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="nonbinary">Non-binary</option>
      </select>

      <br /><br />

      <label>Skin Tone:</label>
      <select value={skinTone} onChange={(e) => setSkinTone(e.target.value)}>
        <option value="light">Light</option>
        <option value="medium">Medium</option>
        <option value="dark">Dark</option>
      </select>

      <br /><br />

      <label>Outfit:</label>
      <select value={outfit} onChange={(e) => setOutfit(e.target.value)}>
        <option value="casual">Casual</option>
        <option value="school">School Uniform</option>
        <option value="adventure">Adventure Gear</option>
      </select>

      <br /><br />

      <button onClick={handleSubmit}>Start LifeQuest</button>
    </div>
  );
}
