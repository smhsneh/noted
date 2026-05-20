"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const rows = 22;
  const cols = 40;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const generateGrid = () => {
    const generated: string[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(chars[Math.floor(Math.random() * chars.length)]);
      }
      generated.push(row);
    }

    const noted = "NOTED";
    for (let i = 0; i < noted.length; i++) generated[5][5 + i] = noted[i];

    const think = "THINK";
    for (let i = 0; i < think.length; i++) generated[10][3 + i] = think[i];

    const noteit = "SMHSNEH";
    for (let i = 0; i < noteit.length; i++) generated[7][14 + i] = noteit[i];

    const visually = "VISUALLY";
    for (let i = 0; i < visually.length; i++) generated[16][8 + i] = visually[i];

    return generated;
  };

  const [grid, setGrid] = useState<string[][]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setGrid(generateGrid());
    setMounted(true);
  }, []);

  return (
    <main
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
        py-6
        overflow-hidden
        relative
      "
      style={{
        background:
          "linear-gradient(135deg, #ffd6e0 0%, #fce4ec 15%, #f8d7f0 30%, #e8d5f5 45%, #d5e8f5 60%, #c8e6f8 75%, #bae0fa 90%, #aed6f1 100%)",
      }}
    >

      <div
        className="
          relative
          w-full
          max-w-[1500px]
          min-h-[720px]
          bg-white
          border
          border-black/5
          rounded-[28px]
          overflow-hidden
          flex
          flex-col
        "
      >
        {/* main */}
        <div className="flex-1 grid grid-cols-2">
          {/* left */}
          <div className="flex flex-col justify-center px-[70px] py-[40px]">
            <p
              className="
                text-[12px]
                tracking-[4px]
                uppercase
                text-black
                mb-8
                font-medium
              "
            >
              spatial note-taking
            </p>

            <h1
              className="
                text-[120px]
                leading-[0.9]
                tracking-[-7px]
                font-semibold
                text-black
              "
            >
              noted.
            </h1>

            <p
              className="
                mt-7
                max-w-[520px]
                text-[18px]
                leading-[2]
                text-black/55
                font-normal
              "
            >
              an infinite canvas for freeform thinking, visual workflows, and
              the beautiful mess of your mind.
            </p>

            {/* button */}
            <div className="mt-10">
              <button
                onClick={() => router.push("/login")}
                onMouseEnter={(e) => {
                  const gradient = e.currentTarget.querySelector(
                    ".gradient-fill",
                  ) as HTMLElement;
                  const white = e.currentTarget.querySelector(
                    ".inner-white",
                  ) as HTMLElement;
                  gradient.style.opacity = "1";
                  white.style.opacity = "0";
                }}
                onMouseLeave={(e) => {
                  const gradient = e.currentTarget.querySelector(
                    ".gradient-fill",
                  ) as HTMLElement;
                  const white = e.currentTarget.querySelector(
                    ".inner-white",
                  ) as HTMLElement;
                  gradient.style.opacity = "0";
                  white.style.opacity = "1";
                }}
                className="
                  relative
                  overflow-hidden
                  px-10
                  py-4
                  rounded-full
                  bg-white
                  text-[#111]
                  text-[15px]
                  font-semibold
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                "
              >

                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,182,193,1), rgba(186,230,253,1), rgba(221,214,254,1))",
                    filter: "blur(18px)",
                    transform: "scale(1.25)",
                    opacity: 1,
                  }}
                />

                <div
                  className="gradient-fill"
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "999px",
                    background:
                      "linear-gradient(90deg, #ffb6c1, #bae6fd, #ddd6fe)",
                    opacity: 0,
                    transition: "opacity 0.35s ease",
                  }}
                />

                <div
                  className="inner-white"
                  style={{
                    position: "absolute",
                    inset: "2px",
                    borderRadius: "999px",
                    background: "white",
                    transition: "opacity 0.35s ease",
                  }}
                />

                <span className="relative z-10 flex items-center gap-3">
                  note now
                  <span className="text-[16px] opacity-70">→</span>
                </span>
              </button>
            </div>
          </div>

          <div
            className="
              relative
              flex
              items-center
              justify-center
              border-l
              border-black/5
              bg-white
            "
          >
            <div
              className="
                w-[88%]
                h-[88%]
                flex
                items-center
                justify-center
                relative
                overflow-hidden
              "
            >

              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* grid — only render after client mount to avoid hydration mismatch */}
              {mounted && (
                <div
                  className="
                    relative
                    z-10
                    font-mono
                    text-[17px]
                    leading-[1.8]
                    tracking-[7px]
                    select-none
                  "
                >
                  {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="whitespace-nowrap">
                      {row.map((char, colIndex) => {
                        const isNoted =
                          rowIndex === 5 && colIndex >= 5 && colIndex <= 9;
                        const isThink =
                          rowIndex === 10 && colIndex >= 3 && colIndex <= 7;
                        const isVisually =
                          rowIndex === 16 && colIndex >= 8 && colIndex <= 15;
                        const isNoteit =
                          rowIndex === 7 && colIndex >= 14 && colIndex <= 20;

                        return (
                          <span
                            key={colIndex}
                            className={
                              isNoted || isThink || isVisually || isNoteit
                                ? "text-black font-semibold"
                                : "text-black/20"
                            }
                          >
                            {char}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* bottom */}
        <div
          className="
            h-[58px]
            border-t
            border-black/5
            grid
            grid-cols-4
            text-[13px]
            text-black
          "
        >
          <div className="flex items-center justify-center gap-3 border-r border-black/5">
            • infinite workspace
          </div>
          <div className="flex items-center justify-center gap-3 border-r border-black/5">
            • spatial note-taking
          </div>
          <div className="flex items-center justify-center gap-3 border-r border-black/5">
            • cloud persistence
          </div>
          <div className="flex items-center justify-center gap-3">
            • fluid interactions
          </div>
        </div>
      </div>
    </main>
  );
}