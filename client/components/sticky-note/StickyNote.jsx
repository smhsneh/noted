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
  const deleteNote = useBoardStore(
    (state) => state.deleteNote
  );
  const updateNoteSize = useBoardStore(
    (state) => state.updateNoteSize
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

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    const startWidth = note.width || 200;
    const startHeight = note.height || 220;

    const handleMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);

      updateNoteSize(note.id, newWidth, newHeight);
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
      onMouseDown={(e) => {
        if (e.shiftKey) {
          deleteNote(note.id);
          return;
        }
        handleMouseDown(e);
      }}
      onDoubleClick={() => setEditing(true)}
      style={{
        position: "absolute",
        left: note.x,
        top: note.y,
        width: note.width || 200,
        height: note.height || 220,
        borderRadius: "20px",
        background: "white",
        padding: "50px 10px 10px 10px",
        boxShadow: `
          0 0 0 2px white,
          6px 6px 16px rgba(0,0,0,0.08),
          -4px -4px 10px rgba(255,255,255,0.7)
        `,
      }}
    >
      {/* color picker */}
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

      {/* content */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "12px",
          padding: "14px",
          background: note.color || "#fde68a",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
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
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <div style={{ fontSize: "14px", fontWeight: "500" }}>
            {note.text}
          </div>
        )}
      </div>

      {/* resize handle */}
      <div
        onMouseDown={handleResizeMouseDown}
        style={{
          position: "absolute",
          bottom: "6px",
          right: "6px",
          width: "16px",
          height: "16px",
          borderRight: "3px solid rgba(0,0,0,0.4)",
          borderBottom: "3px solid rgba(0,0,0,0.4)",
          borderRadius: "0 0 15px 0 ",
          cursor: "nwse-resize",
        }}
      />
    </div>
  );
}