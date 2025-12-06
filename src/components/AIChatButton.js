import React, { useState } from "react";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        💬 AI Chat
      </button>

      {isOpen && <AIChatBox onClose={() => setIsOpen(false)} />}
    </>
  );
}
