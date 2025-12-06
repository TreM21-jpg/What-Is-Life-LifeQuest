import React, { useEffect, useState } from "react";
import { QuoteNotification } from "./QuoteDisplay.jsx";

export default function LevelUpOverlay({ newLevel, onFinish }) {
  const [visible, setVisible] = useState(true);
  const [showQuote, setShowQuote] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 4000); // increased to 4s to show quote
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!visible) return null;

  return (
    <>
      {/* Level-up notification */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Orbitron, sans-serif",
        zIndex: 700
      }}>
        <div style={{
          textAlign: "center",
          animation: "levelUpBounce 0.8s ease-out"
        }}>
          <h1 style={{
            color: "#44ff88",
            fontSize: "56px",
            textShadow: "0 0 20px #44ff88, 0 0 40px #00ffff",
            marginBottom: "20px",
            animation: "flash 1s infinite"
          }}>
            🎉 Level {newLevel} Reached!
          </h1>
          <p style={{
            color: "#00ffff",
            fontSize: "18px",
            textShadow: "0 0 10px #00ffff"
          }}>
            Your skills have grown stronger ✨
          </p>
        </div>

        <style>
          {`
            @keyframes flash {
              0% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.5; transform: scale(1.1); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes levelUpBounce {
              0% { transform: scale(0.8) translateY(20px); opacity: 0; }
              100% { transform: scale(1) translateY(0); opacity: 1; }
            }
          `}
        </style>
      </div>

      {/* Inspiring quote on level-up */}
      {showQuote && (
        <QuoteNotification
          context="levelup"
          position="top-right"
          duration={3500}
          onDismiss={() => setShowQuote(false)}
        />
      )}
    </>
  );
}
