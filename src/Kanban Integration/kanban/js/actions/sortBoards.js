/**
 * sort boards to the given order
 *
 * @var props {object}
 * @var props.context {object] - the view context
 * @var props.boardIds {string} - the board ids
 */
module.exports = async function(props) {
    const {
        context: {
            helpers: { sortNotes }
        },
        boardIds
    } = props;

    await sortNotes(boardIds);
}