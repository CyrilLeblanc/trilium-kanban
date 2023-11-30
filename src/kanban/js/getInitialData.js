module.exports = async function() {
    const { noteId } = api.originEntity;

    return await api.runOnBackend(kanbanNoteId => {
        const kanbanNote = api.getNote(kanbanNoteId);
        const boards = kanbanNote.getChildNotes();
        
        return boards.map(board => {
            const items = board.getChildNotes();
            
            return {
                id: board.noteId,
                title: board.title,
                item: items.map(item => (
                    {
                        id: item.noteId,
                        title: item.title
                    }
                ))
            };
        });
    }, [noteId]);
}