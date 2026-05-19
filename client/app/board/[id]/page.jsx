"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Canvas from "../../../components/canvas/Canvas";

import { useBoardStore } from "../../../store/board-store/board-store";

export default function BoardPage() {
  const router = useRouter();

  const addNote = useBoardStore(
    (state) => state.addNote,
  );

  const addSticker = useBoardStore(
    (state) => state.addSticker,
  );

  const cameraX = useBoardStore(
    (s) => s.cameraX,
  );

  const cameraY = useBoardStore(
    (s) => s.cameraY,
  );

  const zoom = useBoardStore(
    (s) => s.zoom,
  );

  const setZoom = useBoardStore(
    (s) => s.setZoom,
  );

  const setCamera = useBoardStore(
    (s) => s.setCamera,
  );

  const hydrate = useBoardStore(
    (s) => s.hydrate,
  );

  const hydrated = useBoardStore(
    (s) => s.hydrated,
  );

  const [showStickers, setShowStickers] =
    useState(false);

  const [authLoading, setAuthLoading] =
    useState(true);

  // auth check + hydrate
  useEffect(() => {
    async function initializeBoard() {
      try {
        const response = await fetch(
          "/api/auth/me",
        );

        if (!response.ok) {
          router.push("/login");
          return;
        }

        await hydrate();
      } catch (error) {
        console.error(error);

        router.push("/login");
      } finally {
        setAuthLoading(false);
      }
    }

    initializeBoard();
  }, []);

  const zoomByStep = (direction) => {
    const step = 0.2;

    let newZoom =
      zoom +
      (direction === "in"
        ? step
        : -step);

    newZoom = Math.max(
      0.3,
      Math.min(3, newZoom),
    );

    const centerX =
      window.innerWidth / 2;

    const centerY =
      window.innerHeight / 2;

    const worldX =
      cameraX + centerX / zoom;

    const worldY =
      cameraY + centerY / zoom;

    const newCameraX =
      worldX - centerX / newZoom;

    const newCameraY =
      worldY - centerY / newZoom;

    setZoom(newZoom);

    setCamera(
      newCameraX,
      newCameraY,
    );
  };

  if (authLoading || !hydrated) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f4f2",
          color: "#381932",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        loading board...
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* logout button */}

      <button
        onClick={async () => {
          await fetch(
            "/api/auth/logout",
            {
              method: "POST",
            },
          );

          router.push("/");
        }}
        style={{
          position: "absolute",
          top: "40px",
          right: "170px",
          zIndex: 50,
          background: "#381932",
          color: "white",
          padding: "12px 18px",
          borderRadius: "14px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        logout
      </button>

      {/* home button */}

      <Link
        href="/"
        style={{
          position: "absolute",
          top: "40px",
          right: "40px",
          zIndex: 50,
          background: "white",
          padding: "12px 18px",
          borderRadius: "14px",
          textDecoration: "none",
          color: "#381932",
          fontWeight: "600",
          boxShadow:
            "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        ← home
      </Link>

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
          noted.
        </h1>
      </div>

      {/* sidebar */}

      <div
        style={{
          position: "absolute",
          left: "40px",
          top: "50%",
          transform:
            "translateY(-50%)",
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
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.1)",
          }}
        >
          {showStickers && (
            <div
              style={{
                position: "absolute",
                left: "90px",
                top: "50%",
                transform:
                  "translateY(-50%)",
                background: "white",
                padding: "12px",
                borderRadius: "16px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.1)",
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, 60px)",
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
                    addSticker(
                      `/stickers/${name}.png`,
                    );

                    setShowStickers(
                      false,
                    );
                  }}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit:
                      "contain",
                    cursor: "pointer",
                    borderRadius:
                      "10px",
                    padding: "6px",
                  }}
                />
              ))}
            </div>
          )}

          <button
            onClick={addNote}
            className="tool-btn"
          >
            note
          </button>

          <button
            className="tool-btn"
            onClick={() =>
              setShowStickers(
                (prev) => !prev,
              )
            }
          >
            stickers
          </button>
        </div>
      </div>

      {/* zoom controls */}

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "40px",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <button
          onClick={() =>
            zoomByStep("in")
          }
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "white",
            fontSize: "22px",
            fontWeight: "600",
            boxShadow:
              "0 6px 16px rgba(0,0,0,0.15)",
            border: "none",
            cursor: "pointer",
          }}
        >
          +
        </button>

        <button
          onClick={() =>
            zoomByStep("out")
          }
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "white",
            fontSize: "22px",
            fontWeight: "600",
            boxShadow:
              "0 6px 16px rgba(0,0,0,0.15)",
            border: "none",
            cursor: "pointer",
          }}
        >
          −
        </button>
      </div>

      <Canvas />
    </div>
  );
}