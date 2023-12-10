module.exports = function (el) {
    if ($(el).is(".kanban-item")) {
        const $card = $(el);
        
        return $card.data("eid");
    } else {
        const $board = $(el).parents(".kanban-board");
        
        return $board.length ? $board.data("id") : $(el).data("id");
    }
}