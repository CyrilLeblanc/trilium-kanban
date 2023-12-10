module.exports = async function(noteIds) {
    await api.runOnBackend((noteIds) => {
        noteIds.forEach(async (noteId, index) => {
            const note = api.getNote(noteId);
            const sortOrder = await note.getLabelValue("sortOrder");
            if (sortOrder != index) {
                note.setLabel("sortOrder", index);
                await note.save();
            }
        });
    }, [noteIds]);
}