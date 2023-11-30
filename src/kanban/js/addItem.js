module.exports = async function(event) {
    const $button = $(event.target);
    const $board = $button.parents(".kanban-board");
    const boardId = $board.data("id");
    
    const noteId = await api.runOnBackend((boardId) => {
        return api.createTextNote(boardId, "NEW TICKET", "").note.noteId;
    }, [boardId]);
    
    await api.waitUntilSynced();
    await api.activateNote(noteId);
}