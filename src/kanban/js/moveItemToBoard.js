module.exports = async function(el, target, source, sibling) {
    const itemId = $(el).data("eid");
    const targetBoardId = $(target).parents(".kanban-board").data("id");
    const sourceBoardId = $(source).parents(".kanban-board").data("id");
    
    // get ordered items ids
    const $container = $(el).parents(".kanban-drag");
    const noteOrderedIds = [];
    $container.children().each((index, el) => {
        const id = $(el).data("eid");
        noteOrderedIds.push(id);
    });

    const result = await api.runOnBackend((
        itemId,
        targetBoardId,
        sourceBoardId,
        noteOrderedIds
    ) => {
        // move to selected board if it's not already here
        if (targetBoardId != sourceBoardId) {
            // add in target board
            api.toggleNoteInParent(true, itemId, targetBoardId);

            // remove item from source board
            api.toggleNoteInParent(false, itemId, sourceBoardId);
        }

        // get the order label to reorder children
        const board = api.getNote(targetBoardId);
        const hasSortedLabel = !!board.getLabel("sorted");

        // if it doesn't have one set and use the default one
        if (!hasSortedLabel) {
            board.setLabel("sorted", "sortOrder");
        }

        const orderLabel = board.getLabelValue("sorted");
        const children = board.getChildNotes();

        noteOrderedIds.forEach((noteId, index) => {
            const note = api.getNote(noteId);
            if (note.getLabelValue(orderLabel) != index) {
                note.setLabel(orderLabel, index);
                note.save();
            }
        })

        return true;
    }, [
        itemId,
        targetBoardId,
        sourceBoardId,
        noteOrderedIds
    ]);

    if (!result) {
        api.showError("An error occurred while moving the item.");
    }

    await api.waitUntilSynced();
};