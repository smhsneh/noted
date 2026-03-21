"use client";

import { useBoardStore } from "../../store/board-store/board-store";
import { useState } from "react";

export default function StickyNote({ note }) {
  const updateNotePosition = useBoardStore(
    (state) => state.updateNotePosition
  );
  const updateNoteText = useBoardStore(
    (state) => state.updateNoteText
  );
  const updateNoteColor = useBoardStore(
    (state) => state.updateNoteColor
  );

  const [editing, setEditing] = useState(false);

  const handleMouseDown = (e) => {
    const offsetX = e.clientX - note.x;
    const offsetY = e.clientY - note.y;

    const handleMouseMove = (e) => {
      updateNotePosition(
        note.id,
        e.clientX - offsetX,
        e.clientY - offsetY
      );
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
        width: "180px",
        height: "180px",
        borderRadius: "24px",
        background: "white",
        padding: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: note.color || "#fde68a",
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
            }}
          />
        ) : (
          <div style={{ fontSize: "14px" }}>{note.text}</div>
        )}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <input
            type="color"
            value={note.color || "#fde68a"}
            onChange={(e) => updateNoteColor(note.id, e.target.value)}
            style={{
              width: "20px",
              height: "20px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
}