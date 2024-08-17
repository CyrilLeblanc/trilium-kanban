module.exports = async function(context) {
    const {
      $view,
      helpers,
      kanban,
      settings: { showCardIcons, useCustomColors },
    } = context;
    
    const boardIds = helpers.getBoardIds($view);
    const cardIds = [];
    boardIds.forEach(boardId => cardIds.push(
        ...helpers.getCardIds(kanban, boardId)
    ));
    
    $view.find(".kanban-item").each((index, card) => {
        const $card = $(card);
        const text = $card.text();
        const {
            kanbanstyle,
            iconclass
        } = $card.data();

        $card.empty();
        
        if (useCustomColors && kanbanstyle) {
            $card.addClass("kanban-style-" + kanbanstyle);
        }
        
        if (showCardIcons && iconclass) {
            const $iconSpan = $('<span/>', {class: iconclass})
            $card.append($iconSpan);
        }
        
        const $title = $('<span/>', {text});
        
        $card.append($title);
    });
}