module.exports = async function() {
    const { noteId: kanbanNoteId } = api.originEntity;

    return await api.runOnBackend(kanbanNoteId => {
        const kanbanNote = api.getNote(kanbanNoteId);
        const boards = kanbanNote.getChildNotes();

        // sort boards by "sortOrder"
        const sortedBoards = boards.sort((a, b) => {
            aSortOrder = a.getLabelValue("sortOrder");
            bSortOrder = b.getLabelValue("sortOrder");
            
            return aSortOrder - bSortOrder;
        });
              
        return sortedBoards.map(board => {
            const cards = board.getChildNotes();
            
            // sort cards by "sortOrders"
            const sortedCards = cards.sort((a, b) => {
                aSortOrder = a.getLabelValue("sortOrder");
                bSortOrder = b.getLabelValue("sortOrder");
                
                return aSortOrder - bSortOrder;
            });

            return {
                id: board.noteId,
                title: board.title,
                item: sortedCards.map(card => (
                    {
                        id: card.noteId,
                        title: card.title,
                        backgroundColor: card.getLabelValue("backgroundColor"),
                        textColor: card.getLabelValue("textColor"),
                        iconClass: card.getLabelValue("iconClass")
                    }
                ))
            };
        });
    }, [kanbanNoteId]);
}