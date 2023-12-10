/**
 * Create a new card in the specified board.
 *
 * Only one of "after" or "before" or "position" props should be specified.
 * If multiple of these are given, they will be ignored.
 * If none is given, the new card will be added at the end of the board.
 *
 * @var props {object}
 * @var props.context {any} - the view context
 * @var props.boardId {string} - the boardId to add the card
 * @var props.title {string} - title of the new card
 * @var props.before {string|undefined} - the cardId to which the new card should be added before
 * @var props.after {string|undefined} - the cardId to which the new card should be added after
 * @var props.position {number|undefined} - the position of the new card (starting from 0)
 */
module.exports = async function(props) {
    const {
        context: { 
            kanban,
            actions: { orderCards },
            helpers: {
                getCardIds,
                handlePositioning
            }
        },
        boardId,
        title,
        before,
        after,
        position
    } = props;

    // get current order for cards
    var cardIds = getCardIds(kanban, boardId);
    
    // get position of the new card
    const fakeId = "new";
    cardIds = handlePositioning(cardIds, fakeId, before, after, position);
    const sortOrder = cardIds.findIndex(id => id == fakeId);

    // create the new note
    const cardId = await api.runOnBackend((boardId, sortOrder, title) => {
        const card = api.createNewTextNote(
            boardId,
            title,
            ""
        ).note;
        card.setLabel("sortOrder", sortOrder);
        card.save();

        return card.noteId;
    }, [boardId, sortOrder, title]);
    await api.waitUntilSynced();

    // replace the fake cardId with the real one
    cardIds = cardIds.map(id => id === fakeId ? cardId : id);

    // render the new note in the view
    kanban.addElement({title, id: cardId, position: sortOrder});

    // reorder cards in the board
    await orderCards({context, boardId, cardIds});
}