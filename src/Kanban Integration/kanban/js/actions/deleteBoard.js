/**
 * Delete a board
 *
 * @var props {object}
 * @var props.context {object] - the view context
 * @var props.boardId {string} - the board id
 */
module.exports = async function(props) {
    const {
        context,
        boardId
    } = props;
    
    await api.runOnBackend((boardId) => {
        const board = api.getNote(boardId);
        board.deleteNote();
    }, [boardId])
}