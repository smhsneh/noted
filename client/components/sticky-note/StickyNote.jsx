"use client";

import { useBoardStore } from "../../store/board-store/board-store";
import { useState, useEffect } from "react";

export default function StickyNote({ note = {} }) {
  const updateNotePosition = useBoardStore((s) => s.updateNotePosition);
  const updateNoteText = useBoardStore((s) => s.updateNoteText);
  const updateNoteColor = useBoardStore((s) => s.updateNoteColor);
  const deleteNote = useBoardStore((s) => s.deleteNote);
  const updateNoteSize = useBoardStore((s) => s.updateNoteSize);
  const addTodo = useBoardStore((s) => s.addTodo);
  const toggleTodo = useBoardStore((s) => s.toggleTodo);
  const toggleNoteType = useBoardStore((s) => s.toggleNoteType);
  const togglePin = useBoardStore((s) => s.togglePin);

  const [editing, setEditing] = useState(false);
  const [menu, setMenu] = useState(null);

  // z-index
  const [zIndex, setZIndex] = useState(1);

  // font size
  const [fontSize, setFontSize] = useState(note.fontSize || 16);

  useEffect(() => {
    if (!menu) return;

    const closeMenu = () => setMenu(null);

    window.addEventListener("mousedown", closeMenu);
    window.addEventListener("scroll", closeMenu);
    window.addEventListener("contextmenu", closeMenu);

    return () => {
      window.removeEventListener("mousedown", closeMenu);
      window.removeEventListener("scroll", closeMenu);
      window.removeEventListener("contextmenu", closeMenu);
    };
  }, [menu]);

  const bringToFront = () => {
    const highestZ =
      Math.max(
        ...Array.from(document.querySelectorAll(".sticky-note")).map(
          (el) => Number(el.style.zIndex) || 1
        )
      ) + 1;

    setZIndex(highestZ);
  };

  const handleMouseDown = (e) => {
    bringToFront();

    if (note.pinned) return;

    const offsetX = e.clientX - (note.x || 0);
    const offsetY = e.clientY - (note.y || 0);

    const move = (e) => {
      updateNotePosition(note.id, e.clientX - offsetX, e.clientY - offsetY);
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    const startW = note.width || 200;
    const startH = note.height || 220;

    const move = (e) => {
      updateNoteSize(
        note.id,
        Math.max(180, startW + (e.clientX - startX)),
        Math.max(180, startH + (e.clientY - startY))
      );
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    bringToFront();

    setMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        className="sticky-note"
        onMouseDown={handleMouseDown}
        onDoubleClick={() => setEditing(true)}
        onContextMenu={handleContextMenu}
        style={{
          position: "absolute",
          left: note.x || 0,
          top: note.y || 0,
          width: note.width || 200,
          height: note.height || 220,
          borderRadius: "20px",
          background: note.color || "#fde68a",

          // proper internal spacing
          padding: "52px 16px 16px 16px",

          opacity: note.pinned ? 0.9 : 1,
          border: note.pinned ? "2px solid #000" : "none",
          zIndex,
          cursor: note.pinned ? "default" : "grab",
          transition: "box-shadow 0.2s ease",

          boxShadow: `
            0 0 0 2px white,
            8px 10px 24px rgba(0,0,0,0.12),
            -4px -4px 12px rgba(255,255,255,0.65)
          `,
        }}
      >
        {/* top controls */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "12px",
            right: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* font controls */}
          <div
            style={{
              display: "flex",
              gap: "6px",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setFontSize((prev) => Math.max(12, prev - 2));
              }}
              style={{
                border: "none",
                background: "rgba(255,255,255,0.7)",
                borderRadius: "8px",
                padding: "2px 8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              A-
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setFontSize((prev) => Math.min(32, prev + 2));
              }}
              style={{
                border: "none",
                background: "rgba(255,255,255,0.7)",
                borderRadius: "8px",
                padding: "2px 8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              A+
            </button>
          </div>

          {/* color picker */}
          <div
            style={{
              position: "relative",
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background: note.color || "#fde68a",
              boxShadow: "0 0 0 2px white",
            }}
          >
            <input
              type="color"
              value={note.color || "#fde68a"}
              onChange={(e) => updateNoteColor(note.id, e.target.value)}
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        {/* content */}
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {note.type === "text" ? (
            editing ? (
              <textarea
                autoFocus
                value={note.text || ""}
                onChange={(e) =>
                  updateNoteText(note.id, e.target.value)
                }
                onBlur={() => setEditing(false)}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  background: "transparent",
                  fontSize: `${fontSize}px`,
                  color: "#222",
                  fontFamily: "inherit",
                }}
              />
            ) : (
              <div
                onClick={() => setEditing(true)}
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  overflowY: "auto",
                  height: "100%",
                  fontSize: `${fontSize}px`,
                  color: "#222",
                }}
              >
                {note.text}
              </div>
            )
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                overflowY: "auto",
              }}
            >
              {(note.todos || []).map((todo, index) => (
                <label
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: `${fontSize}px`,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(note.id, index)}
                  />

                  <span
                    style={{
                      textDecoration: todo.done
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {todo.text}
                  </span>
                </label>
              ))}

              <button
                onClick={() => addTodo(note.id, "new todo")}
                style={{
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px",
                  cursor: "pointer",
                  background: "rgba(255,255,255,0.7)",
                  fontWeight: "600",
                }}
              >
                + add todo
              </button>
            </div>
          )}
        </div>

        {/* resize handle */}
        <div
          onMouseDown={handleResizeMouseDown}
          style={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
            width: "14px",
            height: "14px",
            borderRight: "3px solid rgba(0,0,0,0.4)",
            borderBottom: "3px solid rgba(0,0,0,0.4)",
            cursor: "nwse-resize",
          }}
        />
      </div>

      {/* context menu */}
      {menu && (
        <div
          style={{
            position: "fixed",
            top: menu.y,
            left: menu.x,
            background: "white",
            padding: "10px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            fontSize: "14px",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            minWidth: "140px",
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              togglePin(note.id);
              setMenu(null);
            }}
            style={{
              border: "none",
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            {note.pinned ? "unpin" : "pin"}
          </button>

          <button
            onClick={() => {
              toggleNoteType(note.id);
              setMenu(null);
            }}
            style={{
              border: "none",
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            switch type
          </button>

          <button
            onClick={() => {
              deleteNote(note.id);
              setMenu(null);
            }}
            style={{
              border: "none",
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
              color: "#dc2626",
            }}
          >
            delete
          </button>
        </div>
      )}
    </>
  );
}