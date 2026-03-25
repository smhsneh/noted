import { create } from "zustand";

export const useBoardStore = create((set) => ({
  notes: [],

  cameraX: 0,
  cameraY: 0,
  zoom: 1,

  setCamera: (x, y) => set({ cameraX: x, cameraY: y }),
  setZoom: (z) => set({ zoom: z }),

  addNote: () =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          id: Date.now(),
          text: "new note",
          x: 200,
          y: 200,
          width: 200,
          height: 220,
          color: "#fde68a",
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

  updateNoteSize: (id, width, height) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, width, height } : note
      ),
    })),
}));