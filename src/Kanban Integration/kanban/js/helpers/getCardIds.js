module.exports = function(kanban, boardId) {
    const $cards = $(kanban.getBoardElements(boardId));
    const cardIds = [];
    $cards.each((index, card) => {
        cardIds.push(
            $(card).data("eid")
        );
    });
    
    return cardIds;
}