/**
 * Delete a card
 *
 * @var props {object}
 * @var props.context {object] - the view context
 * @var props.cardId {string} - the card id
 */
module.exports = async function(props) {
    const {
        context,
        cardId
    } = props;
    
    await api.runOnBackend((cardId) => {
        const card = api.getNote(cardId);
        card.deleteNote();
    }, [cardId])
}