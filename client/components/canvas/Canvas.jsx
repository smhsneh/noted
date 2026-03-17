"use client";

import { useBoardStore } from "../../store/board-store/board-store";
import StickyNote from "../sticky-note/StickyNote";

export default function Canvas() {
  const notes = useBoardStore((state) => state.notes);

  return (
    <div className="w-full h-full relative bg-gray-100 overflow-hidden">
      {notes.map((note) => (
        <StickyNote key={note.id} note={note} />
      ))}
    </div>
  );
}