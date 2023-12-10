module.exports = async function(noteId) {
    await api.runOnBackend(async (noteId) => {
        var note = api.getNote(noteId);
        note.deleteNote();
    }, [noteId]);
}