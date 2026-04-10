"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f4f4f4] font-sans flex flex-col">
      <div className="w-full flex justify-center gap-10 py-6 text-xl font-bold text-gray-600">
        <button className="hover:text-black transition">login</button>
        <button className="hover:text-black transition">signup</button>
      </div>

      <div className="flex flex-1 items-center justify-center px-16 gap-24">
        <div className="relative">
          <Image
            src="/file.png"
            alt="noted visual"
            width={520}
            height={520}
            className="drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
          />
        </div>

        <div className="max-w-md">
          <h1 className="text-6xl font-bold tracking-tight mb-4 text-gray-900">
            welcome to noted.
          </h1>

          <p className="text-gray-500 text-xl leading-relaxed mb-8 font-normal">
            organize your thoughts the way you think, freely and visually
          </p>

          <div
            className="p-[3px] rounded-full inline-block"
            style={{
              background: "linear-gradient(to right, #000000, #888888)",
            }}
          >
            <button
              onClick={() => router.push("/board/1")}
              className="
                px-7 py-3 rounded-full
                font-bold text-gray-700 text-base
                flex items-center gap-2
                hover:bg-gray-50 transition
              "
              style={{
                background: "linear-gradient(to right, white, #f3f3f3)",
              }}
            >
              note now →
            </button>
          </div>
        </div>
      </div>

      <div className="w-full text-center text-sm text-gray-400 pb-6">
        made by smhsneh
      </div>
    </main>
  );
}