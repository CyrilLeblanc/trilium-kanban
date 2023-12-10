/**
 * rename to board
 *
 * @var props {object}
 * @var props.context {object] - the view context
 * @var props.boardId {string} - the board id
 * @var props.title {string] - the new board title
 */
module.exports = async function(props) {
    const {
        context: {
            kanban,
            helpers: { renameNote }
        },
        boardId,
        title
    } = props;

    await renameNote(boardId, title);

    // TODO: change title in view
}