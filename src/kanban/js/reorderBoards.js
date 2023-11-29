module.exports = async function(el) {
    const { noteId: kanbanNoteId } = api.originEntity;

    // get notes id ordered
    const $container = $(el).parents(".kanban-container");
    const noteOrderedIds = [];
    $container.children().each((index, el) => {
        const id = $(el).data("id");
        noteOrderedIds.push(id);
    });

    const result = await api.runOnBackend((kanbanNoteId, noteOrderedIds) => {
        const kanbanNote = api.getNote(kanbanNoteId);
        const orderLabel = kanbanNote.getLabelValue("sorted");

        // don't reorder if there's no #sorted attribute on kanban note
        if (!orderLabel) {
            return true;
        }

        noteOrderedIds.forEach((noteId, index) => {
            const note = api.getNote(noteId);

            if (note.getLabelValue(orderLabel) != index) {
                note.setLabel(orderLabel, index);
                note.save();
            }
        });

        return true;
    }, [kanbanNoteId, noteOrderedIds]);

    if (!result) {
        api.showError("An error occured when ordering boards.");
    }

    await api.waitUntilSynced();
}