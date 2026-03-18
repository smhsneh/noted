import { create } from "zustand";

export const useBoardStore = create((set) => ({
  notes: [],

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
}));