// the only custom change made in "jkanban.min.js" is the 
// use of "globalThis.jKanban" instead of "this.jKanban"
// this is made to prevent an error in the loading of the library

const kanban = new jKanban({
    element: "#kanban",
    boards: await getInitialData(),
    dropEl: moveItemToBoard,
    click: showNote,
    dragendBoard: reorderBoards
})