"use client";

import { useBoardStore } from "../../store/board-store/board-store";
import StickyNote from "../sticky-note/StickyNote";

export default function Canvas() {
  const notes = useBoardStore((state) => state.notes);
  const cameraX = useBoardStore((state) => state.cameraX);
  const cameraY = useBoardStore((state) => state.cameraY);
  const setCamera = useBoardStore((state) => state.setCamera);

  const handleMouseDown = (e) => {
    // ignore if clicking on a note
    if (e.target !== e.currentTarget) return;

    const startX = e.clientX;
    const startY = e.clientY;

    const initialCameraX = cameraX;
    const initialCameraY = cameraY;

    const handleMouseMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      setCamera(initialCameraX - dx, initialCameraY - dy);
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
      className="w-full h-full relative bg-gray-100 overflow-hidden cursor-grab"
    >
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          note={{
            ...note,
            x: note.x - cameraX,
            y: note.y - cameraY,
          }}
        />
      ))}
    </div>
  );
}