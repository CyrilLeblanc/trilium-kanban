
module.exports = context => {
    const {
        kanban,
        $view,
        actions,
        helpers
    } = context;
    
    $view.on({
        // Go to note when card click
        cardClick: (event, el) => {
            const cardId = helpers.getNoteId(el);
            helpers.navigateToNote(cardId);
        },
        cardDragStart: (event, el) => {
            scrollOnDrag.start(el);
        },
        cardDragStop: (event) => {
            scrollOnDrag.stop();
        },
        // Move the card to the targeted board on card drop
        cardDrop: (event, el, target, source, sibling) => {
            const cardId = helpers.getNoteId(el);

            actions.moveCard({
                context,
                cardId,
                sourceBoardId: helpers.getNoteId(source),
                targetBoardId: helpers.getNoteId(target),
                before: sibling ? helpers.getNoteId(sibling) : null
            })
        },
        boardDragStart: (event, el) => {
            scrollOnDrag.start(el);
        },
        boardDragStop: (event, el) => {
            scrollOnDrag.stop();
            const boardId = helpers.getNoteId(el);
            const boardIds = helpers.getBoardIds($view);
            const position = boardIds.findIndex(id => id == boardId);
            
            actions.moveBoard({
                context,
                boardId,
                position,
            })
        },
        boardAddClick: (event, el, boardId) => {
            showNewCardForm(event, kanban, el, boardId)
        }
    });
    
    $view.on('dblclick', '.kanban-title-board', showRenameBoardForm);
}