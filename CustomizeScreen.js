import React, { useState } from "react";

export default function CustomizeScreen({ onSave }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");

  return (
    <div style={container}>
      <h2>Customize Your Avatar</h2>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={input}
      />

      <label>Gender:</label>
      <select value={gender} onChange={(e) => setGender(e.target.value)} style={input}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="nonbinary">Nonbinary</option>
      </select>

      <button onClick={() => onSave({ name, gender })} style={button}>Save & Continue</button>
    </div>
  );
}

const container = {
  position: "absolute",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "#000",
  color: "#00ffff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Orbitron, sans-serif",
  zIndex: 100
};

const input = {
  margin: "10px",
  padding: "8px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "1px solid #00ffff",
  background: "#111",
  color: "#00ffff"
};

const button = {
  marginTop: "20px",
  padding: "10px 20px",
  fontSize: "18px",
  background: "#0f0f0f",
  color: "#00ffff",
  border: "2px solid #00ffff",
  borderRadius: "8px",
  cursor: "pointer"
};
