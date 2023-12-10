/**
 * Move a board
 *
 * @var props {object}
 * @var props.context {object] - the view context
 * @var props.boardId {string} - the board id
 * @var props.before {string|undefined} - the cardId to which the new card should be added before
 * @var props.after {string|undefined} - the cardId to which the new card should be added after
 * @var props.position {number|undefined} - the position of the new card (starting from 0)
 */
module.exports = async function(props) {
    const {
        context: {
            kanban,
            $view,
            actions: { sortBoards },
            helpers: {
                getBoardIds,
                handlePositioning
            }
        },
        boardId,
        before,
        after,
        position
    } = props;
    
    var boardIds = getBoardIds($view);
    boardIds = handlePositioning(boardIds, boardId, before, after, position);
    
    await sortBoards({context: props.context, boardIds});
}