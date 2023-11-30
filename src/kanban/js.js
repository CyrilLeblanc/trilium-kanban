// the only custom change made in "jkanban.min.js" is the 
// use of "globalThis.jKanban" instead of "this.jKanban"
// this is made to prevent an error while loading the library

const selector = "#kanban";

const kanban = new jKanban({
    element: selector,
    boards: await getInitialData(),
    dropEl: moveItemToBoard,
    click: showNote,
    dragendBoard: reorderBoards,
    itemAddOptions: {
        enabled: true,
        class: 'kanban-title-button btn btn-default kanban-action-add-item'
    },
})

$(selector).on('click', ".kanban-action-add-item", addItem);
