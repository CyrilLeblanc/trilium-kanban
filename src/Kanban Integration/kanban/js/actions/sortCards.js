/**
 * sort cards to the given order
 *
 * @var props {object}
 * @var props.context {object] - the view context
 * @var props.cardIds {string} - the card ids
 */
module.exports = async function(props) {
    const {
        context: {
            helpers: { sortNotes }
        },
        boardId,
        cardIds
    } = props;
    
    await sortNotes(cardIds);
}