module.exports = async function(context) {
    const {
        helpers,
        kanban,
        $view,
        settings: { showBoardIcons, useCustomColors }
    } = context;
    
    const { noteId: kanbanNoteId } = api.originEntity;
    
    // get label values of boards
    const boardsData = await api.runOnBackend(kanbanNoteId => {
        const kanbanNote = api.getNote(kanbanNoteId);
        const boards = kanbanNote.getChildNotes();
        const labels = ["iconClass", "kanbanStyle"];
        return boards.map(board => {
            var output = {
                id: board.noteId
            };
            
            labels.forEach(
                label => output[label] = board.getLabelValue(label)
            );
            return output;
        });
    }, [kanbanNoteId]);
    
    boardsData.forEach(data => {
        const {id, iconClass, kanbanStyle} = data;
        const $board = $(`.kanban-board[data-id=${id}]`);
        const $header = $board.find(".kanban-board-header");
        if (showBoardIcons && iconClass) {
            $header.prepend($("<span/>", {class: iconClass}));
        }
        
        if (useCustomColors) {
            if (kanbanStyle) {
                $board.addClass("kanban-style-" + kanbanStyle);
            }
        }
    });
}