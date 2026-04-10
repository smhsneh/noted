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

  const handleMouseDown = (e) => {
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

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
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
          background: "white",
          padding: "40px 10px 10px 10px",
          opacity: note.pinned ? 0.9 : 1,
          border: note.pinned ? "2px solid #000" : "none",
          boxShadow: `
            0 0 0 2px white,
            6px 6px 16px rgba(0,0,0,0.08),
            -4px -4px 10px rgba(255,255,255,0.7)
          `,
        }}
      >
        {/* color */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
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

        {/* content */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            padding: "14px",
            background: note.color || "#fde68a",
          }}
        >
          {note.type === "text" ? (
            editing ? (
              <textarea
                autoFocus
                defaultValue={note.text || ""}
                onBlur={(e) => {
                  updateNoteText(note.id, e.target.value);
                  setEditing(false);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <div>{note.text}</div>
            )
          ) : (
            <div>
              {(note.todos || []).map((todo, i) => (
                <div key={i}>
                  <input
                    type="checkbox"
                    checked={!!todo.done}
                    onChange={() => toggleTodo(note.id, i)}
                  />
                  {todo.text}
                </div>
              ))}

              <input
                placeholder="add task"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    addTodo(note.id, e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          )}
        </div>

        <div
          onMouseDown={handleResizeMouseDown}
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

      {menu && (
        <div
          style={{
            position: "fixed",
            top: menu.y,
            left: menu.x,
            background: "white",
            padding: "6px 12px",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            fontSize: "14px",
            zIndex: 1000,
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => {
              togglePin(note.id);
              setMenu(null);
            }}
            style={{ padding: "4px 0", cursor: "pointer" }}
          >
            {note.pinned ? "unpin" : "pin"}
          </div>

          <div
            onClick={() => {
              toggleNoteType(note.id);
              setMenu(null);
            }}
            style={{ padding: "4px 0", cursor: "pointer" }}
          >
            toggle todo
          </div>

          <div
            onClick={() => {
              deleteNote(note.id);
              setMenu(null);
            }}
            style={{ padding: "4px 0", cursor: "pointer" }}
          >
            delete
          </div>
        </div>
      )}
    </>
  );
}