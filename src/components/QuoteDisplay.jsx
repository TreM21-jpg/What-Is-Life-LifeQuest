/**
 * QuoteDisplay – Cinematic quote display for LifeQuest
 * Shows inspiring quotes at key moments (level-up, victory, defeat, milestones)
 * Responsive across all devices with smooth animations
 */

import React, { useEffect, useState } from "react";
import { getContextualQuote, getRandomQuote } from "./InspiringQuotes";

export default function QuoteDisplay({
  context = "winning",
  duration = 5000,
  onDismiss,
  autoClose = true,
}) {
  const [quote, setQuote] = useState(null);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // Get contextual or random quote
    const selectedQuote =
      context && context !== "random"
        ? getContextualQuote(context)
        : getRandomQuote();
    setQuote(selectedQuote);

    // Handle resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    // Auto-close after duration
    if (autoClose) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onDismiss, 500); // Wait for fade-out animation
      }, duration);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", handleResize);
      };
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [context, duration, autoClose, onDismiss]);

  if (!quote) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        pointerEvents: visible ? "auto" : "none",
      }}
      onClick={() => {
        setVisible(false);
        setTimeout(onDismiss, 500);
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(4px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Quote card */}
      <div
        style={{
          position: "relative",
          zIndex: 2001,
          backgroundColor: "rgba(26, 26, 46, 0.95)",
          border: "2px solid",
          borderImage:
            "linear-gradient(135deg, #00d4ff, #0099ff, #ff0066) 1",
          borderRadius: "16px",
          padding: isMobile ? "24px 16px" : "40px 48px",
          maxWidth: isMobile ? "90vw" : "700px",
          width: "90%",
          textAlign: "center",
          boxShadow:
            "0 0 60px rgba(0, 212, 255, 0.3), inset 0 0 30px rgba(0, 212, 255, 0.1)",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.8) translateY(20px)",
          transition: "all 0.5s cubic-bezier(0.23, 1, 0.320, 1)",
          animation: visible
            ? `quoteSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`
            : "none",
        }}
        className="quote-card"
      >
        {/* Quote icon */}
        <div
          style={{
            fontSize: isMobile ? "32px" : "48px",
            marginBottom: "12px",
          }}
        >
          {quote.icon}
        </div>

        {/* Quote text */}
        <blockquote
          style={{
            margin: "16px 0",
            fontSize: isMobile ? "18px" : "28px",
            fontWeight: "600",
            lineHeight: "1.6",
            background: "linear-gradient(135deg, #00d4ff, #0099ff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontStyle: "italic",
          }}
        >
            "{quote.text}"
        </blockquote>

        {/* Author */}
        <p
          style={{
            margin: "16px 0 0 0",
            fontSize: isMobile ? "14px" : "16px",
            color: "#00d4ff",
            textTransform: "uppercase",
            letterSpacing: "2px",
            opacity: 0.8,
          }}
        >
          — {quote.author}
        </p>

        {/* Dismiss hint */}
        <p
          style={{
            margin: "16px 0 0 0",
            fontSize: isMobile ? "12px" : "13px",
            color: "rgba(255, 255, 255, 0.5)",
            marginTop: "12px",
          }}
        >
          {autoClose ? `Closes in ${Math.ceil(duration / 1000)}s...` : "Click to continue"}
        </p>
      </div>

      <style>{`
        @keyframes quoteSlideIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .quote-card {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Quote notification – smaller, corner-based quote display
 */
export function QuoteNotification({
  context = "winning",
  position = "top-right",
  duration = 4000,
  onDismiss,
}) {
  const [quote, setQuote] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const selectedQuote =
      context && context !== "random"
        ? getContextualQuote(context)
        : getRandomQuote();
    setQuote(selectedQuote);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [context, duration, onDismiss]);

  if (!quote) return null;

  const positionStyles = {
    "top-left": { top: "20px", left: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "bottom-right": { bottom: "20px", right: "20px" },
  };

  return (
    <div
      style={{
        position: "fixed",
        ...positionStyles[position],
        backgroundColor: "rgba(26, 26, 46, 0.9)",
        border: "1px solid rgba(0, 212, 255, 0.3)",
        borderRadius: "12px",
        padding: "16px 20px",
        maxWidth: "300px",
        zIndex: 1500,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0) translateY(0)" : "translateX(-20px) translateY(-20px)",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 20px rgba(0, 212, 255, 0.2)",
        cursor: "pointer",
      }}
      onClick={() => {
        setVisible(false);
        setTimeout(onDismiss, 300);
      }}
    >
      <p
        style={{
          margin: "0 0 8px 0",
          fontSize: "12px",
          color: "#00d4ff",
          fontWeight: "600",
          textTransform: "uppercase",
        }}
      >
        {quote.icon} {quote.author}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "14px",
          color: "#fff",
          lineHeight: "1.4",
          fontStyle: "italic",
        }}
      >
        "{quote.text}"
      </p>
    </div>
  );
}
