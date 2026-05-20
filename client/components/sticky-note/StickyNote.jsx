"use client";

import { useState, useEffect } from "react";
import { useBoardStore } from "../../store/board-store/board-store";

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
  const updateTodoText = useBoardStore((s) => s.updateTodoText);
  const clearPlaceholderNote = useBoardStore(
    (s) => s.clearPlaceholderNote
  );

  const [editing, setEditing] = useState(false);
  const [menu, setMenu] = useState(null);
  const [zIndex, setZIndex] = useState(1);
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

  const startDragging = () => {
    document.body.style.userSelect = "none";
    document.body.style.cursor = "grabbing";
  };

  const stopDragging = () => {
    document.body.style.userSelect = "";
    document.body.style.cursor = "";
  };

  const handleMouseDown = (e) => {
    if (
      e.target.closest("textarea") ||
      e.target.closest("input") ||
      e.target.closest("button")
    ) {
      return;
    }

    bringToFront();

    if (note.pinned) return;

    startDragging();

    const offsetX = e.clientX - (note.x || 0);
    const offsetY = e.clientY - (note.y || 0);

    const move = (e) => {
      updateNotePosition(
        note.id,
        e.clientX - offsetX,
        e.clientY - offsetY
      );
    };

    const up = () => {
      stopDragging();

      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();

    startDragging();

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
      stopDragging();

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
        onContextMenu={handleContextMenu}
        style={{
          position: "absolute",
          left: note.x || 0,
          top: note.y || 0,
          width: note.width || 200,
          height: note.height || 220,
          borderRadius: "20px",
          background: note.color || "#fde68a",
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
              onChange={(e) =>
                updateNoteColor(note.id, e.target.value)
              }
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                cursor: "pointer",
              }}
            />
          </div>
        </div>

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
                onClick={() => {
                  if (note.text === "new note") {
                    clearPlaceholderNote(note.id);
                  }

                  setEditing(true);
                }}
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  overflowY: "auto",
                  height: "100%",
                  fontSize: `${fontSize}px`,
                  color: "#222",
                  cursor: "text",
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
                gap: "12px",
                overflowY: "auto",
              }}
            >
              {(note.todos || []).map((todo, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() =>
                      toggleTodo(note.id, index)
                    }
                    style={{
                      width: "20px",
                      height: "20px",
                      marginTop: "2px",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  />

                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) =>
                      updateTodoText(
                        note.id,
                        index,
                        e.target.value
                      )
                    }
                    style={{
                      flex: 1,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: `${fontSize}px`,
                      textDecoration: todo.done
                        ? "line-through"
                        : "none",
                      color: "#222",
                    }}
                  />
                </div>
              ))}

              <button
                onClick={() => addTodo(note.id, "")}
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