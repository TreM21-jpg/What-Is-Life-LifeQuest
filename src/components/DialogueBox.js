import React from "react";

export default function DialogueBox({ message, onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#222",
        color: "#fff",
        padding: "1rem 1.5rem",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
        zIndex: 1000,
        maxWidth: "80%",
        textAlign: "center",
      }}
    >
      <p style={{ marginBottom: "0.75rem" }}>{message}</p>
      <button
        onClick={onClose}
        style={{
          background: "#fff",
          color: "#222",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
}
