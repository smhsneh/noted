export default function StickyNote({ note }) {
  return (
    <div
      style={{
        position: "absolute",
        left: note.x,
        top: note.y,
        width: 150,
        height: 150,
      }}
      className="bg-yellow-200 p-2 rounded shadow"
    >
      {note.text}
    </div>
  );
}