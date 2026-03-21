import { create } from "zustand";

export const useBoardStore = create((set) => ({
  notes: [],

  cameraX: 0,
  cameraY: 0,

  zoom: 1,
  setZoom: (zoom) => set({ zoom }),

  addNote: () =>
  set((state) => ({
    notes: [
      ...state.notes,
      {
        id: Date.now(),
        text: "new note",
        x: 200,
        y: 200,
        color: "#fde68a",
      },
    ],
  })),

  updateNotePosition: (id, x, y) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, x, y } : note,
      ),
    })),

  updateNoteText: (id, text) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, text } : note,
      ),
    })),

  updateNoteColor: (id, color) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, color } : note,
      ),
    })),

  setCamera: (x, y) => set({ cameraX: x, cameraY: y }),
}));
