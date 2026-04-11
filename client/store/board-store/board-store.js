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

  // hydrate manually
  hydrate: () => {
    if (typeof window === "undefined") return;

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return;

      const parsed = JSON.parse(data);

      set({
        notes: parsed.notes || [],
        stickers: parsed.stickers || [],
        cameraX: parsed.cameraX ?? 0,
        cameraY: parsed.cameraY ?? 0,
        zoom: parsed.zoom ?? 1,
      });
    } catch (e) {
      console.error("failed to hydrate", e);
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
          x: 200,
          y: 200,
          width: 200,
          height: 220,
          color: "#fde68a",
          pinned: false,
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

//autosave
let saveTimeout;

useBoardStore.subscribe((state) => {
  if (typeof window === "undefined") return;

  clearTimeout(saveTimeout);

  saveTimeout = setTimeout(() => {
    const data = {
      notes: state.notes,
      stickers: state.stickers,
      cameraX: state.cameraX,
      cameraY: state.cameraY,
      zoom: state.zoom,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, 400);
});