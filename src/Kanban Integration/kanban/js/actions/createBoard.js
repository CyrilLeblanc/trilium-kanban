/**
 * Create a new board in the current view.
 *
 * Only one of "after" or "before" or "position" props should be specified.
 * If multiple of these are given, they will be ignored.
 * If none is given, the new board will be added at the end of the view.
 *
 * @var props {object}
 * @var props.context {object} - the view context
 * @var props.title {string} - title of the new board
 * @var props.before {string|undefined} - the boardId to which the new board should be added before
 * @var props.after {string|undefined} - the boardId to which the new board should be added after
 * @var props.position {number|undefined} - the position of the new board (starting from 0)
 */
module.exports = async function(props) {
    const {
        context: {
            $view,
            kanban,
            actions: { orderBoards },
            helpers: {
                getBoardIds,
                handlePositioning
            }
        },
        title,
        before,
        after,
        position
    } = props;
    const { noteId: viewId } = api.originEntity;
    
    // get current order for boards
    var boardIds = getBoardIds($view);
    
    // get position of the new board
    const fakeId = "new";
    boardIds = handlePositioning(boardIds, fakeId, before, after, position);
    const sortOrder = boardIds.findIndex(id => id == fakeId);
    
    // create the new note
    const boardId = await api.runOnBackend((viewId, sortOrder, title) => {
        const board = api.createNewTextNote(
            viewId,
            title,
            ""
        ).note;
        board.setLabel("sortOrder", sortOrder);
        board.save();

        return board.noteId;
    }, [viewId, sortOrder, title]);
    await api.waitUntilSynced();
    
    // replace the fake cardId with the real one
    boardIds = boardIds.map(id => id === fakeId ? boardId : id);
    
    // TODO: add the board to view
    
    // reorder boards in the view
    await orderBoards({context, boardIds});
}