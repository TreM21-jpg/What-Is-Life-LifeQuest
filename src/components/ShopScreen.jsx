import React from "react";

export default function ShopScreen({ items, coins, gems, tokens, onBuy, onClose }) {
  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      color: "#cfffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Orbitron, sans-serif",
      zIndex: 990,
      padding: "40px"
    }}>
      {/* Title */}
      <h1 style={{
        color: "#00ffff",
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: "0 0 15px #00ffff"
      }}>
        🛒 Cyber Shop
      </h1>

      {/* Currency display */}
      <div style={{
        display: "flex",
        gap: "30px",
        marginBottom: "30px",
        fontSize: "18px",
        fontWeight: "700"
      }}>
        <span>🪙 Coins: {coins}</span>
        <span>💎 Gems: {gems}</span>
        <span>🎟 Tokens: {tokens}</span>
      </div>

      {/* Items list */}
      <div style={{
        flexGrow: 1,
        width: "80%",
        background: "#111",
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "60vh"
      }}>
        {items && items.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((item, i) => (
              <li key={i} style={{
                marginBottom: "16px",
                padding: "12px",
                background: "#222",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 0 10px #00ffff"
              }}>
                <div>
                  <strong style={{ color: "#44ff88" }}>{item.name}</strong>
                  <div style={{ fontSize: "14px", color: "#9ad" }}>{item.description}</div>
                  <div style={{ fontSize: "14px", marginTop: "6px" }}>
                    Cost: 🪙 {item.cost.coins || 0} | 💎 {item.cost.gems || 0} | 🎟 {item.cost.tokens || 0}
                  </div>
                </div>
                <button
                  onClick={() => onBuy(item)}
                  style={{
                    padding: "8px 16px",
                    background: "#00ffff",
                    color: "#000",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontWeight: "700"
                  }}
                >
                  Buy
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ fontStyle: "italic", color: "#9ad" }}>No items available.</p>
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
