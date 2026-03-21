"use client";

import { useBoardStore } from "../../store/board-store/board-store";
import StickyNote from "../sticky-note/StickyNote";

export default function Canvas() {
  const notes = useBoardStore((state) => state.notes);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {notes.map((note) => (
        <StickyNote key={note.id} note={note} />
      ))}
    </div>
  );
}