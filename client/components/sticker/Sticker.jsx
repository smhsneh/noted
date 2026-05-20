"use client";

import { useState, useEffect } from "react";
import { useBoardStore } from "../../store/board-store/board-store";

export default function Sticker({ sticker }) {
  const updateStickerPosition = useBoardStore(
    (state) => state.updateStickerPosition
  );

  const updateStickerSize = useBoardStore(
    (state) => state.updateStickerSize
  );

  const deleteSticker = useBoardStore(
    (state) => state.deleteSticker
  );

  const [menu, setMenu] = useState(null);

  useEffect(() => {
    if (!menu) return;

    const closeMenu = () => setMenu(null);

    window.addEventListener(
      "mousedown",
      closeMenu
    );

    window.addEventListener(
      "scroll",
      closeMenu
    );

    window.addEventListener(
      "contextmenu",
      closeMenu
    );

    return () => {
      window.removeEventListener(
        "mousedown",
        closeMenu
      );

      window.removeEventListener(
        "scroll",
        closeMenu
      );

      window.removeEventListener(
        "contextmenu",
        closeMenu
      );
    };
  }, [menu]);

  const startDragging = () => {
    document.body.style.userSelect =
      "none";

    document.body.style.cursor =
      "grabbing";
  };

  const stopDragging = () => {
    document.body.style.userSelect =
      "";

    document.body.style.cursor = "";
  };

  const handleMouseDown = (e) => {
    e.preventDefault();

    startDragging();

    const offsetX =
      e.clientX - sticker.x;

    const offsetY =
      e.clientY - sticker.y;

    const move = (e) => {
      updateStickerPosition(
        sticker.id,
        e.clientX - offsetX,
        e.clientY - offsetY
      );
    };

    const up = () => {
      stopDragging();

      window.removeEventListener(
        "mousemove",
        move
      );

      window.removeEventListener(
        "mouseup",
        up
      );
    };

    window.addEventListener(
      "mousemove",
      move
    );

    window.addEventListener(
      "mouseup",
      up
    );
  };

  const handleResize = (e) => {
    e.stopPropagation();

    startDragging();

    const startX = e.clientX;
    const startY = e.clientY;

    const startW = sticker.width;
    const startH = sticker.height;

    const move = (e) => {
      updateStickerSize(
        sticker.id,
        startW +
          (e.clientX - startX),
        startH +
          (e.clientY - startY)
      );
    };

    const up = () => {
      stopDragging();

      window.removeEventListener(
        "mousemove",
        move
      );

      window.removeEventListener(
        "mouseup",
        up
      );
    };

    window.addEventListener(
      "mousemove",
      move
    );

    window.addEventListener(
      "mouseup",
      up
    );
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setMenu({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <>
      <div
        onMouseDown={handleMouseDown}
        onContextMenu={
          handleContextMenu
        }
        style={{
          position: "absolute",
          left: sticker.x,
          top: sticker.y,
          width: sticker.width,
          height: sticker.height,
          cursor: "grab",

          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout:
            "none",
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

            userSelect: "none",
            WebkitUserDrag:
              "none",
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
            borderRight:
              "3px solid rgba(0,0,0,0.4)",
            borderBottom:
              "3px solid rgba(0,0,0,0.4)",
            borderRadius:
              "0 0 15px 0",
            cursor: "nwse-resize",
          }}
        />
      </div>

      {menu && (
        <div
          style={{
            position: "fixed",
            top: menu.y,
            left: menu.x,
            background: "white",
            padding: "6px 12px",
            borderRadius: "10px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.15)",
            fontSize: "14px",
            zIndex: 1000,
          }}
          onMouseDown={(e) =>
            e.stopPropagation()
          }
          onContextMenu={(e) =>
            e.stopPropagation()
          }
        >
          <div
            onClick={() => {
              deleteSticker(
                sticker.id
              );

              setMenu(null);
            }}
            style={{
              padding: "4px 0",
              cursor: "pointer",
            }}
          >
            delete
          </div>
        </div>
      )}
    </>
  );
}