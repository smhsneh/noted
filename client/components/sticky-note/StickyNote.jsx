"use client";

import { useBoardStore } from "../../store/board-store/board-store";

export default function StickyNote({ note }) {
  const updateNotePosition = useBoardStore(
    (state) => state.updateNotePosition
  );

  const handleMouseDown = (e) => {
    const offsetX = e.clientX - note.x;
    const offsetY = e.clientY - note.y;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      updateNotePosition(note.id, newX, newY);
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
      style={{
        position: "absolute",
        left: note.x,
        top: note.y,
        width: 150,
        height: 150,
        cursor: "grab",
      }}
      className="bg-yellow-200 p-2 rounded shadow select-none"
    >
      {note.text}
    </div>
  );
}