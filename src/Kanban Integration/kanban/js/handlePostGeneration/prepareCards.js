module.exports = async function(context) {
    const { $view, helpers, kanban } = context;
    
    const boardIds = helpers.getBoardIds($view);
    const cardIds = [];
    boardIds.forEach(boardId => cardIds.push(
        ...helpers.getCardIds(kanban, boardId)
    ));
    
    $view.find(".kanban-item").each((index, item) => {
        const $item = $(item);
        const text = $item.text();
        const {
            backgroundcolor,
            textcolor,
            iconclass
        } = $item.data();
        console.log($item.data())
        $item.empty();
        
        if (backgroundcolor) {
            $item.css('background-color', backgroundcolor);
        }
        
        if (textcolor) {
            $item.css('color', textcolor);
        }
        
        if (iconclass) {
            const $iconSpan = $('<span/>', {class: iconclass})
            $item.append($iconSpan);
        }
        
        const $title = $('<span/>', {text});
        
        $item.append($title);
    });
}