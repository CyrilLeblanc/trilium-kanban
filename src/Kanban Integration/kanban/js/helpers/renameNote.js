module.exports = async function(noteId, title) {
    await api.runOnBackend(async (noteId, title) => {
        var note = api.getNote(noteId);
        note.title = title;
        await note.save();
    }, [noteId, title]);
}