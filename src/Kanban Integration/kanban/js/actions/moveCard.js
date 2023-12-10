/**
 * Move a card to the specified board
 *
 * @var props {object}
 * @var props.context {object] - the view context
 * @var props.boardId {string} - the board id
 * @var props.sourceBoardId {string} - the source board id
 * @var props.targetBoardId {string] - the target source id
 * @var props.before {string|undefined} - the cardId to which the new card should be added before
 * @var props.after {string|undefined} - the cardId to which the new card should be added after
 * @var props.position {number|undefined} - the position of the new card (starting from 0)
 *
 * @returns {string[]} - the new board order
 */
module.exports = async function(props) {
    const {
        context: { 
            kanban,
            actions: {
                sortCards
            },
            helpers: {
                getCardIds,
                handlePositioning
            }
        },
        cardId,
        sourceBoardId,
        targetBoardId,
        before,
        after,
        position
    } = props;
    const { noteId: viewId } = api.originEntity;

    if (sourceBoardId !== targetBoardId) {
        // move the card in the right board
        await api.runOnBackend((cardId, sourceBoardId, targetBoardId) => {
            api.toggleNoteInParent(true, cardId, targetBoardId);
            api.toggleNoteInParent(false, cardId, sourceBoardId);
        }, [cardId, sourceBoardId, targetBoardId]);

        // get order of cards in the targeted board
        const sourceCardIds = getCardIds(kanban, sourceBoardId);
        const currentIndex = sourceCardIds.findIndex(id => id == cardId);

        // if it's present in the source board, remove it
        if (currentIndex) {
            sourceCardIds.splice(currentIndex, 1);
        }

        // reorder source board cards
        await sortCards({
            context: props.context, 
            boardId: sourceBoardId,
            cardIds: sourceCardIds
        });
    }

    // get new order of the cards in target boards
    const cardIds = getCardIds(kanban, targetBoardId);
    const targetCardIds = handlePositioning(cardIds, cardId, before, after, position);

    // reorder target board cards
    await sortCards({
        context: props.context,
        boardId: targetBoardId,
        cardIds: targetCardIds
    });
}