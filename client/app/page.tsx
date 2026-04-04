import Image from "next/image";

export default function Home() {
return ( <main className="min-h-screen bg-[#f4f4f4] font-sans flex flex-col">

  <div className="w-full flex justify-end gap-8 px-16 py-6 text-sm font-semibold">
    <button>login</button>
    <button>signup</button>
  </div>

  <div className="flex flex-1 items-center justify-center px-16 gap-20">

    <div className="relative">
      <Image
        src="/file.png"
        alt="noted visual"
        width={500}
        height={500}
        className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
      />
    </div>

    <div className="max-w-md">

      <h1 className="text-4xl font-bold mb-4">
        welcome to noted.
      </h1>

      <p className="text-gray-600 text-lg leading-relaxed mb-8">
        organize your thoughts the way you think ; freely and visually
      </p>

      <button className="border border-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-black hover:text-white transition">
        note now →
      </button>

    </div>
  </div>

  <div className="w-full text-center text-sm text-gray-400 pb-6">
    made by smhsneh
  </div>

</main>

);
}