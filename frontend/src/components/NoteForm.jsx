function NoteForm({
  onSubmit,
  editingNote,
  onCancel,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      title: event.target.title.value,
      content: event.target.content.value,
    };

    await onSubmit(formData);

    if (!editingNote) {
      event.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {editingNote
          ? 'Edit Note'
          : 'Create Note'}
      </h2>

      <div>
        <label htmlFor="title">
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={
            editingNote?.title || ''
          }
          placeholder="Enter note title"
          required
        />
      </div>

      <div>
        <label htmlFor="content">
          Content
        </label>

        <textarea
          id="content"
          name="content"
          defaultValue={
            editingNote?.content || ''
          }
          placeholder="Write your note..."
          rows="6"
          required
        />
      </div>

      <button type="submit">
        {editingNote
          ? 'Update Note'
          : 'Create Note'}
      </button>

      {editingNote && (
        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default NoteForm;