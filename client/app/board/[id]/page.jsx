"use client";
import { useState } from "react";
import Canvas from "../../../components/canvas/Canvas";
import { useBoardStore } from "../../../store/board-store/board-store";

export default function BoardPage() {
  const addNote = useBoardStore((state) => state.addNote);
  const addSticker = useBoardStore((state) => state.addSticker);

  const [showStickers, setShowStickers] = useState(false);

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
  className="dynapuff"
  style={{
    fontSize: "48px",
    color: "#381932",
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
          {showStickers && (
            <div
              style={{
                position: "absolute",
                left: "90px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "white",
                padding: "12px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                display: "grid",
                gridTemplateColumns: "repeat(3, 60px)",
                gap: "10px",
                zIndex: 20,
              }}
            >
              {[
                "envelope",
                "flower",
                "glitter",
                "heart",
                "panic",
                "quote",
                "slay",
                "smiley",
                "star",
                "study",
                "teddy",
                "warning",
                "work",
                "pin",
                "clip",
                "check",
                "ribbon",
                "calendar",
                "target",
              ].map((name) => (
                <img
                  key={name}
                  src={`/stickers/${name}.png`}
                  onClick={() => {
                    addSticker(`/stickers/${name}.png`);
                    setShowStickers(false);
                  }}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                    cursor: "pointer",
                    borderRadius: "10px",
                    padding: "6px",
                  }}
                />
              ))}
            </div>
          )}
          <button onClick={addNote} className="tool-btn">
            note
          </button>
          <button className="tool-btn">color</button>
          <button
            className="tool-btn"
            onClick={() => setShowStickers((prev) => !prev)}
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
