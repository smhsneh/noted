import { create } from "zustand";

const STORAGE_KEY = "board-v1";

const initialState = {
  notes: [],
  stickers: [],
  cameraX: 0,
  cameraY: 0,
  zoom: 1,
};

export const useBoardStore = create((set, get) => ({
  ...initialState,

  hydrated: false,

  hydrate: async () => {
    if (typeof window === "undefined") return;

    try {
      const response = await fetch("/api/board");

      if (response.ok) {
        const board = await response.json();

        set({
          notes: board.notes || [],
          stickers: board.stickers || [],
          cameraX: board.cameraX ?? 0,
          cameraY: board.cameraY ?? 0,
          zoom: board.zoom ?? 1,
          hydrated: true,
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(board));

        return;
      }
    } catch (error) {
      console.error("backend fetch failed", error);
    }

    try {
      const data = localStorage.getItem(STORAGE_KEY);

      if (!data) {
        set({ hydrated: true });
        return;
      }

      const parsed = JSON.parse(data);

      set({
        notes: parsed.notes || [],
        stickers: parsed.stickers || [],
        cameraX: parsed.cameraX ?? 0,
        cameraY: parsed.cameraY ?? 0,
        zoom: parsed.zoom ?? 1,
        hydrated: true,
      });
    } catch (e) {
      console.error("local hydrate failed", e);

      set({ hydrated: true });
    }
  },

  setCamera: (x, y) => set({ cameraX: x, cameraY: y }),
  setZoom: (z) => set({ zoom: z }),

  addNote: () =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          id: Date.now(),

          type: "text",

          text: "new note",

          todos: [],

          x: 200 + state.notes.length * 30,
          y: 200 + state.notes.length * 30,

          width: 200,
          height: 220,

          color: "#fde68a",

          pinned: false,

          fontSize: 16,
        },
      ],
    })),

  updateNotePosition: (id, x, y) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, x, y } : note
      ),
    })),

  updateNoteText: (id, text) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, text } : note
      ),
    })),

  updateNoteColor: (id, color) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, color } : note
      ),
    })),

  updateFontSize: (id, fontSize) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, fontSize } : note
      ),
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),

  deleteSticker: (id) =>
    set((state) => ({
      stickers: state.stickers.filter((s) => s.id !== id),
    })),

  addTodo: (id, text) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              todos: [...note.todos, { text, done: false }],
            }
          : note
      ),
    })),

  toggleTodo: (id, index) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              todos: note.todos.map((todo, i) =>
                i === index ? { ...todo, done: !todo.done } : todo
              ),
            }
          : note
      ),
    })),

  toggleNoteType: (id) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              type: note.type === "text" ? "todo" : "text",
            }
          : note
      ),
    })),

  updateNoteSize: (id, width, height) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, width, height } : note
      ),
    })),

  togglePin: (id) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      ),
    })),

  addSticker: (src) =>
    set((state) => ({
      stickers: [
        ...state.stickers,
        {
          id: Date.now(),
          x: 300,
          y: 200,
          width: 100,
          height: 100,
          src,
        },
      ],
    })),

  updateStickerPosition: (id, x, y) =>
    set((state) => ({
      stickers: state.stickers.map((s) =>
        s.id === id ? { ...s, x, y } : s
      ),
    })),

  updateStickerSize: (id, width, height) =>
    set((state) => ({
      stickers: state.stickers.map((s) =>
        s.id === id ? { ...s, width, height } : s
      ),
    })),
}));

let saveTimeout;

useBoardStore.subscribe((state) => {
  if (typeof window === "undefined") return;

  if (!state.hydrated) return;

  clearTimeout(saveTimeout);

  saveTimeout = setTimeout(async () => {
    const data = {
      notes: state.notes,
      stickers: state.stickers,
      cameraX: state.cameraX,
      cameraY: state.cameraY,
      zoom: state.zoom,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    try {
      await fetch("/api/board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("cloud save failed", error);
    }
  }, 500);
});