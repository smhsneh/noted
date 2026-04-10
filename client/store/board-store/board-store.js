import { create } from "zustand";

export const useBoardStore = create((set) => ({
  notes: [],
  stickers: [],

  cameraX: 0,
  cameraY: 0,
  zoom: 1,

  setCamera: (x, y) => set({ cameraX: x, cameraY: y }),
  setZoom: (z) => set({ zoom: z }),

  // add note
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
          pinned: false, // ✅ NEW
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

  // PIN TOGGLE
  togglePin: (id) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned }
          : note
      ),
    })),

  // stickers
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