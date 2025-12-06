import React from "react";

export default function MobileControls({ keys }) {
  const move = (dir) => {
    keys[dir] = true;
    setTimeout(() => keys[dir] = false, 200);
  };

  return (
    <div style={{
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "10px",
      zIndex: 10
    }}>
      {["↑", "←", "→", "↓"].map((arrow, i) => (
        <button
          key={i}
          onClick={() => move(["forward", "left", "right", "backward"][i])}
          style={{
            background: "#0f0f0f",
            color: "#00ffff",
            border: "2px solid #00ffff",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            fontSize: "20px"
          }}
        >
          {arrow}
        </button>
      ))}
    </div>
  );
}
