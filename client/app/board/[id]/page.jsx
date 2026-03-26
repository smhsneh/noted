"use client";

import Canvas from "../../../components/canvas/Canvas";
import { useBoardStore } from "../../../store/board-store/board-store";

export default function BoardPage() {
  const addNote = useBoardStore((state) => state.addNote);
  const addSticker = useBoardStore((state) => state.addSticker);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* hdr */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "48px",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            color: "#381932",
            fontFamily: "'Xanh Mono', monospace",
          }}
        >
          Noted.
        </h1>
      </div>

      {/* usr */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "48px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          zIndex: 10,
        }}
      />

      {/* sdb */}
      <div
        style={{
          position: "absolute",
          left: "40px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "16px",
            borderRadius: "24px",
            background: "white",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          <button onClick={addNote} className="tool-btn">
            note
          </button>
          <button className="tool-btn">color</button>
          <button
            className="tool-btn"
            onClick={() => addSticker("/stickers/star.png")}
          >
            stickers
          </button>
        </div>
      </div>

      {/* cv */}
      <Canvas />
    </div>
  );
}
