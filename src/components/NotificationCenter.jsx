import React from "react";

export default function NotificationCenter({ notifications, onClose }) {
  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      color: "#cfffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 980,
      padding: "30px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Notification Center
      </h1>

      {/* Scrollable log */}
      <div style={{
        flexGrow: 1,
        width: "80%",
        background: "#111",
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "70vh"
      }}>
        {notifications && notifications.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {notifications.map((note, i) => (
              <li key={i} style={{
                marginBottom: "12px",
                padding: "10px",
                background: "#222",
                borderRadius: "8px",
                fontSize: "14px",
                boxShadow: "0 0 10px #00ffff"
              }}>
                <strong style={{ color: "#44ff88" }}>{note.type}</strong> — {note.message}
                <div style={{ fontSize: "12px", color: "#9ad", marginTop: "4px" }}>
                  {note.timestamp}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: "italic", color: "#9ad" }}>No notifications yet.</p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
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
        Close
      </button>
    </div>
  );
}
