"use client";

import { useBoardStore } from "../../store/board-store/board-store";

export default function Sticker({ sticker }) {
  const updateStickerPosition = useBoardStore(
    (state) => state.updateStickerPosition
  );
  const updateStickerSize = useBoardStore(
    (state) => state.updateStickerSize
  );

  const handleMouseDown = (e) => {
    const offsetX = e.clientX - sticker.x;
    const offsetY = e.clientY - sticker.y;

    const handleMove = (e) => {
      updateStickerPosition(
        sticker.id,
        e.clientX - offsetX,
        e.clientY - offsetY
      );
    };

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  const handleResize = (e) => {
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    const startW = sticker.width;
    const startH = sticker.height;

    const move = (e) => {
      updateStickerSize(
        sticker.id,
        startW + (e.clientX - startX),
        startH + (e.clientY - startY)
      );
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: sticker.x,
        top: sticker.y,
        width: sticker.width,
        height: sticker.height,
        cursor: "grab",
      }}
    >
      <img
        src={sticker.src}
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
        }}
      />

      {/* resize */}
      <div
        onMouseDown={handleResize}
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "14px",
          height: "14px",
          borderRight: "3px solid rgba(0,0,0,0.4)",
          borderBottom: "3px solid rgba(0,0,0,0.4)",
          borderRadius: "0 0 15px 0",
        cursor: "nwse-resize",
        }}
      />
    </div>
  );
}