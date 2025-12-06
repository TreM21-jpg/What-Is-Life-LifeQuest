/**
 * ResponsiveOverlay – Mobile, tablet, and desktop responsive wrapper for all UI overlays
 * Provides adaptive styling, touch-friendly controls, and viewport-aware positioning
 * Supports all devices: iOS, Android, tablets, desktops, and everything in between.
 */

import React, { useState, useEffect } from "react";

export default function ResponsiveOverlay({
  title,
  children,
  onClose,
  className = "",
  fullScreen = false,
  sidePanel = false,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine overlay style based on device type
  const getOverlayStyle = () => {
    if (fullScreen) {
      return {
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      };
    }

    if (isMobile) {
      return {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: "90vh",
        width: "100%",
        borderRadius: "20px 20px 0 0",
        zIndex: 1000,
        boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.8)",
      };
    }

    if (isTablet || sidePanel) {
      return {
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: "60%",
        maxWidth: "500px",
        zIndex: 1000,
        boxShadow: "-5px 0 30px rgba(0, 0, 0, 0.8)",
      };
    }

    // Desktop: centered modal
    return {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "800px",
      maxHeight: "90vh",
      zIndex: 1000,
      boxShadow: "0 0 60px rgba(0, 0, 0, 0.9)",
      borderRadius: "16px",
    };
  };

  // Scrim (backdrop) click handler
  const handleScrimClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
        backdropFilter: "blur(2px)",
      }}
      onClick={handleScrimClick}
      className="responsive-overlay-scrim"
    >
      <div
        style={{
          ...getOverlayStyle(),
          backgroundColor: "#1a1a2e",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        className={`responsive-overlay ${className}`}
      >
        {/* Header with title and close button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: isMobile ? "16px" : "24px",
            borderBottom: "1px solid rgba(100, 200, 255, 0.2)",
            flexShrink: 0,
          }}
          className="overlay-header"
        >
          <h2
            style={{
              margin: 0,
              fontSize: isMobile ? "18px" : "24px",
              fontWeight: "600",
              background: "linear-gradient(135deg, #00d4ff, #0099ff)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#0099ff",
              fontSize: isMobile ? "24px" : "32px",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s ease",
              minWidth: "44px",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#ff0066")}
            onMouseLeave={(e) => (e.target.style.color = "#0099ff")}
            className="overlay-close-button"
          >
            ✕
          </button>
        </div>

        {/* Content area with scroll support */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            padding: isMobile ? "16px" : "24px",
            scrollBehavior: "smooth",
          }}
          className="overlay-content"
        >
          {children}
        </div>

        {/* Optional: touch-friendly safe area on mobile */}
        {isMobile && (
          <div
            style={{
              height: "env(safe-area-inset-bottom, 16px)",
              backgroundColor: "#1a1a2e",
              flexShrink: 0,
            }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Provides responsive button styles
 */
export function ResponsiveButton({
  label,
  onClick,
  variant = "primary",
  fullWidth = true,
}) {
  const baseStyle = {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontSize: "16px",
    minHeight: "44px",
    width: fullWidth ? "100%" : "auto",
  };

  const variants = {
    primary: {
      ...baseStyle,
      background: "linear-gradient(135deg, #00d4ff, #0099ff)",
      color: "#000",
    },
    secondary: {
      ...baseStyle,
      background: "rgba(100, 200, 255, 0.2)",
      color: "#00d4ff",
      border: "1px solid #0099ff",
    },
    danger: {
      ...baseStyle,
      background: "rgba(255, 0, 102, 0.2)",
      color: "#ff0066",
      border: "1px solid #ff0066",
    },
  };

  return (
    <button
      onClick={onClick}
      style={variants[variant]}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow =
          variant === "primary"
            ? "0 8px 20px rgba(0, 212, 255, 0.3)"
            : "0 8px 20px rgba(100, 200, 255, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "none";
      }}
      className={`responsive-button responsive-button-${variant}`}
    >
      {label}
    </button>
  );
}

/**
 * Responsive grid layout for items/inventory
 */
export function ResponsiveGrid({ children, columns = 3 }) {
  const [cols, setCols] = useState(columns);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setCols(2);
      else if (width < 768) setCols(3);
      else if (width < 1024) setCols(4);
      else setCols(5);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: "12px",
        width: "100%",
      }}
      className="responsive-grid"
    >
      {children}
    </div>
  );
}
