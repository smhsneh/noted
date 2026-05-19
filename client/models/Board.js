import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    id: Number,
    type: String,
    text: String,
    todos: Array,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
    color: String,
    pinned: Boolean,
    fontSize: Number,
  },
  { _id: false },
);

const StickerSchema = new mongoose.Schema(
  {
    id: Number,
    src: String,
    x: Number,
    y: Number,
    width: Number,
    height: Number,
  },
  { _id: false },
);

const BoardSchema = new mongoose.Schema(
  {
    notes: [NoteSchema],

    stickers: [StickerSchema],

    cameraX: {
      type: Number,
      default: 0,
    },

    cameraY: {
      type: Number,
      default: 0,
    },

    zoom: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);
