import { create } from "zustand";

export const useBoardStore = create((set) => ({
  notes: [],

  cameraX: 0,
  cameraY: 0,

  addNote: () =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          id: Date.now(),
          text: "new note",
          x: 100,
          y: 100,
        },
      ],
    })),

  updateNotePosition: (id, x, y) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, x, y } : note
      ),
    })),

  setCamera: (x, y) => set({ cameraX: x, cameraY: y }),
}));