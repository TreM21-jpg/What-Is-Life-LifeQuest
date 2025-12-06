import React from "react";

export default function BattleSummaryTimelineOverlay({ events, onClose }) {
  if (!events || events.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 1018,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        Battle Summary Timeline
      </h1>

      {/* Timeline */}
      <div style={{
        flexGrow: 1,
        width: "80%",
        background: "#111",
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "70vh",
        boxShadow: "0 0 10px #00ffff",
        position: "relative"
      }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {events.map((event, i) => (
            <li key={i} style={{
              marginBottom: "24px",
              display: "flex",
              alignItems: "center"
            }}>
              {/* Timeline marker */}
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: event.type === "critical" ? "#ff4444" : "#44ff88",
                boxShadow: `0 0 10px ${event.type === "critical" ? "#ff4444" : "#44ff88"}`,
                marginRight: "15px"
              }} />

              {/* Event details */}
              <div>
                <strong style={{ color: "#ffcc00", fontSize: "16px" }}>
                  {event.title}
                </strong>
                <p style={{ fontSize: "14px", color: "#cfffff" }}>{event.description}</p>
                <p style={{ fontSize: "12px", color: "#9ad" }}>
                  Timestamp: {event.time}s
                </p>
              </div>
            </li>
          ))}
        </ul>
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
