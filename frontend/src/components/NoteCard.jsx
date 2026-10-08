function NoteCard({
  note,
  onEdit,
  onDelete,
}) {
  return (
    <article>
      <h3>{note.title}</h3>

      <p>{note.content}</p>

      <div>
        <button
          type="button"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(note._id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;