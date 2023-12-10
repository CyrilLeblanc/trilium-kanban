/**
 * rename to card
 *
 * @var props {object}
 * @var props.context {object] - the view context
 * @var props.cardId {string} - the card id
 * @var props.title {string] - the new card title
 */
module.exports = async function(props) {
    const {
        context: {
            kanban,
            helpers: { renameNote }
        },
        cardId,
        title
    } = props;
    
    await renameNote(cardId, title);
    
    // TODO: change title in view
}