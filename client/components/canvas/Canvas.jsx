"use client";

import { useBoardStore } from "../../store/board-store/board-store";
import StickyNote from "../sticky-note/StickyNote";
import Sticker from "../sticker/Sticker";

export default function Canvas() {
  const notes = useBoardStore((state) => state.notes);
  const stickers = useBoardStore((state) => state.stickers);

  const cameraX = useBoardStore((state) => state.cameraX);
  const cameraY = useBoardStore((state) => state.cameraY);
  const zoom = useBoardStore((state) => state.zoom);

  const setCamera = useBoardStore((state) => state.setCamera);
  const setZoom = useBoardStore((state) => state.setZoom);

  // panning
  const handleMouseDown = (e) => {
    if (e.target !== e.currentTarget) return;

    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";

    const startX = e.clientX;
    const startY = e.clientY;

    const initialX = cameraX;
    const initialY = cameraY;

    const handleMouseMove = (e) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      setCamera(
        initialX - dx / zoom,
        initialY - dy / zoom
      );
    };

    const handleMouseUp = () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseup",
        handleMouseUp
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseup",
      handleMouseUp
    );
  };

  const handleWheel = (e) => {
    e.preventDefault();

    const rect =
      e.currentTarget.getBoundingClientRect();

    const mouseX =
      e.clientX - rect.left;

    const mouseY =
      e.clientY - rect.top;

    const worldX =
      cameraX + mouseX / zoom;

    const worldY =
      cameraY + mouseY / zoom;

    let newZoom =
      zoom - e.deltaY * 0.001;

    newZoom = Math.max(
      0.3,
      Math.min(3, newZoom)
    );

    const newCameraX =
      worldX - mouseX / newZoom;

    const newCameraY =
      worldY - mouseY / newZoom;

    setZoom(newZoom);
    setCamera(
      newCameraX,
      newCameraY
    );
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          transform: `
            translate(${-cameraX * zoom}px, ${-cameraY * zoom}px)
            scale(${zoom})
          `,
          transformOrigin:
            "top left",
        }}
      >
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
          />
        ))}

        {stickers.map((sticker) => (
          <Sticker
            key={sticker.id}
            sticker={sticker}
          />
        ))}
      </div>
    </div>
  );
}