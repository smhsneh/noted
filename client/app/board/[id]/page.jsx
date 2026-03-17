"use client";

import Canvas from "@/components/canvas/Canvas";
import { useBoardStore } from "../../../store/board-store/board-store";

export default function BoardPage() {
  const addNote = useBoardStore((state) => state.addNote);

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* top bar */}
      <div className="p-2 bg-white shadow flex justify-between">
        <h1 className="font-bold">noted</h1>
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + add note
        </button>
      </div>

      {/* canvas */}
      <div className="flex-1">
        <Canvas />
      </div>
    </div>
  );
}
