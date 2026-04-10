"use client";
import { useState } from "react";
import Canvas from "../../../components/canvas/Canvas";
import { useBoardStore } from "../../../store/board-store/board-store";

export default function BoardPage() {
  const addNote = useBoardStore((state) => state.addNote);
  const addSticker = useBoardStore((state) => state.addSticker);

  const cameraX = useBoardStore((s) => s.cameraX);
  const cameraY = useBoardStore((s) => s.cameraY);
  const zoom = useBoardStore((s) => s.zoom);
  const setZoom = useBoardStore((s) => s.setZoom);
  const setCamera = useBoardStore((s) => s.setCamera);

  const [showStickers, setShowStickers] = useState(false);

  // zoom
  const zoomByStep = (direction) => {
    const step = 0.2;

    let newZoom = zoom + (direction === "in" ? step : -step);
    newZoom = Math.max(0.3, Math.min(3, newZoom));

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const worldX = cameraX + centerX / zoom;
    const worldY = cameraY + centerY / zoom;

    const newCameraX = worldX - centerX / newZoom;
    const newCameraY = worldY - centerY / newZoom;

    setZoom(newZoom);
    setCamera(newCameraX, newCameraY);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* header */}
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
            fontSize: "44px",
            color: "#381932",
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          Noted.
        </h1>
      </div>

      {/* user */}
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

      {/* sidebar */}
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

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button className="tool-btn" onClick={() => zoomByStep("in")}>
          +
        </button>
        <button className="tool-btn" onClick={() => zoomByStep("out")}>
          −
        </button>
      </div>
      {/* canvas */}
      <Canvas />
    </div>
  );
}