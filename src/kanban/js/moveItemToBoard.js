module.exports = async function(el, target, source, sibling) {
    if (target == source) {
        return;
    }

    const itemId = $(el).data("eid");
    const targetBoardId = $(target).parents(".kanban-board").data("id");
    const sourceBoardId = $(source).parents(".kanban-board").data("id");

    const result = await api.runOnBackend((itemId, targetBoardId, sourceBoardId) => {        
        if (targetBoardId != sourceBoardId) {
            // add in target board
            api.toggleNoteInParent(true, itemId, targetBoardId);

            // remove item from source board
            api.toggleNoteInParent(false, itemId, sourceBoardId);
        }

        return true;
    }, [itemId, targetBoardId, sourceBoardId])

    if (!result) {
        api.showError("An error occurred while moving the item.");
    }

    await api.waitUntilSynced();
};