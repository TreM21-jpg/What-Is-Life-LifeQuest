import React from "react";
import NeonTheme from "./NeonTheme.js";

export default function CurrencyShopOverlay({ items, onPurchase, onClose }) {
  if (!items || items.length === 0) return null;

  return (
    <div style={{
      position: "absolute",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.9)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: NeonTheme.fonts.heading,
      zIndex: 1061,
      padding: "40px",
      ...NeonTheme.animations.fadeIn
    }}>
      <h1 style={{
        color: NeonTheme.colors.cyan,
        fontSize: "42px",
        marginBottom: "20px",
        textShadow: NeonTheme.shadows.cyanGlow
      }}>
        Currency Shop
      </h1>

      <div style={{
        flexGrow: 1,
        width: "80%",
        background: NeonTheme.colors.dark,
        borderRadius: "10px",
        padding: "20px",
        overflowY: "auto",
        maxHeight: "70vh",
        boxShadow: NeonTheme.shadows.cyanGlow,
        color: NeonTheme.colors.lightText
      }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {items.map((item, i) => (
            <li key={i} style={{
              marginBottom: "20px",
              padding: "12px",
              border: `2px solid ${NeonTheme.colors.cyan}`,
              borderRadius: "8px",
              background: NeonTheme.colors.mid,
              boxShadow: NeonTheme.shadows.cyanGlow,
              animation: "coinFlow 3s infinite"
            }}>
              <strong style={{ color: NeonTheme.colors.gold, fontSize: "18px" }}>
                {item.name}
              </strong>
              <p style={{ fontSize: "14px" }}>Cost: {item.cost} coins</p>

              <button
                onClick={() => onPurchase(item)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  background: NeonTheme.colors.green,
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: "700",
                  animation: "purchaseGlow 2s infinite alternate"
                }}
              >
                Purchase
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          background: NeonTheme.colors.cyan,
          color: "#000",
          border: "none",
          borderRadius: "8px",
          fontSize: "18px",
          cursor: "pointer",
          fontWeight: "700",
          ...NeonTheme.animations.pulse
        }}
      >
        Close
      </button>

      <style>
        {`
          @keyframes coinFlow {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }
          @keyframes purchaseGlow {
            0% { box-shadow: 0 0 10px ${NeonTheme.colors.green}; }
            100% { box-shadow: 0 0 20px ${NeonTheme.colors.gold}; }
          }
        `}
      </style>
    </div>
  );
}
