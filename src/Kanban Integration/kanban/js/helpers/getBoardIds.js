module.exports = function($view) {
    const $boards = $view.find(".kanban-board");
    const boardIds = [];
    $boards.each((index, board) => {
        boardIds.push(
            $(board).data("id")
        );
    });

    return boardIds;
}