import React, { useState } from "react";

export default function CustomizeScreen({ onSave }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");
  const [skinColor, setSkinColor] = useState("#ffe0bd");
  const [hairStyle, setHairStyle] = useState("short");
  const [hairColor, setHairColor] = useState("#000000");
  const [eyeColor, setEyeColor] = useState("#0000ff");
  const [outfit, setOutfit] = useState("casual");

  const handleSave = () => {
    onSave({ name, gender, skinColor, hairStyle, hairColor, eyeColor, outfit });
  };

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      color: "#00ffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 400
    }}>
      <h1 style={{ marginBottom: "20px" }}>Customize Your Avatar</h1>

      {/* Name */}
      <label style={{ marginBottom: "10px" }}>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginLeft: "10px", padding: "6px", borderRadius: "6px" }}
        />
      </label>

      {/* Gender */}
      <label style={{ marginBottom: "10px" }}>
        Gender:
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ marginLeft: "10px", padding: "6px", borderRadius: "6px" }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nonbinary">Non‑Binary</option>
        </select>
      </label>

      {/* Skin Color */}
      <label style={{ marginBottom: "10px" }}>
        Skin Color:
        <input
          type="color"
          value={skinColor}
          onChange={(e) => setSkinColor(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </label>

      {/* Hair Style */}
      <label style={{ marginBottom: "10px" }}>
        Hair Style:
        <select
          value={hairStyle}
          onChange={(e) => setHairStyle(e.target.value)}
          style={{ marginLeft: "10px", padding: "6px", borderRadius: "6px" }}
        >
          <option value="short">Short</option>
          <option value="long">Long</option>
          <option value="curly">Curly</option>
          <option value="braids">Braids</option>
          <option value="buzzcut">Buzzcut</option>
        </select>
      </label>

      {/* Hair Color */}
      <label style={{ marginBottom: "10px" }}>
        Hair Color:
        <input
          type="color"
          value={hairColor}
          onChange={(e) => setHairColor(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </label>

      {/* Eye Color */}
      <label style={{ marginBottom: "10px" }}>
        Eye Color:
        <input
          type="color"
          value={eyeColor}
          onChange={(e) => setEyeColor(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </label>

      {/* Outfit */}
      <label style={{ marginBottom: "20px" }}>
        Outfit:
        <select
          value={outfit}
          onChange={(e) => setOutfit(e.target.value)}
          style={{ marginLeft: "10px", padding: "6px", borderRadius: "6px" }}
        >
          <option value="casual">Casual</option>
          <option value="school">School Uniform</option>
          <option value="battle">Battle Armor</option>
          <option value="formal">Formal</option>
          <option value="sport">Sporty</option>
        </select>
      </label>

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          padding: "12px 24px",
          background: "#00ffff",
          color: "#000",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "700"
        }}
      >
        Save & Continue
      </button>
    </div>
  );
}
