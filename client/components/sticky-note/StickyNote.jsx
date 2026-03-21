"use client";

import { useBoardStore } from "../../store/board-store/board-store";
import { useState } from "react";

export default function StickyNote({ note }) {
  const updateNotePosition = useBoardStore((state) => state.updateNotePosition);
  const updateNoteText = useBoardStore((state) => state.updateNoteText);
  const updateNoteColor = useBoardStore((state) => state.updateNoteColor);

  const [editing, setEditing] = useState(false);

  const handleMouseDown = (e) => {
    const offsetX = e.clientX - note.x;
    const offsetY = e.clientY - note.y;

    const handleMouseMove = (e) => {
      updateNotePosition(note.id, e.clientX - offsetX, e.clientY - offsetY);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onDoubleClick={() => setEditing(true)}
      style={{
        position: "absolute",
        left: note.x,
        top: note.y,
        width: "200px",
        height: "220px",
        borderRadius: "20px",
        background: "white",
        padding: "50px 10px 10px 10px",
        borderRadius: "20px",
        boxShadow: `
  0 0 0 2px white,
  6px 6px 16px rgba(0,0,0,0.08),
  -4px -4px 10px rgba(255,255,255,0.7)
`,
      }}
    >
      {/* color picker (top right, circular) */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "12px",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: note.color || "#fde68a",
          boxShadow: "0 0 0 2px white, 0 2px 6px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
      >
        <input
          type="color"
          value={note.color || "#fde68a"}
          onChange={(e) => updateNoteColor(note.id, e.target.value)}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </div>

      {/* inner colored note */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          padding: "14px",
          background: note.color || "#fde68a",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {editing ? (
          <textarea
            autoFocus
            defaultValue={note.text}
            onBlur={(e) => {
              updateNoteText(note.id, e.target.value);
              setEditing(false);
            }}
            style={{
              background: "transparent",
              outline: "none",
              border: "none",
              resize: "none",
              fontSize: "14px",
              fontFamily: "Inter",
            }}
          />
        ) : (
          <div
            style={{
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {note.text}
          </div>
        )}
      </div>
    </div>
  );
}
