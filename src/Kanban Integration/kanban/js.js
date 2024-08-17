// the only custom change made in "jkanban.min.js" is the 
// use of "globalThis.jKanban" instead of "this.jKanban"
// this is made to prevent an error while loading the library

const selector = "#kanban";
const $view = $(selector);

const kanban = new jKanban({
    element: selector,
    boards: await getInitialData(),
    click: (...args) => $view.trigger("cardClick", args),
    dragEl: (...args) => $view.trigger("cardDragStart", args),
    dragendEl: (...args) => $view.trigger("cardDragStop", args),
    dropEl: (...args) => $view.trigger("cardDrop", args),
    dragBoard: (...args) => $view.trigger("boardDragStart", args),
    dragendBoard: (...args) => $view.trigger("boardDragStop", args),
    buttonClick: (...args) => $view.trigger("boardAddClick", args),
    itemAddOptions: {
        enabled: true,
        class: "btn btn-default bx bx-plus kanban-action-add-card",
        footer: true,
        content: "\u00a0",
    },
})

const context = {
    $view,
    kanban,
    helpers,
    actions,
};

handlePostGeneration(context)
handleEvents(context);

// you can comment this if you don't want the update banner
checkForUpdates($view);